import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const environment = installDom("<!doctype html><html><head></head><body></body></html>");
const { dispatchCommand } = await import("../src/features/commands.ts");
const {
  getCurrentUser,
  getDirectoryContent,
  getParentPath,
  getPostName,
  getPostSlug,
  getRefSlug,
  getTaxonomyName,
  getTaxonomySlug,
  mapPostsToDirectoryEntries,
  normalizePath,
  resolvePath,
  syncPathWithUrl,
  virtualPathToUrl,
} = await import("../src/common/virtual-fs.ts");

test.after(() => environment.restore());

function createHaloData(overrides = {}) {
  return {
    categories: [],
    categoriesLoaded: true,
    currentAuthor: null,
    currentCategory: null,
    currentPage: null,
    currentPost: null,
    currentPosts: [],
    currentTag: null,
    homePosts: [],
    nextPost: null,
    pageType: "index",
    pagination: undefined,
    prevPost: null,
    tags: [],
    tagsLoaded: true,
    urls: {
      archives: "/archives",
      categories: "/categories",
      home: "/",
      tags: "/tags",
    },
    user: "guest",
    ...overrides,
  };
}

test("taxonomy paths use custom Halo route roots without requiring global listAll payloads", () => {
  window.haloData = {
    categories: [],
    categoriesLoaded: false,
    currentPosts: [],
    homePosts: [],
    pageType: "post",
    tags: [],
    tagsLoaded: false,
    urls: {
      archives: "/timeline",
      categories: "/topics",
      home: "/",
      tags: "/labels/",
    },
    user: "guest",
  };

  assert.equal(virtualPathToUrl("~/blog/categories/halo theme"), "/topics/halo%20theme");
  assert.equal(virtualPathToUrl("~/blog/tags/pixel"), "/labels/pixel");
});

test("taxonomy directories preserve unloaded, loaded-empty, and loaded-with-data states", async () => {
  window.haloData.categories = [];
  window.haloData.categoriesLoaded = false;
  assert.equal(getDirectoryContent("~/blog/categories"), undefined);
  assert.match((await dispatchCommand("ls", "categories", "~/blog")).output, /is not loaded on this page/);

  window.haloData.categoriesLoaded = true;
  assert.deepEqual(getDirectoryContent("~/blog/categories"), []);
  assert.equal((await dispatchCommand("ls", "categories", "~/blog")).output, "(empty directory)");

  window.haloData.categories = [
    { metadata: { name: "halo" }, spec: { displayName: "Halo", slug: "halo" }, status: { permalink: "/topics/halo" } },
  ];
  assert.deepEqual(
    getDirectoryContent("~/blog/categories")?.map((entry) => entry.name),
    ["Halo"],
  );
});

test("record accessors use stable fallbacks and sanitize reference path segments", () => {
  assert.equal(getTaxonomyName({ spec: { displayName: "Display", slug: "slug" } }), "Display");
  assert.equal(getTaxonomyName({ spec: { slug: "slug" } }), "slug");
  assert.equal(getTaxonomySlug({ metadata: { name: "metadata" } }), "metadata");
  assert.equal(getTaxonomyName({}), "unknown");

  assert.equal(getPostName({ spec: { title: "Title", slug: "post" } }), "Title");
  assert.equal(getPostSlug({ metadata: { name: "metadata" } }), "metadata");
  assert.equal(getPostName({}), "untitled");
  assert.equal(getRefSlug({ title: "folder/name" }), "folder-name");
  assert.equal(getRefSlug(null), "unknown");

  window.haloData = createHaloData({ user: "sky" });
  assert.equal(getCurrentUser(), "sky");
  window.haloData = undefined;
  assert.equal(getCurrentUser(), "user");
});

test("virtual paths normalize absolute, home, relative, and traversal inputs", () => {
  assert.equal(normalizePath("~"), "~/blog");
  assert.equal(normalizePath("~/tags"), "~/blog/tags");
  assert.equal(normalizePath("/categories"), "~/blog/categories");
  assert.equal(normalizePath("archives"), "~/blog/archives");
  assert.equal(normalizePath("~/blog/categories/../tags/./pixel"), "~/blog/tags/pixel");
  assert.equal(normalizePath("~/blog/../../../../"), "~/blog");
  assert.equal(resolvePath("../tags", "~/blog/categories"), "~/blog/tags");
  assert.equal(resolvePath("/archives", "~/blog/categories"), "~/blog/archives");
  assert.equal(getParentPath("~/blog/categories/halo"), "~/blog/categories");
  assert.equal(getParentPath("~/blog"), "~/blog");
});

