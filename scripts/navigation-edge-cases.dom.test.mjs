import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const environment = installDom(
  '<!doctype html><html lang="zh-CN"><head><title>Home</title></head><body><main id="main"></main></body></html>',
);

// Exercise the legacy/non-object history-state recovery path when the first
// navigator instance establishes its entry identity.
window.history.replaceState("legacy-state", "", "/");

const {
  NAVIGATION_COMPLETE_EVENT,
  NAVIGATION_ERROR_EVENT,
  NAVIGATION_FULL_RELOAD_EVENT,
  NAVIGATION_FULL_RELOAD_RESET_EVENT,
  NAVIGATION_SAME_DOCUMENT_EVENT,
  NAVIGATION_SUCCESS_EVENT,
  PartialPageNavigator,
  getHeadNavigationContractSignatures,
  headNavigationContractChanged,
  navigateToUrl,
  navigateWithFullReload,
  resolveSafeNavigationUrl,
  setPartialNavigationBarrier,
  shouldBypassPartialNavigation,
  startPartialNavigation,
  syncPageMetadata,
} = await import("../src/common/navigation.ts");

test.after(() => environment.restore());

function resetPage(path = "/") {
  window.history.replaceState({}, "", path);
  document.documentElement.setAttribute("lang", "zh-CN");
  document.documentElement.setAttribute("dir", "rtl");
  document.head.innerHTML = '<title>Home</title><script src="/app.js"></script>';
  document.body.innerHTML = '<main id="main"></main>';
  setPartialNavigationBarrier(Promise.resolve());
}

function pageMarkup({
  body = '<main id="main"><h1>Next</h1></main>',
  head = '<script src="/app.js"></script>',
  title = "Next",
} = {}) {
  return `<!doctype html><html><head><title>${title}</title>${head}</head><body>${body}</body></html>`;
}

function responseWithUrl(markup, url, init = {}) {
  const response = new Response(markup, {
    headers: { "content-type": "text/html; charset=utf-8", ...init.headers },
    status: init.status ?? 200,
  });
  Object.defineProperty(response, "url", { configurable: true, value: url });
  return response;
}

function once(target, eventName) {
  return new Promise((resolve) => target.addEventListener(eventName, resolve, { once: true }));
}

async function navigateAndReadError(navigator, target) {
  const error = once(document, NAVIGATION_ERROR_EVENT);
  const complete = once(document, NAVIGATION_COMPLETE_EVENT);
  navigator.navigate(new URL(target, window.location.href));
  const [errorEvent] = await Promise.all([error, complete]);
  return errorEvent.detail.error;
}

function dispatchClick(element, init = {}) {
  const event = new MouseEvent("click", {
    bubbles: true,
    button: 0,
    cancelable: true,
    detail: 1,
    ...init,
  });
  element.dispatchEvent(event);
  return event;
}

test("navigation URL helpers distinguish safe partial, full, and blocked destinations", () => {
  resetPage("/posts/current");

  assert.equal(resolveSafeNavigationUrl("/categories")?.href, "https://blog.example.com/categories");
  assert.equal(resolveSafeNavigationUrl("javascript:alert(1)"), null);
  assert.equal(shouldBypassPartialNavigation(new URL("https://blog.example.com/categories")), false);
  assert.equal(shouldBypassPartialNavigation(new URL("https://blog.example.com/login")), true);
  assert.equal(shouldBypassPartialNavigation(new URL("https://outside.example/categories")), true);
});

test("history entry recovery handles empty, invalid, and existing identifiers", () => {
  resetPage();
  window.history.replaceState({ themePartialNavigationKey: "" }, "", "/empty-key");
  new PartialPageNavigator();
  assert.equal(typeof window.history.state.themePartialNavigationKey, "string");
  assert.notEqual(window.history.state.themePartialNavigationKey, "");

  window.history.replaceState({ themePartialNavigationKey: 42 }, "", "/numeric-key");
  new PartialPageNavigator();
  assert.equal(typeof window.history.state.themePartialNavigationKey, "string");

  window.history.replaceState({ themePartialNavigationKey: "existing-key" }, "", "/existing-key");
  new PartialPageNavigator();
  assert.equal(window.history.state.themePartialNavigationKey, "existing-key");
});

