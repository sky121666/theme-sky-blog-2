/// <reference types="vite/client" />

declare module "pjax" {
  export interface PjaxOptions {
    analytics?: boolean;
    cacheBust?: boolean;
    elements?: string;
    scrollRestoration?: boolean;
    selectors?: string[];
  }

  export default class Pjax {
    constructor(options?: PjaxOptions);
    loadUrl(url: string, options?: Record<string, unknown>): void;
  }
}

declare module "lozad" {
  export interface LozadObserver {
    observe: () => void;
    observer: IntersectionObserver;
    triggerLoad: (element: Element) => void;
  }

  export interface LozadOptions {
    enableAutoReload?: boolean;
    loaded?: (element: Element) => void;
    rootMargin?: string;
    threshold?: number;
  }

  export default function lozad(selector?: string | Element | NodeList, options?: LozadOptions): LozadObserver;
}

declare module "figlet/importable-fonts/*" {
  const font: string;
  export default font;
}
