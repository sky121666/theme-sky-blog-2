import type {
  HaloCurrentRef,
  HaloData,
  HaloPageDataPayload,
  HaloPageType,
  HaloPostRecord,
  HaloTaxonomyRecord,
} from "./types";
import { logError } from "./logger";
import { dispatchRuntimeStatus } from "./runtime-events";

const PAGE_DATA_ID = "halo-page-data";
const POSTS_API = "/apis/api.content.halo.run/v1alpha1/posts?sort=spec.publishTime%2Cdesc";
const HOME_POST_PAGE_SIZE = 50;
const HOME_POST_CACHE_TTL_MS = 5 * 60 * 1000;
const HOME_POST_RETRY_DELAY_MS = 30 * 1000;

let cachedHomePosts: HaloPostRecord[] = [];
let cachedHomePostsAt = 0;
let cacheRevision = 0;
let fetchInFlight: Promise<HaloPostRecord[]> | null = null;
let nextFetchAllowedAt = 0;

function ensureArray<T>(value: T[] | null | undefined): T[] {
  return Array.isArray(value) ? value : [];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isPostRecord(value: unknown): value is HaloPostRecord {
  return isRecord(value) && ("metadata" in value || "spec" in value || "status" in value);
}

function normalizeCurrentPosts(value: unknown, pageType: HaloPageType) {
  if (!Array.isArray(value)) {
    return [];
  }

  if (pageType !== "archives") {
    return value.filter(isPostRecord);
  }

  return value.flatMap((yearGroup) => {
    if (isPostRecord(yearGroup)) {
      return [yearGroup];
    }

    if (!isRecord(yearGroup) || !Array.isArray(yearGroup.months)) {
      return [];
    }

    return yearGroup.months.flatMap((monthGroup) => {
      if (!isRecord(monthGroup) || !Array.isArray(monthGroup.posts)) {
        return [];
      }

      return monthGroup.posts.filter(isPostRecord);
    });
  });
}

function readPostDatasetValue(element: HTMLElement, key: keyof DOMStringMap) {
  const value = element.dataset[key]?.trim();
  return value || null;
}

function readCurrentPostsFromDocument() {
  const main = document.getElementById("main");
  if (!main) {
    return [];
  }

  const seenPostKeys = new Set<string>();

  return Array.from(main.querySelectorAll<HTMLElement>("[data-post-record]")).flatMap((element) => {
    const post: HaloPostRecord = {
      metadata: {
        creationTimestamp: readPostDatasetValue(element, "postCreatedAt"),
        name: readPostDatasetValue(element, "postName"),
      },
      spec: {
        owner: readPostDatasetValue(element, "postOwner"),
        publishTime: readPostDatasetValue(element, "postPublishedAt"),
        slug: readPostDatasetValue(element, "postSlug"),
        title: readPostDatasetValue(element, "postTitle"),
      },
      status: {
        permalink: readPostDatasetValue(element, "postPermalink"),
      },
    };
    const key = post.metadata?.name || post.status?.permalink || post.spec?.slug || post.spec?.title;

    if (!key || seenPostKeys.has(key)) {
      return [];
    }

    seenPostKeys.add(key);
    return [post];
  });
}

function ensurePageType(value: unknown): HaloPageType {
  switch (value) {
    case "archives":
    case "author":
    case "index":
    case "page":
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

function ensureUrl(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function isHomePostCacheStale(now = Date.now()) {
  return cachedHomePostsAt === 0 || now - cachedHomePostsAt >= HOME_POST_CACHE_TTL_MS;
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
    logError("Failed to parse halo page data.", error);
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
  const currentPosts = Array.isArray(payload.currentPosts)
    ? normalizeCurrentPosts(payload.currentPosts, pageType)
    : readCurrentPostsFromDocument();
  const categoriesLoaded = Array.isArray(payload.categories);
  const tagsLoaded = Array.isArray(payload.tags);
  const categories = ensureArray(payload.categories);
  const tags = ensureArray(payload.tags);

  // Index page data is authoritative, including an intentionally empty list.
  if (pageType === "index") {
    cachedHomePosts = currentPosts;
    cachedHomePostsAt = Date.now();
    cacheRevision += 1;
    nextFetchAllowedAt = 0;
  }

  const inferredCategoriesUrl = inferTaxonomyRoot(categories, "/categories");
  const inferredTagsUrl = inferTaxonomyRoot(tags, "/tags");

  const haloData: HaloData = {
    categories,
    categoriesLoaded,
    currentAuthor: normalizeCurrentRef(payload.currentAuthor),
    currentCategory: normalizeCurrentRef(payload.currentCategory),
    currentPage: normalizeCurrentRef(payload.currentPage),
    currentPost: normalizeCurrentRef(payload.currentPost),
    currentPosts,
    currentTag: normalizeCurrentRef(payload.currentTag),
    homePosts: cachedHomePosts,
    nextPost: payload.nextPost ?? null,
    pageType,
    pagination: payload.pagination,
    prevPost: payload.prevPost ?? null,
    tags,
    tagsLoaded,
    urls: {
      archives: ensureUrl(payload.urls?.archives, "/archives"),
      categories: ensureUrl(payload.urls?.categories, inferredCategoriesUrl),
      home: ensureUrl(payload.urls?.home, "/"),
      tags: ensureUrl(payload.urls?.tags, inferredTagsUrl),
    },
    user: typeof payload.user === "string" ? payload.user : "guest",
  };

  window.haloData = haloData;

  return haloData;
}

// ── API fallback for home posts ──────────────────────────────────

interface ContentApiPostItem {
  metadata?: { name?: string; creationTimestamp?: string };
  spec?: { title?: string; slug?: string; publishTime?: string; owner?: string };
  status?: { permalink?: string };
}

interface ContentApiListResponse {
  items?: ContentApiPostItem[];
}

function mapApiPostsToRecords(items: ContentApiPostItem[]): HaloPostRecord[] {
  return items.map((item) => ({
    metadata: {
      creationTimestamp: item.metadata?.creationTimestamp ?? null,
      name: item.metadata?.name ?? null,
    },
    spec: {
      owner: item.spec?.owner ?? null,
      publishTime: item.spec?.publishTime ?? null,
      slug: item.spec?.slug ?? null,
      title: item.spec?.title ?? null,
    },
    status: {
      permalink: item.status?.permalink ?? null,
    },
  }));
}

export async function fetchRecentHomePosts(revisionAtRequestStart: number) {
  const response = await fetch(`${POSTS_API}&page=1&size=${HOME_POST_PAGE_SIZE}`);
  if (!response.ok) {
    throw new Error(`Content API returned HTTP ${response.status}.`);
  }

  const data = (await response.json()) as ContentApiListResponse;
  if (!Array.isArray(data.items)) {
    throw new Error("Content API response does not contain an items array.");
  }

  if (cacheRevision !== revisionAtRequestStart) {
    return null;
  }

  const seenPostKeys = new Set<string>();
  return mapApiPostsToRecords(data.items).filter((post) => {
    const key = post.metadata?.name || post.status?.permalink || post.spec?.slug || post.spec?.title;
    if (!key || seenPostKeys.has(key)) {
      return false;
    }

    seenPostKeys.add(key);
    return true;
  });
}

function fetchHomePostsFromApi() {
  if (fetchInFlight) {
    return fetchInFlight;
  }

  if (Date.now() < nextFetchAllowedAt) {
    return null;
  }

  const revisionAtRequestStart = cacheRevision;

  fetchInFlight = (async () => {
    try {
      const posts = await fetchRecentHomePosts(revisionAtRequestStart);

      // A newer index-page payload supersedes this background request.
      if (!posts || cacheRevision !== revisionAtRequestStart) {
        return cachedHomePosts;
      }

      cachedHomePosts = posts;
      cachedHomePostsAt = Date.now();
      cacheRevision += 1;
      nextFetchAllowedAt = 0;

      // Patch live haloData so ls immediately reflects the fetched posts
      if (window.haloData && window.haloData.pageType !== "index") {
        window.haloData.homePosts = cachedHomePosts;
      }
      return cachedHomePosts;
    } catch (error) {
      nextFetchAllowedAt = Date.now() + HOME_POST_RETRY_DELAY_MS;
      logError("Failed to refresh home posts.", error);
      dispatchRuntimeStatus({
        level: "warning",
        message: "Unable to refresh the post list. Cached data will remain available.",
      });
      return cachedHomePosts;
    } finally {
      fetchInFlight = null;
    }
  })();

  return fetchInFlight;
}

/**
 * Load the virtual root's post records only when a terminal/VFS action needs
 * them. A fresh server-rendered index payload stays authoritative; stale data
 * remains usable while one deduplicated refresh runs, and failures back off.
 */
export function ensureHomePostsLoaded(): Promise<HaloPostRecord[]> {
  if (!isHomePostCacheStale()) {
    return Promise.resolve(cachedHomePosts);
  }

  return fetchHomePostsFromApi() ?? Promise.resolve(cachedHomePosts);
}
