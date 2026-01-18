/// <reference types="vite/client" />

declare module "pjax" {
  export default class Pjax {
    constructor(options?: any);
    loadUrl(url: string, options?: any): void;
  }
}

declare module "lozad" {
  export default function lozad(
    selector?: string | Element | NodeList,
    options?: {
      rootMargin?: string;
      threshold?: number;
      enableAutoReload?: boolean;
      loaded?: (el: Element) => void;
    }
  ): {
    observe: () => void;
    triggerLoad: (el: Element) => void;
    observer: IntersectionObserver;
  };
}
