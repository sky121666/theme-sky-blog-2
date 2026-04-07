import Alpine from "alpinejs";

export function registerPostViewerComponent() {
  Alpine.data("postViewer", () => ({
    keydownHandler: null as ((event: KeyboardEvent) => void) | null,
    pjaxSendHandler: null as (() => void) | null,

    destroy() {
      this.unbindListeners();

      if (this.pjaxSendHandler) {
        document.removeEventListener("pjax:send", this.pjaxSendHandler);
        this.pjaxSendHandler = null;
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

      const main = document.getElementById("main");
      if (!main) {
        return;
      }

      switch (event.key) {
        case "ArrowDown":
        case "j":
          event.preventDefault();
          main.scrollBy({ behavior: "smooth", top: this.scrollAmount });
          break;
        case "ArrowUp":
        case "k":
          event.preventDefault();
          main.scrollBy({ behavior: "smooth", top: -this.scrollAmount });
          break;
        case " ":
        case "PageDown":
          event.preventDefault();
          main.scrollBy({ behavior: "smooth", top: main.clientHeight * 0.8 });
          break;
        case "End":
          event.preventDefault();
          main.scrollTo({ behavior: "smooth", top: main.scrollHeight });
          break;
        case "Home":
          event.preventDefault();
          main.scrollTo({ behavior: "smooth", top: 0 });
          break;
        case "PageUp":
          event.preventDefault();
          main.scrollBy({ behavior: "smooth", top: -main.clientHeight * 0.8 });
          break;
        default:
          break;
      }
    },

    init() {
      this.keydownHandler = (event: KeyboardEvent) => this.handleKeydown(event);
      window.addEventListener("keydown", this.keydownHandler);

      this.pjaxSendHandler = () => this.unbindListeners();
      document.addEventListener("pjax:send", this.pjaxSendHandler);
    },

    scrollAmount: 100,

    unbindListeners() {
      if (this.keydownHandler) {
        window.removeEventListener("keydown", this.keydownHandler);
        this.keydownHandler = null;
      }
    },
  }));
}
