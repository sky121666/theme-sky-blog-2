import Alpine from "../common/alpine";

import { shouldIgnoreGlobalKeyboardEvent } from "../common/keyboard";
import { getPreferredScrollBehavior } from "../common/motion";
import { NAVIGATION_COMPLETE_EVENT, NAVIGATION_START_EVENT } from "../common/navigation";
import { getArticleToc, type ArticleTocItem } from "./article-tools";

export function registerPostViewerComponent() {
  Alpine.data("postViewer", () => ({
    keydownHandler: null as ((event: KeyboardEvent) => void) | null,
    navigationCompleteHandler: null as (() => void) | null,
    navigationStartHandler: null as (() => void) | null,
    readingProgress: 0,
    scrollFrameId: null as number | null,
    scrollHandler: null as (() => void) | null,
    tocItems: [] as ArticleTocItem[],

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

    get scrollBehavior(): ScrollBehavior {
      return getPreferredScrollBehavior();
    },

    handleKeydown(event: KeyboardEvent) {
      if (shouldIgnoreGlobalKeyboardEvent(event)) {
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
        case "PageDown":
          event.preventDefault();
          main.scrollBy({ behavior: this.scrollBehavior, top: main.clientHeight * 0.8 });
          break;
        case " ":
          event.preventDefault();
          main.scrollBy({
            behavior: this.scrollBehavior,
            top: (event.shiftKey ? -1 : 1) * main.clientHeight * 0.8,
          });
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
      this.bindListeners();

      this.navigationStartHandler = () => this.unbindListeners();
      this.navigationCompleteHandler = () => this.bindListeners();
      document.addEventListener(NAVIGATION_START_EVENT, this.navigationStartHandler);
      document.addEventListener(NAVIGATION_COMPLETE_EVENT, this.navigationCompleteHandler);
    },

    bindListeners() {
      if (!this.keydownHandler) {
        this.keydownHandler = (event: KeyboardEvent) => this.handleKeydown(event);
        window.addEventListener("keydown", this.keydownHandler);
      }

      if (!this.scrollHandler) {
        this.scrollHandler = () => {
          if (this.scrollFrameId !== null) {
            return;
          }

          this.scrollFrameId = window.requestAnimationFrame(() => {
            this.scrollFrameId = null;
            this.updateReadingProgress();
          });
        };
        document.getElementById("main")?.addEventListener("scroll", this.scrollHandler, { passive: true });
      }
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

      if (this.scrollFrameId !== null) {
        window.cancelAnimationFrame(this.scrollFrameId);
        this.scrollFrameId = null;
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
