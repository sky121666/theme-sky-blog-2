import Alpine from "./alpine";
import lozad from "lozad";

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
import { dispatchPageReady, dispatchRuntimeStatus } from "./runtime-events";
import { initTaskListInteraction } from "./task-list";
import { initUiActions } from "./ui-actions";

const MAX_SCROLL_POSITIONS = 100;
const FULL_RELOAD_DELAY_MS = 100;
const MODULE_REPLAY_TIMEOUT_MS = 5000;
const MODULE_REPLAY_EVENT_PREFIX = "theme:module-replay:";
const PJAX_COMPAT_COMPLETE_EVENT = "pjax:complete";

let observer: ReturnType<typeof lozad> | null = null;
let navigationSequence = 0;
let moduleReplaySequence = 0;
let scrollFrameId: number | null = null;
let fullNavigationPending = false;
const scrollPositions = new Map<string, number>();

function initLazyLoading(root: ParentNode = document) {
  observer?.observer.disconnect();
  observer = lozad(root.querySelectorAll(".lozad"), {
    loaded: (element) => {
      element.classList.add("loaded");
    },
  });

  observer.observe();
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

  scrollPositions.delete(entryKey);
  scrollPositions.set(entryKey, main.scrollTop);

  if (scrollPositions.size > MAX_SCROLL_POSITIONS) {
    const oldestEntryKey = scrollPositions.keys().next().value;
    if (oldestEntryKey) {
      scrollPositions.delete(oldestEntryKey);
    }
  }
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

  scrollFrameId = window.requestAnimationFrame(() => {
    scrollFrameId = null;
    const hashTarget = findHashTarget();
    if (hashTarget instanceof HTMLElement) {
      hashTarget.scrollIntoView({ behavior: "auto", block: "start" });
      focusNavigationContext(detail, hashTarget);
      return;
    }

    document.getElementById("main")?.scrollTo({
      behavior: "auto",
      top: detail.history ? (scrollPositions.get(detail.targetEntryKey) ?? 0) : 0,
    });
    focusNavigationContext(detail, null);
  });
}

async function initializeReplacedPage(detail: NavigationEventDetail, expectedNavigationSequence: number) {
  const main = document.getElementById("main");
  const haloData = syncHaloDataFromDocument();

  if (main) {
    await replayNavigationScripts(main);
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
    window.dispatchEvent(new CustomEvent(PJAX_COMPAT_COMPLETE_EVENT));
    Alpine.initTree(main);
    initUiActions(main);
    initLazyLoading(main);
  }

  initTaskListInteraction();
  announceNavigation();
  restoreScrollPosition(detail);
  dispatchPageReady({ pageType: haloData?.pageType ?? "unknown" });
}

function bindGlobalEvents() {
  document.addEventListener(NAVIGATION_FULL_RELOAD_EVENT, () => {
    fullNavigationPending = true;
    navigationSequence += 1;
    cancelPendingScrollRestoration();
  });

  document.addEventListener(NAVIGATION_FULL_RELOAD_RESET_EVENT, () => {
    fullNavigationPending = false;
    navigationSequence += 1;
    cancelPendingScrollRestoration();
    setPartialNavigationBarrier(Promise.resolve());

    const main = document.getElementById("main");
    main?.classList.remove("loading");
    main?.removeAttribute("aria-busy");
  });

  document.addEventListener(NAVIGATION_START_EVENT, (event) => {
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

    const successfulNavigationSequence = navigationSequence;
    const initialization = initializeReplacedPage(event.detail, successfulNavigationSequence);
    setPartialNavigationBarrier(initialization);
    void initialization
      .catch((error) => {
        logError("Failed to initialize the partially navigated page.", error);
        if (fullNavigationPending || successfulNavigationSequence !== navigationSequence) {
          return;
        }
        dispatchRuntimeStatus({
          level: "error",
          message: "Page initialization failed. Retrying with a full page load...",
          targetUrl: event.detail.targetUrl,
        });
        navigateWithFullReload(event.detail.targetUrl);
      })
      .finally(() => {
        if (successfulNavigationSequence !== navigationSequence) {
          return;
        }
        const main = document.getElementById("main");
        main?.classList.remove("loading");
        main?.removeAttribute("aria-busy");
      });
  });

  document.addEventListener(NAVIGATION_SAME_DOCUMENT_EVENT, (event) => {
    if (fullNavigationPending) {
      return;
    }

    const main = document.getElementById("main");
    main?.classList.remove("loading");
    main?.removeAttribute("aria-busy");
    rememberScrollPosition(event.detail.fromEntryKey);
    restoreScrollPosition(event.detail);
  });

  document.addEventListener(NAVIGATION_ERROR_EVENT, (event) => {
    if (fullNavigationPending) {
      return;
    }

    const failedNavigationSequence = navigationSequence;
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

    window.setTimeout(() => {
      if (!fullNavigationPending && failedNavigationSequence === navigationSequence) {
        navigateWithFullReload(targetUrl);
      }
    }, FULL_RELOAD_DELAY_MS);
  });
}

export function bootstrapRuntime() {
  syncHaloDataFromDocument();
  setPartialNavigationBarrier(Promise.resolve());

  window.Alpine = Alpine;
  Alpine.start();

  initLazyLoading();
  bindGlobalEvents();
  startPartialNavigation();
  initTaskListInteraction();
  initUiActions();
}
