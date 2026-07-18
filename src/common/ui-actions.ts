import { logWarn } from "./logger";

type SearchWidget = {
  open?: () => void;
};

const ACTION_ATTRIBUTE = "data-terminal-action";
const SEARCH_FOCUS_RESTORE_TIMEOUT_MS = 60_000;
let cancelSearchFocusRestoration: (() => void) | null = null;

function armSearchFocusRestoration(trigger: HTMLElement) {
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

export function openSearchWidget(
  trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null,
) {
  const searchWidget = (window as unknown as { SearchWidget?: SearchWidget }).SearchWidget;

  if (typeof searchWidget?.open === "function") {
    if (trigger) {
      armSearchFocusRestoration(trigger);
    }
    searchWidget.open();
    return true;
  }

  logWarn("Official Halo SearchWidget is not loaded.");
  return false;
}

function handleAction(action: string, trigger: HTMLElement) {
  if (action === "search") {
    openSearchWidget(trigger);
  }
}

export function initUiActions(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>(`[${ACTION_ATTRIBUTE}]`).forEach((element) => {
    if (element.dataset.terminalActionBound === "true") {
      return;
    }

    element.dataset.terminalActionBound = "true";
    element.addEventListener("click", () => {
      const action = element.getAttribute(ACTION_ATTRIBUTE);

      if (action) {
        handleAction(action, element);
      }
    });
  });
}
