import Alpine from "../common/alpine";

import { isInteractiveEventTarget, shouldIgnoreGlobalKeyboardEvent } from "../common/keyboard";
import { getPreferredScrollBehavior } from "../common/motion";
import { NAVIGATION_COMPLETE_EVENT, NAVIGATION_START_EVENT, navigateToUrl } from "../common/navigation";

export function registerFileListNavComponent() {
  Alpine.data("fileListNav", () => ({
    focusInHandler: null as ((event: FocusEvent) => void) | null,
    items: [] as HTMLElement[],
    keydownHandler: null as ((event: KeyboardEvent) => void) | null,
    navigationCompleteHandler: null as (() => void) | null,
    navigationStartHandler: null as (() => void) | null,
    selectedIndex: -1,

    bindListeners() {
      if (!this.keydownHandler) {
        this.keydownHandler = (event) => this.handleKeydown(event);
        window.addEventListener("keydown", this.keydownHandler);
      }

      if (!this.focusInHandler) {
        this.focusInHandler = (event) => this.handleFocusIn(event);
        window.addEventListener("focusin", this.focusInHandler);
      }
    },

    destroy() {
      this.unbindListeners();

      if (this.navigationStartHandler) {
        document.removeEventListener(NAVIGATION_START_EVENT, this.navigationStartHandler);
        this.navigationStartHandler = null;
      }

      if (this.navigationCompleteHandler) {
        document.removeEventListener(NAVIGATION_COMPLETE_EVENT, this.navigationCompleteHandler);
        this.navigationCompleteHandler = null;
      }
    },

    handleFocusIn(event: FocusEvent) {
      const target = event.target;
      const focusedItem = target instanceof Element ? target.closest<HTMLElement>("[data-nav-item]") : null;
      const focusedIndex = focusedItem ? this.items.indexOf(focusedItem) : -1;
      if (focusedIndex >= 0) {
        this.selectedIndex = focusedIndex;
        return;
      }

      if (isInteractiveEventTarget(event)) {
        this.selectedIndex = -1;
      }
    },

    handleKeydown(event: KeyboardEvent) {
      const eventTarget = event.target;
      const targetIsCurrentListItem =
        eventTarget instanceof Element && this.$el.contains(eventTarget) && eventTarget.closest("[data-nav-item]");
      if (shouldIgnoreGlobalKeyboardEvent(event) && !targetIsCurrentListItem) {
        return;
      }

      if (this.items.length === 0) {
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
        this.scrollToSelected();
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        this.selectedIndex =
          this.selectedIndex < 0
            ? this.items.length - 1
            : (this.selectedIndex - 1 + this.items.length) % this.items.length;
        this.scrollToSelected();
        return;
      }

      if (event.key !== "Enter") {
        return;
      }

      event.preventDefault();

      if (this.selectedIndex < 0 || this.selectedIndex >= this.items.length) {
        return;
      }

      const item = this.items[this.selectedIndex];
      const link = item instanceof HTMLAnchorElement ? item : item.querySelector<HTMLAnchorElement>("a");

      if (!link?.href) {
        return;
      }

      navigateToUrl(link.href);
    },

    init() {
      this.items = Array.from(this.$el.querySelectorAll<HTMLElement>("[data-nav-item]"));

      if (this.items.length > 0) {
        this.selectedIndex = 0;
      }

      this.bindListeners();

      // Clean up global listeners while the current page subtree is being replaced.
      this.navigationStartHandler = () => this.unbindListeners();
      this.navigationCompleteHandler = () => this.bindListeners();
      document.addEventListener(NAVIGATION_START_EVENT, this.navigationStartHandler);
      document.addEventListener(NAVIGATION_COMPLETE_EVENT, this.navigationCompleteHandler);
    },

    isSelected(item: HTMLElement) {
      return this.selectedIndex === this.items.indexOf(item);
    },

    scrollToSelected() {
      const currentItem = this.items[this.selectedIndex];
      if (!currentItem) {
        return;
      }

      const focusTarget =
        currentItem instanceof HTMLAnchorElement
          ? currentItem
          : currentItem.querySelector<HTMLElement>('a[href], button, [tabindex]:not([tabindex="-1"])');
      focusTarget?.focus({ preventScroll: true });
      currentItem.scrollIntoView({ behavior: getPreferredScrollBehavior(), block: "nearest" });
    },

    unbindListeners() {
      if (this.keydownHandler) {
        window.removeEventListener("keydown", this.keydownHandler);
        this.keydownHandler = null;
      }

      if (this.focusInHandler) {
        window.removeEventListener("focusin", this.focusInHandler);
        this.focusInHandler = null;
      }
    },
  }));
}
