import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const environment = installDom("<!doctype html><html><head></head><body></body></html>");
const { ensureHomePostsLoaded, fetchRecentHomePosts, syncHaloDataFromDocument } =
  await import("../src/common/page-data.ts");

test.after(() => environment.restore());

test("direct-entry fallback fetches one bounded recent-post page and removes duplicates", async () => {
  let requests = 0;
  globalThis.fetch = async (url) => {
    requests += 1;
    assert.match(String(url), /page=1&size=50$/);
    return new Response(
      JSON.stringify({
        hasNext: true,
        items: [
          { metadata: { name: "one" }, spec: { title: "One" }, status: { permalink: "/one" } },
          { metadata: { name: "one" }, spec: { title: "One duplicate" }, status: { permalink: "/one-copy" } },
          { metadata: { name: "two" }, spec: { title: "Two" }, status: { permalink: "/two" } },
        ],
        totalPages: 100,
      }),
      { headers: { "content-type": "application/json" }, status: 200 },
    );
  };

  const posts = await fetchRecentHomePosts(0);
  assert.equal(requests, 1);
  assert.deepEqual(
    posts?.map((post) => post.metadata?.name),
    ["one", "two"],
  );
});

test("non-index sync uses minimal DOM post records and defers one deduplicated home-post request", async () => {
  let requests = 0;
  globalThis.fetch = async () => {
    requests += 1;
    return new Response(
      JSON.stringify({
        items: [
          {
            metadata: { creationTimestamp: "2026-07-17T08:00:00Z", name: "remote" },
            spec: { owner: "sky", publishTime: "2026-07-17T09:00:00Z", slug: "remote", title: "Remote" },
            status: { permalink: "/remote" },
          },
        ],
      }),
      { headers: { "content-type": "application/json" }, status: 200 },
    );
  };

  document.body.innerHTML = `
    <main id="main">
      <article
        data-post-record
        data-post-name="local"
        data-post-created-at="2026-07-16T08:00:00Z"
        data-post-owner="sky"
        data-post-published-at="2026-07-16T09:00:00Z"
        data-post-slug="local"
        data-post-title="Local post"
        data-post-permalink="/local"
      ></article>
      <article data-post-record data-post-name="local" data-post-title="Duplicate"></article>
      <article data-post-record></article>
    </main>
    <script id="halo-page-data" type="application/json">${JSON.stringify({
      currentPosts: null,
      pageType: "category",
      user: "sky",
    })}</script>
  `;

  const data = syncHaloDataFromDocument();
  assert.equal(requests, 0);
  assert.deepEqual(data?.currentPosts, [
    {
      metadata: { creationTimestamp: "2026-07-16T08:00:00Z", name: "local" },
      spec: {
        owner: "sky",
        publishTime: "2026-07-16T09:00:00Z",
        slug: "local",
        title: "Local post",
      },
      status: { permalink: "/local" },
    },
  ]);

  const [first, second] = await Promise.all([ensureHomePostsLoaded(), ensureHomePostsLoaded()]);
  assert.equal(requests, 1);
  assert.deepEqual(first, second);
  assert.equal(first[0]?.metadata?.name, "remote");
  assert.equal(window.haloData?.homePosts[0]?.metadata?.name, "remote");
});

test("failed lazy home-post requests keep stale data and back off retries", async () => {
  const originalNow = Date.now;
  const futureNow = originalNow() + 6 * 60 * 1000;
  let requests = 0;
  Date.now = () => futureNow;
  globalThis.fetch = async () => {
    requests += 1;
    throw new Error("offline");
  };

  try {
    const first = await ensureHomePostsLoaded();
    const second = await ensureHomePostsLoaded();
    assert.equal(requests, 1);
    assert.equal(first[0]?.metadata?.name, "remote");
    assert.equal(second[0]?.metadata?.name, "remote");
  } finally {
    Date.now = originalNow;
  }
});

test("page payload keeps taxonomy loaded state separate from an empty taxonomy", () => {
  document.body.innerHTML = `<script id="halo-page-data" type="application/json">${JSON.stringify({
    categories: null,
    currentPosts: [],
    pageType: "index",
    tags: [],
    urls: { archives: "/archives", categories: "/categories", home: "/", tags: "/tags" },
    user: "guest",
  })}</script>`;

  const data = syncHaloDataFromDocument();
  assert.equal(data?.categoriesLoaded, false);
  assert.deepEqual(data?.categories, []);
  assert.equal(data?.tagsLoaded, true);
  assert.deepEqual(data?.tags, []);
});

