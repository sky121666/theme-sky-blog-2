import { getPreferredScrollBehavior } from "../common/motion";

export interface ArticleTocItem {
  id: string;
  level: number;
  text: string;
}

const CONTENT_SELECTOR = ".terminal-content";
const HEADING_SELECTOR = "h1, h2, h3";
type TocListener = (items: ArticleTocItem[]) => void;
const tocCache = new WeakMap<Element, ReturnType<typeof createTocIndex>>();

function getMainScrollContainer() {
  return document.getElementById("main");
}

function getScrollBehavior(): ScrollBehavior {
  return getPreferredScrollBehavior();
}

function slugifyHeading(text: string, index: number) {
  const normalized = text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

  return `toc-${normalized || "section"}-${index + 1}`;
}

function indexHeadings(content: Element) {
  const items: ArticleTocItem[] = [];
  content.querySelectorAll<HTMLHeadingElement>(HEADING_SELECTOR).forEach((heading, index) => {
    const text = heading.textContent?.trim() ?? "";
    if (!text) {
      return;
    }

    if (!heading.id) {
      const baseId = slugifyHeading(text, index);
      let id = baseId;
      for (let suffix = 2; content.ownerDocument.getElementById(id); suffix += 1) {
        id = `${baseId}-${suffix}`;
      }
      heading.id = id;
    }

    items.push({ id: heading.id, level: Number(heading.tagName.slice(1)), text });
  });

  return items;
}

function containsHeading(node: Node) {
  return node instanceof Element && (node.matches(HEADING_SELECTOR) || node.querySelector(HEADING_SELECTOR) !== null);
}

function changesToc(content: Element, { type, target, addedNodes, removedNodes }: MutationRecord) {
  if (type === "attributes") {
    return target !== content && (target as Element).matches(HEADING_SELECTOR);
  }

  const element = target instanceof Element ? target : target.parentElement;
  const heading = element?.closest(HEADING_SELECTOR);
  return (
    (heading && heading !== content && content.contains(heading)) ||
    Array.from(addedNodes).some(containsHeading) ||
    Array.from(removedNodes).some(containsHeading)
  );
}

function createTocIndex(content: Element) {
  const listeners = new Set<TocListener>();
  let items = indexHeadings(content);
  const hasHeadingChanges = (records: MutationRecord[]) => records.some((record) => changesToc(content, record));
  const observer = new MutationObserver((records) => {
    if (hasHeadingChanges(records)) {
      if (listeners.size > 0) refresh();
      else dispose();
    }
  });
  observer.observe(content, { subtree: true, childList: true, characterData: true, attributeFilter: ["id"] });

  function dispose() {
    observer.disconnect();
    tocCache.delete(content);
  }

  function refresh() {
    const nextItems = indexHeadings(content);
    // The generated IDs are already included in nextItems.
    observer.takeRecords();
    if (
      nextItems.length === items.length &&
      nextItems.every(({ id, level, text }, index) => {
        const previous = items[index];
        return id === previous.id && level === previous.level && text === previous.text;
      })
    ) {
      return;
    }
    items = nextItems;
    for (const listener of listeners) listener(items);
  }

  function read() {
    // Commands can run before the observer delivers the mutation batch.
    if (hasHeadingChanges(observer.takeRecords())) refresh();
    return items;
  }

  return {
    read,
    subscribe(listener: TocListener) {
      const current = read();
      listeners.add(listener);
      listener(current);
      return () => {
        if (listeners.delete(listener) && listeners.size === 0) dispose();
      };
    },
  };
}

function getTocIndex(content: Element) {
  const cached = tocCache.get(content);
  if (cached) return cached;

  const index = createTocIndex(content);
  tocCache.set(content, index);
  return index;
}

export function getArticleToc(
  content = getMainScrollContainer()?.querySelector(CONTENT_SELECTOR) ?? document.querySelector(CONTENT_SELECTOR),
): ArticleTocItem[] {
  return content ? getTocIndex(content).read() : [];
}

export function observeArticleToc(content: Element, listener: TocListener) {
  return getTocIndex(content).subscribe(listener);
}

export function formatArticleToc(items?: ArticleTocItem[]) {
  if (window.haloData?.pageType !== "post") {
    return "toc: only available on post pages";
  }

  const headings = items ?? getArticleToc();
  if (headings.length === 0) {
    return "toc: no headings found in this article";
  }

  return headings
    .map((item, index) => {
      const indent = item.level > 2 ? "  " : "";
      return `${String(index + 1).padStart(2, "0")}. ${indent}${item.text}`;
    })
    .join("\n");
}

export function scrollToArticleHeading(index: number): string | null {
  if (window.haloData?.pageType !== "post") {
    return "jump: only available on post pages";
  }

  const items = getArticleToc();
  const target = items[index - 1];
  if (!target) {
    return `jump: heading ${index} not found`;
  }

  document.getElementById(target.id)?.scrollIntoView({
    behavior: getScrollBehavior(),
    block: "start",
  });

  return null;
}

export function scrollMainToTop() {
  getMainScrollContainer()?.scrollTo({
    behavior: getScrollBehavior(),
    top: 0,
  });
}

export function scrollMainToBottom() {
  const main = getMainScrollContainer();
  main?.scrollTo({
    behavior: getScrollBehavior(),
    top: main.scrollHeight,
  });
}

export async function copyArticleLink() {
  if (window.haloData?.pageType !== "post") {
    return "copy: only available on post pages";
  }

  const url = new URL(window.haloData.currentPost?.permalink || window.location.href, window.location.href).href;

  try {
    await navigator.clipboard.writeText(url);
    return "Copied current article link.";
  } catch {
    return `Copy unavailable. Link: ${url}`;
  }
}
