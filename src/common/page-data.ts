import type { HaloCurrentRef, HaloData, HaloPageDataPayload, HaloPageType, HaloPostRecord, HaloTaxonomyRecord } from "./types";

const PAGE_DATA_ID = "halo-page-data";

let cachedHomePosts: HaloPostRecord[] = [];

function ensureArray<T>(value: T[] | null | undefined): T[] {
  return Array.isArray(value) ? value : [];
}

function ensurePageType(value: unknown): HaloPageType {
  switch (value) {
    case "index":
    case "categories":
    case "category":
    case "tags":
    case "tag":
    case "post":
      return value;
    default:
      return "unknown";
  }
}

function inferTaxonomyRoot(items: HaloTaxonomyRecord[], fallback: string) {
  const firstItem = items[0];
  const permalink = firstItem?.status?.permalink;
  const slug = firstItem?.spec?.slug ?? firstItem?.metadata?.name;

  if (!permalink || !slug) {
    return fallback;
  }

  const normalizedPermalink = permalink.endsWith("/") ? permalink.slice(0, -1) : permalink;

  if (!normalizedPermalink.endsWith(`/${slug}`)) {
    return fallback;
  }

  return normalizedPermalink.slice(0, normalizedPermalink.length - slug.length - 1);
}

function readPageDataScript() {
  const element = document.getElementById(PAGE_DATA_ID);
  if (!(element instanceof HTMLScriptElement)) {
    return null;
  }

  const content = element.textContent?.trim();
  if (!content) {
    return null;
  }

  try {
    return JSON.parse(content) as Partial<HaloPageDataPayload>;
  } catch (error) {
    console.error("[Theme] Failed to parse halo page data.", error);
    return null;
  }
}

function normalizeCurrentRef(ref: HaloCurrentRef | null | undefined) {
  if (!ref) {
    return null;
  }

  if (!ref.displayName && !ref.permalink && !ref.slug && !ref.title) {
    return null;
  }

  return ref;
}

export function syncHaloDataFromDocument() {
  const payload = readPageDataScript();
  if (!payload) {
    window.haloData = undefined;
    return undefined;
  }

  const pageType = ensurePageType(payload.pageType);

  // Cache homePosts on first index page load; reuse cache on other pages
  if (pageType === "index") {
    const posts = ensureArray(payload.currentPosts);
    if (posts.length > 0) {
      cachedHomePosts = posts;
    }
  }

  const haloData: HaloData = {
    categories: ensureArray(payload.categories),
    currentCategory: normalizeCurrentRef(payload.currentCategory),
    currentPost: normalizeCurrentRef(payload.currentPost),
    currentPosts: ensureArray(payload.currentPosts),
    currentTag: normalizeCurrentRef(payload.currentTag),
    homePosts: cachedHomePosts,
    nextPost: payload.nextPost ?? null,
    pageType,
    pagination: payload.pagination,
    prevPost: payload.prevPost ?? null,
    tags: ensureArray(payload.tags),
    urls: {
      archives: "/archives",
      categories: inferTaxonomyRoot(ensureArray(payload.categories), "/categories"),
      home: "/",
      tags: inferTaxonomyRoot(ensureArray(payload.tags), "/tags"),
    },
    user: typeof payload.user === "string" ? payload.user : "guest",
  };

  window.haloData = haloData;
  return haloData;
}

// ── SEO meta tag sync for Pjax ──────────────────────────────────

function setMetaContent(selector: string, content: string | null) {
  const el = document.querySelector<HTMLMetaElement>(selector);
  if (el && content) {
    el.content = content;
  }
}

function setLinkHref(selector: string, href: string | null) {
  const el = document.querySelector<HTMLLinkElement>(selector);
  if (el && href) {
    el.href = href;
  }
}

export function updateSeoMeta() {
  const element = document.getElementById(PAGE_DATA_ID);
  if (!(element instanceof HTMLScriptElement)) {
    return;
  }

  try {
    const data = JSON.parse(element.textContent?.trim() ?? "{}");
    const seo = data.seo;
    if (!seo) {
      return;
    }

    // Description
    setMetaContent('meta[name="description"]', seo.description);
    // Canonical
    setLinkHref('link[rel="canonical"]', seo.canonical);
    // Open Graph
    setMetaContent('meta[property="og:title"]', seo.title);
    setMetaContent('meta[property="og:description"]', seo.description);
    setMetaContent('meta[property="og:url"]', seo.canonical);
    setMetaContent('meta[property="og:site_name"]', seo.title?.split(" - ").pop() ?? null);

    // OG Image: update or remove
    const ogImage = document.querySelector<HTMLMetaElement>('meta[property="og:image"]');
    if (seo.ogImage) {
      if (ogImage) {
        ogImage.content = seo.ogImage;
      } else {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:image");
        meta.content = seo.ogImage;
        document.head.appendChild(meta);
      }
    } else if (ogImage) {
      ogImage.remove();
    }

    // OG Type
    setMetaContent('meta[property="og:type"]', data.pageType === "post" ? "article" : "website");
    // Twitter
    setMetaContent('meta[name="twitter:title"]', seo.title);
    setMetaContent('meta[name="twitter:description"]', seo.description);
  } catch {
    // Silently ignore parse errors
  }
}
