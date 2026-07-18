import Alpine from "./alpine";

import { dispatchRuntimeStatus } from "./runtime-events";
import {
  isPartialNavigationCandidate,
  isSameDocumentUrl,
  resolveNavigationUrl,
  withoutHash,
} from "./navigation-policy";

export const NAVIGATION_START_EVENT = "theme:navigation-start";
export const NAVIGATION_COMPLETE_EVENT = "theme:navigation-complete";
export const NAVIGATION_SUCCESS_EVENT = "theme:navigation-success";
export const NAVIGATION_ERROR_EVENT = "theme:navigation-error";
export const NAVIGATION_SAME_DOCUMENT_EVENT = "theme:navigation-same-document";
export const NAVIGATION_FULL_RELOAD_EVENT = "theme:navigation-full-reload";
export const NAVIGATION_FULL_RELOAD_RESET_EVENT = "theme:navigation-full-reload-reset";

export interface NavigationEventDetail {
  error?: unknown;
  focus: boolean;
  fromEntryKey: string;
  history: boolean;
  targetEntryKey: string;
  targetUrl: string;
  triggerElement?: Element;
}

export interface FullNavigationEventDetail {
  targetUrl: string;
}

interface NavigateOptions {
  focus?: boolean;
  history?: boolean;
  targetEntryKey?: string;
  triggerElement?: Element;
}

const HTML_CONTENT_TYPE = /(?:^|;)\s*text\/html(?:\s*;|$)/i;
const HISTORY_ENTRY_KEY = "themePartialNavigationKey";
const FULL_NAVIGATION_EXIT_SELECTOR = '[data-navigation-exit="full"]';
const THEME_NAVIGATION_STYLE_ATTRIBUTE = "data-theme-navigation-style";
const DEFAULT_PARTIAL_REQUEST_TIMEOUT_MS = 15_000;
const DEFAULT_FULL_NAVIGATION_WATCHDOG_MS = 10_000;

export interface NavigationTimingOptions {
  fullNavigationWatchdogMs: number;
  partialRequestTimeoutMs: number;
}

let navigationController: PartialPageNavigator | null = null;
let pageInitializationBarrier: Promise<void> = Promise.resolve();

declare global {
  interface DocumentEventMap {
    "theme:navigation-complete": CustomEvent<NavigationEventDetail>;
    "theme:navigation-error": CustomEvent<NavigationEventDetail>;
    "theme:navigation-full-reload": CustomEvent<FullNavigationEventDetail>;
    "theme:navigation-full-reload-reset": CustomEvent<FullNavigationEventDetail>;
    "theme:navigation-start": CustomEvent<NavigationEventDetail>;
    "theme:navigation-success": CustomEvent<NavigationEventDetail>;
    "theme:navigation-same-document": CustomEvent<NavigationEventDetail>;
  }
}

function dispatchFullNavigationIntent(target: URL) {
  document.dispatchEvent(
    new CustomEvent<FullNavigationEventDetail>(NAVIGATION_FULL_RELOAD_EVENT, {
      detail: { targetUrl: target.toString() },
    }),
  );
}

function dispatchFullNavigationReset(target: URL) {
  document.dispatchEvent(
    new CustomEvent<FullNavigationEventDetail>(NAVIGATION_FULL_RELOAD_RESET_EVENT, {
      detail: { targetUrl: target.toString() },
    }),
  );
}

function dispatchNavigationEvent(
  type:
    | typeof NAVIGATION_COMPLETE_EVENT
    | typeof NAVIGATION_ERROR_EVENT
    | typeof NAVIGATION_SAME_DOCUMENT_EVENT
    | typeof NAVIGATION_START_EVENT
    | typeof NAVIGATION_SUCCESS_EVENT,
  detail: NavigationEventDetail,
) {
  document.dispatchEvent(new CustomEvent<NavigationEventDetail>(type, { detail }));
}

function createHistoryEntryKey() {
  return window.crypto.randomUUID();
}

