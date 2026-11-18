const SEARCH_FOCUS_RESTORE_TIMEOUT_MS = 60_000;
const observedSearchModals = new WeakSet<ShadowRoot>();
let cancelSearchFocusRestoration: (() => void) | null = null;

export function armSearchFocusRestoration(trigger: HTMLElement) {
  cancelSearchFocusRestoration?.();

  let timeoutId: number | null = null;
  let frameId: number | null = null;
  const cleanup = () => {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }
    if (frameId !== null) {
      window.cancelAnimationFrame(frameId);
    }
    window.removeEventListener("click", scheduleRestoreCheck, true);
    window.removeEventListener("keyup", handleKeyUp, true);
    if (cancelSearchFocusRestoration === cleanup) {
      cancelSearchFocusRestoration = null;
    }
  };
  const restoreIfClosed = () => {
    frameId = null;
    const modal = document.querySelector("search-modal");
    const wrapper = modal?.shadowRoot?.querySelector<HTMLElement>(".modal__wrapper");
    const closed = !modal || wrapper?.style.display === "none";
    if (!closed) {
      return;
    }

    cleanup();
    if (trigger.isConnected) {
      trigger.focus({ preventScroll: true });
    }
  };
  const scheduleRestoreCheck = () => {
    if (frameId === null) {
      frameId = window.requestAnimationFrame(restoreIfClosed);
    }
  };
  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      scheduleRestoreCheck();
    }
  };

  window.addEventListener("click", scheduleRestoreCheck, true);
  window.addEventListener("keyup", handleKeyUp, true);
  timeoutId = window.setTimeout(cleanup, SEARCH_FOCUS_RESTORE_TIMEOUT_MS);
  cancelSearchFocusRestoration = cleanup;
}

export function styleSearchSelectedResults() {
  const modal = document.querySelector("search-modal")?.shadowRoot;
  if (!modal || observedSearchModals.has(modal)) {
    return;
  }

  // SearchWidget mounts a new search-form shadow root each time the modal opens.
  const styleCurrentForm = () => {
    const form = modal.querySelector("search-form")?.shadowRoot;
    if (!form || form.querySelector("[data-theme-search-selected]")) {
      return;
    }

    const style = document.createElement("style");
    style.dataset.themeSearchSelected = "";
    style.textContent = `
      [data-index]:is([class~="!bg-primary"], .bg-primary) {
        --halo-search-widget-primary-color: color-mix(in srgb, #101610 82%, var(--terminal-text));
        box-shadow: inset 2px 0 var(--terminal-text);
      }
    `;
    form.append(style);
  };

  observedSearchModals.add(modal);
  new MutationObserver(styleCurrentForm).observe(modal, { childList: true, subtree: true });
  styleCurrentForm();
}