test("head signatures normalize resources while excluding page metadata and inert styles", () => {
  resetPage();
  document.head.innerHTML = `
    <title>Current</title>
    <meta name="author" content="Sky">
    <meta name="description" content="Description">
    <meta name="keywords" content="theme">
    <meta name="robots" content="index">
    <meta name="twitter:card" content="summary">
    <meta property="article:author" content="Sky">
    <meta property="og:title" content="Current">
    <link rel="canonical alternate" href="/current">
    <link rel="next" href="/next">
    <link rel="  canonical   next  " href="/spaced">
    <script type="application/ld+json">{"name":"Current"}</script>
    <meta charset="utf-8">
    <link href="/without-rel">
    <script src="/without-type.js"></script>
    <style>.runtime-output { color: green; }</style>
    <script src="./app.js" nonce="one"></script>
    <link rel="stylesheet" href="http://[">
    <style data-theme-navigation-style>:root { --accent: green; }</style>
  `;

  const signatures = getHeadNavigationContractSignatures(document, new URL("https://blog.example.com/base/"));
  assert.equal(signatures.length, 6);
  assert.match(signatures[0], /meta charset="utf-8"/);
  assert.match(signatures[1], /href="https:\/\/blog\.example\.com\/without-rel"/);
  assert.match(signatures[2], /src="https:\/\/blog\.example\.com\/without-type\.js"/);
  assert.match(signatures[3], /src="https:\/\/blog\.example\.com\/base\/app\.js"/);
  assert.doesNotMatch(signatures[3], /nonce=/);
  assert.match(signatures[4], /href="http:\/\/\["/);
  assert.match(signatures[5], /data-theme-navigation-style/);

  const xmlDocument = new DOMParser().parseFromString("<root />", "application/xml");
  assert.deepEqual(getHeadNavigationContractSignatures(xmlDocument, new URL("https://blog.example.com/")), []);

  const same = new DOMParser().parseFromString(document.documentElement.outerHTML, "text/html");
  same.querySelector('script[src="./app.js"]')?.setAttribute("nonce", "different");
  assert.equal(headNavigationContractChanged(same, new URL("https://blog.example.com/")), false);

  same.head.appendChild(same.createElement("script"));
  assert.equal(headNavigationContractChanged(same, new URL("https://blog.example.com/")), true);
});

test("metadata synchronization handles every supported family and removes absent language attributes", () => {
  resetPage();
  document.head.innerHTML = `
    <title>Old</title>
    <meta name="description" content="old">
    <meta name="viewport" content="width=device-width">
    <link rel="canonical" href="/old">
    <link rel="stylesheet" href="/app.css">
  `;
  const next = new DOMParser().parseFromString(
    `<!doctype html><html><head><title>New</title>
      <meta name="author" content="Sky">
      <meta name="twitter:title" content="New">
      <meta property="article:section" content="Tech">
      <link rel="prev alternate" href="/previous">
      <script type="application/ld+json">{"name":"New"}</script>
    </head><body></body></html>`,
    "text/html",
  );

  syncPageMetadata(next);
  assert.equal(document.querySelector('meta[name="description"]'), null);
  assert.equal(document.querySelector('meta[name="viewport"]')?.getAttribute("content"), "width=device-width");
  assert.equal(document.querySelector('link[rel="stylesheet"]')?.getAttribute("href"), "/app.css");
  assert.equal(document.querySelector('meta[name="author"]')?.getAttribute("content"), "Sky");
  assert.equal(document.querySelector('meta[name="twitter:title"]')?.getAttribute("content"), "New");
  assert.equal(document.querySelector('meta[property="article:section"]')?.getAttribute("content"), "Tech");
  assert.equal(document.documentElement.hasAttribute("lang"), false);
  assert.equal(document.documentElement.hasAttribute("dir"), false);

  const xmlDocument = new DOMParser().parseFromString('<root lang="en" dir="ltr" />', "application/xml");
  syncPageMetadata(xmlDocument);
  assert.equal(document.documentElement.lang, "en");
  assert.equal(document.documentElement.dir, "ltr");
});

