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

const pageData = '<script type="application/json" id="halo-page-data">{"pageType":"page","urls":{"home":"/"}}</script>';

function pageResponse(markup, url) {
  const response = new Response(markup, { headers: { "content-type": "text/html; charset=utf-8" } });
  Object.defineProperty(response, "url", { value: new URL(url, document.baseURI).href });
  return response;
}

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

test("partial navigation timeout emits an error and completes the pending navigation", async (t) => {
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
  await t.waitFor(() => assert.equal(events.at(-1)?.[0], "complete"));

  assert.match(events.find(([type]) => type === "error")?.[1] ?? "", /timed out after 5 ms/i);
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
  globalThis.fetch = async (url) =>
    pageResponse(
      `<!doctype html><html><head>
        <title>Next</title>
        <script src="/app.js"></script>
        <style data-theme-navigation-style>:root { --theme-color: green; }</style>
      </head><body><main id="main" tabindex="-1"><h1>Next content</h1>${pageData}</main></body></html>`,
      url,
    );

  const success = new Promise((resolve) =>
    document.addEventListener("theme:navigation-success", resolve, { once: true }),
  );
  const complete = new Promise((resolve) =>
    document.addEventListener(NAVIGATION_COMPLETE_EVENT, resolve, { once: true }),
  );
  const visits = [];
  document.addEventListener("swup:visit:start", (event) => visits.push(event.detail.visit.to.url), { once: true });
  const oldMain = document.getElementById("main");
  const navigator = new PartialPageNavigator();
  navigator.start();
  navigator.navigate(new URL("https://blog.example.com/next"), { focus: true });
  const event = await success;

  assert.deepEqual(visits, ["/next"]);
  assert.equal(oldMain.isConnected, false);
  assert.equal(document.querySelector("#main h1")?.textContent, "Next content");
  assert.equal(document.getElementById("main")?.getAttribute("aria-busy"), "true");
  assert.equal(document.getElementById("main")?.classList.contains("loading"), true);
  assert.equal(document.title, "Next");
  assert.equal(event.detail.focus, true);
  assert.equal(window.location.pathname, "/next");
  assert.equal(window.history.state.themeSourceHistoryDepth, 1);
  assert.equal(window.history.state.themePreviousUrl, "https://blog.example.com/");
  await complete;
  assert.equal(window.history.state.themePartialNavigationKey, event.detail.targetEntryKey);
  assert.notEqual(event.detail.fromEntryKey, event.detail.targetEntryKey);

  navigator.stop();
  globalThis.fetch = previousFetch;
});

test("rapid consecutive navigation aborts stale request and only latest response commits", async (t) => {
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
  await t.waitFor(() => assert.equal(requests.length, 1));
  navigator.navigate(new URL("https://blog.example.com/second"));
  await t.waitFor(() => assert.equal(requests.length, 2));

  assert.equal(requests.length, 2);
  assert.equal(requests[0].signal.aborted, true);
  assert.equal(requests[1].signal.aborted, false);

  requests[1].resolve(
    pageResponse(
      `<!doctype html><html><head>
        <title>Second</title>
        <script src="/app.js"></script>
        <style data-theme-navigation-style>:root { --theme-color: green; }</style>
      </head><body><main id="main"><h1>Second content</h1>${pageData}</main></body></html>`,
      requests[1].url,
    ),
  );
  await new Promise((resolve) => document.addEventListener("theme:navigation-success", resolve, { once: true }));
  await Promise.resolve();

  requests[0].resolve(
    pageResponse(
      `<!doctype html><html><head>
        <title>Stale first</title>
        <script src="/app.js"></script>
        <style data-theme-navigation-style>:root { --theme-color: green; }</style>
      </head><body><main id="main"><h1>Stale first content</h1>${pageData}</main></body></html>`,
      requests[0].url,
    ),
  );
  await new Promise((resolve) => setImmediate(resolve));
  await t.waitFor(() => assert.equal(completions.length, 2));

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

  const nextThemeStyle = nextDocument.querySelector("style[data-theme-navigation-style]");
  nextThemeStyle.setAttribute("data-terminal-layout", "unix");
  assert.equal(headNavigationContractChanged(nextDocument, new URL("https://blog.example.com/next")), true);
  document.querySelector("style[data-theme-navigation-style]").setAttribute("data-terminal-layout", "unix");
  assert.equal(headNavigationContractChanged(nextDocument, new URL("https://blog.example.com/next")), false);

  nextThemeStyle.textContent = ":root { --theme-color: blue; }";
  assert.equal(headNavigationContractChanged(nextDocument, new URL("https://blog.example.com/next")), true);
  nextThemeStyle.textContent = ":root { --theme-color: green; }";
  nextDocument.querySelector('script[src="/plugin.js"]')?.setAttribute("src", "/plugin-v2.js");
  assert.equal(headNavigationContractChanged(nextDocument, new URL("https://blog.example.com/next")), true);
});

