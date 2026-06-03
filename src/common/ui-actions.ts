import { logWarn } from "./logger";

type SearchWidget = {
  open?: () => void;
};

const ACTION_ATTRIBUTE = "data-terminal-action";

function openSearchWidget() {
  const searchWidget = (window as unknown as { SearchWidget?: SearchWidget }).SearchWidget;

  if (typeof searchWidget?.open === "function") {
    searchWidget.open();
    return;
  }

  logWarn("Official Halo SearchWidget is not loaded.");
}

function navigateBack() {
  if (window.history.length > 1) {
    window.history.back();
    return;
  }

  window.location.href = "/";
}

function handleAction(action: string) {
  if (action === "search") {
    openSearchWidget();
    return;
  }

  if (action === "back") {
    navigateBack();
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
        handleAction(action);
      }
    });
  });
}