test("click interception ignores modified or native-only clicks and reports unsafe URLs", () => {
  resetPage();
  document.body.innerHTML = `
    <main id="main"></main>
    <span id="plain">plain</span>
    <a id="unsafe" href="javascript:alert(1)">unsafe</a>
    <a id="download" href="/file.zip" download>download</a>
    <a id="blank" href="/next" target="_blank">blank</a>
    <a id="external" href="https://outside.example/next">external</a>
    <a id="mail" href="mailto:sky@example.com">mail</a>
  `;
  const assigned = [];
  const navigator = new PartialPageNavigator({
    assign: (target) => (assigned.push(target.href), false),
    reload: () => false,
  });
  navigator.start();
  navigator.start();

  Object.defineProperty(window.history, "scrollRestoration", {
    configurable: true,
    value: "auto",
    writable: true,
  });
  navigator.stop();
  navigator.start();
  assert.equal(window.history.scrollRestoration, "manual");

  document.dispatchEvent(new MouseEvent("click", { bubbles: true, button: 0, cancelable: true }));
  dispatchClick(document.getElementById("plain"));
  dispatchClick(document.getElementById("plain"), { button: 1 });
  for (const modifier of ["metaKey", "ctrlKey", "shiftKey", "altKey"]) {
    dispatchClick(document.getElementById("plain"), { [modifier]: true });
  }
  const preCancelled = new MouseEvent("click", { bubbles: true, button: 0, cancelable: true });
  preCancelled.preventDefault();
  document.getElementById("plain").dispatchEvent(preCancelled);

  const statuses = [];
  const onStatus = (event) => statuses.push(event.detail);
  document.addEventListener("theme:runtime-status", onStatus);
  const unsafe = dispatchClick(document.getElementById("unsafe"));
  assert.equal(unsafe.defaultPrevented, true);
  assert.match(statuses.at(-1)?.message ?? "", /invalid|unsupported protocol/i);

  for (const id of ["download", "blank", "external", "mail"]) {
    let preventedByNavigator = true;
    window.addEventListener(
      "click",
      (event) => {
        preventedByNavigator = event.defaultPrevented;
        // Keep JSDOM from attempting the native navigation after verifying the
        // theme deliberately left the click alone.
        event.preventDefault();
      },
      { once: true },
    );
    dispatchClick(document.getElementById(id));
    assert.equal(preventedByNavigator, false, id);
  }
  assert.deepEqual(assigned, []);

  document.removeEventListener("theme:runtime-status", onStatus);
  navigator.stop();
  navigator.stop();
});

test("ordinary anchor clicks run a partial request and preserve pointer focus semantics", async () => {
  resetPage("/current");
  document.body.innerHTML = '<main id="main"><a id="partial" href="/next"><span>next</span></a></main>';
  const previousFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(pageMarkup(), { headers: { "content-type": "text/html" } });
  const navigator = new PartialPageNavigator({ assign: () => true, reload: () => true });
  navigator.start();

  const success = once(document, NAVIGATION_SUCCESS_EVENT);
  const click = dispatchClick(document.querySelector("#partial span"));
  const event = await success;
  assert.equal(click.defaultPrevented, true);
  assert.equal(event.detail.focus, false);
  assert.equal(event.detail.triggerElement.id, "partial");
  assert.equal(window.location.pathname, "/next");

  navigator.stop();
  globalThis.fetch = previousFetch;
});

test("full-navigation link contracts use the adapter while same-document links stay partial", () => {
  resetPage("/current");
  document.body.innerHTML = `
    <main id="main">
      <div data-navigation-exit="full"></div>
      <a id="same" href="/current#details" target="_self"><span>same</span></a>
    </main>
    <a id="full" href="/full" data-navigation="full">full</a>
    <a id="no-pjax" href="/no-pjax" data-pjax="false">no pjax</a>
    <a id="rel" href="/rel" rel="external">rel</a>
    <a id="login" href="/login">login</a>
    <a id="exit" href="/exit">exit</a>
  `;
  const assigned = [];
  const navigator = new PartialPageNavigator({
    assign: (target) => (assigned.push(target.pathname), false),
    reload: () => false,
  });
  const sameDocument = [];
  const onSameDocument = (event) => sameDocument.push(event.detail);
  document.addEventListener(NAVIGATION_SAME_DOCUMENT_EVENT, onSameDocument);
  navigator.start();

  const nestedSame = dispatchClick(document.querySelector("#same span"), { detail: 0 });
  assert.equal(nestedSame.defaultPrevented, true);
  assert.equal(sameDocument.length, 1);
  assert.equal(sameDocument[0].focus, true);
  assert.equal(sameDocument[0].triggerElement.id, "same");

  for (const id of ["full", "no-pjax", "rel", "login", "exit"]) {
    const click = dispatchClick(document.getElementById(id));
    assert.equal(click.defaultPrevented, true, id);
  }
  assert.deepEqual(assigned, ["/full", "/no-pjax", "/rel", "/login", "/exit"]);

  navigator.stop();
  document.removeEventListener(NAVIGATION_SAME_DOCUMENT_EVENT, onSameDocument);
});

