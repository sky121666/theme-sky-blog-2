import { NAVIGATION_SAME_DOCUMENT_EVENT, NAVIGATION_START_EVENT, NAVIGATION_SUCCESS_EVENT } from "./navigation";

interface ScrollRecord {
  key: string;
  top: number;
  time: number;
}

interface PaneOwner {
  key: string;
  href: string;
  clamped?: { top: number; applied: number };
}

const paneOwners = new WeakMap<HTMLElement, PaneOwner>();
const initialized = new WeakSet<Document>();
const TAB_RECORDS = "sky-blog-2:main-scroll";
const MAX_SCROLL_RECORDS = 100;

function selectedState(): Record<string, unknown> | undefined {
  try {
    return window.history.state ?? undefined;
  } catch {
    return undefined;
  }
}

function isRecord(value: unknown): value is ScrollRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<ScrollRecord>;
  return (
    typeof record.key === "string" &&
    typeof record.top === "number" &&
    Number.isFinite(record.top) &&
    record.top >= 0 &&
    typeof record.time === "number" &&
    Number.isFinite(record.time)
  );
}

function tabRecords(): ScrollRecord[] {
  try {
    const records: unknown = JSON.parse(window.sessionStorage.getItem(TAB_RECORDS) ?? "[]");
    return Array.isArray(records) ? records.filter(isRecord) : [];
  } catch {
    return [];
  }
}

function visibleScrollTop(main: HTMLElement, owner?: PaneOwner) {
  const top = main.scrollTop;
  return owner?.clamped?.applied === top ? owner.clamped.top : Math.max(0, top);
}

function recordPosition(positions: Map<string, number>, key: string, top: number) {
  positions.delete(key);
  positions.set(key, top);
  if (positions.size > MAX_SCROLL_RECORDS) {
    const oldest = positions.keys().next().value;
    if (oldest !== undefined) positions.delete(oldest);
  }
}

export function checkpointScrollPosition(positions: Map<string, number>, key: string, main: HTMLElement) {
  recordPosition(positions, key, rememberEntryScroll(key, main));
}

export function rememberEntryScroll(key: string, main: HTMLElement) {
  const owner = paneOwners.get(main);
  if (owner?.key !== key || main !== document.getElementById("main")) return visibleScrollTop(main);
  const top = visibleScrollTop(main, owner);
  const record: ScrollRecord = {
    key,
    top,
    time: performance.timeOrigin + performance.now(),
  };
  const state = selectedState();
  if (state?.themePartialNavigationKey === key && location.href === owner.href) {
    try {
      window.history.replaceState({ ...state, themeMainScroll: record }, "");
      return top;
    } catch {
      // The outgoing entry can already be frozen during native traversal.
    }
  }
  // replaceState can only update the selected entry. Never write the outgoing pane into the destination.
  try {
    const records = tabRecords().filter((item) => item.key !== key);
    records.push(record);
    window.sessionStorage.setItem(TAB_RECORDS, JSON.stringify(records.slice(-MAX_SCROLL_RECORDS)));
  } catch {
    // Both persistent paths are unavailable. In-document history still uses runtime's in-memory map.
  }
  return top;
}