function readHistoryState() {
  return typeof window.history.state === "object" && window.history.state !== null ? window.history.state : {};
}

function ensureCurrentHistoryEntryKey() {
  const state = readHistoryState();
  const currentKey = state[HISTORY_ENTRY_KEY];
  if (typeof currentKey === "string" && currentKey) {
    return currentKey;
  }

  const entryKey = createHistoryEntryKey();
  window.history.replaceState({ ...state, [HISTORY_ENTRY_KEY]: entryKey }, "", window.location.href);
  return entryKey;
}

export function shouldBypassPartialNavigation(url: URL) {
  return !isPartialNavigationCandidate(url, new URL(window.location.href));
}

export function resolveSafeNavigationUrl(url: string) {
  return resolveNavigationUrl(url, window.location.href);
}

function reportUnsafeNavigation() {
  dispatchRuntimeStatus({
    level: "error",
    message: "Navigation was blocked because the target URL is invalid or uses an unsupported protocol.",
  });
}

function assignLocation(target: URL) {
  try {
    window.location.assign(target.toString());
    return true;
  } catch {
    dispatchRuntimeStatus({
      level: "error",
      message: "The browser prevented navigation to the requested page.",
    });
    return false;
  }
}

function reloadCurrentLocation(target: URL) {
  try {
    window.location.reload();
    return true;
  } catch {
    return assignLocation(target);
  }
}

export interface NavigationLocationAdapter {
  assign: (target: URL) => boolean;
  reload: (target: URL) => boolean;
}

const browserLocationAdapter: NavigationLocationAdapter = {
  assign: assignLocation,
  reload: reloadCurrentLocation,
};

function currentPageRequiresFullNavigationExit() {
  return document.getElementById("main")?.querySelector(FULL_NAVIGATION_EXIT_SELECTOR) !== null;
}

function isPageMetadataElement(element: Element) {
  const tagName = element.tagName.toLowerCase();
  if (tagName === "title") {
    return true;
  }

  if (tagName === "meta") {
    const name = element.getAttribute("name")?.trim().toLowerCase() ?? "";
    const property = element.getAttribute("property")?.trim().toLowerCase() ?? "";
    return (
      ["author", "description", "keywords", "robots"].includes(name) ||
      name.startsWith("twitter:") ||
      property.startsWith("article:") ||
      property.startsWith("og:")
    );
  }

  if (tagName === "link") {
    const rel = new Set((element.getAttribute("rel") ?? "").toLowerCase().split(/\s+/).filter(Boolean));
    return ["alternate", "canonical", "next", "prev"].some((value) => rel.has(value));
  }

  return tagName === "script" && element.getAttribute("type")?.trim().toLowerCase() === "application/ld+json";
}

function normalizeHeadElementSignature(element: Element, baseUrl: URL) {
  const clone = element.cloneNode(true) as Element;
  clone.removeAttribute("nonce");

  for (const attribute of ["href", "src"]) {
    const value = clone.getAttribute(attribute)?.trim();
    if (!value) {
      continue;
    }

    try {
      clone.setAttribute(attribute, new URL(value, baseUrl).toString());
    } catch {
      // Preserve malformed values so they cannot compare equal to a different
      // valid resource contract.
    }
  }

  return clone.outerHTML;
}

function isInertInlineStyleElement(element: Element) {
  return element.tagName.toLowerCase() === "style" && !element.hasAttribute(THEME_NAVIGATION_STYLE_ATTRIBUTE);
}

export function getHeadNavigationContractSignatures(root: Document, baseUrl: URL) {
  return Array.from(root.head?.children ?? [])
    .filter((element) => !isPageMetadataElement(element) && !isInertInlineStyleElement(element))
    .map((element) => normalizeHeadElementSignature(element, baseUrl));
}

