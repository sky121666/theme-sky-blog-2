import Swup, { Location as SwupLocation, updateHistoryRecord, type Visit } from "swup";
import Alpine from "./alpine";
import { findReusedContactFormLoader } from "./contact-form-navigation";
import { findUnusedLightGalleryResources } from "./lightgallery-navigation";
import { logWarn } from "./logger";
import { loadMusicCardAssets, planMusicCardNavigation } from "./music-card-navigation";
import { readPageDataFromDocument } from "./page-data";
import {
  findPostComments,
  findPostTracker,
  HALO_TRACKER_SELECTOR,
  POST_COMMENT_SECTION_SELECTOR,
  type PostComments,
  type PostVisit,
} from "./post-navigation";
import type { HaloPageDataPayload } from "./types";

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
  pageData?: Partial<HaloPageDataPayload>;
  postComments?: PostComments;
  postVisit?: PostVisit;
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
export const THEME_SOURCE_HISTORY_DEPTH_KEY = "themeSourceHistoryDepth";
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

// Swup indexes cross-page visits. The theme also pushes same-document hash entries.
function historyPosition(state: Record<string, unknown>) {
  const position = state.themeHistoryPosition ?? state.index;
  return typeof position === "number" && Number.isSafeInteger(position) ? position : undefined;
}

function readSourceHistoryDepth(state: Record<string, unknown>) {
  const depth = state[THEME_SOURCE_HISTORY_DEPTH_KEY];
  if (Number.isSafeInteger(depth) && typeof depth === "number" && depth > 0) {
    return depth;
  }

  const previousUrl = typeof state.themePreviousUrl === "string" ? state.themePreviousUrl : document.referrer;
  try {
    const source = new URL(previousUrl);
    if (window.history.length > 1 && source.origin === window.location.origin && source.href !== window.location.href) {
      return 1;
    }
  } catch {
    // Direct entries have no same-origin source to track.
  }

  return null;
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

function resolveProgrammaticNavigationUrl(url: string, current = new URL(window.location.href)) {
  const target = resolveNavigationUrl(url, current);
  const previewTheme = current.searchParams.get("preview-theme");

  if (target?.origin === current.origin && previewTheme !== null && !target.searchParams.has("preview-theme")) {
    target.searchParams.set("preview-theme", previewTheme);
  }

  return target;
}

function isPrimaryClick(event: MouseEvent) {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.metaKey &&
    !event.altKey
  );
}

function reportUnsafeNavigation() {
  dispatchRuntimeStatus({
    level: "error",
    message: "Navigation was blocked because the target URL is invalid or uses an unsupported protocol.",
  });
}

function assignLocation(target: URL, replaceCurrentEntry = false) {
  try {
    if (replaceCurrentEntry) window.location.replace(target.href);
    else window.location.assign(target.href);
    return true;
  } catch {
    dispatchRuntimeStatus({
      level: "error",
      message: "The browser prevented navigation to the requested page.",
    });
    return false;
  }
}

export interface NavigationLocationAdapter {
  assign: (target: URL, replaceCurrentEntry?: boolean) => boolean;
  reload: (target: URL) => boolean;
}

const browserLocationAdapter: NavigationLocationAdapter = {
  assign: assignLocation,
  reload: () => {
    window.location.reload();
    return true;
  },
};

