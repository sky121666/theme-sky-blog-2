import Alpine from "./alpine";
import { findCommentHashContainer, findRenderedCommentHashTarget, keepInitialReplyVisible } from "./comment-navigation";

import { logError, logWarn } from "./logger";
import {
  NAVIGATION_ERROR_EVENT,
  NAVIGATION_FULL_RELOAD_EVENT,
  NAVIGATION_FULL_RELOAD_RESET_EVENT,
  NAVIGATION_SAME_DOCUMENT_EVENT,
  NAVIGATION_START_EVENT,
  NAVIGATION_SUCCESS_EVENT,
  navigateWithFullReload,
  setPartialNavigationBarrier,
  startPartialNavigation,
  type NavigationEventDetail,
} from "./navigation";
import { syncHaloDataFromDocument } from "./page-data";
import { loadPostCommentWidget, observePostComments, recordPostVisit } from "./post-navigation";
import { dispatchPageReady, dispatchRuntimeStatus } from "./runtime-events";
import { bindEntryScrollHistory, checkpointScrollPosition } from "./scroll-history";
import { initTaskListInteraction } from "./task-list";
import { initUiActions } from "./ui-actions";

let pendingFailure: NavigationEventDetail | null = null;
const MODULE_REPLAY_TIMEOUT_MS = 5000;
const MODULE_REPLAY_EVENT_PREFIX = "theme:module-replay:";
const PJAX_COMPAT_COMPLETE_EVENT = "pjax:complete";

let navigationSequence = 0;
let moduleReplaySequence = 0;
let scrollFrameId: number | null = null;
let fullNavigationPending = false;
let scrollOwner: NavigationEventDetail | null = null;
let disposePostComments: (() => void) | undefined;
// Only a newly inserted main waiting for plugin replay needs a fallback mount.
let pendingMount: { main: HTMLElement; pageType: string; releaseVisit: () => void } | null = null;
const scrollPositions = new Map<string, number>();

function hydrateLegacyImages(root: ParentNode = document) {
  // Promote the old image attributes while keeping native loading and authored priorities.
  for (const image of root.querySelectorAll<HTMLImageElement>("img.lozad:is([data-src], [data-srcset])")) {
    if (image.dataset.loaded === "true") continue;
    const { src, srcset, sizes } = image.dataset;
    if (!src?.trim() && !srcset?.trim()) continue;
    if (!image.hasAttribute("loading")) image.setAttribute("loading", "lazy");
    if (sizes?.trim()) image.sizes = sizes;
    if (srcset?.trim()) image.srcset = srcset;
    if (src?.trim()) image.src = src;
    image.dataset.loaded = "true";
    image.classList.add("loaded");
  }
}