test("same-document navigation preserves entry identity and honors explicit history entries", () => {
  resetPage("/current");
  const navigator = new PartialPageNavigator({ assign: () => true, reload: () => true });
  const events = [];
  const onSameDocument = (event) => events.push(event.detail);
  document.addEventListener(NAVIGATION_SAME_DOCUMENT_EVENT, onSameDocument);

  navigator.navigate(new URL(window.location.href));
  navigator.navigate(new URL("https://blog.example.com/current#one"), { focus: true });
  navigator.navigate(new URL("https://blog.example.com/current#two"), {
    history: true,
    targetEntryKey: "restored-entry",
  });

  assert.equal(events.length, 3);
  assert.equal(events[0].fromEntryKey, events[0].targetEntryKey);
  assert.equal(events[0].history, false);
  assert.equal(events[1].focus, true);
  assert.notEqual(events[1].fromEntryKey, events[1].targetEntryKey);
  assert.equal(events[2].focus, true);
  assert.equal(events[2].history, true);
  assert.equal(events[2].targetEntryKey, "restored-entry");
  assert.equal(window.location.hash, "#one");

  navigator.prepareForFullNavigation(new URL("https://blog.example.com/full"));
  navigator.prepareForFullNavigation(new URL("https://blog.example.com/ignored"));
  assert.equal(navigator.navigateFully(new URL("https://blog.example.com/already-pending")), true);
  navigator.navigate(new URL("https://blog.example.com/current#blocked"));
  assert.equal(events.length, 3);
  navigator.stop();
  document.removeEventListener(NAVIGATION_SAME_DOCUMENT_EVENT, onSameDocument);
});

test("popstate restores hashes, reloads guarded pages, and fetches different documents as history navigation", async () => {
  resetPage("/base");
  const calls = [];
  const navigator = new PartialPageNavigator({
    assign: (target) => (calls.push(["assign", target.href]), true),
    reload: (target) => (calls.push(["reload", target.href]), false),
  });
  navigator.start();

  const notPersisted = new Event("pageshow");
  Object.defineProperty(notPersisted, "persisted", { value: false });
  window.dispatchEvent(notPersisted);
  const persistedWithoutNavigation = new Event("pageshow");
  Object.defineProperty(persistedWithoutNavigation, "persisted", { value: true });
  window.dispatchEvent(persistedWithoutNavigation);

  window.history.pushState({}, "", "/login");
  window.dispatchEvent(new Event("popstate"));
  assert.deepEqual(calls, []);
  window.history.replaceState({}, "", "/base");

  const sameDocument = once(document, NAVIGATION_SAME_DOCUMENT_EVENT);
  window.history.pushState({ themePartialNavigationKey: "hash-entry" }, "", "/base#section");
  window.dispatchEvent(new Event("popstate"));
  const sameEvent = await sameDocument;
  assert.equal(sameEvent.detail.history, true);
  assert.equal(sameEvent.detail.targetEntryKey, "hash-entry");

  document.getElementById("main").innerHTML = '<div data-navigation-exit="full"></div>';
  window.history.pushState({}, "", "/guarded");
  window.dispatchEvent(new Event("popstate"));
  assert.deepEqual(
    calls.map(([kind]) => kind),
    ["reload"],
  );
  assert.equal(navigator.isFullNavigationPending(), false);

  document.getElementById("main").replaceChildren();
  const previousFetch = globalThis.fetch;
  globalThis.fetch = async (_url, options) => {
    assert.equal(options.credentials, "same-origin");
    assert.equal(options.cache, "no-cache");
    assert.equal(options.headers["X-Requested-With"], "ThemePartialNavigation");
    return responseWithUrl(pageMarkup(), "https://blog.example.com/canonical");
  };
  window.history.pushState({ themePartialNavigationKey: "history-entry" }, "", "/history");
  const success = once(document, NAVIGATION_SUCCESS_EVENT);
  window.dispatchEvent(new Event("popstate"));
  const successEvent = await success;
  assert.equal(successEvent.detail.history, true);
  assert.equal(successEvent.detail.focus, true);
  assert.equal(successEvent.detail.targetEntryKey, "history-entry");
  assert.equal(window.location.pathname, "/canonical");

  navigator.stop();
  globalThis.fetch = previousFetch;
});

