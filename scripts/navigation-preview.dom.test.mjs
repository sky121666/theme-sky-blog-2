import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const environment = installDom(
  '<!doctype html><html><head><title>Preview</title></head><body><main id="main"></main></body></html>',
  "https://blog.example.com/archives/current?preview-theme=theme-sky-blog-2",
);
environment.dom.virtualConsole.removeAllListeners("jsdomError");
environment.dom.virtualConsole.on("jsdomError", (error) => {
  if (!error.message.includes("Not implemented: navigation to another Document")) {
    throw error;
  }
});

const {
  NAVIGATION_COMPLETE_EVENT,
  NAVIGATION_FULL_RELOAD_EVENT,
  NAVIGATION_SUCCESS_EVENT,
  navigateToUrl,
  navigateWithFullReload,
  resolveSafeNavigationUrl,
  startPartialNavigation,
} = await import("../src/common/navigation.ts");

test.after(() => environment.restore());

function resetPage(path) {
  if (path) window.history.replaceState({}, "", path);
  document.head.innerHTML = "<title>Preview</title>";
  document.body.innerHTML = '<main id="main"></main>';
  const restored = new Event("pageshow");
  Object.defineProperty(restored, "persisted", { value: true });
  window.dispatchEvent(restored);
}

test("programmatic full navigation inherits only same-origin preview context without overriding its target", () => {
  const previewPath = "/archives/current?preview-theme=theme-sky-blog-2&sort=latest";
  const cases = [
    [previewPath, "/archives/next", "https://blog.example.com/archives/next?preview-theme=theme-sky-blog-2"],
    [
      previewPath,
      "/categories?page=2#archive",
      "https://blog.example.com/categories?page=2&preview-theme=theme-sky-blog-2#archive",
    ],
    [
      previewPath,
      "/archives/next?preview-theme=another-theme",
      "https://blog.example.com/archives/next?preview-theme=another-theme",
    ],
    [previewPath, "/archives/next?preview-theme=", "https://blog.example.com/archives/next?preview-theme="],
    [previewPath, "https://external.example/next?from=blog", "https://external.example/next?from=blog"],
    [previewPath, "http://blog.example.com/next", "http://blog.example.com/next"],
    ["/archives/current?sort=latest", "/categories?page=2", "https://blog.example.com/categories?page=2"],
  ];

  for (const navigate of [navigateToUrl, navigateWithFullReload]) {
    for (const [current, target, expected] of cases) {
      resetPage(current);
      const intents = [];
      const onIntent = (event) => intents.push(event.detail.targetUrl);
      document.addEventListener(NAVIGATION_FULL_RELOAD_EVENT, onIntent);
      try {
        assert.equal(navigate(target), true);
        assert.deepEqual(intents, [expected], `${navigate.name}: ${target}`);
      } finally {
        document.removeEventListener(NAVIGATION_FULL_RELOAD_EVENT, onIntent);
      }
    }
  }
});

test("programmatic navigation and ordinary anchor clicks request and commit the selected preview theme", async () => {
  resetPage("/archives/current?preview-theme=theme-sky-blog-2&sort=latest");
  const previousFetch = globalThis.fetch;
  const requests = [];
  globalThis.fetch = async (url) => {
    const requestUrl = new URL(url, document.baseURI).href;
    requests.push(requestUrl);
    const response = new Response(
      '<!doctype html><html><head><title>Next</title></head><body><main id="main">Next article<script id="halo-page-data" type="application/json">{"pageType":"page","urls":{"home":"/"}}</script></main></body></html>',
      { headers: { "content-type": "text/html" } },
    );
    Object.defineProperty(response, "url", { value: requestUrl });
    return response;
  };
  startPartialNavigation();

  try {
    for (const mode of ["programmatic", "click"]) {
      const target = `/archives/${mode}#details`;
      const expected = `https://blog.example.com/archives/${mode}?preview-theme=theme-sky-blog-2`;
      const complete = new Promise((resolve) =>
        document.addEventListener(NAVIGATION_COMPLETE_EVENT, resolve, { once: true }),
      );
      const success = new Promise((resolve) =>
        document.addEventListener(NAVIGATION_SUCCESS_EVENT, resolve, { once: true }),
      );
      if (mode === "click") {
        const anchor = document.createElement("a");
        anchor.href = target;
        document.getElementById("main").append(anchor);
        const click = new MouseEvent("click", { button: 0, detail: 1, bubbles: true, cancelable: true });
        anchor.dispatchEvent(click);
        assert.equal(click.defaultPrevented, true);
      } else {
        assert.equal(navigateToUrl(target), true);
      }
      const [event] = await Promise.all([success, complete]);
      assert.equal(requests.at(-1), expected, mode);
      assert.equal(event.detail.targetUrl, expected + "#details", mode);
      assert.equal(window.location.href, event.detail.targetUrl, mode);
    }
    assert.equal(requests.length, 2);
  } finally {
    globalThis.fetch = previousFetch;
  }
});

test("guarded exits and full reload recovery preserve the preview after the navigator starts", () => {
  startPartialNavigation();
  for (const navigate of [navigateToUrl, navigateWithFullReload]) {
    resetPage();
    document.getElementById("main").innerHTML = '<section data-navigation-exit="full"></section>';
    const intents = [];
    const onIntent = (event) => intents.push(event.detail.targetUrl);
    document.addEventListener(NAVIGATION_FULL_RELOAD_EVENT, onIntent);

    try {
      assert.equal(navigate("/archives/next"), true);
      assert.deepEqual(intents, ["https://blog.example.com/archives/next?preview-theme=theme-sky-blog-2"]);
    } finally {
      document.removeEventListener(NAVIGATION_FULL_RELOAD_EVENT, onIntent);
    }
  }
  resetPage();
});

test("preview navigation keeps hash notifications while the plain URL resolver remains context-free", async () => {
  resetPage();
  startPartialNavigation();
  const current = new URL(location.href);
  current.hash = "";
  navigateToUrl(current.href);
  const target = new URL(current);
  target.searchParams.delete("preview-theme");
  target.hash = "#halo-comment=comment-1";
  const previousFetch = globalThis.fetch;
  const requests = [];
  globalThis.fetch = async (url) => {
    requests.push(String(url));
    return new Response("", { status: 404 });
  };
  const events = [];
  const onHashChange = (event) => events.push(event);
  window.addEventListener("hashchange", onHashChange);

  try {
    assert.equal(navigateToUrl(target.href), true);
    assert.equal(events.length, 1);
    assert.equal(events[0].oldURL, current.href);
    assert.equal(events[0].newURL, current.href + target.hash);
    assert.equal(resolveSafeNavigationUrl("/archives/share")?.href, "https://blog.example.com/archives/share");
    assert.equal(resolveSafeNavigationUrl("/apis/content.halo.run/v1alpha1/posts")?.search, "");
    assert.deepEqual(requests, []);
  } finally {
    window.removeEventListener("hashchange", onHashChange);
    globalThis.fetch = previousFetch;
  }
});