export async function replayNavigationScripts(root: HTMLElement) {
  const pendingScripts: Promise<void>[] = [];
  const scripts = Array.from(root.querySelectorAll<HTMLScriptElement>('script[type="module"][data-pjax]'));
  const sourceUrls = new Map<HTMLScriptElement, URL | null>();

  for (const script of scripts) {
    const source = script.getAttribute("src");
    if (!source) {
      if (!script.textContent?.trim()) {
        throw new Error("Cannot replay an empty partial-navigation module script.");
      }
      sourceUrls.set(script, null);
      continue;
    }

    let sourceUrl: URL;
    try {
      sourceUrl = new URL(source, window.location.href);
    } catch {
      throw new Error("Cannot replay a partial-navigation module script with an invalid source URL.");
    }

    if (sourceUrl.origin !== window.location.origin || !["http:", "https:"].includes(sourceUrl.protocol)) {
      throw new Error(`Cannot replay a cross-origin partial-navigation module script: ${sourceUrl.toString()}`);
    }
    sourceUrls.set(script, sourceUrl);
  }

  // Halo plugin widgets opt in to partial-navigation reinitialization with data-pjax.
  scripts.forEach((script) => {
    const sourceUrl = sourceUrls.get(script) ?? null;
    const clone = document.createElement("script");
    let completionEventName: string | null = null;
    clone.type = "module";

    if (sourceUrl) {
      sourceUrl.searchParams.set("_theme_navigation", String(navigationSequence));
      clone.src = sourceUrl.toString();
    } else {
      // CommentWidget 3.1.2 renders an inline module that imports init() and targets
      // the freshly rendered comment container. data-pjax is its explicit opt-in.
      completionEventName = `${MODULE_REPLAY_EVENT_PREFIX}${navigationSequence}:${moduleReplaySequence}`;
      moduleReplaySequence += 1;
      clone.textContent = script.textContent ?? "";
      clone.textContent += `\n;window.dispatchEvent(new Event(${JSON.stringify(completionEventName)}));`;
    }

    ["crossorigin", "integrity", "nonce", "referrerpolicy"].forEach((attributeName) => {
      const value =
        attributeName === "nonce"
          ? script.nonce || script.getAttribute(attributeName)
          : script.getAttribute(attributeName);
      if (value) {
        clone.setAttribute(attributeName, value);
      }
    });

    pendingScripts.push(
      new Promise((resolve, reject) => {
        let settled = false;
        let timeoutId: number | null = null;
        const finish = (error?: Error) => {
          if (settled) {
            return;
          }
          settled = true;
          if (timeoutId !== null) {
            window.clearTimeout(timeoutId);
          }
          if (completionEventName) {
            window.removeEventListener(completionEventName, handleInlineComplete);
          }
          clone.removeEventListener("load", handleLoad);
          clone.removeEventListener("error", handleError);
          if (error) {
            logWarn(error.message);
            reject(error);
            return;
          }
          resolve();
        };
        const handleInlineComplete = () => finish();
        const handleLoad = () => finish();
        const handleError = () => finish(new Error("Failed to replay a partial-navigation module script."));

        if (completionEventName) {
          window.addEventListener(completionEventName, handleInlineComplete, { once: true });
        }
        clone.addEventListener("load", handleLoad, { once: true });
        clone.addEventListener("error", handleError, { once: true });
        timeoutId = window.setTimeout(
          () => finish(new Error("Timed out while replaying a partial-navigation module script.")),
          MODULE_REPLAY_TIMEOUT_MS,
        );
        script.replaceWith(clone);
      }),
    );
  });

  await Promise.all(pendingScripts);
}

function rememberScrollPosition(entryKey: string) {
  const main = document.getElementById("main");
  if (!main) {
    return;
  }

  checkpointScrollPosition(scrollPositions, entryKey, main);
}

function cancelPendingScrollRestoration() {
  if (scrollFrameId !== null) {
    window.cancelAnimationFrame(scrollFrameId);
    scrollFrameId = null;
  }
}

function findHashTarget() {
  const rawHash = window.location.hash.slice(1);
  if (!rawHash) {
    return null;
  }

  try {
    const name = decodeURIComponent(rawHash);
    return document.getElementById(name) ?? document.getElementsByName(name)[0] ?? null;
  } catch {
    return document.getElementById(rawHash);
  }
}

export function focusNavigationContext(detail: NavigationEventDetail, hashTarget = findHashTarget()) {
  if (!detail.focus) {
    return;
  }

  const target = hashTarget instanceof HTMLElement ? hashTarget : document.getElementById("main");
  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (!target.hasAttribute("tabindex")) {
    target.setAttribute("tabindex", "-1");
  }
  target.focus({ preventScroll: true });
}

export function announceNavigation() {
  const announcer = document.getElementById("navigation-announcer");
  if (announcer) {
    announcer.textContent = `Loaded ${document.title}`;
  }
}