test("partial requests expose HTTP, content-type, redirect, and shell validation failures", async () => {
  resetPage();
  const previousFetch = globalThis.fetch;
  const cases = [
    {
      expected: /HTTP 503/,
      response: () => new Response("down", { status: 503, headers: { "content-type": "text/html" } }),
    },
    {
      expected: /content type: unknown/,
      response: () => new Response(null),
    },
    {
      expected: /content type: application\/json/,
      response: () => new Response("{}", { headers: { "content-type": "application/json" } }),
    },
    {
      expected: /outside the theme/,
      response: () => responseWithUrl(pageMarkup(), "https://outside.example/redirected"),
    },
    {
      expected: /required title and #main/,
      response: () =>
        new Response(pageMarkup({ body: "<p>missing main</p>" }), { headers: { "content-type": "text/html" } }),
    },
    {
      expected: /required title and #main/,
      prepare: () => document.getElementById("main").remove(),
      response: () => new Response(pageMarkup(), { headers: { "content-type": "text/html" } }),
    },
    {
      expected: /required title and #main/,
      response: () => new Response(pageMarkup({ title: "   " }), { headers: { "content-type": "text/html" } }),
    },
  ];

  for (const [index, scenario] of cases.entries()) {
    resetPage();
    scenario.prepare?.();
    globalThis.fetch = async () => scenario.response();
    const navigator = new PartialPageNavigator({ assign: () => false, reload: () => false });
    const error = await navigateAndReadError(navigator, `/failure-${index}`);
    assert.match(error.message, scenario.expected);
    navigator.stop();
  }

  globalThis.fetch = previousFetch;
});

test("head contract changes choose assign or reload and reset adapter rejection", async () => {
  const previousFetch = globalThis.fetch;

  resetPage("/current");
  let assigned = "";
  const changedHeadMarkup = pageMarkup({ head: '<script src="/plugin-v2.js"></script>' });
  assert.equal(
    headNavigationContractChanged(
      new DOMParser().parseFromString(changedHeadMarkup, "text/html"),
      new URL("https://blog.example.com/next"),
    ),
    true,
  );
  globalThis.fetch = async () => responseWithUrl(changedHeadMarkup, "https://blog.example.com/next");
  const assigningNavigator = new PartialPageNavigator({
    assign: (target) => ((assigned = target.href), true),
    reload: () => false,
  });
  const fullIntent = once(document, NAVIGATION_FULL_RELOAD_EVENT);
  assigningNavigator.navigate(new URL("https://blog.example.com/next"));
  await fullIntent;
  assert.equal(assigned, "https://blog.example.com/next");
  assert.equal(assigningNavigator.isFullNavigationPending(), true);
  assigningNavigator.stop();

  resetPage("/current");
  let reloaded = "";
  globalThis.fetch = async () =>
    responseWithUrl(pageMarkup({ head: '<script src="/plugin-v2.js"></script>' }), window.location.href);
  const reloadingNavigator = new PartialPageNavigator({
    assign: () => false,
    reload: (target) => ((reloaded = target.href), false),
  });
  const reloadReset = once(document, NAVIGATION_FULL_RELOAD_RESET_EVENT);
  const reloadComplete = once(document, NAVIGATION_COMPLETE_EVENT);
  reloadingNavigator.navigate(new URL("/requested", window.location.href));
  await Promise.all([reloadReset, reloadComplete]);
  assert.equal(reloaded, "https://blog.example.com/current");
  assert.equal(reloadingNavigator.isFullNavigationPending(), false);
  reloadingNavigator.stop();

  resetPage();
  globalThis.fetch = async () =>
    responseWithUrl(pageMarkup({ head: '<script src="/plugin-v2.js"></script>' }), "https://blog.example.com/rejected");
  const rejectingNavigator = new PartialPageNavigator({ assign: () => false, reload: () => false });
  const reset = once(document, NAVIGATION_FULL_RELOAD_RESET_EVENT);
  const complete = once(document, NAVIGATION_COMPLETE_EVENT);
  rejectingNavigator.navigate(new URL("/rejected", window.location.href));
  await Promise.all([reset, complete]);
  assert.equal(rejectingNavigator.isFullNavigationPending(), false);
  rejectingNavigator.stop();

  globalThis.fetch = previousFetch;
});