export function headNavigationContractChanged(nextDocument: Document, nextUrl: URL) {
  const currentSignatures = getHeadNavigationContractSignatures(document, new URL(window.location.href));
  const nextSignatures = getHeadNavigationContractSignatures(nextDocument, nextUrl);
  return (
    currentSignatures.length !== nextSignatures.length ||
    currentSignatures.some((signature, index) => signature !== nextSignatures[index])
  );
}

export function syncPageMetadata(nextDocument: Document) {
  Array.from(document.head.children)
    .filter((element) => element.tagName.toLowerCase() !== "title" && isPageMetadataElement(element))
    .forEach((element) => element.remove());

  Array.from(nextDocument.head?.children ?? [])
    .filter((element) => element.tagName.toLowerCase() !== "title" && isPageMetadataElement(element))
    .forEach((element) => document.head.appendChild(document.importNode(element, true)));

  const nextLanguage = nextDocument.documentElement.getAttribute("lang");
  if (nextLanguage) {
    document.documentElement.setAttribute("lang", nextLanguage);
  } else {
    document.documentElement.removeAttribute("lang");
  }

  const nextDirection = nextDocument.documentElement.getAttribute("dir");
  if (nextDirection) {
    document.documentElement.setAttribute("dir", nextDirection);
  } else {
    document.documentElement.removeAttribute("dir");
  }
}

async function waitForPageInitialization() {
  await pageInitializationBarrier;
}

export function setPartialNavigationBarrier(barrier: Promise<void>) {
  pageInitializationBarrier = barrier;
}

function getAnchorFromClick(event: MouseEvent) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return null;
  }

  const target = event.target;
  if (!(target instanceof Element)) {
    return null;
  }

  const anchor = target.closest<HTMLAnchorElement>("a[href]");
  return anchor;
}

export class PartialPageNavigator {
  private abortController: AbortController | null = null;
  private activeNavigation = 0;
  private activeNavigationDetail: NavigationEventDetail | null = null;
  private currentDocumentUrl = withoutHash(new URL(window.location.href));
  private currentEntryKey = ensureCurrentHistoryEntryKey();
  private fullNavigationWatchdogId: number | null = null;
  private fullNavigationPending = false;
  private started = false;
  private readonly timings: NavigationTimingOptions;

  constructor(
    private readonly locationAdapter: NavigationLocationAdapter = browserLocationAdapter,
    timings: Partial<NavigationTimingOptions> = {},
  ) {
    this.timings = {
      fullNavigationWatchdogMs: timings.fullNavigationWatchdogMs ?? DEFAULT_FULL_NAVIGATION_WATCHDOG_MS,
      partialRequestTimeoutMs: timings.partialRequestTimeoutMs ?? DEFAULT_PARTIAL_REQUEST_TIMEOUT_MS,
    };
  }

  private readonly handleClick = (event: MouseEvent) => {
    const anchor = getAnchorFromClick(event);
    if (!anchor) {
      return;
    }

    const target = resolveSafeNavigationUrl(anchor.href);
    if (!target) {
      event.preventDefault();
      reportUnsafeNavigation();
      return;
    }

    const sameDocumentTarget = isSameDocumentUrl(target, new URL(window.location.href));

    const linkTarget = anchor.getAttribute("target");
    if (anchor.hasAttribute("download") || (linkTarget && linkTarget.toLowerCase() !== "_self")) {
      return;
    }

    if (
      anchor.dataset.navigation === "full" ||
      anchor.dataset.pjax === "false" ||
      anchor.relList.contains("external") ||
      (currentPageRequiresFullNavigationExit() && !sameDocumentTarget) ||
      shouldBypassPartialNavigation(target)
    ) {
      if (target.origin !== window.location.origin || !["http:", "https:"].includes(target.protocol)) {
        return;
      }

      if (["http:", "https:"].includes(target.protocol)) {
        event.preventDefault();
        this.navigateFully(target);
      }
      return;
    }

    if (sameDocumentTarget) {
      event.preventDefault();
      this.navigateWithinDocument(target, { focus: event.detail === 0, triggerElement: anchor });
      return;
    }

    event.preventDefault();
    void this.load(target, { focus: event.detail === 0, triggerElement: anchor });
  };