function restoreScrollPosition(detail: NavigationEventDetail) {
  cancelPendingScrollRestoration();

  const savedTop = detail.history ? scrollPositions.get(detail.targetEntryKey) : undefined;
  const commentContainer = savedTop === undefined ? findCommentHashContainer() : null;
  if (commentContainer) {
    // An unchanged hash does not make the plugin locate its discussion again.
    if (!detail.history && detail.fromEntryKey === detail.targetEntryKey) {
      const target = findRenderedCommentHashTarget(commentContainer) ?? commentContainer;
      target.scrollIntoView({ behavior: "auto", block: "start" });
      focusNavigationContext(detail, target);
    }
    return;
  }

  scrollFrameId = window.requestAnimationFrame(() => {
    scrollFrameId = null;
    const hashTarget = savedTop === undefined ? findHashTarget() : null;
    if (hashTarget instanceof HTMLElement) {
      hashTarget.scrollIntoView({ behavior: "auto", block: "start" });
      focusNavigationContext(detail, hashTarget);
      return;
    }

    document.getElementById("main")?.scrollTo({
      behavior: "auto",
      top: savedTop ?? 0,
    });
    focusNavigationContext(detail, null);
  });
}

async function initializeReplacedPage(
  detail: NavigationEventDetail,
  expectedNavigationSequence: number,
  releaseVisit: () => void,
) {
  disposePostComments?.();
  disposePostComments = undefined;
  const main = document.getElementById("main");
  const pageType = syncHaloDataFromDocument(detail.pageData)?.pageType ?? "unknown";

  if (main) {
    pendingMount = { main, pageType, releaseVisit };
    await replayNavigationScripts(main);
    if (detail.postComments) await loadPostCommentWidget(detail.postComments, MODULE_REPLAY_TIMEOUT_MS);
    if (
      fullNavigationPending ||
      expectedNavigationSequence !== navigationSequence ||
      !main.isConnected ||
      document.getElementById("main") !== main
    ) {
      return;
    }
    // Shiki 1.4.1 keeps its extraPathPatterns renderer in a head module that
    // listens for this lifecycle event. Emitting the compatibility event keeps
    // that plugin surface working without restoring the Pjax dependency.
    if (detail.postComments) {
      disposePostComments = observePostComments(main, detail.postComments);
      keepInitialReplyVisible();
    }
    window.dispatchEvent(new CustomEvent(PJAX_COMPAT_COMPLETE_EVENT));
    mountPageControls(main);
    pendingMount = null;
  }

  initTaskListInteraction();
  announceNavigation();
  if (scrollOwner === detail) restoreScrollPosition(detail);
  if (detail.postVisit) void recordPostVisit(detail.postVisit);
  dispatchPageReady({ pageType });
}

function mountPageControls(main: HTMLElement) {
  Alpine.initTree(main);
  initUiActions(main);
  hydrateLegacyImages(main);
}

function recoverPendingMount() {
  const page = pendingMount;
  if (!page) return;
  pendingMount = null;
  page.releaseVisit();
  if (page.main !== document.getElementById("main")) return;

  // Modules that completed before a sibling failed may already have side effects.
  // Only restore the theme's own interaction layer on the still-visible document.
  let message = "Page controls restored. Some page plugins may be unavailable. Reload to try again.";
  try {
    mountPageControls(page.main);
    initTaskListInteraction();
    dispatchPageReady({ pageType: page.pageType });
  } catch (error) {
    logError("Failed to restore page controls.", error);
    message = "Page controls could not be restored. Reload to try again.";
  }
  dispatchRuntimeStatus({ level: "error", message, targetUrl: window.location.href });
}