test("API fallback rejects HTTP failures and malformed list payloads", async () => {
  globalThis.fetch = async () => new Response("unavailable", { status: 503 });
  await assert.rejects(fetchRecentHomePosts(1), /HTTP 503/);

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ items: null }), {
      headers: { "content-type": "application/json" },
      status: 200,
    });
  await assert.rejects(fetchRecentHomePosts(1), /does not contain an items array/);
});

test("a newer page payload supersedes stale API fallback results", async () => {
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        items: [
          { spec: { slug: "slug-only", title: "Slug only" }, status: { permalink: "/slug-only" } },
          { spec: { title: "Title only" } },
          {},
        ],
      }),
      { headers: { "content-type": "application/json" }, status: 200 },
    );

  assert.equal(await fetchRecentHomePosts(0), null);
});

test("invalid or missing page data clears stale runtime data", () => {
  window.haloData = { pageType: "post" };
  document.body.innerHTML = '<script id="halo-page-data" type="application/json">{invalid</script>';
  assert.equal(syncHaloDataFromDocument(), undefined);
  assert.equal(window.haloData, undefined);

  window.haloData = { pageType: "post" };
  document.body.innerHTML = '<div id="halo-page-data">not a script</div>';
  assert.equal(syncHaloDataFromDocument(), undefined);
  assert.equal(window.haloData, undefined);
});

test("archive payloads flatten valid year and month post groups", () => {
  const direct = { metadata: { name: "direct" }, spec: { title: "Direct" } };
  const nested = { metadata: { name: "nested" }, spec: { title: "Nested" } };
  document.body.innerHTML = `<script id="halo-page-data" type="application/json">${JSON.stringify({
    categories: [],
    currentPosts: [direct, { months: [{ posts: [nested, null] }, { posts: "invalid" }] }, { months: "invalid" }, null],
    pageType: "archives",
    tags: [],
    user: "sky",
  })}</script>`;

  const data = syncHaloDataFromDocument();
  assert.deepEqual(
    data?.currentPosts.map((post) => post.metadata?.name),
    ["direct", "nested"],
  );
  assert.equal(data?.user, "sky");
});

test("payload normalization infers taxonomy roots and rejects empty references and URLs", () => {
  document.body.innerHTML = `<script id="halo-page-data" type="application/json">${JSON.stringify({
    categories: [{ metadata: { name: "halo" }, spec: { slug: "halo" }, status: { permalink: "/topics/halo/" } }],
    currentAuthor: {},
    currentCategory: { displayName: "Halo", permalink: "/topics/halo", slug: "halo" },
    currentPosts: [{ invalid: true }, { spec: { title: "Valid" } }],
    pageType: "category",
    tags: [{ metadata: { name: "pixel" }, spec: { slug: "pixel" }, status: { permalink: "/labels/pixel" } }],
    urls: { archives: " ", categories: "", home: "/home", tags: null },
    user: 42,
  })}</script>`;

  const data = syncHaloDataFromDocument();
  assert.equal(data?.currentAuthor, null);
  assert.equal(data?.currentCategory?.slug, "halo");
  assert.equal(data?.currentPosts.length, 1);
  assert.deepEqual(data?.urls, {
    archives: "/archives",
    categories: "/topics",
    home: "/home",
    tags: "/labels",
  });
  assert.equal(data?.user, "guest");
});

test("unknown page types and mismatched taxonomy permalinks use safe defaults", () => {
  document.body.innerHTML = `<script id="halo-page-data" type="application/json">${JSON.stringify({
    categories: [{ spec: { slug: "halo" }, status: { permalink: "/topics/not-halo" } }],
    currentPosts: "invalid",
    pageType: "future-page-type",
    tags: [],
    user: "guest",
  })}</script>`;

  const data = syncHaloDataFromDocument();
  assert.equal(data?.pageType, "unknown");
  assert.deepEqual(data?.currentPosts, []);
  assert.equal(data?.urls.categories, "/categories");
  assert.equal(data?.urls.tags, "/tags");
});
