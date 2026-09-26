import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const environment = installDom("<!doctype html><html><head></head><body><main id=main></main></body></html>");
const { dispatchCommand } = await import("../src/features/commands.ts");
const { getSuggestions } = await import("../src/features/autocomplete.ts");
const { syncHaloDataFromDocument } = await import("../src/common/page-data.ts");

test.after(() => environment.restore());
test.beforeEach(() => {
  document.body.innerHTML =
    '<main id="main"><a id="link-categories"></a><a id="link-tags"></a><article class="terminal-content"></article></main>';
  window.SearchWidget = undefined;
  window.haloData = {
    categories: [],
    categoriesLoaded: true,
    currentPosts: [],
    homePosts: [],
    nextPost: null,
    pageType: "index",
    pagination: undefined,
    prevPost: null,
    tags: [],
    tagsLoaded: true,
    urls: { archives: "/archives", categories: "/categories", home: "/", tags: "/tags" },
    user: "guest",
  };
});

test("command registry handles help, aliases, clear, and unknown commands", async () => {
  assert.deepEqual(await dispatchCommand("HELP", "", "~/blog"), { showHelp: true });
  assert.deepEqual(await dispatchCommand("clear", "", "~/blog"), {});
  assert.equal(
    (await dispatchCommand("missing", "", "~/blog")).output,
    "bash: missing: command not found. Type 'help' for available commands.",
  );

  const ls = await dispatchCommand("ll", "", "~/blog");
  assert.match(ls.output, /^Showing 2 entries on this page\n/);
  assert.match(ls.output, /categories\//);
});

test("list and change-directory commands preserve unloaded, missing, and navigation outcomes", async () => {
  window.haloData.homePosts = [
    {
      metadata: { creationTimestamp: "2026-07-18", name: "hello-record" },
      spec: { slug: "hello", title: "Hello" },
      status: { permalink: "/hello" },
    },
  ];
  window.haloData.currentPosts = window.haloData.homePosts;

  const list = await dispatchCommand("ls", "", "~/blog");
  assert.match(list.output, /^Showing 3 entries on this page\n/);
  assert.match(list.output, /-rw-r--r--\s+4\.0K guest\s+staff\s+7月 18 \d{2}:\d{2}\s+Hello/);
  assert.match((await dispatchCommand("ls", "missing", "~/blog")).output, /No such file or directory/);

  assert.deepEqual(await dispatchCommand("cd", ".", "~/blog"), {});
  assert.deepEqual(await dispatchCommand("cd", "categories", "~/blog"), { navigate: "/categories" });
  assert.deepEqual(await dispatchCommand("cd", "hello", "~/blog"), { navigate: "/hello" });
  assert.match((await dispatchCommand("cd", "missing", "~/blog")).output, /no such file or directory/);

  window.haloData.categoriesLoaded = false;
  assert.match((await dispatchCommand("ls", "categories", "~/blog")).output, /is not loaded on this page/);
});

test("ls and ll can list completed article paths from the current page and recent cache", async () => {
  window.haloData.currentPosts = [{ spec: { slug: "second-page", title: "Second page" } }];
  window.haloData.homePosts = [{ spec: { slug: "first-page", title: "First page" } }];

  assert.deepEqual(getSuggestions("ll sec", "~/blog", false), ["ll second-page"]);
  const current = await dispatchCommand("ll", "second-page", "~/blog");
  assert.match(current.output, /^Showing 1 entry in ~\/blog\/second-page\n/);
  assert.match(current.output, /Second page/);
  assert.doesNotMatch(current.output, /First page/);

  assert.deepEqual(getSuggestions("ls ~/blog/fir", "~/blog", false), ["ls ~/blog/first-page"]);
  const recent = await dispatchCommand("ls", "~/blog/first-page", "~/blog");
  assert.match(recent.output, /^Showing 1 entry in ~\/blog\/first-page\n/);
  assert.match(recent.output, /First page/);

  window.haloData.pageType = "category";
  window.haloData.currentCategory = { slug: "halo" };
  window.haloData.currentPosts = [{ spec: { slug: "category-post", title: "Category post" } }];
  const nested = await dispatchCommand("ls", "category-post", "~/blog/categories/halo");
  assert.match(nested.output, /^Showing 1 entry in ~\/blog\/categories\/halo\/category-post\n/);
  assert.match(nested.output, /Category post/);
});

test("ls reports an existing but unopened archives directory as unloaded", async () => {
  assert.deepEqual(getSuggestions("ls arc", "~/blog", false), ["ls archives/"]);
  assert.match((await dispatchCommand("ls", "archives/", "~/blog")).output, /is not loaded on this page/);
  assert.deepEqual(await dispatchCommand("cd", "archives", "~/blog"), { navigate: "/archives" });

  window.haloData.pageType = "archives";
  window.haloData.currentPosts = [{ spec: { slug: "archived", title: "Archived post" } }];
  assert.match((await dispatchCommand("ls", "archives", "~/blog")).output, /Archived post/);
});

test("paginated index ls uses current-page posts and honors hidden folders", async () => {
  window.haloData.homePosts = [{ spec: { slug: "first", title: "First page" } }];
  window.haloData.currentPosts = [{ spec: { slug: "second", title: "Second page" } }];
  document.getElementById("link-tags").remove();

  const visible = await dispatchCommand("ls", "", "~/blog");
  assert.match(visible.output, /^Showing 2 entries on this page\n/);
  assert.match(visible.output, /categories\//);
  assert.match(visible.output, /Second page/);
  assert.doesNotMatch(visible.output, /First page|tags\/|archives\//);
});

test("non-index pages fetch home posts only when ls targets the virtual root", async () => {
  const originalFetch = globalThis.fetch;
  let fetches = 0;
  globalThis.fetch = async () => {
    fetches += 1;
    return new Response(
      JSON.stringify({
        items: [
          {
            metadata: { creationTimestamp: "2026-07-18", name: "lazy-record" },
            spec: { owner: "sky", publishTime: "2026-07-18", slug: "lazy", title: "Lazy post" },
            status: { permalink: "/lazy" },
          },
        ],
      }),
      { headers: { "content-type": "application/json" }, status: 200 },
    );
  };
  window.haloData.pageType = "post";
  window.haloData.homePosts = [];

  await dispatchCommand("help", "", "~/blog/current");
  assert.equal(fetches, 0);

  const direct = await dispatchCommand("cd", "~/blog/lazy", "~/blog/current");
  assert.equal(fetches, 1);
  assert.deepEqual(direct, { navigate: "/lazy" });

  const first = await dispatchCommand("ls", "..", "~/blog/current");
  assert.equal(fetches, 1);
  assert.match(first.output, /Lazy post/);

  const second = await dispatchCommand("ll", "~/blog", "~/blog/current");
  assert.equal(fetches, 1);
  assert.match(second.output, /Lazy post/);
  globalThis.fetch = originalFetch;
});

test("an explicit virtual-root ls waits for recent posts without changing the current index list", async () => {
  const originalFetch = globalThis.fetch;
  const first = { metadata: { name: "first" }, spec: { slug: "first", title: "First page" } };
  document.body.insertAdjacentHTML(
    "beforeend",
    `<script id="halo-page-data" type="application/json">${JSON.stringify({ currentPosts: [first], pageType: "index", urls: { home: "/" } })}</script>`,
  );
  syncHaloDataFromDocument();
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({ items: [{ metadata: { name: "remote" }, spec: { slug: "remote", title: "Recent post" } }] }),
      { headers: { "content-type": "application/json" }, status: 200 },
    );

  try {
    const root = await dispatchCommand("ls", "~/blog", "~/blog");
    assert.match(root.output, /^Showing 4 entries in ~\/blog\n/);
    assert.match(root.output, /Recent post/);
    assert.match(root.output, /archives\//);

    const current = await dispatchCommand("ls", "", "~/blog");
    assert.match(current.output, /First page/);
    assert.doesNotMatch(current.output, /Recent post|archives\//);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("pagination and adjacent-post commands distinguish absent, boundary, and navigable states", async () => {
  assert.equal((await dispatchCommand("pd", "", "~/blog")).output, "Pagination not available on this page.");

  window.haloData.pagination = { hasNext: false, hasPrev: false, nextUrl: null, prevUrl: null };
  assert.equal((await dispatchCommand("npage", "", "~/blog")).output, "Already at the last page.");
  assert.equal((await dispatchCommand("ppage", "", "~/blog")).output, "Already at the first page.");

  document.body.insertAdjacentHTML("beforeend", "<span data-empty-page>No posts on this page.</span>");
  assert.equal(
    (await dispatchCommand("pu", "", "~/blog")).output,
    "No items on this page. Use the first-page link to return.",
  );
  document.querySelector("[data-empty-page]").remove();

  window.haloData.pagination = { hasNext: true, hasPrev: true, nextUrl: "/page/2", prevUrl: "/page/0" };
  assert.deepEqual(await dispatchCommand("pd", "", "~/blog"), { navigate: "/page/2" });
  assert.deepEqual(await dispatchCommand("pu", "", "~/blog"), { navigate: "/page/0" });

  assert.equal((await dispatchCommand("next", "", "~/blog/current")).output, "No next article available.");
  assert.equal((await dispatchCommand("prev", "", "~/blog/current")).output, "No previous article available.");
  window.haloData.nextPost = "/next";
  window.haloData.prevPost = "/previous";
  assert.deepEqual(await dispatchCommand("next", "", "~/blog/current"), { navigate: "/next" });
  assert.deepEqual(await dispatchCommand("prev", "", "~/blog/current"), { navigate: "/previous" });
});

test("article commands integrate TOC, jump, scrolling, and clipboard behavior", async () => {
  window.haloData.pageType = "post";
  window.haloData.currentPost = { permalink: "/current", slug: "current" };
  document.querySelector(".terminal-content").innerHTML = "<h2 id=overview>Overview</h2>";
  const main = document.getElementById("main");
  const heading = document.getElementById("overview");
  const scrollCalls = [];
  main.scrollTo = (options) => scrollCalls.push(options);
  Object.defineProperty(main, "scrollHeight", { configurable: true, value: 900 });
  let jumped = false;
  heading.scrollIntoView = () => {
    jumped = true;
  };
  let copied;
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: async (value) => (copied = value) },
  });

  assert.equal((await dispatchCommand("toc", "", "~/blog/current")).output, "01. Overview");
  assert.equal((await dispatchCommand("jump", "0", "~/blog/current")).output, "jump: usage: jump <number>");
  assert.deepEqual(await dispatchCommand("jump", "1", "~/blog/current"), {});
  assert.equal(jumped, true);
  assert.deepEqual(await dispatchCommand("top", "", "~/blog/current"), {});
  assert.deepEqual(await dispatchCommand("bottom", "", "~/blog/current"), {});
  assert.deepEqual(scrollCalls, [
    { behavior: "smooth", top: 0 },
    { behavior: "smooth", top: 900 },
  ]);
  assert.equal((await dispatchCommand("copy", "", "~/blog/current")).output, "Copied current article link.");
  assert.equal(copied, "https://blog.example.com/current");
});

test("search command calls the official widget once and keeps a stable unavailable message", async () => {
  assert.match((await dispatchCommand("search", "halo", "~/blog")).output, /SearchWidget is not loaded/);

  let opens = 0;
  window.SearchWidget = { open: () => (opens += 1) };
  assert.equal(
    (await dispatchCommand("search", "halo", "~/blog")).output,
    "Search widget opened. Type keyword in the search box: halo",
  );
  assert.equal(opens, 1);

  window.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  await new Promise((resolve) => window.requestAnimationFrame(resolve));
});
