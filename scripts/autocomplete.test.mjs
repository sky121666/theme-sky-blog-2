import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const environment = installDom("<!doctype html><html><head></head><body></body></html>");
const { getSuggestions } = await import("../src/features/autocomplete.ts");

test.after(() => environment.restore());

function installHaloData(overrides = {}) {
  window.haloData = {
    categories: [],
    categoriesLoaded: true,
    currentPosts: [],
    homePosts: [],
    pageType: "index",
    tags: [],
    tagsLoaded: true,
    urls: { archives: "/archives", categories: "/categories", home: "/", tags: "/tags" },
    user: "guest",
    ...overrides,
  };
}

test("command completion is case-insensitive and page-aware", () => {
  installHaloData();
  assert.deepEqual(getSuggestions("PP", "~/blog", false), ["ppage"]);
  assert.deepEqual(getSuggestions("se", "~/blog", false), ["search "]);
  assert.deepEqual(getSuggestions("to", "~/blog", true), ["toc", "top"]);
  assert.deepEqual(getSuggestions("n", "~/blog", true), ["next"]);
  assert.deepEqual(getSuggestions("npage", "~/blog", true), []);
});

test("path completion preserves slugs, directory suffixes, and relative helpers", () => {
  installHaloData({
    categories: [{ spec: { displayName: "Halo Theme", slug: "halo-theme" } }],
    currentPosts: [{ spec: { slug: "pixel-post", title: "Pixel Post" }, status: { permalink: "/pixel-post" } }],
    homePosts: [{ spec: { slug: "pixel-post", title: "Pixel Post" }, status: { permalink: "/pixel-post" } }],
    tags: [{ spec: { displayName: "Pixel", slug: "pixel" } }],
  });

  assert.deepEqual(getSuggestions("cd cat", "~/blog", false), ["cd categories/"]);
  assert.deepEqual(getSuggestions("ls categories/ha", "~/blog", false), ["ls categories/halo-theme/"]);
  assert.deepEqual(getSuggestions("ll pix", "~/blog", false), ["ll pixel-post"]);
  assert.deepEqual(getSuggestions("cd .", "~/blog", false), ["cd ../"]);
  assert.deepEqual(getSuggestions("cd ~", "~/blog", false), ["cd ~/"]);
});

test("implicit index completion uses current-page posts while explicit root uses recent posts", () => {
  installHaloData({
    currentPosts: [{ spec: { slug: "second-page", title: "Second page" }, status: { permalink: "/second-page" } }],
    homePosts: [{ spec: { slug: "first-page", title: "First page" }, status: { permalink: "/first-page" } }],
  });

  assert.deepEqual(getSuggestions("cd second", "~/blog", false), ["cd second-page"]);
  assert.deepEqual(getSuggestions("cd first", "~/blog", false), []);
  assert.deepEqual(getSuggestions("cd ~/blog/first", "~/blog", false), ["cd ~/blog/first-page"]);
  assert.deepEqual(getSuggestions("cd arc", "~/blog", false), ["cd archives/"]);
});

test("unsupported arguments and unavailable directories produce no completion", () => {
  installHaloData({ categoriesLoaded: false });
  assert.deepEqual(getSuggestions("search halo", "~/blog", false), []);
  assert.deepEqual(getSuggestions("cd categories/h", "~/blog", false), []);
  assert.deepEqual(getSuggestions("ls missing/", "~/blog", false), []);
});
