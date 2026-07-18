import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const environment = installDom(
  '<!doctype html><html lang="zh-CN"><head><title>Home</title></head><body><main id="main"></main></body></html>',
);

const {
  NAVIGATION_COMPLETE_EVENT,
  NAVIGATION_ERROR_EVENT,
  NAVIGATION_FULL_RELOAD_EVENT,
  NAVIGATION_FULL_RELOAD_RESET_EVENT,
  PartialPageNavigator,
  headNavigationContractChanged,
  syncPageMetadata,
} = await import("../src/common/navigation.ts");

test.after(() => environment.restore());

test("failed full navigation rolls back the latch and emits a reset", () => {
  document.body.innerHTML = '<main id="main"></main><a id="full" data-navigation="full" href="/next">next</a>';
  const events = [];
  const onIntent = () => events.push("intent");
  const onReset = () => events.push("reset");
  document.addEventListener(NAVIGATION_FULL_RELOAD_EVENT, onIntent);
  document.addEventListener(NAVIGATION_FULL_RELOAD_RESET_EVENT, onReset);

  const navigator = new PartialPageNavigator({ assign: () => false, reload: () => false });
  navigator.start();
  const click = new MouseEvent("click", { bubbles: true, button: 0, cancelable: true });
  document.getElementById("full").dispatchEvent(click);

  assert.equal(click.defaultPrevented, true);
  assert.equal(navigator.isFullNavigationPending(), false);
  assert.deepEqual(events, ["intent", "reset"]);

  navigator.stop();
  document.removeEventListener(NAVIGATION_FULL_RELOAD_EVENT, onIntent);
  document.removeEventListener(NAVIGATION_FULL_RELOAD_RESET_EVENT, onReset);
});

test("BFCache pageshow resets a successful full-navigation latch", () => {
  document.body.innerHTML = '<main id="main"></main><a id="full" data-navigation="full" href="/next">next</a>';
  const navigator = new PartialPageNavigator({ assign: () => true, reload: () => true });
  navigator.start();
  document
    .getElementById("full")
    .dispatchEvent(new MouseEvent("click", { bubbles: true, button: 0, cancelable: true }));
  assert.equal(navigator.isFullNavigationPending(), true);

  const pageShow = new Event("pageshow");
  Object.defineProperty(pageShow, "persisted", { value: true });
  window.dispatchEvent(pageShow);
  assert.equal(navigator.isFullNavigationPending(), false);
  navigator.stop();
});

test("full-navigation watchdog unlocks a page when no pagehide occurs", async () => {
  const navigator = new PartialPageNavigator(
    { assign: () => true, reload: () => true },
    { fullNavigationWatchdogMs: 5 },
  );
  navigator.start();
  navigator.navigateFully(new URL("https://blog.example.com/next"));
  assert.equal(navigator.isFullNavigationPending(), true);

  await new Promise((resolve) => window.setTimeout(resolve, 15));
  assert.equal(navigator.isFullNavigationPending(), false);
  navigator.stop();
});

test("pagehide confirms a full navigation and suppresses the watchdog reset", async () => {
  const navigator = new PartialPageNavigator(
    { assign: () => true, reload: () => true },
    { fullNavigationWatchdogMs: 5 },
  );
  navigator.start();
  navigator.navigateFully(new URL("https://blog.example.com/next"));
  window.dispatchEvent(new Event("pagehide"));

  await new Promise((resolve) => window.setTimeout(resolve, 15));
  assert.equal(navigator.isFullNavigationPending(), true);

  const pageShow = new Event("pageshow");
  Object.defineProperty(pageShow, "persisted", { value: true });
  window.dispatchEvent(pageShow);
  assert.equal(navigator.isFullNavigationPending(), false);
  navigator.stop();
});