function currentPageRequiresFullNavigationExit() {
  // Halo's counter binds the current resource to its History API listeners.
  // Leaving this document through swup would attribute the next URL to the old post.
  return Boolean(
    document.head.querySelector(HALO_TRACKER_SELECTOR) ||
    document.getElementById("main")?.querySelector(FULL_NAVIGATION_EXIT_SELECTOR),
  );
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

export function getHeadNavigationContractSignatures(root: Document, baseUrl: URL, ignored: readonly Element[] = []) {
  return Array.from(root.head?.children ?? [])
    .filter(
      (element) => !ignored.includes(element) && !isPageMetadataElement(element) && !isInertInlineStyleElement(element),
    )
    .map((element) => normalizeHeadElementSignature(element, baseUrl));
}

export function headNavigationContractChanged(
  nextDocument: Document,
  nextUrl: URL,
  currentUrl = new URL(window.location.href),
  ignored = { current: [] as Element[], next: [] as Element[] },
) {
  const runtimeLoader = findReusedContactFormLoader(document.head, nextDocument.head, currentUrl.origin);
  const ignoredCurrent = runtimeLoader ? [...ignored.current, runtimeLoader] : ignored.current;
  const currentSignatures = getHeadNavigationContractSignatures(document, currentUrl, ignoredCurrent);
  const nextSignatures = getHeadNavigationContractSignatures(nextDocument, nextUrl, ignored.next);
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

export function setPartialNavigationBarrier(barrier: Promise<void>) {
  pageInitializationBarrier = barrier;
}

/** The browser owns full loads. Swup owns cross-page visits; the theme owns in-page anchors and Halo components. */
export class PartialPageNavigator {
  private client?: Swup;
  private originalScrollRestoration?: ScrollRestoration;
  private queuedNavigation?: () => void;
  private navigationTimer?: number;
  private renderingVisit?: Visit;
  private displayedUrl = new URL(window.location.href);
  private currentEntryKey = ensureCurrentHistoryEntryKey();
  private displayedState = readHistoryState();
  private provisionalEntryKey?: string;
  private selectedByPopstate = false;
  private historyReturn?: { timer: number; target?: URL };
  private restoredPopstate?: PopStateEvent;
  private active?: { visit: Visit; detail: NavigationEventDetail; controller: AbortController };
  private fullNavigationWatchdogId: number | null = null;
  private fullNavigationPending = false;

  constructor(
    private readonly locationAdapter: NavigationLocationAdapter = browserLocationAdapter,
    private readonly timings: Partial<NavigationTimingOptions> = {},
  ) {}

  private readonly blockUnsafeClick = (event: MouseEvent) => {
    if (!isPrimaryClick(event)) return;
    const anchor = event.target instanceof Element && event.target.closest<HTMLAnchorElement>("a[href]");
    if (anchor && !resolveSafeNavigationUrl(anchor.href)) {
      event.preventDefault();
      reportUnsafeNavigation();
    }
  };

  private linkTarget(el: Element) {
    const href = el.getAttribute("href")!;
    const base = document.head.querySelector("base[href]")?.getAttribute("href");
    const destination = new URL(href, base ? new URL(base, this.displayedUrl) : this.displayedUrl);
    return resolveProgrammaticNavigationUrl(destination.href, this.displayedUrl)!;
  }

  private ignoreVisit(el?: Element, event?: Event) {
    if (!el || !(event instanceof MouseEvent)) return false;
    const browsingContext = el.getAttribute("target")?.toLowerCase();
    if (!isPrimaryClick(event) || (browsingContext && browsingContext !== "_self")) return true;
    // Swup puts the destination in the address bar while its request is still pending.
    const target = this.linkTarget(el);
    if (withoutHash(target) === withoutHash(this.displayedUrl)) {
      event.preventDefault();
      this.navigateWithinDocument(target, { focus: event.detail === 0, triggerElement: el });
      return true;
    }
    if (
      this.fullNavigationPending ||
      shouldBypassPartialNavigation(target) ||
      currentPageRequiresFullNavigationExit() ||
      el.closest('[data-no-swup], [data-pjax="false"], [data-navigation="full"], [rel~="external"]')
    ) {
      event.preventDefault();
      this.navigateFully(target);
      return true;
    }
    if (this.active && isSameDocumentUrl(target, new URL(this.active.detail.targetUrl))) {
      // Swup deduplicates by path. Keep the most recently chosen section of that path.
      event.preventDefault();
      this.active.visit.to.hash = target.hash;
      this.active.detail.targetUrl = target.href;
      return true;
    }
    return false;
  }

  private readonly handlePageHide = () => {
    if (this.historyReturn) {
      this.clearHistoryReturn();
      this.cancelQueuedNavigation();
    }
    this.clearFullNavigationWatchdog();
  };

  private readonly handlePageShow = (event: PageTransitionEvent) => {
    if (event.persisted) {
      this.provisionalEntryKey = undefined;
      this.displayedUrl = new URL(window.location.href);
      this.currentEntryKey = ensureCurrentHistoryEntryKey();
      this.displayedState = readHistoryState();
      if (this.client) this.client.location = SwupLocation.fromUrl(this.displayedUrl.href);
      this.resetFullNavigation();
    }
  };

  start() {
    if (this.client) return;
    document.addEventListener("click", this.blockUnsafeClick, true);
    window.addEventListener("pagehide", this.handlePageHide);
    window.addEventListener("pageshow", this.handlePageShow);
    this.originalScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    // The constructor enables swup asynchronously. Establish its initial record
    // synchronously so a denied History API falls back before listeners are installed.
    const state = readHistoryState();
    if (state.source !== "swup") updateHistoryRecord(null, { index: state.index ?? 1 });
    const client = new Swup({
      containers: ["#main"],
      cache: false,
      animationSelector: false,
      timeout: 0, // The theme times the complete response, including its body.
      ignoreVisit: (_url, { el, event }) => this.ignoreVisit(el, event),
      skipPopStateHandling: (event) => {
        this.provisionalEntryKey = undefined;
        if (this.historyReturn) {
          const restored = readHistoryState()[HISTORY_ENTRY_KEY] === this.currentEntryKey;
          this.clearHistoryReturn();
          this.finishFullNavigationReset();
          if (restored) {
            this.selectedByPopstate = false;
            // Let swup adopt this entry's index, but do not reload the visible document.
            this.restoredPopstate = event;
            if (this.queuedNavigation) this.scheduleQueuedNavigation();
            return false;
          }
        }
        this.cancelQueuedNavigation();
        if (this.fullNavigationPending) return true;
        const target = new URL(window.location.href);
        if (withoutHash(target) === withoutHash(this.displayedUrl)) {
          this.selectedByPopstate = false;
          this.navigateWithinDocument(target, { history: true, targetEntryKey: ensureCurrentHistoryEntryKey() });
          return true;
        }
        this.selectedByPopstate = true;
        if (currentPageRequiresFullNavigationExit() || shouldBypassPartialNavigation(target)) {
          this.navigateFully(target);
          return true;
        }
        return false;
      },
    });
    this.client = client;
    this.displayedState = readHistoryState();
    client.hooks.replace("link:click", (_visit, { el, event }) => {
      event.preventDefault();
      const target = this.linkTarget(el);
      this.navigate(target, { focus: event.detail === 0, triggerElement: el });
    });
    client.hooks.replace("history:popstate", (visit, args, traverse) => {
      if (args.event === this.restoredPopstate) {
        this.restoredPopstate = undefined;
        client.location = SwupLocation.fromUrl(this.displayedUrl.href);
        return;
      }
      const run = () => traverse!(visit, args);
      if (this.renderingVisit) this.queueNavigation(run);
      else run();
    });
    client.hooks.on("visit:start", (visit) => {
      visit.animation.animate = false;
      if (
        !visit.history.popstate &&
        !this.selectedByPopstate &&
        !isSameDocumentUrl(new URL(window.location.href), this.displayedUrl)
      ) {
        // Reuse only an uncommitted entry pushed on top of the visible source.
        visit.history.action = "replace";
      }
      const detail = {
        focus:
          typeof visit.meta.focus === "boolean"
            ? visit.meta.focus
            : visit.history.popstate || !visit.trigger.event || (visit.trigger.event as MouseEvent).detail === 0,
        history: visit.history.popstate,
        fromEntryKey: this.currentEntryKey,
        targetEntryKey: visit.history.popstate ? ensureCurrentHistoryEntryKey() : createHistoryEntryKey(),
        targetUrl: new URL(visit.to.url + visit.to.hash, this.displayedUrl).href,
        triggerElement: visit.trigger.el,
      };
      this.active = { visit, detail, controller: new AbortController() };
      dispatchNavigationEvent(NAVIGATION_START_EVENT, detail);
    });
    client.hooks.on("visit:abort", (visit) => {
      if (this.active?.visit === visit) this.cancelActiveNavigation();
    });
    client.hooks.replace("fetch:request", async (visit, { url, options }) => {
      const response = await fetch(new URL(url, this.displayedUrl).href, {
        ...options,
        signal: this.active?.controller.signal,
        cache: "no-cache",
      });
      if (!response.ok) throw new Error(`Navigation request returned HTTP ${response.status}.`);
      const contentType = response.headers.get("content-type") ?? "";
      if (!HTML_CONTENT_TYPE.test(contentType))
        throw new Error(`Navigation request returned unsupported content type: ${contentType || "unknown"}.`);
      const target = new URL(response.url || visit.to.url, this.displayedUrl);
      if (shouldBypassPartialNavigation(target))
        throw new Error("Navigation response redirected outside the theme's partial-navigation scope.");
      return response;
    });
    // Deliver load errors at content:replace. In 4.10 the parallel HTML parser also
    // observes page:load without a rejection handler, even when visit:fail handles it.
    client.hooks.replace("page:load", async (visit, args, load) => {
      const active = this.active!;
      // Swup has updated the address by this hook. A full reload can refer
      // to itself, so preserve the actual source before validation.
      if (!visit.history.popstate) {
        const state = readHistoryState();
        const entryKey = state[HISTORY_ENTRY_KEY];
        // Swup pushes a fresh state without the theme key. When a later visit
        // reuses that slot, its state retains the provisional key until stamped below.
        const isNewEntry = visit.history.action === "push" && state.source === "swup" && entryKey === undefined;
        const reusesProvisionalEntry = typeof entryKey === "string" && entryKey === this.provisionalEntryKey;
        window.history.replaceState(
          {
            ...state,
            [HISTORY_ENTRY_KEY]: active.detail.targetEntryKey,
            themeHistoryPosition: (historyPosition(this.displayedState) ?? 0) + 1,
            themePreviousUrl: this.displayedUrl.href,
            [THEME_SOURCE_HISTORY_DEPTH_KEY]: 1,
          },
          "",
        );
        this.provisionalEntryKey = isNewEntry || reusesProvisionalEntry ? active.detail.targetEntryKey : undefined;
      }
      const timeoutMs = this.timings.partialRequestTimeoutMs ?? DEFAULT_PARTIAL_REQUEST_TIMEOUT_MS;
      const timer = window.setTimeout(() => {
        active.controller.abort(new Error(`Navigation request timed out after ${timeoutMs} ms.`));
      }, timeoutMs);
      try {
        const page = await load!(visit, args);
        active.controller.signal.throwIfAborted();
        window.clearTimeout(timer);
        // Wait before swup enters the render phase, so a newer visit can still abort this one.
        await pageInitializationBarrier;
        if (this.active?.visit === visit) return page;
      } catch (error) {
        visit.meta.loadError = active.controller.signal.reason ?? error;
      } finally {
        window.clearTimeout(timer);
      }
      return {
        // For a superseded response use the address the browser has selected.
        // Returning the displayed URL here would redirect over an in-flight Back entry.
        url: this.active?.visit === visit ? visit.to.url : window.location.pathname + window.location.search,
        html: "",
      };
    });
    client.hooks.replace("content:replace", async (visit) => {
      if (this.active?.visit !== visit) return;
      if (visit.meta.loadError) throw visit.meta.loadError;
      this.renderingVisit = visit;
      const parsedDocument = visit.to.document!;
      const nextMain = parsedDocument.getElementById("main");
      const main = document.getElementById("main");
      const title = parsedDocument.title.trim();
      if (!title || !main || !nextMain)
        throw new Error("Navigation response does not contain the required title and #main theme shell.");
      const pageData = readPageDataFromDocument(nextMain);
      if (!pageData?.pageType) throw new Error("Missing Halo page data.");
      const finalTarget = new URL(visit.to.url, this.displayedUrl);
      finalTarget.hash = visit.to.hash || new URL(this.active.detail.targetUrl).hash;
      const postName = pageData.pageType === "post" ? pageData.currentPost?.name : null;
      const tracker = postName ? findPostTracker(parsedDocument.head, finalTarget, postName) : null;
      const commentSection =
        pageData.pageType === "post" ? nextMain.querySelector(POST_COMMENT_SECTION_SELECTOR) : null;
      const comments = commentSection && postName ? findPostComments(commentSection, finalTarget, postName) : null;
      const cards = planMusicCardNavigation(parsedDocument.head, this.displayedUrl, finalTarget, pageData.pageType);
      const ignoredHead = tracker
        ? [...cards.ignoreNext, tracker.script, ...findUnusedLightGalleryResources(parsedDocument, finalTarget)]
        : cards.ignoreNext;
      if (
        (commentSection && !comments) ||
        headNavigationContractChanged(parsedDocument, finalTarget, this.displayedUrl, {
          current: cards.ignoreCurrent,
          next: ignoredHead,
        })
      ) {
        this.navigateFully(finalTarget);
        return;
      }
      const detail = this.active.detail;
      detail.pageData = pageData;
      detail.postVisit = tracker?.visit;
      if (comments && commentSection) {
        comments.script.remove();
        commentSection.removeAttribute("data-navigation-exit");
        detail.postComments = comments.options;
      }
      if (cards.toLoad) loadMusicCardAssets(cards.toLoad);
      const historyState = {
        ...readHistoryState(),
        url: finalTarget.pathname + finalTarget.search + finalTarget.hash,
        [HISTORY_ENTRY_KEY]: detail.targetEntryKey,
      };
      window.history.replaceState(historyState, "", finalTarget);
      this.provisionalEntryKey = undefined;
      this.selectedByPopstate = false;
      this.displayedState = historyState;
      this.displayedUrl = finalTarget;
      this.currentEntryKey = detail.targetEntryKey;
      detail.targetUrl = finalTarget.href;
      Alpine.mutateDom(() => {
        Alpine.destroyTree(main);
        client.replaceContent(visit);
      });
      document.title = title;
      syncPageMetadata(parsedDocument);
      const replaced = document.getElementById("main")!;
      replaced.setAttribute("aria-busy", "true");
      replaced.classList.add("loading");
      dispatchNavigationEvent(NAVIGATION_SUCCESS_EVENT, detail);
      await pageInitializationBarrier;
    });
    // runtime.ts restores the theme's inner scroll pane after plugins are ready.
    client.hooks.replace("content:scroll", () => true);
    client.hooks.on("visit:end", (visit) => {
      this.finishVisit(visit);
      this.finishRendering(visit);
    });
    client.hooks.replace("visit:fail", (visit, { error }) => {
      this.finishRendering(visit);
      if (this.active?.visit !== visit) return;
      dispatchNavigationEvent(NAVIGATION_ERROR_EVENT, { ...this.active.detail, error });
      this.finishVisit(visit);
    });
  }

  private finishRendering(visit: Visit) {
    if (this.renderingVisit === visit) {
      this.renderingVisit = undefined;
      if (this.queuedNavigation) this.scheduleQueuedNavigation();
    }
  }

  private finishVisit(visit: Visit) {
    if (this.active?.visit !== visit) return;
    const { detail } = this.active;
    this.active = undefined;
    dispatchNavigationEvent(NAVIGATION_COMPLETE_EVENT, detail);
  }

  stop() {
    if (this.historyReturn) {
      this.clearHistoryReturn();
      this.fullNavigationPending = false;
    }
    this.cancelQueuedNavigation();
    this.cancelActiveNavigation();
    if (this.originalScrollRestoration) window.history.scrollRestoration = this.originalScrollRestoration;
    void this.client?.destroy();
    this.client = undefined;
    document.removeEventListener("click", this.blockUnsafeClick, true);
    window.removeEventListener("pagehide", this.handlePageHide);
    window.removeEventListener("pageshow", this.handlePageShow);
    this.clearFullNavigationWatchdog();
  }

  get currentPageUrl() {
    return this.displayedUrl;
  }

  hasQueuedNavigation() {
    return this.queuedNavigation !== undefined;
  }

  isFullNavigationPending() {
    return this.fullNavigationPending;
  }

  navigate(target: URL, options: NavigateOptions = {}) {
    if (this.fullNavigationPending) {
      return;
    }

    if (isSameDocumentUrl(target, this.displayedUrl)) {
      this.navigateWithinDocument(target, options);
      return;
    }

    this.start();
    this.queueFromDisplayedEntry(target, () => {
      this.client!.navigate(
        target.href,
        { animate: false, meta: { focus: options.focus } },
        { el: options.triggerElement },
      );
    });
  }

  prepareForFullNavigation(target: URL) {
    if (this.fullNavigationPending) {
      return;
    }

    this.clearHistoryReturn();
    this.cancelQueuedNavigation();
    this.fullNavigationPending = true;
    this.cancelActiveNavigation();
    dispatchFullNavigationIntent(target);
  }

  navigateFully(target: URL) {
    if (this.fullNavigationPending) {
      return true;
    }

    this.prepareForFullNavigation(target);
    const navigationStarted = this.loadFullNavigationTarget(target);
    if (!navigationStarted) {
      this.resetFullNavigation();
    } else {
      this.scheduleFullNavigationWatchdog();
    }
    return navigationStarted;
  }

  private loadFullNavigationTarget(target: URL) {
    const address = window.location.href;
    if (target.href.split("#", 1)[0] !== address.split("#", 1)[0]) {
      // A new full load supersedes this unrendered push. Leaving it behind
      // would send Back to the cancelled destination instead of the visible source.
      const replaceCurrentEntry =
        this.provisionalEntryKey !== undefined && readHistoryState()[HISTORY_ENTRY_KEY] === this.provisionalEntryKey;
      return this.locationAdapter.assign(target, replaceCurrentEntry);
    }

    try {
      if (target.href !== address) {
        // Swup may already have staged this destination with an older fragment.
        // Preserve its history entry and reload the document at the latest fragment.
        window.history.replaceState(
          { ...readHistoryState(), url: target.pathname + target.search + target.hash },
          "",
          target,
        );
      }
      return this.locationAdapter.reload(target);
    } catch {
      dispatchRuntimeStatus({
        level: "error",
        message: "The browser prevented reloading the requested page.",
      });
      return false;
    }
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
    }, this.timings.fullNavigationWatchdogMs ?? DEFAULT_FULL_NAVIGATION_WATCHDOG_MS);
  }

  private clearHistoryReturn() {
    window.clearTimeout(this.historyReturn?.timer);
    this.historyReturn = undefined;
  }

  private returnToDisplayedEntry(target?: URL) {
    if (this.historyReturn) {
      this.historyReturn.target = target;
      return true;
    }
    const position = historyPosition(readHistoryState());
    const displayed = historyPosition(this.displayedState);
    if (position === undefined || displayed === undefined || position === displayed) return false;

    const fail = () => {
      const destination = this.historyReturn?.target;
      this.clearHistoryReturn();
      this.cancelQueuedNavigation();
      this.finishFullNavigationReset();
      dispatchRuntimeStatus({ level: "error", message: "The browser could not restore the previous history entry." });
      if (destination) this.navigateFully(destination);
    };
    const timer = window.setTimeout(fail, this.timings.fullNavigationWatchdogMs ?? DEFAULT_FULL_NAVIGATION_WATCHDOG_MS);
    this.historyReturn = { target, timer };
    try {
      window.history.go(displayed - position);
    } catch {
      fail();
    }
    return true;
  }

  private resetFullNavigation() {
    if (!this.fullNavigationPending) return;
    this.clearFullNavigationWatchdog();
    // Keep the failed forward entry intact and return to its original source.
    if (readHistoryState()[HISTORY_ENTRY_KEY] !== this.currentEntryKey && this.returnToDisplayedEntry()) return;
    this.finishFullNavigationReset();
  }

  private finishFullNavigationReset() {
    if (!this.fullNavigationPending) return;
    this.fullNavigationPending = false;
    dispatchFullNavigationReset(new URL(window.location.href));
  }

  private queueFromDisplayedEntry(target: URL, action: () => void) {
    this.queueNavigation(action);
    if (!this.selectedByPopstate || readHistoryState()[HISTORY_ENTRY_KEY] === this.currentEntryKey) return;
    // Swup's visit:start handlers cannot stop a visit. Restore the visible source
    // before handing a new visit to swup, while the existing queue can still cancel it.
    if (this.active?.visit.history.popstate) {
      this.cancelActiveNavigation();
    }
    if (!this.returnToDisplayedEntry(target)) {
      // An unmanaged history entry has no reliable distance to the visible source.
      this.cancelQueuedNavigation();
      this.navigateFully(target);
    }
  }

  private queueNavigation(action: () => void) {
    this.cancelQueuedNavigation();
    this.queuedNavigation = action;
    this.scheduleQueuedNavigation();
  }

  private scheduleQueuedNavigation() {
    // Submitting a visit during swup's render phase puts it in an internal
    // queue that an anchor cannot cancel. Keep it here until the current mount ends.
    window.clearTimeout(this.navigationTimer);
    this.navigationTimer = window.setTimeout(() => {
      const run = this.queuedNavigation;
      if (this.renderingVisit || this.historyReturn || !run) return;
      this.queuedNavigation = undefined;
      run();
    }, 0);
  }

  private cancelQueuedNavigation() {
    window.clearTimeout(this.navigationTimer);
    this.queuedNavigation = undefined;
  }

  private cancelActiveNavigation() {
    if (!this.active) return;
    const { visit, controller } = this.active;
    controller.abort();
    this.finishVisit(visit);
  }

  private navigateWithinDocument(target: URL, options: NavigateOptions) {
    if (this.fullNavigationPending) {
      return;
    }

    if (!options.history && this.selectedByPopstate && readHistoryState()[HISTORY_ENTRY_KEY] !== this.currentEntryKey) {
      this.queueFromDisplayedEntry(target, () => this.navigateWithinDocument(target, options));
      return;
    }
    this.cancelQueuedNavigation();
    this.cancelActiveNavigation();
    const previousUrl = this.displayedUrl;
    const pendingAddress = !isSameDocumentUrl(this.displayedUrl, new URL(window.location.href));
    if (!options.history && pendingAddress) {
      // Reuse the provisional entry for the anchor chosen on the still-visible page.
      window.history.replaceState(
        {
          ...this.displayedState,
          url: target.pathname + target.search + target.hash,
          [HISTORY_ENTRY_KEY]: createHistoryEntryKey(),
          themeHistoryPosition: (historyPosition(this.displayedState) ?? 0) + 1,
          [THEME_SOURCE_HISTORY_DEPTH_KEY]: (readSourceHistoryDepth(this.displayedState) ?? 0) + 1,
        },
        "",
        target,
      );
    }
    const fromEntryKey = this.currentEntryKey;
    const historyNavigation = options.history === true;
    let targetEntryKey = options.targetEntryKey;

    if (!targetEntryKey) {
      targetEntryKey = pendingAddress
        ? ensureCurrentHistoryEntryKey()
        : target.href === previousUrl.href
          ? fromEntryKey
          : createHistoryEntryKey();
    }

    if (!historyNavigation && target.href !== window.location.href) {
      const state = readHistoryState();
      const sourceDepth = readSourceHistoryDepth(state);
      window.history.pushState(
        {
          ...state,
          url: target.pathname + target.search + target.hash,
          [HISTORY_ENTRY_KEY]: targetEntryKey,
          themeHistoryPosition: (historyPosition(state) ?? 0) + 1,
          ...(sourceDepth === null ? {} : { [THEME_SOURCE_HISTORY_DEPTH_KEY]: sourceDepth + 1 }),
        },
        "",
        target,
      );
    }

    this.displayedUrl = target;
    this.displayedState = readHistoryState();
    this.provisionalEntryKey = undefined;
    if (this.client) this.client.location = SwupLocation.fromUrl(target.href);
    this.currentEntryKey = targetEntryKey;
    dispatchNavigationEvent(NAVIGATION_SAME_DOCUMENT_EVENT, {
      focus: options.focus === true || historyNavigation,
      fromEntryKey,
      history: historyNavigation,
      targetEntryKey,
      targetUrl: target.toString(),
      ...(options.triggerElement ? { triggerElement: options.triggerElement } : {}),
    });

    // pushState does not emit hashchange, but plugin-owned anchors listen for it.
    // History traversal already supplies the browser's native event.
    if (!historyNavigation && previousUrl.hash !== target.hash) {
      window.dispatchEvent(new window.HashChangeEvent("hashchange", { oldURL: previousUrl.href, newURL: target.href }));
    }
  }
}

export function startPartialNavigation() {
  if (navigationController) return;
  try {
    navigationController = new PartialPageNavigator();
    navigationController.start();
  } catch (error) {
    navigationController?.stop();
    navigationController = null;
    logWarn("Unable to initialize swup. Using full-page navigation.", error);
  }
}

export function navigateWithFullReload(url: string, { recovery = false } = {}) {
  if (recovery && navigationController?.hasQueuedNavigation()) return false;
  const target = resolveProgrammaticNavigationUrl(url, navigationController?.currentPageUrl);
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
  const current = navigationController?.currentPageUrl ?? new URL(window.location.href);
  const target = resolveProgrammaticNavigationUrl(url, current);
  if (!target) {
    reportUnsafeNavigation();
    return false;
  }

  if (
    shouldBypassPartialNavigation(target) ||
    (currentPageRequiresFullNavigationExit() && !isSameDocumentUrl(target, current)) ||
    !navigationController
  ) {
    return ["http:", "https:"].includes(target.protocol)
      ? navigateWithFullReload(target.toString())
      : assignLocation(target);
  }

  navigationController.navigate(target, { focus: true });
  return true;
}
