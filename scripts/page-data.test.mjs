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

test("only the canonical first page seeds recent posts; paginated and empty pages keep it", () => {
  const first = { metadata: { name: "first" }, spec: { slug: "first", title: "First" } };
  const second = { metadata: { name: "second" }, spec: { slug: "second", title: "Second" } };
  const payload = (currentPosts) =>
    `<script id="halo-page-data" type="application/json">${JSON.stringify({ currentPosts, pageType: "index", urls: { home: "/" } })}</script>`;

  window.history.replaceState(null, "", "/");
  document.body.innerHTML = payload([]);
  syncHaloDataFromDocument();
  document.body.innerHTML = payload([first]);
  assert.deepEqual(syncHaloDataFromDocument()?.homePosts, [first]);

  try {
    window.history.replaceState(null, "", "/page/2");
    document.body.innerHTML = payload([second]);
    const secondPage = syncHaloDataFromDocument();
    assert.deepEqual(secondPage?.currentPosts, [second]);
    assert.deepEqual(secondPage?.homePosts, [first]);

    window.history.replaceState(null, "", "/page/999999");
    document.body.innerHTML = payload([]);
    const emptyPage = syncHaloDataFromDocument();
    assert.deepEqual(emptyPage?.currentPosts, []);
    assert.deepEqual(emptyPage?.homePosts, [first]);
  } finally {
    window.history.replaceState(null, "", "/");
  }
});

test("recent-post refresh keeps the rendered page list separate and serves a stale fallback immediately", async () => {
  const first = { metadata: { name: "first" }, spec: { slug: "first", title: "First" } };
  let resolveFetch;
  let requests = 0;
  globalThis.fetch = () => {
    requests += 1;
    return new Promise((resolve) => {
      resolveFetch = resolve;
    });
  };

  document.body.innerHTML = `<script id="halo-page-data" type="application/json">${JSON.stringify({ currentPosts: [], pageType: "index", urls: { home: "/" } })}</script>`;
  syncHaloDataFromDocument();
  document.body.innerHTML = `<script id="halo-page-data" type="application/json">${JSON.stringify({ currentPosts: [first], pageType: "index", urls: { home: "/" } })}</script>`;
  syncHaloDataFromDocument();

  const cached = await ensureHomePostsLoaded();
  assert.equal(requests, 1);
  assert.deepEqual(cached, [first]);

  const refreshed = ensureHomePostsLoaded({ waitForRefresh: true });
  assert.equal(requests, 1);
  resolveFetch(
    new Response(
      JSON.stringify({ items: [{ metadata: { name: "remote" }, spec: { slug: "remote", title: "Remote" } }] }),
      {
        headers: { "content-type": "application/json" },
        status: 200,
      },
    ),
  );
  assert.deepEqual(
    (await refreshed).map((post) => post.metadata?.name),
    ["remote"],
  );
  assert.deepEqual(window.haloData?.currentPosts, [first]);
  assert.equal(window.haloData?.homePosts[0]?.metadata?.name, "remote");
});

test("a hung Content API request is aborted after the time limit and preserves cached posts", async () => {
  const first = { metadata: { name: "first" }, spec: { slug: "first", title: "First" } };
  document.body.innerHTML = `<script id="halo-page-data" type="application/json">${JSON.stringify({ currentPosts: [], pageType: "index", urls: { home: "/" } })}</script>`;
  syncHaloDataFromDocument();
  document.body.innerHTML = `<script id="halo-page-data" type="application/json">${JSON.stringify({ currentPosts: [first], pageType: "index", urls: { home: "/" } })}</script>`;
  syncHaloDataFromDocument();

  const originalSetTimeout = window.setTimeout.bind(window);
  const originalClearTimeout = window.clearTimeout.bind(window);
  let signal;
  globalThis.fetch = (_url, options) => {
    signal = options.signal;
    return new Promise(() => {});
  };
  window.setTimeout = (callback, delay, ...args) => {
    if (delay === 8000) {
      queueMicrotask(callback);
      return 99999;
    }
    return originalSetTimeout(callback, delay, ...args);
  };
  window.clearTimeout = (id) => {
    if (id !== 99999) originalClearTimeout(id);
  };

  try {
    const posts = await ensureHomePostsLoaded({ waitForRefresh: true });
    assert.deepEqual(posts, [first]);
    assert.equal(signal?.aborted, true);
  } finally {
    window.setTimeout = originalSetTimeout;
    window.clearTimeout = originalClearTimeout;
  }
});

