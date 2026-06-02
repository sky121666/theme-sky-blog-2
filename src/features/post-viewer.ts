import Alpine from "alpinejs";

import { getArticleToc, type ArticleTocItem } from "./article-tools";

export function registerPostViewerComponent() {
  Alpine.data("postViewer", () => ({
    keydownHandler: null as ((event: KeyboardEvent) => void) | null,
    pjaxSendHandler: null as (() => void) | null,
    readingProgress: 0,
    scrollHandler: null as (() => void) | null,
    tocItems: [] as ArticleTocItem[],

    destroy() {
      this.unbindListeners();

      if (this.pjaxSendHandler) {
        document.removeEventListener("pjax:send", this.pjaxSendHandler);
        this.pjaxSendHandler = null;
      }
    },

    get scrollBehavior(): ScrollBehavior {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
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
          main.scrollBy({ behavior: this.scrollBehavior, top: this.scrollAmount });
          break;
        case "ArrowUp":
        case "k":
          event.preventDefault();
          main.scrollBy({ behavior: this.scrollBehavior, top: -this.scrollAmount });
          break;
        case " ":
        case "PageDown":
          event.preventDefault();
          main.scrollBy({ behavior: this.scrollBehavior, top: main.clientHeight * 0.8 });
          break;
        case "End":
          event.preventDefault();
          main.scrollTo({ behavior: this.scrollBehavior, top: main.scrollHeight });
          break;
        case "Home":
          event.preventDefault();
          main.scrollTo({ behavior: this.scrollBehavior, top: 0 });
          break;
        case "PageUp":
          event.preventDefault();
          main.scrollBy({ behavior: this.scrollBehavior, top: -main.clientHeight * 0.8 });
          break;
        default:
          break;
      }
    },

    init() {
      this.refreshToc();
      this.updateReadingProgress();

      this.keydownHandler = (event: KeyboardEvent) => this.handleKeydown(event);
      window.addEventListener("keydown", this.keydownHandler);

      const main = document.getElementById("main");
      this.scrollHandler = () => this.updateReadingProgress();
      main?.addEventListener("scroll", this.scrollHandler, { passive: true });

      this.pjaxSendHandler = () => this.unbindListeners();
      document.addEventListener("pjax:send", this.pjaxSendHandler);
    },

    jumpToHeading(id: string) {
      document.getElementById(id)?.scrollIntoView({
        behavior: this.scrollBehavior,
        block: "start",
      });
    },

    refreshToc() {
      this.tocItems = getArticleToc();
    },

    scrollAmount: 100,

    unbindListeners() {
      if (this.keydownHandler) {
        window.removeEventListener("keydown", this.keydownHandler);
        this.keydownHandler = null;
      }

      if (this.scrollHandler) {
        document.getElementById("main")?.removeEventListener("scroll", this.scrollHandler);
        this.scrollHandler = null;
      }
    },

    updateReadingProgress() {
      const main = document.getElementById("main");
      if (!main) {
        this.readingProgress = 0;
        return;
      }

      const maxScroll = main.scrollHeight - main.clientHeight;
      this.readingProgress =
        maxScroll > 0 ? Math.min(100, Math.max(0, Math.round((main.scrollTop / maxScroll) * 100))) : 100;
    },
  }));
}
