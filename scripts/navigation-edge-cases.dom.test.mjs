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

const testNavigators = new Set();
const originalFetch = globalThis.fetch;

function createNavigator(...args) {
  const navigator = new PartialPageNavigator(...args);
  testNavigators.add(navigator);
  return navigator;
}

test.afterEach(async () => {
  for (const navigator of testNavigators) navigator.stop();
  testNavigators.clear();
  globalThis.fetch = originalFetch;
  setPartialNavigationBarrier(Promise.resolve());
  await new Promise((resolve) => setImmediate(resolve));
});
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
  pageData = '<script id="halo-page-data" type="application/json">{"pageType":"page","urls":{"home":"/"}}</script>',
} = {}) {
  return `<!doctype html><html><head><title>${title}</title>${head}</head><body>${body.replace("</main>", () => pageData + "</main>")}</body></html>`;
}

function responseWithUrl(markup, url, init = {}) {
  const response = new Response(markup, {
    headers: { "content-type": "text/html; charset=utf-8", ...init.headers },
    status: init.status ?? 200,
  });
  Object.defineProperty(response, "url", { configurable: true, value: new URL(url, document.baseURI).href });
  return response;
}

function once(target, eventName) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      target.removeEventListener(eventName, onEvent);
      reject(new Error(`Timed out waiting for ${eventName} at ${window.location.href}`));
    }, 1500);
    function onEvent(event) {
      clearTimeout(timer);
      resolve(event);
    }
    target.addEventListener(eventName, onEvent, { once: true });
  });
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
  createNavigator();
  assert.equal(typeof window.history.state.themePartialNavigationKey, "string");
  assert.notEqual(window.history.state.themePartialNavigationKey, "");

  window.history.replaceState({ themePartialNavigationKey: 42 }, "", "/numeric-key");
  createNavigator();
  assert.equal(typeof window.history.state.themePartialNavigationKey, "string");

  window.history.replaceState({ themePartialNavigationKey: "existing-key" }, "", "/existing-key");
  createNavigator();
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

