import { logWarn } from "./logger";
import { THEME_SOURCE_HISTORY_DEPTH_KEY } from "./navigation";
import { initSearchPreviewNavigation } from "./search-preview";
import { armSearchFocusRestoration, styleSearchSelectedResults } from "./search-widget-dom";

type SearchWidget = {
  open?: () => void;
};

const ACTION_ATTRIBUTE = "data-terminal-action";
export function openSearchWidget(
  trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null,
) {
  const searchWidget = (window as unknown as { SearchWidget?: SearchWidget }).SearchWidget;

  if (typeof searchWidget?.open === "function") {
    initSearchPreviewNavigation();
    if (trigger) {
      armSearchFocusRestoration(trigger);
    }
    searchWidget.open();
    styleSearchSelectedResults();
    return true;
  }

  logWarn("Official Halo SearchWidget is not loaded.");
  return false;
}

function returnToSource(trigger: HTMLElement) {
  const state = window.history.state;
  const previousUrl =
    typeof state?.themePreviousUrl === "string" && state.themePreviousUrl ? state.themePreviousUrl : document.referrer;

  try {
    const source = new URL(previousUrl);
    if (window.history.length > 1 && source.origin === window.location.origin && source.href !== window.location.href) {
      const depth = state?.[THEME_SOURCE_HISTORY_DEPTH_KEY];
      if (Number.isSafeInteger(depth) && depth > 1 && depth < window.history.length) {
        window.history.go(-depth);
      } else {
        window.history.back();
      }
      return;
    }
  } catch {
    // A direct entry has no usable same-origin source.
  }

  window.location.assign(trigger.dataset.homeUrl || window.haloData?.urls.home || "/");
}

function handleAction(action: string, trigger: HTMLElement) {
  if (action === "search") {
    openSearchWidget(trigger);
  } else if (action === "source-back") {
    returnToSource(trigger);
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
