import type { DirectoryEntry, HaloCurrentRef, HaloPostRecord, HaloTaxonomyRecord } from "./types";

// ── Taxonomy / Post accessors ──────────────────────────────────────

export function getTaxonomyName(item: HaloTaxonomyRecord) {
  return item.spec?.displayName || item.spec?.slug || item.metadata?.name || "unknown";
}

export function getTaxonomySlug(item: HaloTaxonomyRecord) {
  return item.spec?.slug || item.metadata?.name || getTaxonomyName(item);
}

export function getPostName(item: HaloPostRecord) {
  return item.spec?.title || item.spec?.slug || item.metadata?.name || "untitled";
}

export function getPostSlug(item: HaloPostRecord) {
  return item.spec?.slug || item.metadata?.name || getPostName(item);
}

function getSafePathSegment(value: string | null | undefined) {
  return (value || "unknown").replaceAll("/", "-");
}

export function getRefSlug(ref: HaloCurrentRef | null | undefined) {
  return getSafePathSegment(ref?.slug || ref?.title || ref?.displayName || "unknown");
}

export function getCurrentUser() {
  return window.haloData?.user || "user";
}

// ── Directory entries ──────────────────────────────────────────────

export function mapPostsToDirectoryEntries(posts: HaloPostRecord[]): DirectoryEntry[] {
  return posts.map((post) => ({
    date: post.spec?.publishTime || post.metadata?.creationTimestamp || null,
    name: getPostName(post),
    permalink: post.status?.permalink || null,
    slug: getPostSlug(post),
    type: "file",
  }));
}

export function getDirectoryContent(path: string): DirectoryEntry[] | null {
  if (path === "~/blog") {
    return [
      {
        count: window.haloData?.categories.length || 0,
        name: "categories",
        type: "dir",
      },
      {
        count: window.haloData?.tags.length || 0,
        name: "tags",
        type: "dir",
      },
      ...mapPostsToDirectoryEntries(window.haloData?.homePosts || []),
    ];
  }

  if (path === "~/blog/categories") {
    return (window.haloData?.categories || []).map((category) => ({
      count: category.postCount || 0,
      date: category.metadata?.creationTimestamp || null,
      name: getTaxonomyName(category),
      permalink: category.status?.permalink || null,
      slug: getTaxonomySlug(category),
      type: "dir",
    }));
  }

  if (path === "~/blog/tags") {
    return (window.haloData?.tags || []).map((tag) => ({
      count: tag.postCount || 0,
      date: tag.metadata?.creationTimestamp || null,
      name: getTaxonomyName(tag),
      permalink: tag.status?.permalink || null,
      slug: getTaxonomySlug(tag),
      type: "dir",
    }));
  }

  if (path.startsWith("~/blog/categories/")) {
    const slug = path.slice("~/blog/categories/".length);
    const currentCategorySlug = getRefSlug(window.haloData?.currentCategory);

    if (window.haloData?.pageType === "category" && currentCategorySlug === slug) {
      return mapPostsToDirectoryEntries(window.haloData.currentPosts);
    }

    const category = (window.haloData?.categories || []).find((item) => getTaxonomySlug(item) === slug);

    return category ? [] : null;
  }

  if (path.startsWith("~/blog/tags/")) {
    const slug = path.slice("~/blog/tags/".length);
    const currentTagSlug = getRefSlug(window.haloData?.currentTag);

    if (window.haloData?.pageType === "tag" && currentTagSlug === slug) {
      return mapPostsToDirectoryEntries(window.haloData.currentPosts);
    }

    const tag = (window.haloData?.tags || []).find((item) => getTaxonomySlug(item) === slug);

    return tag ? [] : null;
  }

  return null;
}

// ── Path operations ────────────────────────────────────────────────

export function normalizePath(path: string): string {
  let normalizedPath = path;

  if (normalizedPath === "~") {
    normalizedPath = "~/blog";
  } else if (normalizedPath.startsWith("~/") && !normalizedPath.startsWith("~/blog")) {
    normalizedPath = `~/blog${normalizedPath.slice(1)}`;
  }

  if (!normalizedPath.startsWith("~/blog")) {
    normalizedPath = normalizedPath.startsWith("/") ? `~/blog${normalizedPath}` : `~/blog/${normalizedPath}`;
  }

  const stack: string[] = [];

  normalizedPath.split("/").forEach((segment) => {
    if (!segment || segment === ".") {
      return;
    }

    if (segment === "..") {
      if (stack.length > 2) {
        stack.pop();
      }
      return;
    }

    stack.push(segment);
  });

  return stack.length < 2 ? "~/blog" : stack.join("/");
}

export function resolvePath(target: string, currentPath: string): string {
  if (target.startsWith("/") || target.startsWith("~")) {
    return normalizePath(target);
  }

  const basePath = currentPath.endsWith("/") ? currentPath : `${currentPath}/`;

  return normalizePath(`${basePath}${target}`);
}

export function getParentPath(path: string): string {
  if (path === "~/blog") {
    return "~/blog";
  }

  const segments = path.split("/");
  segments.pop();

  return segments.length < 2 ? "~/blog" : segments.join("/");
}

// ── Virtual path ↔ URL mapping ─────────────────────────────────────

export function virtualPathToUrl(path: string): string | null {
  if (path === "~/blog") {
    return window.haloData?.urls.home || "/";
  }

  if (path === "~/blog/categories") {
    return window.haloData?.urls.categories || "/categories";
  }

  if (path === "~/blog/tags") {
    return window.haloData?.urls.tags || "/tags";
  }

  if (path.startsWith("~/blog/categories/")) {
    const slug = path.slice("~/blog/categories/".length);
    const category = (window.haloData?.categories || []).find((item) => getTaxonomySlug(item) === slug);

    return category?.status?.permalink || null;
  }

  if (path.startsWith("~/blog/tags/")) {
    const slug = path.slice("~/blog/tags/".length);
    const tag = (window.haloData?.tags || []).find((item) => getTaxonomySlug(item) === slug);

    return tag?.status?.permalink || null;
  }

  return null;
}

export function syncPathWithUrl(): string {
  switch (window.haloData?.pageType) {
    case "categories":
      return "~/blog/categories";
    case "category":
      return `~/blog/categories/${getRefSlug(window.haloData.currentCategory)}`;
    case "post":
      return `~/blog/${getRefSlug(window.haloData.currentPost)}`;
    case "tag":
      return `~/blog/tags/${getRefSlug(window.haloData.currentTag)}`;
    case "tags":
      return "~/blog/tags";
    default:
      return "~/blog";
  }
}
