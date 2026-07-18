import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const environment = installDom(`<!doctype html><html><head></head><body>
  <main id="main"><article class="terminal-content"></article></main>
</body></html>`);
const {
  copyArticleLink,
  formatArticleToc,
  getArticleToc,
  scrollMainToBottom,
  scrollMainToTop,
  scrollToArticleHeading,
} = await import("../src/features/article-tools.ts");

test.after(() => environment.restore());

function setPostData(currentPost = { permalink: "/posts/current", slug: "current" }) {
  window.haloData = {
    categories: [],
    categoriesLoaded: true,
    currentPost,
    currentPosts: [],
    homePosts: [],
    pageType: "post",
    tags: [],
    tagsLoaded: true,
    urls: { archives: "/archives", categories: "/categories", home: "/", tags: "/tags" },
    user: "guest",
  };
}

test("article TOC assigns deterministic Unicode slugs and preserves existing ids", () => {
  setPostData();
  document.querySelector(".terminal-content").innerHTML = `
    <h2>Hello 世界!</h2>
    <h3>   </h3>
    <h3 id="kept">Details</h3>
  `;

  assert.deepEqual(getArticleToc(), [
    { id: "toc-hello-世界-1", level: 2, text: "Hello 世界!" },
    { id: "kept", level: 3, text: "Details" },
  ]);
  assert.equal(formatArticleToc(), "01. Hello 世界!\n02.   Details");
});

test("TOC and jump commands return stable messages outside valid post headings", () => {
  document.querySelector(".terminal-content").innerHTML = "<p>No headings</p>";
  window.haloData = { pageType: "page" };
  assert.equal(formatArticleToc(), "toc: only available on post pages");
  assert.equal(scrollToArticleHeading(1), "jump: only available on post pages");

  setPostData();
  assert.equal(formatArticleToc(), "toc: no headings found in this article");
  assert.equal(scrollToArticleHeading(2), "jump: heading 2 not found");
});

test("article jump and boundary scrolling use the preferred behavior", () => {
  setPostData();
  document.querySelector(".terminal-content").innerHTML = "<h2 id=target>Target</h2>";
  const target = document.getElementById("target");
  const main = document.getElementById("main");
  let headingOptions;
  const mainCalls = [];
  target.scrollIntoView = (options) => {
    headingOptions = options;
  };
  main.scrollTo = (options) => mainCalls.push(options);
  Object.defineProperty(main, "scrollHeight", { configurable: true, value: 1234 });

  assert.equal(scrollToArticleHeading(1), null);
  scrollMainToTop();
  scrollMainToBottom();
  assert.deepEqual(headingOptions, { behavior: "smooth", block: "start" });
  assert.deepEqual(mainCalls, [
    { behavior: "smooth", top: 0 },
    { behavior: "smooth", top: 1234 },
  ]);
});

test("copy link reports success and exposes a usable fallback when clipboard access fails", async () => {
  setPostData({ permalink: "/posts/copy-me", slug: "copy-me" });
  let copied;
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: async (value) => (copied = value) },
  });
  assert.equal(await copyArticleLink(), "Copied current article link.");
  assert.equal(copied, "/posts/copy-me");

  setPostData(null);
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: async () => Promise.reject(new Error("denied")) },
  });
  assert.equal(await copyArticleLink(), "Copy unavailable. Link: https://blog.example.com/");

  window.haloData.pageType = "page";
  assert.equal(await copyArticleLink(), "copy: only available on post pages");
});