test("partial navigation timeout emits an error and completes the pending navigation", async () => {
  const previousFetch = globalThis.fetch;
  globalThis.fetch = (_url, options) =>
    new Promise((_resolve, reject) => {
      options.signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once: true });
    });

  const events = [];
  const onError = (event) => events.push(["error", event.detail.error.message]);
  const onComplete = () => events.push(["complete"]);
  document.addEventListener(NAVIGATION_ERROR_EVENT, onError);
  document.addEventListener(NAVIGATION_COMPLETE_EVENT, onComplete);

  const navigator = new PartialPageNavigator(undefined, { partialRequestTimeoutMs: 5 });
  navigator.start();
  navigator.navigate(new URL("https://blog.example.com/timeout"));
  await new Promise((resolve) => window.setTimeout(resolve, 15));

  assert.match(events.find(([type]) => type === "error")?.[1] ?? "", /timed out after 5 ms/);
  assert.equal(
    events.some(([type]) => type === "complete"),
    true,
  );

  navigator.stop();
  document.removeEventListener(NAVIGATION_ERROR_EVENT, onError);
  document.removeEventListener(NAVIGATION_COMPLETE_EVENT, onComplete);
  globalThis.fetch = previousFetch;
});

test("cross-origin anchors keep native browser navigation semantics", () => {
  document.body.innerHTML =
    '<main id="main"></main><a id="external" href="https://external.example/path" rel="noreferrer">external</a>';
  let assigned = false;
  const navigator = new PartialPageNavigator({ assign: () => ((assigned = true), true), reload: () => true });
  navigator.start();
  const click = new MouseEvent("click", { bubbles: true, button: 0, cancelable: true, detail: 1 });
  document.getElementById("external").dispatchEvent(click);

  assert.equal(click.defaultPrevented, false);
  assert.equal(assigned, false);
  navigator.stop();
});

test("successful partial navigation replaces the main shell and transfers busy state", async () => {
  document.head.innerHTML = `
    <title>Home</title>
    <script src="/app.js"></script>
    <style data-theme-navigation-style>:root { --theme-color: green; }</style>
  `;
  document.body.innerHTML = '<main id="main"><a id="old-link" href="/next">old</a></main>';
  window.history.replaceState({}, "", "/");
  const previousFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      `<!doctype html><html><head>
        <title>Next</title>
        <script src="/app.js"></script>
        <style data-theme-navigation-style>:root { --theme-color: green; }</style>
      </head><body><main id="main" tabindex="-1"><h1>Next content</h1></main></body></html>`,
      { headers: { "content-type": "text/html; charset=utf-8" }, status: 200 },
    );

  const success = new Promise((resolve) =>
    document.addEventListener("theme:navigation-success", resolve, { once: true }),
  );
  const oldMain = document.getElementById("main");
  const navigator = new PartialPageNavigator();
  navigator.start();
  navigator.navigate(new URL("https://blog.example.com/next"), { focus: true });
  const event = await success;

  assert.equal(oldMain.isConnected, false);
  assert.equal(document.querySelector("#main h1")?.textContent, "Next content");
  assert.equal(document.getElementById("main")?.getAttribute("aria-busy"), "true");
  assert.equal(document.getElementById("main")?.classList.contains("loading"), true);
  assert.equal(document.title, "Next");
  assert.equal(event.detail.focus, true);
  assert.equal(window.location.pathname, "/next");

  navigator.stop();
  globalThis.fetch = previousFetch;
});