test("directory content maps home, archive, taxonomy, and author page payloads", () => {
  const post = {
    metadata: { creationTimestamp: "2026-07-01", name: "post-record" },
    spec: { publishTime: "2026-07-02", slug: "hello", title: "Hello" },
    status: { permalink: "/hello" },
  };
  assert.deepEqual(mapPostsToDirectoryEntries([post]), [
    {
      date: "2026-07-02",
      name: "Hello",
      permalink: "/hello",
      slug: "hello",
      type: "file",
    },
  ]);

  window.haloData = createHaloData({
    categories: [{ postCount: 2, spec: { displayName: "Halo", slug: "halo" } }],
    homePosts: [post],
    tags: [{ postCount: 3, spec: { displayName: "Pixel", slug: "pixel" } }],
  });
  assert.deepEqual(
    getDirectoryContent("~/blog")?.map((entry) => [entry.name, entry.type, entry.count]),
    [
      ["categories", "dir", 1],
      ["tags", "dir", 1],
      ["archives", "dir", undefined],
      ["Hello", "file", undefined],
    ],
  );

  window.haloData = createHaloData({ currentPosts: [post], pageType: "archives" });
  assert.equal(getDirectoryContent("~/blog/archives")?.[0].name, "Hello");
  window.haloData.pageType = "post";
  assert.equal(getDirectoryContent("~/blog/archives"), null);

  window.haloData = createHaloData({
    currentCategory: { slug: "halo" },
    currentPosts: [post],
    pageType: "category",
  });
  assert.equal(getDirectoryContent("~/blog/categories/halo")?.[0].slug, "hello");
  assert.equal(getDirectoryContent("~/blog/categories/other"), null);

  window.haloData = createHaloData({
    currentAuthor: { slug: "sky" },
    currentPosts: [post],
    pageType: "author",
  });
  assert.equal(getDirectoryContent("~/blog/authors/sky")?.[0].name, "Hello");
  assert.equal(getDirectoryContent("~/blog/unknown"), null);
});

test("virtual URLs prefer current records and fall back only to safe route mappings", () => {
  const post = {
    metadata: { name: "record" },
    spec: { slug: "hello", title: "Hello" },
    status: { permalink: "/posts/hello" },
  };
  window.haloData = createHaloData({
    categories: [{ spec: { slug: "halo" }, status: { permalink: "/topics/halo" } }],
    currentAuthor: { permalink: "/authors/sky", slug: "sky" },
    currentPage: { permalink: "/about", slug: "about" },
    currentPost: { permalink: "/current", slug: "current" },
    currentPosts: [post],
    tags: [{ spec: { slug: "pixel" }, status: { permalink: "/labels/pixel" } }],
    urls: { archives: "/timeline", categories: "/topics", home: "/home", tags: "/labels" },
  });

  assert.equal(virtualPathToUrl("~/blog"), "/home");
  assert.equal(virtualPathToUrl("~/blog/archives"), "/timeline");
  assert.equal(virtualPathToUrl("~/blog/categories/halo"), "/topics/halo");
  assert.equal(virtualPathToUrl("~/blog/categories/space tag"), "/topics/space%20tag");
  assert.equal(virtualPathToUrl("~/blog/tags/pixel"), "/labels/pixel");
  assert.equal(virtualPathToUrl("~/blog/authors/sky"), "/authors/sky");
  assert.equal(virtualPathToUrl("~/blog/authors/other"), null);
  assert.equal(virtualPathToUrl("~/blog/pages/about"), "/about");
  assert.equal(virtualPathToUrl("~/blog/current"), "/current");
  assert.equal(virtualPathToUrl("~/blog/hello"), "/posts/hello");
  assert.equal(virtualPathToUrl("~/blog/nested/path"), null);
  assert.equal(virtualPathToUrl("~/elsewhere"), null);
});

test("URL synchronization covers every Halo page type", () => {
  const cases = [
    ["archives", {}, "~/blog/archives"],
    ["author", { currentAuthor: { slug: "sky" } }, "~/blog/authors/sky"],
    ["categories", {}, "~/blog/categories"],
    ["category", { currentCategory: { slug: "halo" } }, "~/blog/categories/halo"],
    ["post", { currentPost: { slug: "hello" } }, "~/blog/hello"],
    ["page", { currentPage: { slug: "about" } }, "~/blog/pages/about"],
    ["tag", { currentTag: { slug: "pixel" } }, "~/blog/tags/pixel"],
    ["tags", {}, "~/blog/tags"],
    ["unknown", {}, "~/blog"],
  ];

  for (const [pageType, refs, expected] of cases) {
    window.haloData = createHaloData({ pageType, ...refs });
    assert.equal(syncPathWithUrl(), expected, pageType);
  }
});