test("only ContactForm's same-origin injected loader is exempt when both pages declare its owner", () => {
  const owner = '<script src="/contact-form/embed.js"></script>';
  const path = "/plugins/PluginContactForm/assets/static/contact-form-loader.iife.js?build=123";
  const loader = (src) => `<script defer src="${src}"></script>`;
  const nextUrl = new URL("/contact", document.baseURI);
  for (const [label, current, target, changed] of [
    ["same owner, dynamic loader", owner + loader(path), owner, false],
    ["owner missing on destination", owner + loader(path), "", true],
    ["owner missing on both", loader(path), "", true],
    ["cross-origin loader", owner + loader("https://cdn.example" + path), owner, true],
    ["different loader path", owner + loader("/mirror" + path), owner, true],
    ["owner changed", owner + loader(path), owner.replace("embed.js", "embed-v2.js"), true],
    ["extra executable", owner + loader(path) + '<script src="/extra.js"></script>', owner, true],
    ["duplicate injection", owner + loader(path) + loader(path), owner, true],
    ["changed declarative loader", owner + loader(path), owner + loader(path + "4"), true],
  ]) {
    document.head.innerHTML = current;
    const next = new DOMParser().parseFromString(pageMarkup({ head: target }), "text/html");
    assert.equal(headNavigationContractChanged(next, nextUrl), changed, label);
  }
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
    <a id="ordinary" href="/next">next</a>
    <a id="download" href="/file.zip" download>download</a>
    <a id="blank" href="/next" target="_blank">blank</a>
    <a id="external" href="https://outside.example/next">external</a>
    <a id="mail" href="mailto:sky@example.com">mail</a>
  `;
  const assigned = [];
  const navigator = createNavigator({
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
  const ordinary = document.getElementById("ordinary");
  for (const init of [{ button: 1 }, { metaKey: true }, { ctrlKey: true }, { shiftKey: true }, { altKey: true }]) {
    window.addEventListener(
      "click",
      (event) => {
        assert.equal(event.defaultPrevented, false);
        event.preventDefault();
      },
      { once: true },
    );
    dispatchClick(ordinary, init);
  }
  const preCancelled = new MouseEvent("click", { bubbles: true, button: 0, cancelable: true });
  preCancelled.preventDefault();
  ordinary.dispatchEvent(preCancelled);

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
  globalThis.fetch = async (url) => responseWithUrl(pageMarkup(), url);
  const navigator = createNavigator({ assign: () => true, reload: () => true });
  navigator.start();

  const success = once(document, NAVIGATION_SUCCESS_EVENT);
  const complete = once(document, NAVIGATION_COMPLETE_EVENT);
  const click = dispatchClick(document.querySelector("#partial span"));
  const [event] = await Promise.all([success, complete]);
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
  const navigator = createNavigator({
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
  const navigator = createNavigator({ assign: () => true, reload: () => true });
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

  navigator.navigateFully(new URL("https://blog.example.com/full"));
  navigator.navigateFully(new URL("https://blog.example.com/ignored"));
  assert.equal(navigator.navigateFully(new URL("https://blog.example.com/already-pending")), true);
  navigator.navigate(new URL("https://blog.example.com/current#blocked"));
  assert.equal(events.length, 3);
  navigator.stop();
  document.removeEventListener(NAVIGATION_SAME_DOCUMENT_EVENT, onSameDocument);
});

test("a legacy same-origin source URL can supply the initial source depth", () => {
  resetPage("/source");
  history.pushState({ themePreviousUrl: location.href }, "", "/article");
  const navigator = createNavigator();
  navigator.navigate(new URL("#section", location.href));
  assert.equal(history.state.themePreviousUrl, "https://blog.example.com/source");
  assert.equal(history.state.themeSourceHistoryDepth, 2);
});

test("same-document hash entries track the distance back to the source page", () => {
  resetPage("/article");
  window.history.replaceState(
    { themePreviousUrl: "https://blog.example.com/source", themeSourceHistoryDepth: 1 },
    "",
    "/article",
  );
  const navigator = createNavigator();

  navigator.navigate(new URL("https://blog.example.com/article#section"));
  assert.equal(window.history.state.themeSourceHistoryDepth, 2);
  navigator.navigate(new URL("https://blog.example.com/article#another"));
  assert.equal(window.history.state.themeSourceHistoryDepth, 3);
  navigator.stop();
});

test("same-document clicks and programmatic navigation notify hash listeners once with both URLs", () => {
  resetPage("/article");
  document.getElementById("main").innerHTML = '<a href="#halo-comment=comment-1">Comment</a>';
  const navigator = createNavigator();
  const events = [];
  const onHashChange = (event) => events.push(event);
  window.addEventListener("hashchange", onHashChange);
  navigator.start();

  try {
    dispatchClick(document.querySelector("a"));
    navigator.navigate(new URL("https://blog.example.com/article#halo-comment=comment-1&reply=reply-1"));
    navigator.navigate(new URL(window.location.href));
    navigator.navigate(new URL("https://blog.example.com/article"));

    assert.equal(events.length, 3);
    assert.ok(events.every((event) => event instanceof window.HashChangeEvent));
    assert.deepEqual(
      events.map(({ oldURL, newURL }) => [oldURL, newURL]),
      [
        ["https://blog.example.com/article", "https://blog.example.com/article#halo-comment=comment-1"],
        [
          "https://blog.example.com/article#halo-comment=comment-1",
          "https://blog.example.com/article#halo-comment=comment-1&reply=reply-1",
        ],
        ["https://blog.example.com/article#halo-comment=comment-1&reply=reply-1", "https://blog.example.com/article"],
      ],
    );
  } finally {
    navigator.stop();
    window.removeEventListener("hashchange", onHashChange);
  }
});

test("history navigation and popstate do not synthesize duplicate hashchange events", () => {
  resetPage("/article");
  const navigator = createNavigator();
  const events = [];
  const onHashChange = (event) => events.push(event);
  window.addEventListener("hashchange", onHashChange);
  navigator.start();

  try {
    navigator.navigate(new URL("https://blog.example.com/article#halo-comment"), {
      history: true,
      targetEntryKey: "existing-comment-entry",
    });
    window.history.replaceState({ themePartialNavigationKey: "restored-comment-entry" }, "", "/article#halo-comment");
    window.dispatchEvent(new window.PopStateEvent("popstate", { state: window.history.state }));
    assert.equal(events.length, 0);
  } finally {
    navigator.stop();
    window.removeEventListener("hashchange", onHashChange);
  }
});

test("popstate to a login route leaves the document transition to the browser", () => {
  resetPage("/base");
  const loads = [];
  const navigator = createNavigator({
    assign: () => assert.fail("The browser has already selected the login history entry"),
    reload: () => (loads.push(window.location.pathname), true),
  });
  navigator.start();
  window.history.pushState({}, "", "/login");
  window.dispatchEvent(new window.PopStateEvent("popstate", { state: history.state }));
  assert.deepEqual(loads, ["/login"]);
});

test("popstate restores hashes, reloads guarded pages, and fetches different documents as history navigation", async () => {
  resetPage("/base");
  const calls = [];
  const navigator = createNavigator({
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

  const sameDocument = once(document, NAVIGATION_SAME_DOCUMENT_EVENT);
  window.history.pushState({ themePartialNavigationKey: "hash-entry" }, "", "/base#section");
  window.dispatchEvent(new window.PopStateEvent("popstate", { state: window.history.state }));
  const sameEvent = await sameDocument;
  assert.equal(sameEvent.detail.history, true);
  assert.equal(sameEvent.detail.targetEntryKey, "hash-entry");

  document.getElementById("main").innerHTML = '<div data-navigation-exit="full"></div>';
  window.history.pushState({}, "", "/guarded");
  window.dispatchEvent(new window.PopStateEvent("popstate", { state: window.history.state }));
  assert.deepEqual(
    calls.map(([kind]) => kind),
    ["reload"],
  );
  assert.equal(navigator.isFullNavigationPending(), false);

  document.getElementById("main").replaceChildren();
  const previousFetch = globalThis.fetch;
  globalThis.fetch = async (_url, options) => {
    assert.equal(options.credentials ?? "same-origin", "same-origin");
    assert.equal(options.cache, "no-cache");
    assert.match(new Headers(options.headers).get("X-Requested-With"), /^(?:swup|ThemePartialNavigation)$/i);
    return responseWithUrl(pageMarkup(), "https://blog.example.com/canonical");
  };
  window.history.pushState({ themePartialNavigationKey: "history-entry" }, "", "/history");
  const success = once(document, NAVIGATION_SUCCESS_EVENT);
  window.dispatchEvent(new window.PopStateEvent("popstate", { state: window.history.state }));
  const successEvent = await success;
  assert.equal(successEvent.detail.history, true);
  assert.equal(successEvent.detail.focus, true);
  assert.equal(successEvent.detail.targetEntryKey, "history-entry");
  assert.equal(window.location.pathname, "/canonical");

  navigator.stop();
  globalThis.fetch = previousFetch;
});

test("a canonical redirect retains the fragment from the original visit", async () => {
  resetPage("/source");
  globalThis.fetch = async () => responseWithUrl(pageMarkup(), "https://blog.example.com/canonical");
  const navigator = createNavigator();
  const success = once(document, NAVIGATION_SUCCESS_EVENT);
  const complete = once(document, NAVIGATION_COMPLETE_EVENT);
  navigator.navigate(new URL("/alias#details", document.baseURI), { focus: false });
  const [event] = await Promise.all([success, complete]);
  assert.equal(location.href, "https://blog.example.com/canonical#details");
  assert.equal(event.detail.targetUrl, location.href);
});

test("a programmatic visit forwards the supplied trigger and focus policy to runtime listeners", async () => {
  resetPage("/source");
  const trigger = document.createElement("button");
  document.getElementById("main").append(trigger);
  globalThis.fetch = async (url) => responseWithUrl(pageMarkup(), url);
  const navigator = createNavigator();
  const success = once(document, NAVIGATION_SUCCESS_EVENT);
  const complete = once(document, NAVIGATION_COMPLETE_EVENT);
  navigator.navigate(new URL("/target", location.href), { focus: false, triggerElement: trigger });
  for (const event of await Promise.all([success, complete])) {
    assert.equal(event.detail.focus, false);
    assert.equal(event.detail.triggerElement, trigger);
  }
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
    const navigator = createNavigator({ assign: () => false, reload: () => false });
    const error = await navigateAndReadError(navigator, `/failure-${index}`);
    assert.match(error.message, scenario.expected);
    navigator.stop();
  }

  globalThis.fetch = previousFetch;
});

for (const [label, pageData] of [
  ["missing", ""],
  ["empty", '<script type="application/json" id="halo-page-data"></script>'],
  ["malformed", '<script type="application/json" id="halo-page-data">{bad</script>'],
  ["null", '<script type="application/json" id="halo-page-data">null</script>'],
  ["missing page type", '<script type="application/json" id="halo-page-data">{}</script>'],
]) {
  test(`a target with ${label} Halo page data preserves the displayed shell`, async (t) => {
    resetPage("/visible");
    const oldMain = document.getElementById("main");
    const successes = [];
    const onSuccess = (event) => successes.push(event.detail.targetUrl);
    document.addEventListener(NAVIGATION_SUCCESS_EVENT, onSuccess);
    t.after(() => document.removeEventListener(NAVIGATION_SUCCESS_EVENT, onSuccess));
    t.mock.method(globalThis, "fetch", async (url) => responseWithUrl(pageMarkup({ pageData }), url));
    const navigator = createNavigator();
    const error = await navigateAndReadError(navigator, "/bad-data");
    assert.ok(error instanceof Error);
    assert.equal(document.getElementById("main"), oldMain);
    assert.equal(document.title, "Home");
    assert.deepEqual(successes, []);
  });
}

test("head contract changes choose assign or reload and reset adapter rejection", async () => {
  const previousFetch = globalThis.fetch;

  resetPage("/current");
  const loads = [];
  const changedHeadMarkup = pageMarkup({ head: '<script src="/plugin-v2.js"></script>' });
  assert.equal(
    headNavigationContractChanged(
      new DOMParser().parseFromString(changedHeadMarkup, "text/html"),
      new URL("https://blog.example.com/next"),
    ),
    true,
  );
  globalThis.fetch = async () => responseWithUrl(changedHeadMarkup, "https://blog.example.com/next");
  const assigningNavigator = createNavigator({
    assign: (target) => (loads.push(target.href), true),
    reload: () => (loads.push(window.location.href), true),
  });
  const fullIntent = once(document, NAVIGATION_FULL_RELOAD_EVENT);
  assigningNavigator.navigate(new URL("https://blog.example.com/next"));
  await fullIntent;
  assert.deepEqual(loads, ["https://blog.example.com/next"]);
  assert.equal(document.title, "Home");
  assert.equal(assigningNavigator.isFullNavigationPending(), true);
  assigningNavigator.stop();

  resetPage("/current");
  let reloaded = "";
  globalThis.fetch = async () =>
    responseWithUrl(pageMarkup({ head: '<script src="/plugin-v2.js"></script>' }), "https://blog.example.com/current");
  const reloadingNavigator = createNavigator({
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
  const rejectingNavigator = createNavigator({ assign: () => false, reload: () => false });
  const reset = once(document, NAVIGATION_FULL_RELOAD_RESET_EVENT);
  const complete = once(document, NAVIGATION_COMPLETE_EVENT);
  rejectingNavigator.navigate(new URL("/rejected", window.location.href));
  await Promise.all([reset, complete]);
  assert.equal(rejectingNavigator.isFullNavigationPending(), false);
  rejectingNavigator.stop();

  globalThis.fetch = previousFetch;
});

const trackerScript =
  '<script src="/halo-tracker.js" data-group="content.halo.run" data-plural="posts" data-name="article"></script>';
const lightGalleryHead = `<link rel="stylesheet" href="/plugins/PluginLightGallery/assets/static/css/lightgallery.min.css">
<script defer src="/plugins/PluginLightGallery/assets/static/js/lightgallery.min.js"></script>
<script defer src="/plugins/PluginLightGallery/assets/static/js/plugins/zoom/lg-zoom.min.js"></script>
<script type="text/javascript">
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(\`#article-content img\`)?.forEach(function (node) {
    if (node) {
      node.dataset.src = node.src;
    }
    const galleries = document.querySelectorAll(\`#article-content\`);
    if (galleries.length > 0) {
      galleries.forEach(function (node) {
        lightGallery(node, { selector: "img", });
      });
    }
  });
});
</script>`;
const officialPostComments = `<section class="terminal-comments" data-navigation-exit="full">
  <h2>[COMMENTS]</h2><div id="comment-article"></div>
  <script type="module" data-pjax>
    import { init } from "/plugins/PluginCommentWidget/assets/static/comment-widget.js?version=3.5.0";
    init("#comment-article", { group: "content.halo.run", kind: "Post", name: "article" });
  </script>
</section>`;

test("an eligible article and the list share a document while changed plugin versions still fall back", async () => {
  resetPage("/");
  document.querySelector("#main").innerHTML = '<a href="/posts/article">Article</a>';
  const shell = document.body.appendChild(document.createElement("ncm-mini-player"));
  const loads = [];
  const navigator = createNavigator({
    assign: (url) => (loads.push(url.pathname), true),
    reload: (url) => (loads.push(url.pathname), true),
  });
  navigator.start();
  let version = "1";
  const path = "/plugins/plugin-ncm/assets/static/";
  globalThis.fetch = async (url) => {
    const target = new URL(url);
    const index = target.pathname === "/";
    const scripts = index
      ? ""
      : `<link rel="stylesheet" href="${path}card.css?v=${version}" data-ncm-card-css>` +
        `<script src="${path}card.js?v=${version}" defer data-ncm-card-js data-endpoint="/music/card/"></script>`;
    return responseWithUrl(
      pageMarkup({
        head: '<script src="/app.js"></script>' + scripts + (index ? "" : trackerScript + lightGalleryHead),
        body: index ? '<main id="main">Home</main>' : '<main id="main">' + officialPostComments + "</main>",
        pageData: index
          ? '<script id="halo-page-data" type="application/json">{"pageType":"index"}</script>'
          : '<script id="halo-page-data" type="application/json">{"pageType":"post","currentPost":{"name":"article"}}</script>',
      }),
      url,
    );
  };

  const entered = once(document, NAVIGATION_SUCCESS_EVENT);
  const enterFinished = once(document, NAVIGATION_COMPLETE_EVENT);
  dispatchClick(document.querySelector("#main a"));
  const { postVisit, postComments } = (await entered).detail;
  await enterFinished;
  assert.equal(postVisit.name, "article");
  assert.equal(postComments.containerId, "comment-article");
  assert.equal(postComments.name, "article");
  assert.equal(document.querySelector(".terminal-comments script"), null);
  assert.equal(document.querySelector(".terminal-comments").hasAttribute("data-navigation-exit"), false);
  assert.equal(
    document.querySelector("[data-ncm-card-js]").getAttribute("src"),
    "https://blog.example.com" + path + "card.js?v=1",
  );
  assert.equal(document.querySelector('script[src="/halo-tracker.js"]'), null);
  assert.equal(document.head.querySelector('script[src*="PluginLightGallery"]'), null);
  assert.equal(document.querySelector("ncm-mini-player"), shell);

  const back = once(document, NAVIGATION_COMPLETE_EVENT);
  history.back();
  assert.equal((await back).detail.history, true);
  assert.equal(location.pathname, "/");
  const forward = once(document, NAVIGATION_COMPLETE_EVENT);
  history.forward();
  assert.equal((await forward).detail.postVisit.name, "article");
  assert.equal(document.querySelectorAll("[data-ncm-card-js]").length, 1);
  assert.equal(document.querySelector("ncm-mini-player"), shell);
  assert.deepEqual(loads, []);

  version = "2";
  await visitAndWait(navigator, "/posts/different-asset");
  assert.deepEqual(loads, ["/posts/different-asset"]);
});

for (const [label, markup, galleryHead] of [
  ["matching selector", '<div id="article-content"><img src="/image.webp"></div>', lightGalleryHead],
  ["custom initializer", "<h1>Article</h1>", lightGalleryHead.replaceAll("#article-content", ".terminal-content")],
  ["changed asset", "<h1>Article</h1>", lightGalleryHead.replace("lg-zoom.min.js", "lg-zoom-new.min.js")],
]) {
  test("LightGallery keeps full navigation with " + label, async () => {
    resetPage("/");
    const main = document.getElementById("main");
    const reloads = [];
    const navigator = createNavigator({ assign: () => false, reload: (url) => (reloads.push(url.pathname), true) });
    navigator.start();
    globalThis.fetch = async (url) =>
      responseWithUrl(
        pageMarkup({
          head: '<script src="/app.js"></script>' + trackerScript + galleryHead,
          body: '<main id="main">' + markup + "</main>",
          pageData:
            '<script id="halo-page-data" type="application/json">{"pageType":"post","currentPost":{"name":"article"}}</script>',
        }),
        url,
      );

    await visitAndWait(navigator, "/posts/article");
    assert.deepEqual(reloads, ["/posts/article"]);
    assert.equal(document.getElementById("main"), main);
  });
}

test("an unfamiliar article comment initializer falls back before replacing the main content", async () => {
  resetPage("/");
  const main = document.getElementById("main");
  const reloads = [];
  const navigator = createNavigator({ assign: () => false, reload: (url) => (reloads.push(url.pathname), true) });
  navigator.start();
  globalThis.fetch = async (url) =>
    responseWithUrl(
      pageMarkup({
        head: '<script src="/app.js"></script>' + trackerScript,
        body: '<main id="main">' + officialPostComments.replace('name: "article"', 'name: "other"') + "</main>",
        pageData:
          '<script id="halo-page-data" type="application/json">{"pageType":"post","currentPost":{"name":"article"}}</script>',
      }),
      url,
    );

  await visitAndWait(navigator, "/posts/article");
  assert.deepEqual(reloads, ["/posts/article"]);
  assert.equal(document.getElementById("main"), main);
});

function trackerPage() {
  return pageMarkup({ head: '<script src="/app.js"></script>' + trackerScript });
}

async function visitAndWait(navigator, path) {
  const complete = once(document, NAVIGATION_COMPLETE_EVENT);
  navigator.navigate(new URL(path, location.href));
  return (await complete).detail;
}

test("a tracker head reload keeps the category as source even if the article referrer is itself", async (t) => {
  resetPage("/categories/news?page=2#list");
  const sourceUrl = location.href;
  const target = new URL("/posts/article#intro", sourceUrl);
  const reloads = [];
  const navigator = createNavigator({
    assign: () => assert.fail("The article already has a provisional history entry"),
    reload: (url) => (
      reloads.push({ url: url.href, address: location.href, state: structuredClone(history.state) }),
      true
    ),
  });
  navigator.start();
  const sourceState = structuredClone(history.state);
  globalThis.fetch = async (url) => responseWithUrl(trackerPage(), url);
  const detail = await visitAndWait(navigator, target);
  const [snapshot] = reloads;
  assert.equal(reloads.length, 1);
  assert.equal(snapshot.url, target.href);
  assert.equal(snapshot.address, target.href);
  assert.equal(snapshot.state.themePreviousUrl, sourceUrl);
  assert.equal(snapshot.state.themeSourceHistoryDepth, 1);
  assert.ok(detail.targetEntryKey);
  assert.notEqual(detail.targetEntryKey, sourceState.themePartialNavigationKey);
  assert.equal(snapshot.state.themePartialNavigationKey, detail.targetEntryKey);
  assert.equal(snapshot.state.source, "swup");
  assert.equal(snapshot.state.index, sourceState.index + 1);
  assert.equal(snapshot.state.url, target.pathname + target.hash);

  navigator.stop();
  t.mock.getter(document, "referrer", () => target.href);
  const { initUiActions } = await import("../src/common/ui-actions.ts");
  document.body.innerHTML = '<button data-terminal-action="source-back" data-home-url="/">[BACK]</button>';
  initUiActions();
  const returned = once(window, "popstate");
  document.querySelector("button").click();
  await returned;
  assert.equal(location.href, sourceUrl);
  assert.deepEqual(history.state, sourceState);
});

test("a tracker reload uses the latest in-flight fragment and keeps one Back to the list", async (t) => {
  resetPage("/categories/news?page=2#list");
  const sourceUrl = location.href;
  const first = "/posts/article#first";
  const second = "/posts/article#second";
  document.getElementById("main").innerHTML = `<a href="${first}">First</a><a href="${second}">Second</a>`;
  const [firstLink, secondLink] = document.querySelectorAll("#main a");
  const loads = [];
  const navigator = createNavigator({
    assign: (url) => (loads.push({ method: "assign", target: url.href }), true),
    reload: (url) => (loads.push({ method: "reload", target: url.href, address: location.href }), true),
  });
  navigator.start();
  const sourceState = structuredClone(history.state);
  const requested = Promise.withResolvers();
  const release = Promise.withResolvers();
  const fetch = t.mock.method(globalThis, "fetch", async (url) => {
    requested.resolve();
    await release.promise;
    return responseWithUrl(trackerPage(), url);
  });

  const intent = once(document, NAVIGATION_FULL_RELOAD_EVENT);
  dispatchClick(firstLink);
  await requested.promise;
  const provisionalUrl = location.href;
  const provisionalState = structuredClone(history.state);
  const provisionalLength = history.length;
  dispatchClick(secondLink);
  release.resolve();
  const { targetUrl } = (await intent).detail;

  assert.equal(provisionalUrl, new URL(first, sourceUrl).href);
  assert.equal(targetUrl, new URL(second, sourceUrl).href);
  assert.deepEqual(loads, [{ method: "reload", target: targetUrl, address: targetUrl }]);
  assert.equal(fetch.mock.callCount(), 1);
  assert.equal(history.length, provisionalLength);
  assert.deepEqual(history.state, { ...provisionalState, url: second });
  assert.equal(history.state.themePreviousUrl, sourceUrl);

  navigator.stop();
  const returned = once(window, "popstate");
  history.back();
  await returned;
  assert.equal(location.href, sourceUrl);
  assert.deepEqual(history.state, sourceState);
});

test("a tracker reload reached by popstate preserves the historical article entry verbatim", async () => {
  resetPage("/posts/article#section");
  const saved = {
    source: "swup",
    index: 11,
    url: "/posts/article#section",
    themePreviousUrl: "https://blog.example.com/categories/older",
    themeSourceHistoryDepth: 3,
    themePartialNavigationKey: "original-article",
    pluginState: { page: 2 },
  };
  history.replaceState(saved, "", saved.url);
  history.pushState({ source: "swup", index: 12, url: "/later", themePartialNavigationKey: "later" }, "", "/later");
  const reloads = [];
  const navigator = createNavigator({
    assign: () => false,
    reload: () => (reloads.push(structuredClone(history.state)), true),
  });
  navigator.start();
  globalThis.fetch = async (url) => responseWithUrl(trackerPage(), url);
  const complete = once(document, NAVIGATION_COMPLETE_EVENT);
  history.back();
  const event = await complete;
  assert.equal(event.detail.history, true);
  assert.equal(event.detail.targetEntryKey, saved.themePartialNavigationKey);
  assert.deepEqual(reloads, [saved]);
});

test("leaving a tracker document by link makes no provisional history write or partial request", async (t) => {
  resetPage("/posts/article");
  document.head.insertAdjacentHTML("beforeend", trackerScript);
  document.getElementById("main").innerHTML = '<a href="/categories/news">Category</a>';
  const loads = [];
  const navigator = createNavigator({ assign: (url) => (loads.push(url.pathname), true), reload: () => false });
  navigator.start();
  const push = t.mock.method(history, "pushState");
  const replace = t.mock.method(history, "replaceState");
  const fetch = t.mock.method(globalThis, "fetch", async (url) => responseWithUrl(pageMarkup(), url));
  dispatchClick(document.querySelector("a"));
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  assert.deepEqual(loads, ["/categories/news"]);
  assert.equal(location.pathname, "/posts/article");
  assert.equal(push.mock.callCount(), 0);
  assert.equal(replace.mock.callCount(), 0);
  assert.equal(fetch.mock.callCount(), 0);
});

// jsdom cannot load a new document. Model the adapter's session-history effect
// and use jsdom's real Back traversal to check which entry the user returns to.
function simulateFullLoad(target, replaceCurrentEntry) {
  if (replaceCurrentEntry) history.replaceState(null, "", target);
  else history.pushState(null, "", target);
  return true;
}

function waitForAbort(requested, signal) {
  requested.resolve(signal);
  return new Promise((_resolve, reject) =>
    signal.addEventListener("abort", () => reject(signal.reason), { once: true }),
  );
}

for (const paths of [["/page/3"], ["/page/3", "/page/4"]]) {
  test(`a full link during ${paths.join(" then ")} returns directly to the displayed page on Back`, async (t) => {
    resetPage("/page/2");
    document.getElementById("main").innerHTML =
      paths.map((path) => `<a href="${path}">${path}</a>`).join("") +
      '<a href="/moments" data-navigation="full">Moments</a>';
    const navigator = createNavigator({
      assign: simulateFullLoad,
      reload: () => assert.fail("Expected a new document"),
    });
    navigator.start();
    const sourceState = structuredClone(history.state);
    let requested;
    let pendingSignal;
    let stagedLength;
    const fetch = t.mock.method(globalThis, "fetch", (_url, { signal }) => waitForAbort(requested, signal));

    for (const path of paths) {
      requested = Promise.withResolvers();
      dispatchClick(document.querySelector(`#main a[href="${path}"]`));
      const signal = await requested.promise;
      if (pendingSignal) {
        assert.equal(pendingSignal.aborted, true);
        assert.equal(history.length, stagedLength);
      }
      pendingSignal = signal;
      stagedLength = history.length;
      assert.equal(location.pathname, path);
      assert.equal(navigator.currentPageUrl.pathname, "/page/2");
    }

    assert.equal(dispatchClick(document.querySelector("#main [data-navigation=full]")).defaultPrevented, true);
    assert.equal(pendingSignal.aborted, true);
    await new Promise((resolve) => setImmediate(resolve));
    assert.equal(location.pathname, "/moments");
    const nativeLength = history.length;

    navigator.stop();
    const returned = once(window, "popstate");
    history.back();
    await returned;
    assert.equal(location.pathname, "/page/2");
    assert.deepEqual(history.state, sourceState);
    assert.equal(nativeLength, stagedLength);
    assert.equal(fetch.mock.callCount(), paths.length);
  });
}

for (const direction of ["back", "forward"]) {
  test(`a new full link keeps the existing ${direction} target in history`, async (t) => {
    resetPage("/source");
    const navigator = createNavigator({
      assign: simulateFullLoad,
      reload: () => assert.fail("Expected a new document"),
    });
    navigator.start();
    const requested = Promise.withResolvers();
    const targetPath = direction === "back" ? "/source" : "/second";
    let holdTraversal = false;
    t.mock.method(globalThis, "fetch", async (url, { signal }) => {
      if (holdTraversal && new URL(url).pathname === targetPath) {
        return waitForAbort(requested, signal);
      }
      return responseWithUrl(pageMarkup({ title: new URL(url).pathname }), url);
    });
    const sourceState = structuredClone(history.state);
    await visitAndWait(navigator, "/second");
    const secondState = structuredClone(history.state);
    if (direction === "forward") {
      const complete = once(document, NAVIGATION_COMPLETE_EVENT);
      history.back();
      await complete;
    }
    document.getElementById("main").innerHTML = '<a href="/moments" data-navigation="full">Moments</a>';
    const visible = navigator.currentPageUrl.href;

    holdTraversal = true;
    history[direction]();
    const signal = await requested.promise;
    assert.equal(location.pathname, targetPath);
    assert.equal(navigator.currentPageUrl.href, visible);
    dispatchClick(document.querySelector("#main a"));
    assert.equal(signal.aborted, true);
    assert.equal(location.pathname, "/moments");

    await new Promise((resolve) => setImmediate(resolve));
    navigator.stop();
    const returned = once(window, "popstate");
    history.back();
    await returned;
    assert.equal(location.pathname, targetPath);
    assert.deepEqual(history.state, direction === "back" ? sourceState : secondState);
  });
}

for (const withHashes of [false, true]) {
  test(`a new link from C during a pending traversal to B preserves back order, hash entries: ${withHashes}`, async () => {
    resetPage("/source");
    const navigator = createNavigator();
    navigator.start();
    const original = new Map([["/source", structuredClone(history.state)]]);
    let holdB = false;
    const pending = Promise.withResolvers();
    globalThis.fetch = async (url, { signal }) => {
      const path = new URL(url, location.href).pathname;
      if (holdB && path === "/b") {
        holdB = false;
        pending.resolve();
        return new Promise((_resolve, reject) =>
          signal.addEventListener("abort", () => reject(signal.reason), { once: true }),
        );
      }
      return responseWithUrl(
        pageMarkup({
          title: path,
          body: '<main id="main"><a href="/d">D</a><button data-terminal-action="source-back">[BACK]</button></main>',
        }),
        url,
      );
    };
    const paths = withHashes ? ["/b", "/b#list", "/c", "/c#end"] : ["/b", "/c"];
    for (const path of paths) {
      if (path.includes("#")) navigator.navigate(new URL(path, location.href));
      else await visitAndWait(navigator, path);
      original.set(path, structuredClone(history.state));
    }
    holdB = true;
    history.go(1 - paths.length);
    await pending.promise;
    assert.equal(location.pathname, "/b");
    assert.equal(document.title, "/c");
    const success = once(document, NAVIGATION_SUCCESS_EVENT);
    dispatchClick(document.querySelector("a"));
    assert.equal(new URL((await success).detail.targetUrl).pathname, "/d");
    assert.equal(history.state.themePreviousUrl, new URL(paths.at(-1), location.href).href);
    assert.equal(history.state.index, original.get(paths.at(-1)).index + 1);
    assert.equal(history.state.themeSourceHistoryDepth, 1);
    const { initUiActions } = await import("../src/common/ui-actions.ts");
    initUiActions();
    for (const path of [...paths].reverse().concat("/source")) {
      const target = new URL(path, location.href);
      const type = target.pathname === location.pathname ? NAVIGATION_SAME_DOCUMENT_EVENT : NAVIGATION_SUCCESS_EVENT;
      const traversed = once(document, type);
      if (path === paths.at(-1)) document.querySelector("button").click();
      else history.back();
      const event = await traversed;
      assert.equal(location.href, target.href);
      assert.equal(document.title, target.pathname);
      assert.equal(event.detail.targetEntryKey, original.get(path).themePartialNavigationKey);
      assert.equal(history.state.index, original.get(path).index);
    }
  });
}

for (const outcome of ["adapter rejection", "watchdog"]) {
  test(`after ${outcome}, one back from the restored A returns to its original source`, async () => {
    resetPage("/source");
    const reloads = [];
    const navigator = createNavigator(
      {
        assign: () => assert.fail("Expected reload of the provisional entry"),
        reload: (url) => (
          reloads.push({ href: url.href, state: structuredClone(history.state) }),
          outcome === "watchdog"
        ),
      },
      { fullNavigationWatchdogMs: 10 },
    );
    navigator.start();
    globalThis.fetch = async (url) => responseWithUrl(pageMarkup(), url);
    await visitAndWait(navigator, "/a");
    const a = structuredClone(history.state);
    const target = new URL("/unavailable", location.href);
    globalThis.fetch = async () => {
      throw new Error("offline");
    };
    const error = once(document, NAVIGATION_ERROR_EVENT);
    const detail = await visitAndWait(navigator, target);
    assert.equal((await error).detail.error.message, "offline");
    const reset = once(document, NAVIGATION_FULL_RELOAD_RESET_EVENT);
    navigator.navigateFully(target);
    await reset;
    assert.equal(reloads.length, 1);
    const snapshot = reloads[0];
    assert.equal(snapshot.href, target.href);
    assert.equal(snapshot.state.themePreviousUrl, "https://blog.example.com/a");
    assert.equal(snapshot.state.themeSourceHistoryDepth, 1);
    assert.notEqual(detail.targetEntryKey, a.themePartialNavigationKey);
    assert.equal(snapshot.state.themePartialNavigationKey, detail.targetEntryKey);
    assert.equal(snapshot.state.index, a.index + 1);
    assert.equal(location.pathname, "/a");
    assert.equal(history.state.themePartialNavigationKey, a.themePartialNavigationKey);
    globalThis.fetch = async (url) => responseWithUrl(pageMarkup(), url);
    const returned = once(window, "popstate");
    history.back();
    await returned;
    assert.equal(location.pathname, "/source");
    await new Promise((resolve) => setImmediate(resolve));
  });
}

for (const behavior of ["ignored", "throws", "stop", "pagehide"]) {
  test(`an interrupted history return is bounded and cleaned up (${behavior})`, async (t) => {
    resetPage("/visible");
    const statuses = [];
    const resets = [];
    const ac = new AbortController();
    t.after(() => ac.abort());
    document.addEventListener("theme:runtime-status", (event) => statuses.push(event.detail), { signal: ac.signal });
    document.addEventListener(NAVIGATION_FULL_RELOAD_RESET_EVENT, (event) => resets.push(event.detail), {
      signal: ac.signal,
    });
    const navigator = createNavigator({ assign: () => false, reload: () => false }, { fullNavigationWatchdogMs: 25 });
    navigator.start();
    const attempted = Promise.withResolvers();
    const go = t.mock.method(history, "go", (delta) => {
      attempted.resolve(delta);
      if (behavior === "throws") throw new DOMException("History unavailable", "SecurityError");
    });
    const timers = t.mock.method(window, "setTimeout");
    const cleared = t.mock.method(window, "clearTimeout");
    globalThis.fetch = async (url) => responseWithUrl(trackerPage(), url);
    const complete = once(document, NAVIGATION_COMPLETE_EVENT);
    navigator.navigate(new URL("/blocked", location.href));
    assert.equal(await attempted.promise, -1);
    await complete;
    const timer = timers.mock.calls.find(({ arguments: args }) => args[1] === 25).result;
    if (behavior === "stop" || behavior === "pagehide") {
      assert.equal(navigator.isFullNavigationPending(), true);
      if (behavior === "stop") navigator.stop();
      else window.dispatchEvent(new Event("pagehide"));
      await new Promise((resolve) => window.setTimeout(resolve, 50));
      assert.deepEqual(statuses, []);
      assert.deepEqual(resets, []);
      if (behavior === "pagehide")
        window.dispatchEvent(new window.PageTransitionEvent("pageshow", { persisted: true }));
    } else {
      await t.waitFor(() => assert.equal(resets.length, 1));
      assert.equal(statuses.length, 1);
      assert.equal(statuses[0].level, "error");
      assert.equal(location.pathname, "/blocked", "An unavailable history traversal must not overwrite the entry");
      globalThis.fetch = async (url) => responseWithUrl(pageMarkup(), url);
      await visitAndWait(navigator, "/retry");
      assert.equal(location.pathname, "/retry");
    }
    assert.ok(cleared.mock.calls.some(({ arguments: args }) => args[0] === timer));
    assert.equal(go.mock.callCount(), 1);
    assert.equal(navigator.isFullNavigationPending(), false);
  });
}

for (const supersedingAction of ["new anchor", "another traversal", "timeout"]) {
  test(`pending source restoration respects the final intent (${supersedingAction})`, async (t) => {
    resetPage("/source");
    const assignments = [];
    const navigator = createNavigator(
      { assign: (url) => (assignments.push(url.pathname), true), reload: () => false },
      { fullNavigationWatchdogMs: supersedingAction === "timeout" ? 30 : 1500 },
    );
    navigator.start();
    let blockNextB = false;
    const waiting = Promise.withResolvers();
    const release = Promise.withResolvers();
    const requested = [];
    globalThis.fetch = async (url) => {
      const path = new URL(url).pathname;
      requested.push(path);
      if (blockNextB && path === "/b") {
        blockNextB = false;
        waiting.resolve();
        await release.promise;
      }
      return responseWithUrl(pageMarkup({ title: path }), url);
    };
    for (const path of ["/b", "/c"]) await visitAndWait(navigator, path);
    const c = structuredClone(history.state);
    blockNextB = true;
    history.back();
    await waiting.promise;
    const realGo = history.go.bind(history);
    const attemptedReturn = Promise.withResolvers();
    const go = t.mock.method(history, "go", attemptedReturn.resolve);
    navigator.navigate(new URL("/d", location.href));
    assert.equal(await attemptedReturn.promise, 1);
    release.resolve();
    await new Promise((resolve) => setImmediate(resolve));
    assert.equal(location.pathname, "/b");
    assert.equal(document.title, "/c");
    if (supersedingAction === "new anchor") {
      navigator.navigate(new URL("/c#keep", location.href));
      const same = once(document, NAVIGATION_SAME_DOCUMENT_EVENT);
      realGo(1);
      const event = await same;
      assert.equal(event.detail.fromEntryKey, c.themePartialNavigationKey);
      assert.equal(location.pathname + location.hash, "/c#keep");
    } else if (supersedingAction === "another traversal") {
      const success = once(document, NAVIGATION_SUCCESS_EVENT);
      history.back();
      await success;
      assert.equal(location.pathname, "/source");
    } else {
      const full = await once(document, NAVIGATION_FULL_RELOAD_EVENT);
      assert.equal(new URL(full.detail.targetUrl).pathname, "/d");
      assert.deepEqual(assignments, ["/d"]);
      assert.equal(location.pathname, "/b", "The browser owns the selected B entry");
      window.dispatchEvent(new window.PageTransitionEvent("pageshow", { persisted: true }));
    }
    await new Promise((resolve) => window.setTimeout(resolve, 0));
    assert.equal(requested.includes("/d"), false);
    assert.equal(go.mock.callCount(), 1);
    assert.equal(navigator.hasQueuedNavigation(), false);
    assert.equal(navigator.isFullNavigationPending(), false);
  });
}

test("identical relative head URLs in different directories refer to different plugin scripts", async () => {
  resetPage("/source/article");
  const head = '<script src="./widget.js"></script>';
  document.head.insertAdjacentHTML("beforeend", head);
  const oldMain = document.getElementById("main");
  const target = new URL("/other/article", location.href);
  globalThis.fetch = async () =>
    responseWithUrl(pageMarkup({ head: '<script src="/app.js"></script>' + head }), target);
  const loads = [];
  const navigator = createNavigator({
    assign: (url) => (loads.push(url.href), false),
    reload: () => (loads.push(location.href), false),
  });
  const completed = once(document, NAVIGATION_COMPLETE_EVENT);
  navigator.navigate(target);
  await completed;
  assert.deepEqual(loads, [target.href]);
  assert.equal(document.getElementById("main"), oldMain);
  assert.equal(document.title, "Home");
});

for (const first of ["click", "programmatic"]) {
  for (const second of ["click", "programmatic"]) {
    test(`same-turn ${first} A then ${second} B commits only B and completes every started visit once`, async (t) => {
      resetPage("/source");
      const main = document.getElementById("main");
      main.innerHTML = '<a href="/a">A</a><a href="/b">B</a>';
      const navigator = createNavigator();
      navigator.start();
      const initialLength = history.length;
      const requests = [];
      globalThis.fetch = async (url) => {
        const path = new URL(url, document.baseURI).pathname;
        requests.push(path);
        return responseWithUrl(pageMarkup({ title: path }), url);
      };
      const started = [];
      const ended = [];
      const committed = [];
      const errors = [];
      const ac = new AbortController();
      t.after(() => ac.abort());
      for (const [event, paths] of [
        ["theme:navigation-start", started],
        [NAVIGATION_COMPLETE_EVENT, ended],
        [NAVIGATION_SUCCESS_EVENT, committed],
        [NAVIGATION_ERROR_EVENT, errors],
      ]) {
        document.addEventListener(event, (event) => paths.push(new URL(event.detail.targetUrl).pathname), {
          signal: ac.signal,
        });
      }
      function activate(path, mode) {
        if (mode === "click") dispatchClick(main.querySelector(`a[href="${path}"]`));
        else navigator.navigate(new URL(path, location.href));
      }
      activate("/a", first);
      activate("/b", second);
      await t.waitFor(() => assert.ok(ended.length > 0 && committed.length > 0));
      assert.deepEqual(committed, ["/b"]);
      assert.deepEqual(ended, started);
      assert.deepEqual(errors, []);
      assert.equal(requests.filter((path) => path === "/b").length, 1);
      assert.equal(history.length, initialLength + 1);
      assert.equal(history.state.themePreviousUrl, "https://blog.example.com/source");
      assert.equal(location.pathname, "/b");
      assert.equal(document.title, "/b");
    });
  }
}

test("same-turn programmatic calls reusing a URL honor the latest focus and trigger", async (t) => {
  resetPage("/source");
  const target = new URL("/article", location.href);
  const first = document.createElement("button");
  const second = document.createElement("button");
  document.getElementById("main").append(first, second);
  const fetch = t.mock.method(globalThis, "fetch", async (url) => responseWithUrl(pageMarkup(), url));
  const navigator = createNavigator();
  const done = once(document, NAVIGATION_COMPLETE_EVENT);
  navigator.navigate(target, { focus: true, triggerElement: first });
  navigator.navigate(target, { focus: false, triggerElement: second });
  const event = await done;
  assert.equal(fetch.mock.callCount(), 1);
  assert.equal(event.detail.focus, false);
  assert.equal(event.detail.triggerElement, second);
});

for (const action of ["anchor click", "programmatic anchor", "full", "stop"]) {
  test(`a synchronous ${action} cancels the queued cross-page visit before it can request content`, async (t) => {
    resetPage("/source");
    const main = document.getElementById("main");
    main.innerHTML = '<a href="#keep">Keep</a>';
    const fetch = t.mock.method(globalThis, "fetch", async (url) => responseWithUrl(pageMarkup(), url));
    const loads = [];
    const navigator = createNavigator({ assign: (target) => (loads.push(target.pathname), true), reload: () => false });
    navigator.start();
    navigator.navigate(new URL("/stale", location.href));
    if (action === "anchor click") dispatchClick(main.querySelector("a"));
    if (action === "programmatic anchor") navigator.navigate(new URL("#keep", location.href));
    if (action === "full") navigator.navigateFully(new URL("/full", location.href));
    if (action === "stop") navigator.stop();
    await new Promise((resolve) => window.setTimeout(resolve, 0));
    assert.equal(fetch.mock.callCount(), 0);
    assert.deepEqual(loads, action === "full" ? ["/full"] : []);
    assert.equal(location.pathname, "/source");
    assert.equal(location.hash, action.includes("anchor") ? "#keep" : "");
    assert.equal(document.getElementById("main"), main);
  });
}

test("initialization barriers prevent stale or explicitly superseded pages from committing", async () => {
  resetPage();
  const previousFetch = globalThis.fetch;
  let releaseBarrier;
  setPartialNavigationBarrier(new Promise((resolve) => (releaseBarrier = resolve)));
  globalThis.fetch = async (url) =>
    responseWithUrl(pageMarkup({ title: new URL(url, document.baseURI).pathname }), String(url));

  const navigator = createNavigator({ assign: () => true, reload: () => true });
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
  navigator.navigateFully(new URL("https://blog.example.com/full"));
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
  const timeoutNavigator = createNavigator(undefined, { partialRequestTimeoutMs: 5 });
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
  const fullNavigator = createNavigator({ assign: () => true, reload: () => true });
  const fullIntent = once(document, NAVIGATION_FULL_RELOAD_EVENT);
  fullNavigator.navigate(new URL("https://blog.example.com/waiting-markup"));
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  fullNavigator.navigateFully(new URL("https://blog.example.com/full"));
  await fullIntent;
  releaseMarkup?.();
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  assert.equal(fullNavigator.isFullNavigationPending(), true);
  fullNavigator.stop();

  setPartialNavigationBarrier(Promise.resolve());
  globalThis.fetch = previousFetch;
});

test("aborting a superseded request rejects stale fetch work without emitting a navigation error", async (t) => {
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
  const navigator = createNavigator();
  navigator.navigate(new URL("https://blog.example.com/first"));
  await t.waitFor(() => assert.equal(requestCount, 1));
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

test("popstate to the still-visible document cancels an active visit and restores its entry", async (t) => {
  resetPage("/current");
  const main = document.getElementById("main");
  const requests = [];
  globalThis.fetch = (url, options) => new Promise((resolve) => requests.push({ options, resolve, url }));
  const navigator = createNavigator();
  navigator.start();
  const restored = { ...history.state, url: "/current#restored", themePartialNavigationKey: "restored" };
  navigator.navigate(new URL("https://blog.example.com/next"));
  await t.waitFor(() => assert.equal(requests.length, 1));
  const sameDocument = once(document, NAVIGATION_SAME_DOCUMENT_EVENT);
  history.replaceState(restored, "", restored.url);
  window.dispatchEvent(new window.PopStateEvent("popstate", { state: restored }));
  const event = await sameDocument;
  assert.equal(requests[0].options.signal.aborted, true);
  assert.equal(event.detail.history, true);
  assert.equal(event.detail.targetEntryKey, "restored");
  assert.equal(event.detail.targetUrl, "https://blog.example.com/current#restored");
  requests[0].resolve(responseWithUrl(pageMarkup(), requests[0].url));
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(window.location.href, event.detail.targetUrl);
  assert.equal(document.getElementById("main"), main);
  assert.equal(requests.length, 1);
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
  window.dispatchEvent(new window.PopStateEvent("popstate", { state: window.history.state }));
  await reloadIntent;
  window.dispatchEvent(restored);
  assert.equal(jsdomErrors.length >= 3, true);

  document.removeEventListener("theme:runtime-status", onStatus);
});
