import Alpine from "alpinejs";

import { navigateToUrl } from "../common/navigation";

export function registerFileListNavComponent() {
  Alpine.data("fileListNav", () => ({
    focusInHandler: null as ((event: FocusEvent) => void) | null,
    items: [] as HTMLElement[],
    keydownHandler: null as ((event: KeyboardEvent) => void) | null,
    pjaxSendHandler: null as (() => void) | null,
    selectedIndex: -1,

    bindListeners() {
      this.keydownHandler = (event) => this.handleKeydown(event);
      this.focusInHandler = (event) => this.handleFocusIn(event);

      window.addEventListener("keydown", this.keydownHandler);
      window.addEventListener("focusin", this.focusInHandler);
    },

    destroy() {
      this.unbindListeners();

      if (this.pjaxSendHandler) {
        document.removeEventListener("pjax:send", this.pjaxSendHandler);
        this.pjaxSendHandler = null;
      }
    },

    handleFocusIn(event: FocusEvent) {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        this.selectedIndex = -1;
      }
    },

    handleKeydown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
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
        this.selectedIndex = (this.selectedIndex - 1 + this.items.length) % this.items.length;
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

      // Clean up listeners on Pjax navigation to prevent leaks
      this.pjaxSendHandler = () => this.unbindListeners();
      document.addEventListener("pjax:send", this.pjaxSendHandler);
    },

    scrollToSelected() {
      const currentItem = this.items[this.selectedIndex];
      if (!currentItem) {
        return;
      }

      currentItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
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