test("rapid consecutive navigation aborts stale request and only latest response commits", async () => {
  document.head.innerHTML = `
    <title>Home</title>
    <script src="/app.js"></script>
    <style data-theme-navigation-style>:root { --theme-color: green; }</style>
  `;
  document.body.innerHTML = '<main id="main"><h1>Initial content</h1></main>';
  window.history.replaceState({}, "", "/");

  const previousFetch = globalThis.fetch;
  const requests = [];
  globalThis.fetch = (url, options) =>
    new Promise((resolve) => {
      requests.push({ resolve, signal: options.signal, url: String(url) });
    });

  const successes = [];
  const completions = [];
  const onSuccess = (event) => successes.push(new URL(event.detail.targetUrl).pathname);
  const onComplete = (event) => completions.push(new URL(event.detail.targetUrl).pathname);
  document.addEventListener("theme:navigation-success", onSuccess);
  document.addEventListener(NAVIGATION_COMPLETE_EVENT, onComplete);

  const navigator = new PartialPageNavigator();
  navigator.start();
  navigator.navigate(new URL("https://blog.example.com/first"));
  navigator.navigate(new URL("https://blog.example.com/second"));

  assert.equal(requests.length, 2);
  assert.equal(requests[0].signal.aborted, true);
  assert.equal(requests[1].signal.aborted, false);

  requests[1].resolve(
    new Response(
      `<!doctype html><html><head>
        <title>Second</title>
        <script src="/app.js"></script>
        <style data-theme-navigation-style>:root { --theme-color: green; }</style>
      </head><body><main id="main"><h1>Second content</h1></main></body></html>`,
      { headers: { "content-type": "text/html" }, status: 200 },
    ),
  );
  await new Promise((resolve) => document.addEventListener("theme:navigation-success", resolve, { once: true }));
  await Promise.resolve();

  requests[0].resolve(
    new Response(
      `<!doctype html><html><head>
        <title>Stale first</title>
        <script src="/app.js"></script>
        <style data-theme-navigation-style>:root { --theme-color: green; }</style>
      </head><body><main id="main"><h1>Stale first content</h1></main></body></html>`,
      { headers: { "content-type": "text/html" }, status: 200 },
    ),
  );
  await Promise.resolve();
  await Promise.resolve();

  assert.equal(document.querySelector("#main h1")?.textContent, "Second content");
  assert.equal(document.title, "Second");
  assert.equal(window.location.pathname, "/second");
  assert.deepEqual(successes, ["/second"]);
  assert.deepEqual(completions, ["/first", "/second"]);

  navigator.stop();
  document.removeEventListener("theme:navigation-success", onSuccess);
  document.removeEventListener(NAVIGATION_COMPLETE_EVENT, onComplete);
  globalThis.fetch = previousFetch;
});

test("page metadata is reconciled while executable head changes require a full navigation", () => {
  document.head.innerHTML = `
    <title>Old</title>
    <meta name="description" content="old">
    <link rel="canonical" href="/old">
    <script type="application/ld+json">{"name":"old"}</script>
    <script src="/plugin.js" nonce="old-nonce"></script>
    <style data-theme-navigation-style>:root { --theme-color: green; }</style>
    <style id="client-injected-style">.runtime-only { color: green; }</style>
  `;

  const nextDocument = new DOMParser().parseFromString(
    `<!doctype html><html lang="en" dir="ltr"><head>
      <title>Next</title>
      <meta name="description" content="next">
      <meta property="og:title" content="Next">
      <link rel="canonical" href="/next">
      <script type="application/ld+json">{"name":"next"}</script>
      <script src="/plugin.js" nonce="new-nonce"></script>
      <style data-theme-navigation-style>:root { --theme-color: green; }</style>
    </head><body><main id="main"></main></body></html>`,
    "text/html",
  );

  assert.equal(headNavigationContractChanged(nextDocument, new URL("https://blog.example.com/next")), false);
  syncPageMetadata(nextDocument);
  assert.equal(document.querySelector('meta[name="description"]')?.getAttribute("content"), "next");
  assert.equal(document.querySelector('meta[property="og:title"]')?.getAttribute("content"), "Next");
  assert.equal(document.querySelector('link[rel="canonical"]')?.href, "https://blog.example.com/next");
  assert.equal(document.querySelector('script[type="application/ld+json"]')?.textContent, '{"name":"next"}');
  assert.equal(document.documentElement.lang, "en");
  assert.equal(document.documentElement.dir, "ltr");
  assert.equal(document.getElementById("client-injected-style") !== null, true);

  nextDocument.querySelector("style[data-theme-navigation-style]").textContent = ":root { --theme-color: blue; }";
  assert.equal(headNavigationContractChanged(nextDocument, new URL("https://blog.example.com/next")), true);
  nextDocument.querySelector("style[data-theme-navigation-style]").textContent = ":root { --theme-color: green; }";
  nextDocument.querySelector('script[src="/plugin.js"]')?.setAttribute("src", "/plugin-v2.js");
  assert.equal(headNavigationContractChanged(nextDocument, new URL("https://blog.example.com/next")), true);
});
