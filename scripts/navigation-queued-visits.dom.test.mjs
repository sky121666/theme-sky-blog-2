import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const dom = installDom("<html><head><title>Source</title></head><body><main id='main'></main></body></html>");
const { PartialPageNavigator, setPartialNavigationBarrier } = await import("../src/common/navigation.ts");
test.after(() => dom.restore());

function setup(t, content = "") {
  history.replaceState({}, "", "/source");
  document.head.innerHTML = "<title>Source</title>";
  document.body.innerHTML = `<main id="main">${content}</main>`;
  setPartialNavigationBarrier(Promise.resolve());
  const navigator = new PartialPageNavigator();
  navigator.start();
  t.after(() => {
    navigator.stop();
    setPartialNavigationBarrier(Promise.resolve());
  });
  return navigator;
}

function response(url, head = "") {
  const page = new Response(
    `<html><head><title>Article</title>${head}</head><body>
    <main id="main"><a href="/b">Next</a><a href="#section">Section</a><h2 id="section">Section</h2>
    <script type="application/json" id="halo-page-data">{"pageType":"post"}</script></main></body></html>`,
    { headers: { "content-type": "text/html" } },
  );
  Object.defineProperty(page, "url", { value: url });
  return page;
}

const on = (event) => new Promise((resolve) => document.addEventListener(event, resolve, { once: true }));

test("an anchor cancels the next destination while the visible page is still mounting", async (t) => {
  const navigator = setup(t);
  const requests = [];
  t.mock.method(globalThis, "fetch", async (url) => {
    requests.push(new URL(url).pathname);
    return response(url);
  });
  let finishMount;
  document.addEventListener(
    "theme:navigation-success",
    () => {
      setPartialNavigationBarrier(
        new Promise((resolve) => {
          finishMount = resolve;
        }),
      );
    },
    { once: true },
  );
  const mounted = on("theme:navigation-success");
  const completed = on("theme:navigation-complete");
  navigator.navigate(new URL("/a", location.href));
  await mounted;
  document.querySelector('a[href="/b"]').click();
  // Run the queued task once while the mount barrier is still holding it.
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  assert.equal(navigator.hasQueuedNavigation(), true);
  document.querySelector('a[href="#section"]').click();
  assert.equal(navigator.hasQueuedNavigation(), false);
  finishMount();
  await completed;
  assert.deepEqual(requests, ["/a"]);
  assert.equal(location.pathname + location.hash, "/a#section");
});

test("clicking another fragment of an in-flight target uses the last fragment", async (t) => {
  setup(t, '<a href="/article#first">First</a><a href="/article#second">Second</a>');
  const pending = Promise.withResolvers();
  const fetch = t.mock.method(globalThis, "fetch", async (url) => {
    await pending.promise;
    return response(url);
  });
  const done = on("theme:navigation-complete");
  document.querySelector('a[href$="first"]').click();
  await t.waitFor(() => assert.equal(fetch.mock.callCount(), 1));
  document.querySelector('a[href$="second"]').click();
  pending.resolve();
  await done;
  assert.equal(location.hash, "#second");
  assert.equal(fetch.mock.callCount(), 1);
});

test("relative links honor the document's base element", async (t) => {
  setup(t, '<a href="intro">Intro</a>');
  const base = '<base href="/docs/manual/">';
  document.head.insertAdjacentHTML("beforeend", base);
  t.mock.method(globalThis, "fetch", async (url) => response(url, base));
  const done = on("theme:navigation-complete");
  document.querySelector("a").click();
  await done;
  assert.equal(location.pathname, "/docs/manual/intro");
});
