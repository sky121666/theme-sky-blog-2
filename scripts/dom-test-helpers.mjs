import { randomUUID } from "node:crypto";

import { JSDOM } from "jsdom";

const GLOBAL_NAMES = [
  "AbortController",
  "CustomEvent",
  "DOMParser",
  "DocumentFragment",
  "Element",
  "Event",
  "FocusEvent",
  "HTMLAnchorElement",
  "HTMLElement",
  "HTMLLinkElement",
  "HTMLMetaElement",
  "HTMLScriptElement",
  "KeyboardEvent",
  "MouseEvent",
  "MutationObserver",
  "Node",
  "NodeList",
  "PageTransitionEvent",
  "ShadowRoot",
  "SVGElement",
];

export function installDom(html, url = "https://blog.example.com/") {
  const dom = new JSDOM(html, { pretendToBeVisual: true, runScripts: "outside-only", url });
  const previousDescriptors = new Map();

  const expose = (name, value) => {
    previousDescriptors.set(name, Object.getOwnPropertyDescriptor(globalThis, name));
    Object.defineProperty(globalThis, name, { configurable: true, value, writable: true });
  };

  expose("window", dom.window);
  expose("document", dom.window.document);
  expose("navigator", dom.window.navigator);

  for (const name of GLOBAL_NAMES) {
    if (dom.window[name]) {
      expose(name, dom.window[name]);
    }
  }

  if (typeof dom.window.crypto.randomUUID !== "function") {
    Object.defineProperty(dom.window.crypto, "randomUUID", { configurable: true, value: randomUUID });
  }

  dom.window.matchMedia =
    dom.window.matchMedia ??
    (() => ({
      addEventListener() {},
      addListener() {},
      dispatchEvent: () => false,
      matches: false,
      media: "",
      onchange: null,
      removeEventListener() {},
      removeListener() {},
    }));
  dom.window.HTMLElement.prototype.scrollIntoView = () => {};
  dom.window.HTMLElement.prototype.scrollTo = () => {};
  dom.window.HTMLElement.prototype.scrollBy = () => {};

  return {
    dom,
    restore() {
      dom.window.close();
      for (const [name, descriptor] of previousDescriptors) {
        if (descriptor) {
          Object.defineProperty(globalThis, name, descriptor);
        } else {
          delete globalThis[name];
        }
      }
    },
  };
}
