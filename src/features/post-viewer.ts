import Alpine from "../common/alpine";

import { shouldIgnoreGlobalKeyboardEvent } from "../common/keyboard";
import { getPreferredScrollBehavior } from "../common/motion";
import { NAVIGATION_COMPLETE_EVENT, NAVIGATION_START_EVENT } from "../common/navigation";
import { observeArticleToc, type ArticleTocItem } from "./article-tools";

export function registerPostViewerComponent() {
  Alpine.data("postViewer", () => ({
    keydownHandler: null as ((event: KeyboardEvent) => void) | null,
    navigationCompleteHandler: null as (() => void) | null,
    navigationStartHandler: null as (() => void) | null,
    readingProgress: 0,
    scrollFrameId: null as number | null,
    stopTrackingProgress: null as (() => void) | null,
    stopTrackingToc: null as (() => void) | null,
    tocItems: [] as ArticleTocItem[],

    destroy() {
      this.unbindListeners();
      this.stopTrackingToc?.();
      this.stopTrackingToc = null;

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
      const content = this.$el.querySelector(".terminal-content");
      if (content) {
        this.stopTrackingToc = observeArticleToc(content, (items) => this.updateToc(items));
      }
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

      const main = this.$el.closest<HTMLElement>("#main");
      const content = this.$el.querySelector<HTMLElement>(".terminal-content");
      if (this.stopTrackingProgress || !main || !content) {
        return;
      }

      const update = () => {
        const body = content.getBoundingClientRect();
        const viewportBottom = main.getBoundingClientRect().top + main.clientTop + main.clientHeight;
        if (main.clientHeight === 0 || viewportBottom < body.top) {
          this.readingProgress = 0;
        } else if (viewportBottom >= body.bottom) {
          this.readingProgress = 100;
        } else {
          this.readingProgress = Math.floor(((viewportBottom - body.top) / body.height) * 100);
        }
      };
      const scheduleUpdate = () => {
        if (this.scrollFrameId === null) {
          this.scrollFrameId = window.requestAnimationFrame(() => {
            this.scrollFrameId = null;
            update();
          });
        }
      };

      const observer = window.ResizeObserver ? new window.ResizeObserver(scheduleUpdate) : null;
      observer?.observe(main);
      observer?.observe(this.$el);
      observer?.observe(content);
      main.addEventListener("scroll", scheduleUpdate, { passive: true });
      window.addEventListener("resize", scheduleUpdate);
      this.stopTrackingProgress = () => {
        observer?.disconnect();
        main.removeEventListener("scroll", scheduleUpdate);
        window.removeEventListener("resize", scheduleUpdate);
      };
      update();
    },

    scrollAmount: 100,

    unbindListeners() {
      if (this.keydownHandler) {
        window.removeEventListener("keydown", this.keydownHandler);
        this.keydownHandler = null;
      }

      this.stopTrackingProgress?.();
      this.stopTrackingProgress = null;

      if (this.scrollFrameId !== null) {
        window.cancelAnimationFrame(this.scrollFrameId);
        this.scrollFrameId = null;
      }
    },

    updateToc(items: ArticleTocItem[]) {
      const focused = document.activeElement;
      this.tocItems = items;
      if (!(focused instanceof HTMLAnchorElement) || !this.$el.contains(focused.closest("details.reader-toc"))) {
        return;
      }

      // Moving a keyed row can blur its link even when Alpine reuses the node.
      void this.$nextTick(() => {
        if (this.stopTrackingToc && focused.isConnected && document.activeElement === document.body) {
          focused.focus({ preventScroll: true });
        }
      });
    },
  }));
}