test("returning home preserves the recent-post cache and merges changed first-page records", async () => {
  const posts = Array.from({ length: 50 }, (_, index) => ({
    metadata: { name: `post-${index}` },
    spec: { slug: `post-${index}`, title: `Post ${index}` },
    status: { permalink: `/post-${index}` },
  }));
  const renderHome = (currentPosts) => {
    document.body.innerHTML = `<script id="halo-page-data" type="application/json">${JSON.stringify({ currentPosts, pageType: "index", urls: { home: "/" } })}</script>`;
    return syncHaloDataFromDocument();
  };
  window.history.replaceState(null, "", "/");
  renderHome([]);
  renderHome(posts.slice(0, 6));

  let requests = 0;
  globalThis.fetch = async () => {
    requests += 1;
    if (requests > 1) {
      throw new Error("offline");
    }
    return new Response(JSON.stringify({ items: posts }), { status: 200 });
  };

  assert.equal((await ensureHomePostsLoaded({ waitForRefresh: true })).length, 50);
  assert.equal(renderHome(posts.slice(0, 6))?.homePosts.length, 50);
  assert.equal((await ensureHomePostsLoaded({ waitForRefresh: true })).length, 50);
  assert.equal(requests, 1);

  const updatedFirstPage = [{ ...posts[0], spec: { ...posts[0].spec, title: "Updated post" } }, ...posts.slice(1, 6)];
  const updated = renderHome(updatedFirstPage);
  assert.equal(updated?.homePosts.length, 50);
  assert.equal(updated?.homePosts[0]?.spec?.title, "Updated post");

  const originalNow = Date.now;
  Date.now = () => originalNow() + 6 * 60 * 1000;
  try {
    const stale = await ensureHomePostsLoaded({ waitForRefresh: true });
    assert.equal(requests, 2);
    assert.equal(stale.length, 50);
    assert.equal(stale[0]?.spec?.title, "Updated post");
  } finally {
    Date.now = originalNow;
  }

  assert.deepEqual(renderHome([])?.homePosts, []);
});

test("a changed home page starts a fresh request without letting an older response overwrite it", async () => {
  const first = { metadata: { name: "first" }, spec: { slug: "first", title: "First" } };
  const updated = { ...first, spec: { ...first.spec, title: "Updated" } };
  const renderHome = (currentPosts) => {
    document.body.innerHTML = `<script id="halo-page-data" type="application/json">${JSON.stringify({ currentPosts, pageType: "index", urls: { home: "/" } })}</script>`;
    return syncHaloDataFromDocument();
  };
  renderHome([]);
  renderHome([first]);

  const responders = [];
  globalThis.fetch = () =>
    new Promise((resolve) => {
      responders.push(resolve);
    });

  const olderRequest = ensureHomePostsLoaded({ waitForRefresh: true });
  renderHome([updated]);
  const newerRequest = ensureHomePostsLoaded({ waitForRefresh: true });
  assert.equal(responders.length, 2);

  responders[1](new Response(JSON.stringify({ items: [updated] }), { status: 200 }));
  assert.equal((await newerRequest)[0]?.spec?.title, "Updated");
  responders[0](new Response(JSON.stringify({ items: [first] }), { status: 200 }));
  assert.equal((await olderRequest)[0]?.spec?.title, "Updated");
  assert.equal(window.haloData?.homePosts[0]?.spec?.title, "Updated");
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
