/// <reference types="vite/client" />

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
