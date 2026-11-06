import { navigateWithFullReload, resolveSafeNavigationUrl } from "./navigation";

type SearchNavigateEvent = Event & {
  canIntercept: boolean;
  destination: { url: string };
  downloadRequest: string | null;
  formData: FormData | null;
  navigationType: string;
};

let detachSearchPreviewNavigation: (() => void) | null = null;

export function initSearchPreviewNavigation() {
  detachSearchPreviewNavigation?.();

  const navigation = (window as Window & { navigation?: EventTarget }).navigation;
  if (
    !new URL(window.location.href).searchParams.has("preview-theme") ||
    typeof navigation?.addEventListener !== "function" ||
    typeof navigation.removeEventListener !== "function"
  ) {
    return;
  }

  let activation: MouseEvent | KeyboardEvent | null = null;
  const disarm = () => {
    activation = null;
    navigation.removeEventListener("navigate", handleNavigate);
  };
  const handleNavigate = (event: Event) => {
    const source = activation;
    // Remove first: the replacement full navigation emits another navigate event.
    disarm();
    const intent = event as SearchNavigateEvent;
    if (
      !source ||
      source.eventPhase === Event.NONE ||
      source.defaultPrevented ||
      event.defaultPrevented ||
      !event.cancelable ||
      !intent.canIntercept ||
      intent.downloadRequest !== null ||
      intent.formData !== null ||
      intent.navigationType !== "push"
    ) {
      return;
    }

    const current = new URL(window.location.href);
    const target = resolveSafeNavigationUrl(intent.destination.url);
    if (
      !current.searchParams.has("preview-theme") ||
      target?.origin !== current.origin ||
      target.searchParams.has("preview-theme")
    ) {
      return;
    }

    event.preventDefault();
    navigateWithFullReload(target.toString());
  };
  const captureActivation = (event: MouseEvent | KeyboardEvent) => {
    disarm();
    if (
      event.defaultPrevented ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      (event instanceof MouseEvent && event.button !== 0) ||
      (event instanceof KeyboardEvent && (event.key !== "Enter" || event.isComposing)) ||
      !event.composedPath().some((node) => node instanceof HTMLElement && node.localName === "search-modal")
    ) {
      return;
    }

    activation = event;
    navigation.addEventListener("navigate", handleNavigate);
  };
  const finishActivation = (event: Event) => {
    if (activation === event) {
      disarm();
    }
  };
  const cleanup = () => {
    disarm();
    window.removeEventListener("click", captureActivation, true);
    window.removeEventListener("keydown", captureActivation, true);
    window.removeEventListener("click", finishActivation);
    window.removeEventListener("keydown", finishActivation);
    window.removeEventListener("pagehide", handlePageHide);
    detachSearchPreviewNavigation = null;
  };
  const handlePageHide = (event: PageTransitionEvent) => {
    // BFCache preserves the open widget. Keep its activation listeners so a
    // restored search can select another result without calling open() again.
    if (event.persisted) {
      disarm();
    } else {
      cleanup();
    }
  };

  // Only standard events are observed; no plugin state or location/fetch methods
  // are patched. eventPhase also rejects later navigation after stopped bubbling.
  window.addEventListener("click", captureActivation, true);
  window.addEventListener("keydown", captureActivation, true);
  window.addEventListener("click", finishActivation);
  window.addEventListener("keydown", finishActivation);
  window.addEventListener("pagehide", handlePageHide);
  detachSearchPreviewNavigation = cleanup;
}