  private readonly handlePopState = () => {
    const target = resolveSafeNavigationUrl(window.location.href);
    if (!target || shouldBypassPartialNavigation(target)) {
      return;
    }

    const targetEntryKey = ensureCurrentHistoryEntryKey();
    const sameDocumentTarget = withoutHash(target) === this.currentDocumentUrl;
    if (currentPageRequiresFullNavigationExit() && !sameDocumentTarget) {
      this.navigateFully(target, true);
      return;
    }
    if (sameDocumentTarget) {
      if (this.abortController) {
        void this.load(target, { history: true, targetEntryKey });
      } else {
        this.navigateWithinDocument(target, { focus: true, history: true, targetEntryKey });
      }
      return;
    }

    void this.load(target, { focus: true, history: true, targetEntryKey });
  };

  private readonly handlePageHide = () => {
    this.clearFullNavigationWatchdog();
  };

  private readonly handlePageShow = (event: PageTransitionEvent) => {
    if (event.persisted) {
      this.resetFullNavigation();
    }
  };

  start() {
    if (this.started) {
      return;
    }

    this.started = true;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    document.addEventListener("click", this.handleClick);
    window.addEventListener("popstate", this.handlePopState);
    window.addEventListener("pagehide", this.handlePageHide);
    window.addEventListener("pageshow", this.handlePageShow);
  }

  stop() {
    if (!this.started) {
      return;
    }

    this.cancelActiveNavigation();
    this.started = false;
    document.removeEventListener("click", this.handleClick);
    window.removeEventListener("popstate", this.handlePopState);
    window.removeEventListener("pagehide", this.handlePageHide);
    window.removeEventListener("pageshow", this.handlePageShow);
    this.clearFullNavigationWatchdog();
  }

  isFullNavigationPending() {
    return this.fullNavigationPending;
  }

  navigate(target: URL, options: NavigateOptions = {}) {
    if (this.fullNavigationPending) {
      return;
    }

    if (isSameDocumentUrl(target, new URL(window.location.href))) {
      this.navigateWithinDocument(target, options);
      return;
    }

    void this.load(target, options);
  }

  prepareForFullNavigation(target: URL) {
    if (this.fullNavigationPending) {
      return;
    }

    this.fullNavigationPending = true;
    this.cancelActiveNavigation();
    dispatchFullNavigationIntent(target);
  }

  navigateFully(target: URL, reload = false) {
    if (this.fullNavigationPending) {
      return true;
    }

    this.prepareForFullNavigation(target);
    const navigationStarted = reload ? this.locationAdapter.reload(target) : this.locationAdapter.assign(target);
    if (!navigationStarted) {
      this.resetFullNavigation();
    } else {
      this.scheduleFullNavigationWatchdog();
    }
    return navigationStarted;
  }

  private clearFullNavigationWatchdog() {
    if (this.fullNavigationWatchdogId !== null) {
      window.clearTimeout(this.fullNavigationWatchdogId);
      this.fullNavigationWatchdogId = null;
    }
  }

  private scheduleFullNavigationWatchdog() {
    this.clearFullNavigationWatchdog();
    this.fullNavigationWatchdogId = window.setTimeout(() => {
      this.fullNavigationWatchdogId = null;
      if (!this.fullNavigationPending) {
        return;
      }

      this.resetFullNavigation();
      dispatchRuntimeStatus({
        level: "error",
        message: "Full navigation was cancelled or did not start. The current page is ready again.",
      });
    }, this.timings.fullNavigationWatchdogMs);
  }

  private resetFullNavigation() {
    if (!this.fullNavigationPending) {
      return;
    }

    this.clearFullNavigationWatchdog();
    this.fullNavigationPending = false;
    this.currentDocumentUrl = withoutHash(new URL(window.location.href));
    this.currentEntryKey = ensureCurrentHistoryEntryKey();
    dispatchFullNavigationReset(new URL(window.location.href));
  }