test("initialization barriers prevent stale or explicitly superseded pages from committing", async () => {
  resetPage();
  const previousFetch = globalThis.fetch;
  let releaseBarrier;
  setPartialNavigationBarrier(new Promise((resolve) => (releaseBarrier = resolve)));
  globalThis.fetch = async (url) => responseWithUrl(pageMarkup({ title: new URL(url).pathname }), String(url));

  const navigator = new PartialPageNavigator({ assign: () => true, reload: () => true });
  const successes = [];
  const onSuccess = (event) => successes.push(new URL(event.detail.targetUrl).pathname);
  document.addEventListener(NAVIGATION_SUCCESS_EVENT, onSuccess);

  navigator.navigate(new URL("https://blog.example.com/first"));
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  navigator.navigate(new URL("https://blog.example.com/second"));
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  releaseBarrier();
  await once(document, NAVIGATION_SUCCESS_EVENT);
  assert.deepEqual(successes, ["/second"]);

  let releaseSupersededBarrier;
  setPartialNavigationBarrier(new Promise((resolve) => (releaseSupersededBarrier = resolve)));
  navigator.navigate(new URL("https://blog.example.com/third"));
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  navigator.prepareForFullNavigation(new URL("https://blog.example.com/full"));
  releaseSupersededBarrier();
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  assert.deepEqual(successes, ["/second"]);

  navigator.stop();
  document.removeEventListener(NAVIGATION_SUCCESS_EVENT, onSuccess);
  setPartialNavigationBarrier(Promise.resolve());
  globalThis.fetch = previousFetch;
});

test("timeouts and full-navigation cancellation win while response work is waiting to commit", async () => {
  const previousFetch = globalThis.fetch;

  resetPage();
  globalThis.fetch = async () => ({
    headers: new Headers({ "content-type": "text/html" }),
    ok: true,
    status: 200,
    text: () => new Promise((resolve) => window.setTimeout(() => resolve(pageMarkup()), 15)),
    url: "https://blog.example.com/slow-markup",
  });
  const timeoutNavigator = new PartialPageNavigator(undefined, { partialRequestTimeoutMs: 5 });
  const timeoutCompletions = [];
  const onTimeoutComplete = (event) => timeoutCompletions.push(event.detail.targetUrl);
  document.addEventListener(NAVIGATION_COMPLETE_EVENT, onTimeoutComplete);
  const timeoutComplete = once(document, NAVIGATION_COMPLETE_EVENT);
  timeoutNavigator.navigate(new URL("https://blog.example.com/slow-markup"));
  await timeoutComplete;
  assert.deepEqual(timeoutCompletions, ["https://blog.example.com/slow-markup"]);
  assert.equal(document.title, "Home");
  timeoutNavigator.stop();
  document.removeEventListener(NAVIGATION_COMPLETE_EVENT, onTimeoutComplete);

  resetPage();
  let releaseMarkup;
  globalThis.fetch = async (_url, options) => ({
    headers: new Headers({ "content-type": "text/html" }),
    ok: true,
    status: 200,
    text: () =>
      new Promise((resolve, reject) => {
        releaseMarkup = () => resolve(pageMarkup());
        options.signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), {
          once: true,
        });
      }),
    url: "https://blog.example.com/waiting-markup",
  });
  const fullNavigator = new PartialPageNavigator({ assign: () => true, reload: () => true });
  const fullIntent = once(document, NAVIGATION_FULL_RELOAD_EVENT);
  fullNavigator.navigate(new URL("https://blog.example.com/waiting-markup"));
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  fullNavigator.prepareForFullNavigation(new URL("https://blog.example.com/full"));
  await fullIntent;
  releaseMarkup?.();
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  assert.equal(fullNavigator.isFullNavigationPending(), true);
  fullNavigator.stop();

  setPartialNavigationBarrier(Promise.resolve());
  globalThis.fetch = previousFetch;
});