test.describe("the initialized theme runtime", () => {
  const list = `<div x-data="fileListNav">
    <a data-nav-item href="/article">Read article</a><a data-nav-item href="/older">Older</a>
  </div>`;
  const article =
    '<a href="#section">Jump</a><h2 id="section">Section</h2><button data-terminal-action="source-back">Back</button>';
  function main(content, pageType) {
    return `<main id="main" :tabindex="readerMode ? 0 : -1">
      ${content}
      <script id="halo-page-data" type="application/json">${JSON.stringify({ pageType, urls: { home: "/" } })}</script>
    </main>`;
  }

  test.before(async () => {
    window.history.replaceState({}, "", "/archives");
    document.head.innerHTML = "<title>Archives</title>";
    document.body.innerHTML = `<div id="shell" x-data="{ readerMode: false }"
    @theme:page-ready.document="readerMode = ['post','page'].includes($event.detail.pageType)">
    <header x-show="!readerMode">Archive header</header>${main(list, "archives")}
  </div>`;
    const { registerFileListNavComponent } = await import("../src/features/file-list-nav.ts");
    registerFileListNavComponent();
    const { bootstrapRuntime } = await import("../src/common/runtime.ts");
    bootstrapRuntime();
  });
  test.after(async () => {
    const Alpine = (await import("../src/common/alpine.ts")).default;
    Alpine.destroyTree(document.body);
    Alpine.stopObservingMutations();
  });

  test("the reader shell follows a visit and source-back restores the list after article anchors", async (t) => {
    const { PAGE_READY_EVENT } = await import("../src/common/runtime-events.ts");
    const shell = document.getElementById("shell");
    const header = shell.querySelector("header");
    const requests = [];
    t.mock.method(globalThis, "fetch", async (url) => {
      const path = new URL(url, document.baseURI).pathname;
      requests.push(path);
      const isArticle = path === "/article";
      assert.ok(isArticle || path === "/archives", path);
      return pageResponse(
        `<html><head><title>${isArticle ? "Article" : "Archives"}</title></head>
      <body>${main(isArticle ? article : list, isArticle ? "post" : "archives")}</body></html>`,
        url,
      );
    });
    function pressDown() {
      const key = new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true, cancelable: true });
      window.dispatchEvent(key);
      return key.defaultPrevented;
    }
    assert.equal(pressDown(), true);
    assert.equal(document.activeElement.getAttribute("href"), "/older");
    const sourceKey = window.history.state.themePartialNavigationKey;
    const ready = [];
    const onReady = (event) => ready.push(event.detail.pageType);
    document.addEventListener(PAGE_READY_EVENT, onReady);
    t.after(() => document.removeEventListener(PAGE_READY_EVENT, onReady));
    document.querySelector("#main a").click();
    await t.waitFor(() => {
      assert.deepEqual(ready, ["post"]);
      assert.equal(header.style.display, "none");
    });

    assert.equal(document.getElementById("shell"), shell);
    assert.equal(pressDown(), false, "The departed file list must release its keyboard handler");
    assert.equal(document.getElementById("main").tabIndex, 0);
    assert.equal(window.haloData.pageType, "post");
    const articleKey = window.history.state.themePartialNavigationKey;
    assert.notEqual(articleKey, sourceKey);
    document.querySelector("#main a").click();
    assert.equal(window.location.hash, "#section");
    assert.equal(window.history.state.themeSourceHistoryDepth, 2);
    assert.equal(window.history.state.themePreviousUrl, "https://blog.example.com/archives");
    assert.notEqual(window.history.state.themePartialNavigationKey, articleKey);

    document.querySelector("[data-terminal-action]").click();
    // Alpine can defer showing the header until after the page-ready event.
    await t.waitFor(() => {
      assert.deepEqual(ready, ["post", "archives"]);
      assert.equal(header.style.display, "");
    });
    assert.equal(window.location.pathname, "/archives");
    assert.equal(window.history.state.themePartialNavigationKey, sourceKey);
    assert.equal(window.haloData.pageType, "archives");
    assert.equal(pressDown(), true);
    assert.equal(document.activeElement.getAttribute("href"), "/older");
    assert.equal(document.getElementById("main").tabIndex, -1);
    assert.deepEqual(requests, ["/article", "/archives"]);
  });

  test("clicking a hash during an in-flight visit keeps the displayed article when the request later rejects", async (t) => {
    const { navigateToUrl } = await import("../src/common/navigation.ts");
    const main = document.getElementById("main");
    main.innerHTML = '<a href="#reading">Keep reading</a><h2 id="reading">Reading</h2>';
    const completions = [];
    const errors = [];
    const reloads = [];
    const ac = new AbortController();
    t.after(() => ac.abort());
    for (const [type, events] of [
      [NAVIGATION_COMPLETE_EVENT, completions],
      [NAVIGATION_ERROR_EVENT, errors],
      [NAVIGATION_FULL_RELOAD_EVENT, reloads],
    ]) {
      document.addEventListener(type, (event) => events.push(event.detail.targetUrl), { signal: ac.signal });
    }
    let failRequest;
    let requestSignal;
    const fetch = t.mock.method(globalThis, "fetch", (_url, options) => {
      requestSignal = options.signal;
      return new Promise((_resolve, reject) => {
        failRequest = reject;
      });
    });
    navigateToUrl("/slow");
    await t.waitFor(() => assert.equal(fetch.mock.callCount(), 1));
    main.querySelector("a").click();
    assert.equal(requestSignal.aborted, true);
    failRequest(new Error("late network failure"));
    await new Promise((resolve) => setImmediate(resolve));
    assert.deepEqual(completions, ["https://blog.example.com/slow"]);
    assert.deepEqual(errors, []);
    assert.deepEqual(reloads, []);
    assert.equal(location.href, "https://blog.example.com/archives#reading");
    assert.equal(document.getElementById("main"), main);
    assert.equal(main.hasAttribute("aria-busy"), false);
  });

  test("clicking an on-page anchor after a request error cancels the late full-page fallback", async (t) => {
    const { navigateToUrl } = await import("../src/common/navigation.ts");
    const main = document.getElementById("main");
    main.innerHTML = '<a href="#keep">Stay here</a><h2 id="keep">Keep reading</h2>';
    const attempts = [];
    const failures = [];
    const full = [];
    const onFull = (event) => full.push(event.detail.targetUrl);
    const onError = (event) => failures.push(event.detail.targetUrl);
    document.addEventListener(NAVIGATION_ERROR_EVENT, onError);
    document.addEventListener(NAVIGATION_FULL_RELOAD_EVENT, onFull);
    t.after(() => {
      document.removeEventListener(NAVIGATION_ERROR_EVENT, onError);
      document.removeEventListener(NAVIGATION_FULL_RELOAD_EVENT, onFull);
    });
    t.mock.method(globalThis, "fetch", async (url) => {
      attempts.push(new URL(url, document.baseURI).pathname);
      throw new Error("offline");
    });
    const error = new Promise((resolve) => document.addEventListener(NAVIGATION_ERROR_EVENT, resolve, { once: true }));
    navigateToUrl("/unavailable");
    await error;
    // The error has been reported, but the old page is still on screen.
    const click = new MouseEvent("click", { button: 0, bubbles: true, cancelable: true, detail: 1 });
    main.querySelector("a").dispatchEvent(click);
    assert.equal(click.defaultPrevented, true);
    await new Promise((resolve) => window.setTimeout(resolve, 180));
    assert.deepEqual(failures, ["https://blog.example.com/unavailable"]);
    assert.deepEqual(full, []);
    assert.deepEqual(attempts, ["/unavailable"]);
    assert.equal(window.location.href, "https://blog.example.com/archives#keep");
    assert.equal(document.getElementById("main"), main);
    assert.equal(main.hasAttribute("aria-busy"), false);
  });
  for (const trigger of ["click", "command"]) {
    test(`a new ${trigger} wins when the previous error's fallback frame runs before the queued visit starts`, async (t) => {
      const { navigateToUrl } = await import("../src/common/navigation.ts");
      const failed = `/failed-${trigger}`;
      const next = `/chosen-${trigger}`;
      const main = document.getElementById("main");
      const link = document.createElement("a");
      link.href = next;
      main.append(link);
      const requested = [];
      const reloads = [];
      const successes = [];
      const completions = [];
      const ac = new AbortController();
      t.after(() => {
        ac.abort();
        window.dispatchEvent(new window.PageTransitionEvent("pageshow", { persisted: true }));
      });
      for (const [name, paths] of [
        [NAVIGATION_FULL_RELOAD_EVENT, reloads],
        ["theme:navigation-success", successes],
        [NAVIGATION_COMPLETE_EVENT, completions],
      ]) {
        document.addEventListener(name, (event) => paths.push(new URL(event.detail.targetUrl).pathname), {
          signal: ac.signal,
        });
      }
      t.mock.method(globalThis, "fetch", async (url) => {
        const path = new URL(url, document.baseURI).pathname;
        requested.push(path);
        if (path === failed) throw new Error("offline");
        assert.equal(path, next);
        return pageResponse(
          `<html><head><title>Chosen</title></head><body><main id="main"><h1>Chosen</h1>${pageData}</main></body></html>`,
          url,
        );
      });

      const frames = [];
      const animationFrame = t.mock.method(window, "requestAnimationFrame", (callback) => frames.push(callback));
      const error = new Promise((resolve) =>
        document.addEventListener(NAVIGATION_ERROR_EVENT, resolve, { once: true }),
      );
      navigateToUrl(failed);
      assert.equal(new URL((await error).detail.targetUrl).pathname, failed);
      assert.equal(frames.length, 1, "The error handler must have scheduled its fallback frame");
      animationFrame.mock.restore();

      const timer = t.mock.method(window, "setTimeout");
      if (trigger === "click") link.click();
      else navigateToUrl(next);
      assert.ok(
        timer.mock.calls.some(({ arguments: args }) => args[1] === 0),
        "The chosen visit must be queued",
      );
      assert.deepEqual(requested, [failed]);
      // Still in the same JS task: the chosen visit's zero-delay timer cannot have run.
      frames[0](window.performance.now());
      assert.deepEqual(reloads, [], "The earlier failure cannot take over the queued user action");
      await t.waitFor(() => assert.deepEqual(completions, [failed, next]));
      assert.deepEqual(successes, [next]);
      assert.deepEqual(requested, [failed, next]);
      assert.equal(location.pathname, next);
      assert.equal(document.querySelector("#main h1").textContent, "Chosen");
      assert.deepEqual(reloads, []);
    });
  }
  test("an explicit full navigation still wins over a queued command", async (t) => {
    const { navigateToUrl, navigateWithFullReload } = await import("../src/common/navigation.ts");
    const full = [];
    const ac = new AbortController();
    t.after(() => {
      ac.abort();
      window.dispatchEvent(new window.PageTransitionEvent("pageshow", { persisted: true }));
    });
    document.addEventListener(NAVIGATION_FULL_RELOAD_EVENT, (event) => full.push(event.detail.targetUrl), {
      signal: ac.signal,
    });
    const fetch = t.mock.method(globalThis, "fetch", async (url) => pageResponse("unreachable", url));
    navigateToUrl("/queued-command");
    assert.equal(navigateWithFullReload("/explicit-full"), true);
    await new Promise((resolve) => window.setTimeout(resolve, 0));
    assert.deepEqual(full, ["https://blog.example.com/explicit-full"]);
    assert.equal(fetch.mock.callCount(), 0);
  });
  test("a command leaving an official tracker page performs no partial URL writes or requests", async (t) => {
    const { navigateToUrl } = await import("../src/common/navigation.ts");
    const tracker = document.createElement("script");
    tracker.src = "/halo-tracker.js";
    tracker.dataset.plural = "posts";
    tracker.dataset.name = "article";
    document.head.append(tracker);
    const origin = location.href;
    const loads = [];
    const ac = new AbortController();
    t.after(() => {
      ac.abort();
      tracker.remove();
      window.dispatchEvent(new window.PageTransitionEvent("pageshow", { persisted: true }));
    });
    document.addEventListener(NAVIGATION_FULL_RELOAD_EVENT, (event) => loads.push(event.detail.targetUrl), {
      signal: ac.signal,
    });
    const push = t.mock.method(history, "pushState");
    const replace = t.mock.method(history, "replaceState");
    const fetch = t.mock.method(globalThis, "fetch", async (url) => pageResponse("unexpected", url));
    assert.equal(navigateToUrl("/category-list"), true);
    await new Promise((resolve) => window.setTimeout(resolve, 0));
    assert.deepEqual(loads, ["https://blog.example.com/category-list"]);
    assert.equal(location.href, origin);
    assert.equal(push.mock.callCount(), 0);
    assert.equal(replace.mock.callCount(), 0);
    assert.equal(fetch.mock.callCount(), 0);
  });
});
