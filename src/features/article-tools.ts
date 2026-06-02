export interface ArticleTocItem {
  id: string;
  level: number;
  text: string;
}

const CONTENT_SELECTOR = ".terminal-content";
const HEADING_SELECTOR = "h2, h3";

function getMainScrollContainer() {
  return document.getElementById("main");
}

function getScrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

function slugifyHeading(text: string, index: number) {
  const normalized = text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

  return `toc-${normalized || "section"}-${index + 1}`;
}

export function getArticleToc(): ArticleTocItem[] {
  const content = document.querySelector(CONTENT_SELECTOR);
  if (!content) {
    return [];
  }

  return Array.from(content.querySelectorAll<HTMLHeadingElement>(HEADING_SELECTOR))
    .map((heading, index) => {
      const text = heading.textContent?.trim() ?? "";
      if (!text) {
        return null;
      }

      if (!heading.id) {
        heading.id = slugifyHeading(text, index);
      }

      return {
        id: heading.id,
        level: Number(heading.tagName.slice(1)),
        text,
      };
    })
    .filter((item): item is ArticleTocItem => item !== null);
}

export function formatArticleToc(items = getArticleToc()) {
  if (window.haloData?.pageType !== "post") {
    return "toc: only available on post pages";
  }

  if (items.length === 0) {
    return "toc: no headings found in this article";
  }

  return items
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

  const url = window.haloData.currentPost?.permalink ?? window.location.href;

  try {
    await navigator.clipboard.writeText(url);
    return "Copied current article link.";
  } catch {
    return `Copy unavailable. Link: ${url}`;
  }
}