function bindGlobalEvents() {
  document.addEventListener(NAVIGATION_FULL_RELOAD_EVENT, () => {
    pendingFailure = null;
    fullNavigationPending = true;
    navigationSequence += 1;
    cancelPendingScrollRestoration();
  });

  document.addEventListener(NAVIGATION_FULL_RELOAD_RESET_EVENT, () => {
    pendingFailure = null;
    fullNavigationPending = false;
    navigationSequence += 1;
    cancelPendingScrollRestoration();
    const resetSequence = navigationSequence;
    // Publish the specific recovery outcome after the watchdog's reset notification.
    setPartialNavigationBarrier(
      Promise.resolve().then(() => {
        if (resetSequence === navigationSequence) recoverPendingMount();
      }),
    );

    const main = document.getElementById("main");
    main?.classList.remove("loading");
    main?.removeAttribute("aria-busy");
  });

  document.addEventListener(NAVIGATION_START_EVENT, (event) => {
    pendingFailure = null;
    navigationSequence += 1;
    rememberScrollPosition(event.detail.fromEntryKey);
    cancelPendingScrollRestoration();

    const main = document.getElementById("main");
    if (main) {
      main.classList.add("loading");
      main.setAttribute("aria-busy", "true");
    }
  });

  document.addEventListener(NAVIGATION_SUCCESS_EVENT, (event) => {
    if (fullNavigationPending) {
      return;
    }

    scrollOwner = event.detail;
    const successfulNavigationSequence = navigationSequence;
    const barrier = new Promise<void>((releaseVisit) => {
      void initializeReplacedPage(event.detail, successfulNavigationSequence, releaseVisit)
        .catch((error) => {
          logError("Failed to initialize the partially navigated page.", error);
          if (fullNavigationPending || successfulNavigationSequence !== navigationSequence) {
            return;
          }
          if (scrollOwner !== event.detail) {
            // A newer anchor owns the visible page. Restore its controls in place.
            recoverPendingMount();
            return;
          }
          dispatchRuntimeStatus({
            level: "error",
            message: "Page initialization failed. Retrying with a full page load...",
            targetUrl: event.detail.targetUrl,
          });
          navigateWithFullReload(event.detail.targetUrl, { recovery: true });
        })
        .finally(() => {
          releaseVisit();
          if (successfulNavigationSequence !== navigationSequence) {
            return;
          }
          const main = document.getElementById("main");
          main?.classList.remove("loading");
          main?.removeAttribute("aria-busy");
        });
    });
    setPartialNavigationBarrier(barrier);
  });

  document.addEventListener(NAVIGATION_SAME_DOCUMENT_EVENT, (event) => {
    pendingFailure = null;
    if (fullNavigationPending) {
      return;
    }

    const main = document.getElementById("main");
    main?.classList.remove("loading");
    main?.removeAttribute("aria-busy");
    scrollOwner = event.detail;
    if (event.detail.fromEntryKey !== event.detail.targetEntryKey) {
      rememberScrollPosition(event.detail.fromEntryKey);
    }
    restoreScrollPosition(event.detail);
  });

  document.addEventListener(NAVIGATION_ERROR_EVENT, (event) => {
    if (fullNavigationPending) {
      return;
    }

    pendingFailure = event.detail;
    const targetUrl = event.detail.targetUrl;

    const main = document.getElementById("main");
    main?.classList.remove("loading");
    main?.removeAttribute("aria-busy");
    logError("Partial navigation failed.", event.detail.error);
    dispatchRuntimeStatus({
      level: "error",
      message: "Navigation failed. Retrying with a full page load...",
      ...(targetUrl ? { targetUrl } : {}),
    });

    if (!targetUrl) {
      return;
    }

    window.requestAnimationFrame(() => {
      if (pendingFailure === event.detail) {
        pendingFailure = null;
        navigateWithFullReload(targetUrl, { recovery: true });
      }
    });
  });
}

export function bootstrapRuntime() {
  syncHaloDataFromDocument();
  setPartialNavigationBarrier(Promise.resolve());

  window.Alpine = Alpine;
  Alpine.start();

  hydrateLegacyImages();
  bindGlobalEvents();
  startPartialNavigation();
  if (!bindEntryScrollHistory(scrollPositions)) keepInitialReplyVisible();
  initTaskListInteraction();
  initUiActions();
  document.documentElement.setAttribute("data-theme-ready", "");
}
