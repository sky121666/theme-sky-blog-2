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

interface Window {
  haloData?: {
    categories: any[];
    tags: any[];
    currentPosts: any[];
    urls: {
      categories: string;
      tags: string;
      archives: string;
      home: string;
    };
    user: string;
    pagination?: {
      hasPrev: boolean;
      hasNext: boolean;
      prevUrl: string | null;
      nextUrl: string | null;
    };
    nextPost?: string | null;
    prevPost?: string | null;
    currentPost?: {
      title: string | null;
      slug: string | null;
      permalink: string | null;
    };
  };
}