  private cancelActiveNavigation() {
    if (!this.abortController) {
      return;
    }

    const cancelledDetail = this.activeNavigationDetail;
    this.abortController.abort();
    this.abortController = null;
    this.activeNavigation += 1;
    this.activeNavigationDetail = null;

    if (cancelledDetail) {
      dispatchNavigationEvent(NAVIGATION_COMPLETE_EVENT, cancelledDetail);
    }
  }

  private navigateWithinDocument(target: URL, options: NavigateOptions) {
    if (this.fullNavigationPending) {
      return;
    }

    this.cancelActiveNavigation();
    const fromEntryKey = this.currentEntryKey;
    const historyNavigation = options.history === true;
    let targetEntryKey = options.targetEntryKey;

    if (!targetEntryKey) {
      targetEntryKey = target.href === window.location.href ? fromEntryKey : createHistoryEntryKey();
    }

    if (!historyNavigation && target.href !== window.location.href) {
      window.history.pushState({ ...readHistoryState(), [HISTORY_ENTRY_KEY]: targetEntryKey }, "", target);
    }

    this.currentDocumentUrl = withoutHash(target);
    this.currentEntryKey = targetEntryKey;
    dispatchNavigationEvent(NAVIGATION_SAME_DOCUMENT_EVENT, {
      focus: options.focus === true || historyNavigation,
      fromEntryKey,
      history: historyNavigation,
      targetEntryKey,
      targetUrl: target.toString(),
      ...(options.triggerElement ? { triggerElement: options.triggerElement } : {}),
    });
  }

