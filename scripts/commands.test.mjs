import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const environment = installDom("<!doctype html><html><head></head><body><main id=main></main></body></html>");
const { dispatchCommand } = await import("../src/features/commands.ts");

test.after(() => environment.restore());
test.beforeEach(() => {
  document.body.innerHTML = '<main id="main"><article class="terminal-content"></article></main>';
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
  assert.match(ls.output, /^Total 3\n/);
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

  const list = await dispatchCommand("ls", "", "~/blog");
  assert.match(list.output, /^Total 4\n/);
  assert.match(list.output, /-rw-r--r--\s+4\.0K guest\s+staff\s+2026-07-18\s+Hello/);
  assert.match((await dispatchCommand("ls", "missing", "~/blog")).output, /No such file or directory/);

  assert.deepEqual(await dispatchCommand("cd", ".", "~/blog"), {});
  assert.deepEqual(await dispatchCommand("cd", "categories", "~/blog"), { navigate: "/categories" });
  assert.deepEqual(await dispatchCommand("cd", "hello", "~/blog"), { navigate: "/hello" });
  assert.match((await dispatchCommand("cd", "missing", "~/blog")).output, /no such file or directory/);

  window.haloData.categoriesLoaded = false;
  assert.match((await dispatchCommand("ls", "categories", "~/blog")).output, /is not loaded on this page/);
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

test("pagination and adjacent-post commands distinguish absent, boundary, and navigable states", async () => {
  assert.equal((await dispatchCommand("pd", "", "~/blog")).output, "Pagination not available on this page.");

  window.haloData.pagination = { hasNext: false, hasPrev: false, nextUrl: null, prevUrl: null };
  assert.equal((await dispatchCommand("npage", "", "~/blog")).output, "Already at the last page.");
  assert.equal((await dispatchCommand("ppage", "", "~/blog")).output, "Already at the first page.");

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
  assert.equal(copied, "/current");
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