function restoreEntryPane(main: HTMLElement, owner: PaneOwner, top: number) {
  // A tracker article can change height after pageshow. Browser scroll anchoring would shift the restored offset.
  const previous = main.style.overflowAnchor;
  const listeners = new window.AbortController();
  const options = { capture: true, passive: true, signal: listeners.signal };
  let rangeObserver: ResizeObserver | undefined;
  function release(event?: Event) {
    rangeObserver?.disconnect();
    listeners.abort();
    if (main.style.overflowAnchor === "none") main.style.overflowAnchor = previous;
    if (event?.type === NAVIGATION_START_EVENT || event?.type === NAVIGATION_SAME_DOCUMENT_EVENT) {
      // Window capture stops retries before the document handler saves the outgoing pane.
      // Keep the requested position readable until those synchronous handlers return.
      queueMicrotask(() => delete owner.clamped);
    } else {
      delete owner.clamped;
    }
  }
  for (const type of [
    "pointerdown",
    "touchstart",
    "wheel",
    "keydown",
    "pagehide",
    NAVIGATION_START_EVENT,
    NAVIGATION_SUCCESS_EVENT,
    NAVIGATION_SAME_DOCUMENT_EVENT,
  ]) {
    window.addEventListener(type, release, options);
  }
  main.style.overflowAnchor = "none";
  main.scrollTop = top;
  if (main.scrollTop === top) return;

  owner.clamped = { top, applied: main.scrollTop };
  function retry() {
    if (!owner.clamped) return;
    if (
      paneOwners.get(main) !== owner ||
      document.getElementById("main") !== main ||
      selectedState()?.themePartialNavigationKey !== owner.key ||
      location.href !== owner.href ||
      main.scrollTop !== owner.clamped.applied
    ) {
      release();
      return;
    }
    main.scrollTop = top;
    owner.clamped.applied = main.scrollTop;
    if (main.scrollTop === top) {
      delete owner.clamped;
      rangeObserver?.disconnect();
    }
  }
  // The available range can grow *after* pageshow. #main itself can stay fixed while its content grows.
  if (typeof window.ResizeObserver === "function") {
    rangeObserver = new window.ResizeObserver(retry);
    rangeObserver.observe(main);
    for (const child of main.children) rangeObserver.observe(child);
  }
  window.addEventListener("pageshow", retry, { once: true, signal: listeners.signal });
}

export function bindEntryScrollHistory(positions: Map<string, number>) {
  if (initialized.has(document)) return;
  initialized.add(document);

  function adoptPane(key: unknown) {
    const main = document.getElementById("main");
    if (main && typeof key === "string" && key && key === selectedState()?.themePartialNavigationKey) {
      paneOwners.set(main, { key, href: location.href });
    }
  }

  function savedPosition(key: string) {
    const state = selectedState();
    if (state?.themePartialNavigationKey !== key) return;
    const primary = state.themeMainScroll;
    const stored = isRecord(primary) && primary.key === key ? primary : undefined;
    const fallback = tabRecords().find((item) => item.key === key);
    return fallback && (!stored || fallback.time > stored.time) ? fallback : stored;
  }

  function saveVisiblePane() {
    const pane = document.getElementById("main");
    const displayed = pane && paneOwners.get(pane);
    if (displayed) checkpointScrollPosition(positions, displayed.key, pane);
  }
  // Save the requested position before pagehide releases a range-limited restoration.
  window.addEventListener("pagehide", saveVisiblePane, true);

  adoptPane(selectedState()?.themePartialNavigationKey);
  const main = document.getElementById("main");
  const owner = main && paneOwners.get(main);
  const saved = owner && savedPosition(owner.key);
  if (owner && saved) {
    recordPosition(positions, owner.key, saved.top);
    restoreEntryPane(main, owner, saved.top);
  }

  // A cold document can subsequently return to an older entry through swup.
  // Supply its saved position before the normal runtime chooses between scroll and anchor restoration.
  function hydrateTraversal(event: DocumentEventMap["theme:navigation-start"]) {
    const key = event.detail.targetEntryKey;
    if (!event.detail.history || positions.has(key)) return;
    const saved = savedPosition(key);
    if (saved) recordPosition(positions, key, saved.top);
  }
  document.addEventListener(NAVIGATION_START_EVENT, hydrateTraversal, true);
  document.addEventListener(NAVIGATION_SAME_DOCUMENT_EVENT, hydrateTraversal, true);
  document.addEventListener(NAVIGATION_SUCCESS_EVENT, (event) => adoptPane(event.detail.targetEntryKey));
  document.addEventListener(NAVIGATION_SAME_DOCUMENT_EVENT, (event) => adoptPane(event.detail.targetEntryKey));
  // Swup can change the address before replacing the old pane. Keep its last visible position
  // in memory even when the outgoing scroll has not emitted scrollend yet.
  document.addEventListener(
    "scroll",
    (event) => {
      const pane = document.getElementById("main");
      if (!pane || event.target !== pane) return;
      const owner = paneOwners.get(pane);
      if (owner) recordPosition(positions, owner.key, visibleScrollTop(pane, owner));
    },
    { capture: true, passive: true },
  );
  // Scroll end checkpoints the active entry before a browser Back can select its neighbor.
  document.addEventListener(
    "scrollend",
    (event) => {
      if (event.target === document.getElementById("main")) saveVisiblePane();
    },
    true,
  );
  return Boolean(saved);
}