  private async load(target: URL, options: NavigateOptions) {
    if (this.fullNavigationPending) {
      return;
    }

    this.cancelActiveNavigation();
    const controller = new AbortController();
    this.abortController = controller;
    const navigationId = ++this.activeNavigation;
    const historyNavigation = options.history === true;
    const fromEntryKey = this.currentEntryKey;
    const targetEntryKey = options.targetEntryKey ?? createHistoryEntryKey();
    const initialDetail: NavigationEventDetail = {
      focus: options.focus === true || historyNavigation,
      fromEntryKey,
      history: historyNavigation,
      targetEntryKey,
      targetUrl: target.toString(),
      ...(options.triggerElement ? { triggerElement: options.triggerElement } : {}),
    };
    this.activeNavigationDetail = initialDetail;

    dispatchNavigationEvent(NAVIGATION_START_EVENT, initialDetail);

    let requestTimedOut = false;
    const requestTimeoutId = window.setTimeout(() => {
      requestTimedOut = true;
      controller.abort();
    }, this.timings.partialRequestTimeoutMs);

    try {
      const requestUrl = new URL(target);
      requestUrl.hash = "";
      const response = await fetch(requestUrl, {
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          Accept: "text/html,application/xhtml+xml",
          "X-Requested-With": "ThemePartialNavigation",
        },
        redirect: "follow",
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Navigation request returned HTTP ${response.status}.`);
      }

      const contentType = response.headers.get("content-type") ?? "";
      if (!HTML_CONTENT_TYPE.test(contentType)) {
        throw new Error(`Navigation request returned unsupported content type: ${contentType || "unknown"}.`);
      }

      const finalTarget = new URL(response.url || target.toString(), window.location.href);
      finalTarget.hash = target.hash;
      if (shouldBypassPartialNavigation(finalTarget)) {
        throw new Error("Navigation response redirected outside the theme's partial-navigation scope.");
      }

      const markup = await response.text();
      window.clearTimeout(requestTimeoutId);
      if (this.fullNavigationPending || navigationId !== this.activeNavigation) {
        return;
      }

      const parsedDocument = new DOMParser().parseFromString(markup, "text/html");
      const nextMain = parsedDocument.getElementById("main");
      const currentMain = document.getElementById("main");
      const nextTitle = parsedDocument.querySelector("title")?.textContent?.trim();

      if (!nextMain || !currentMain || !nextTitle) {
        throw new Error("Navigation response does not contain the required title and #main theme shell.");
      }

      // Executable scripts, external resources, and extension-owned head nodes
      // may own a page lifetime that cannot be safely disposed by replacing
      // #main. The theme-owned declarative style is part of the contract.
      // Unmarked styles are extension/runtime output whose owning scripts are
      // already compared; comparing generated styles with an unexecuted
      // response would incorrectly disable partial navigation.
      if (headNavigationContractChanged(parsedDocument, finalTarget)) {
        const navigationStarted = this.navigateFully(finalTarget, finalTarget.href === window.location.href);
        if (!navigationStarted) {
          throw new Error("The browser prevented the required full navigation for the page head contract.");
        }
        return;
      }

      await waitForPageInitialization();
      if (this.fullNavigationPending || controller.signal.aborted || navigationId !== this.activeNavigation) {
        return;
      }

      Alpine.mutateDom(() => {
        Alpine.destroyTree(currentMain);
        const importedMain = document.importNode(nextMain, true);
        importedMain.classList.add("loading");
        importedMain.setAttribute("aria-busy", "true");
        currentMain.replaceWith(importedMain);
      });
      document.title = nextTitle;
      syncPageMetadata(parsedDocument);

      const historyState = {
        ...readHistoryState(),
        [HISTORY_ENTRY_KEY]: targetEntryKey,
        themePartialNavigation: true,
      };
      if (historyNavigation) {
        if (finalTarget.href !== window.location.href) {
          window.history.replaceState(historyState, "", finalTarget);
        }
      } else {
        window.history.pushState(historyState, "", finalTarget);
      }

      this.currentDocumentUrl = withoutHash(finalTarget);
      this.currentEntryKey = targetEntryKey;
      dispatchNavigationEvent(NAVIGATION_SUCCESS_EVENT, {
        ...initialDetail,
        targetUrl: finalTarget.toString(),
      });
    } catch (error) {
      if (
        this.fullNavigationPending ||
        navigationId !== this.activeNavigation ||
        (controller.signal.aborted && !requestTimedOut)
      ) {
        return;
      }

      dispatchNavigationEvent(NAVIGATION_ERROR_EVENT, {
        ...initialDetail,
        error: requestTimedOut
          ? new Error(`Navigation request timed out after ${this.timings.partialRequestTimeoutMs} ms.`)
          : error,
      });
    } finally {
      window.clearTimeout(requestTimeoutId);
      if (navigationId === this.activeNavigation) {
        this.abortController = null;
        this.activeNavigationDetail = null;
        dispatchNavigationEvent(NAVIGATION_COMPLETE_EVENT, initialDetail);
      }
    }
  }
}

export function startPartialNavigation() {
  if (!navigationController) {
    navigationController = new PartialPageNavigator();
  }

  navigationController.start();
}

export function navigateWithFullReload(url: string) {
  const target = resolveSafeNavigationUrl(url);
  if (!target) {
    reportUnsafeNavigation();
    return false;
  }

  if (["http:", "https:"].includes(target.protocol)) {
    if (navigationController) {
      return navigationController.navigateFully(target);
    }

    dispatchFullNavigationIntent(target);
    const navigationStarted = assignLocation(target);
    if (!navigationStarted) {
      dispatchFullNavigationReset(new URL(window.location.href));
    }
    return navigationStarted;
  }

  return assignLocation(target);
}

export function navigateToUrl(url: string) {
  const target = resolveSafeNavigationUrl(url);
  if (!target) {
    reportUnsafeNavigation();
    return false;
  }

  if (
    shouldBypassPartialNavigation(target) ||
    (currentPageRequiresFullNavigationExit() && !isSameDocumentUrl(target, new URL(window.location.href))) ||
    !navigationController
  ) {
    return ["http:", "https:"].includes(target.protocol)
      ? navigateWithFullReload(target.toString())
      : assignLocation(target);
  }

  navigationController.navigate(target, { focus: true });
  return true;
}