test("aborting a superseded request rejects stale fetch work without emitting a navigation error", async () => {
  resetPage();
  const previousFetch = globalThis.fetch;
  let requestCount = 0;
  globalThis.fetch = async (url, options) => {
    requestCount += 1;
    if (requestCount === 1) {
      return new Promise((_resolve, reject) => {
        options.signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), {
          once: true,
        });
      });
    }
    return responseWithUrl(pageMarkup(), String(url));
  };
  const errors = [];
  const onError = (event) => errors.push(event.detail.error);
  document.addEventListener(NAVIGATION_ERROR_EVENT, onError);
  const navigator = new PartialPageNavigator();
  navigator.navigate(new URL("https://blog.example.com/first"));
  const success = once(document, NAVIGATION_SUCCESS_EVENT);
  navigator.navigate(new URL("https://blog.example.com/second"));
  await success;
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  assert.deepEqual(errors, []);
  assert.equal(document.querySelector("#main h1")?.textContent, "Next");

  navigator.stop();
  document.removeEventListener(NAVIGATION_ERROR_EVENT, onError);
  globalThis.fetch = previousFetch;
});

test("an active same-document popstate restarts the request with history semantics", async () => {
  resetPage("/current");
  const previousFetch = globalThis.fetch;
  const requests = [];
  globalThis.fetch = (url, options) => new Promise((resolve) => requests.push({ options, resolve, url: String(url) }));
  const navigator = new PartialPageNavigator({ assign: () => true, reload: () => true });
  navigator.start();

  navigator.navigate(new URL("https://blog.example.com/next"));
  window.history.pushState({ themePartialNavigationKey: "restored" }, "", "/current#restored");
  window.dispatchEvent(new Event("popstate"));
  assert.equal(requests.length, 2);
  assert.equal(requests[0].options.signal.aborted, true);
  assert.equal(requests[1].url, "https://blog.example.com/current");

  requests[1].resolve(responseWithUrl(pageMarkup(), "https://blog.example.com/current#ignored"));
  const success = await once(document, NAVIGATION_SUCCESS_EVENT);
  assert.equal(success.detail.history, true);
  assert.equal(success.detail.targetEntryKey, "restored");
  assert.equal(success.detail.targetUrl, "https://blog.example.com/current#restored");

  navigator.stop();
  globalThis.fetch = previousFetch;
});

test("public singleton navigation handles blocked URLs and same-document destinations idempotently", async () => {
  resetPage("/singleton");
  const statuses = [];
  const onStatus = (event) => statuses.push(event.detail.message);
  document.addEventListener("theme:runtime-status", onStatus);

  assert.equal(navigateWithFullReload("javascript:alert(1)"), false);
  assert.equal(navigateToUrl("data:text/html,unsafe"), false);
  assert.equal(statuses.length, 2);

  const jsdomErrors = [];
  environment.dom.virtualConsole.removeAllListeners("jsdomError");
  environment.dom.virtualConsole.on("jsdomError", (error) => jsdomErrors.push(error));
  const directIntent = once(document, NAVIGATION_FULL_RELOAD_EVENT);
  assert.equal(navigateWithFullReload("/before-start"), true);
  await directIntent;
  assert.equal(navigateToUrl("mailto:sky@example.com"), true);

  startPartialNavigation();
  startPartialNavigation();
  const sameDocument = once(document, NAVIGATION_SAME_DOCUMENT_EVENT);
  assert.equal(navigateToUrl("#details"), true);
  const event = await sameDocument;
  assert.equal(event.detail.focus, true);
  assert.equal(event.detail.targetUrl, "https://blog.example.com/singleton#details");

  const controllerIntent = once(document, NAVIGATION_FULL_RELOAD_EVENT);
  assert.equal(navigateWithFullReload("/full"), true);
  await controllerIntent;
  const restored = new Event("pageshow");
  Object.defineProperty(restored, "persisted", { value: true });
  window.dispatchEvent(restored);

  document.body.innerHTML = '<main id="main"><div data-navigation-exit="full"></div></main>';
  window.history.pushState({}, "", "/guarded-singleton");
  const reloadIntent = once(document, NAVIGATION_FULL_RELOAD_EVENT);
  window.dispatchEvent(new Event("popstate"));
  await reloadIntent;
  window.dispatchEvent(restored);
  assert.equal(jsdomErrors.length >= 3, true);

  document.removeEventListener("theme:runtime-status", onStatus);
});
