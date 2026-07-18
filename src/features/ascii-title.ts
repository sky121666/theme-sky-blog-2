import Alpine from "../common/alpine";
import figlet from "figlet";

import { registerFigletFont } from "../common/figlet-fonts";
import { logError } from "../common/logger";
import { PAGE_READY_EVENT, type PageReadyDetail } from "../common/runtime-events";

const ASCII_TITLE_MEDIA_QUERY = "(min-width: 768px)";

interface AsciiTitleState {
  $el?: HTMLElement;
  asciiArt: string;
  destroy: () => void;
  font: string;
  init: () => Promise<void>;
  load: () => Promise<void>;
  mediaQuery: MediaQueryList | null;
  mediaQueryChangeHandler: ((event: MediaQueryListEvent) => void) | null;
  pageReadyHandler: ((event: CustomEvent<PageReadyDetail>) => void) | null;
  renderGeneration: number;
  title: string;
}

export function canLoadAsciiTitle(element: HTMLElement | null | undefined) {
  if (!element?.isConnected) {
    return false;
  }

  if (!window.matchMedia(ASCII_TITLE_MEDIA_QUERY).matches) {
    return false;
  }

  let current: HTMLElement | null = element;
  while (current) {
    if (current.hidden || current.getAttribute("aria-hidden") === "true") {
      return false;
    }

    const style = window.getComputedStyle(current);
    if (style.display === "none" || style.visibility === "hidden") {
      return false;
    }

    current = current.parentElement;
  }

  return true;
}

export function registerAsciiTitleComponent() {
  Alpine.data("asciiTitle", (title: string = "", font: string = "Standard"): AsciiTitleState => ({
    asciiArt: "",
    destroy() {
      this.renderGeneration += 1;
      if (this.mediaQuery && this.mediaQueryChangeHandler) {
        this.mediaQuery.removeEventListener("change", this.mediaQueryChangeHandler);
      }
      if (this.pageReadyHandler) {
        document.removeEventListener(PAGE_READY_EVENT, this.pageReadyHandler);
      }
      this.mediaQuery = null;
      this.mediaQueryChangeHandler = null;
      this.pageReadyHandler = null;
    },
    font,
    async init() {
      this.mediaQuery = window.matchMedia(ASCII_TITLE_MEDIA_QUERY);
      this.mediaQueryChangeHandler = (event) => {
        if (event.matches) {
          void this.load();
        }
      };
      this.mediaQuery.addEventListener("change", this.mediaQueryChangeHandler);
      this.pageReadyHandler = (event) => {
        if (["post", "page"].includes(event.detail.pageType)) {
          return;
        }

        void Alpine.nextTick(() => {
          void this.load();
        });
      };
      document.addEventListener(PAGE_READY_EVENT, this.pageReadyHandler);
      await this.load();
    },
    async load() {
      if (!this.title) {
        return;
      }

      if (!canLoadAsciiTitle(this.$el)) {
        return;
      }

      const generation = ++this.renderGeneration;

      let selectedFont;
      try {
        selectedFont = await registerFigletFont(this.font);
      } catch (error) {
        if (generation !== this.renderGeneration) {
          return;
        }
        logError("Failed to load Figlet font.", error);
        this.asciiArt = this.title;
        return;
      }

      if (generation !== this.renderGeneration) {
        return;
      }

      figlet.text(
        this.title,
        {
          font: selectedFont,
          horizontalLayout: "default",
          verticalLayout: "default",
        },
        (error, result) => {
          if (generation !== this.renderGeneration) {
            return;
          }

          if (!error && result) {
            this.asciiArt = result;
            return;
          }

          logError("Failed to render ASCII title.", error);
          this.asciiArt = this.title;
        },
      );
    },
    mediaQuery: null,
    mediaQueryChangeHandler: null,
    pageReadyHandler: null,
    renderGeneration: 0,
    title,
  }));
}
