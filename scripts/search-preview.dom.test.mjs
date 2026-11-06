import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const environment = installDom(`<!doctype html><html><head><title>Search preview</title></head><body>
  <button id="outside">Outside search</button>
  <search-modal></search-modal>
</body></html>`);
environment.dom.virtualConsole.removeAllListeners("jsdomError");
environment.dom.virtualConsole.on("jsdomError", (error) => {
  if (!error.message.includes("Not implemented: navigation to another Document")) {
    throw error;
  }
});

const { openSearchWidget } = await import("../src/common/ui-actions.ts");
const { NAVIGATION_FULL_RELOAD_EVENT } = await import("../src/common/navigation.ts");
const modal = document.querySelector("search-modal");
const modalRoot = modal.attachShadow({ mode: "open" });
modalRoot.innerHTML = "<search-form></search-form>";
const form = modalRoot.querySelector("search-form");
const formRoot = form.attachShadow({ mode: "open" });
formRoot.innerHTML = '<input><ul><li data-index="0"><span>Search result</span></li></ul>';
const result = formRoot.querySelector("span");
const input = formRoot.querySelector("input");
const outside = document.getElementById("outside");
const navigation = new window.EventTarget();
const redirects = [];
let navigationOptions = {};
let targetUrl = "/archives/result?sort=latest#details";
let lastNavigation;
let stopActivation = false;

// jsdom has no Navigation API. This boundary emits the standard event that a
// browser emits for SearchWidget 1.8.0's synchronous location.href assignment.
function requestNavigation(url, options = {}) {
  const { cancelable = true, ...properties } = options;
  const event = new Event("navigate", { cancelable });
  Object.assign(event, {
    canIntercept: true,
    destination: { url: new URL(url, window.location.href).href },
    downloadRequest: null,
    formData: null,
    navigationType: "push",
    ...properties,
  });
  navigation.dispatchEvent(event);
  return event;
}

function pluginOpenResult(event) {
  if (stopActivation) {
    event.stopPropagation();
    return;
  }
  // The real plugin records history before assigning location.href; the theme
  // must allow the original selection handler to complete that work.
  window.localStorage.setItem("search-preview-selected", targetUrl);
  lastNavigation = requestNavigation(targetUrl, navigationOptions);
}
result.closest("li").addEventListener("click", pluginOpenResult);
form.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    pluginOpenResult(event);
  }
});
outside.addEventListener("click", pluginOpenResult);
document.addEventListener(NAVIGATION_FULL_RELOAD_EVENT, (event) => redirects.push(event.detail.targetUrl));
window.SearchWidget = { open() {} };

function reset(path = "/?preview-theme=theme-sky-blog-2") {
  window.history.replaceState({}, "", path);
  window.navigation = navigation;
  redirects.length = 0;
  navigationOptions = {};
  targetUrl = "/archives/result?sort=latest#details";
  lastNavigation = undefined;
  stopActivation = false;
  window.localStorage.clear();
}

function select(kind = "click", options = {}, element) {
  const event =
    kind === "click"
      ? new MouseEvent("click", { bubbles: true, composed: true, cancelable: true, ...options })
      : new KeyboardEvent("keydown", { bubbles: true, composed: true, cancelable: true, key: kind, ...options });
  (element ?? (kind === "click" ? result : input)).dispatchEvent(event);
  return event;
}

test.after(() => environment.restore());

test("search keeps its native navigation when the browser has no Navigation API", () => {
  reset();
  delete window.navigation;
  assert.equal(openSearchWidget(null), true);
  select();
  assert.equal(lastNavigation.defaultPrevented, false);
  assert.deepEqual(redirects, []);
});

for (const kind of ["click", "Enter"]) {
  test(`search ${kind} retains the same-origin preview and plugin selection history`, () => {
    reset();
    assert.equal(openSearchWidget(null), true);
    select(kind);
    assert.equal(lastNavigation.defaultPrevented, true);
    assert.deepEqual(redirects, [
      "https://blog.example.com/archives/result?sort=latest&preview-theme=theme-sky-blog-2#details",
    ]);
    assert.equal(window.localStorage.getItem("search-preview-selected"), targetUrl);
  });
}

test("search honors an explicitly selected preview and leaves external origins unchanged", () => {
  for (const target of [
    "/archives/result?preview-theme=another-theme",
    "/archives/result?preview-theme=",
    "https://external.example/result",
    "http://blog.example.com/result",
  ]) {
    reset();
    targetUrl = target;
    openSearchWidget(null);
    select();
    assert.equal(lastNavigation.defaultPrevented, false, target);
    assert.deepEqual(redirects, [], target);
  }
});

test("search does not intervene outside preview or outside a search-modal activation", () => {
  reset("/?sort=latest");
  openSearchWidget(null);
  select();
  assert.equal(lastNavigation.defaultPrevented, false);
  assert.deepEqual(redirects, []);

  reset();
  openSearchWidget(null);
  select("click", {}, outside);
  assert.equal(lastNavigation.defaultPrevented, false);
  assert.deepEqual(redirects, []);
});

test("search leaves modified clicks, modified Enter and non-primary clicks to the browser", () => {
  for (const [kind, options] of [
    ["click", { ctrlKey: true }],
    ["click", { metaKey: true }],
    ["click", { altKey: true }],
    ["click", { shiftKey: true }],
    ["click", { button: 1 }],
    ["Enter", { ctrlKey: true }],
    ["Enter", { isComposing: true }],
  ]) {
    reset();
    openSearchWidget(null);
    select(kind, options);
    assert.equal(lastNavigation.defaultPrevented, false, JSON.stringify(options));
    assert.deepEqual(redirects, []);
  }
});

test("search does not cancel downloads, form submissions, history traversal or unmodifiable navigation", () => {
  for (const options of [
    { cancelable: false },
    { canIntercept: false },
    { downloadRequest: "" },
    { downloadRequest: "export.html" },
    { formData: new window.FormData() },
    { navigationType: "traverse" },
    { navigationType: "reload" },
  ]) {
    reset();
    navigationOptions = options;
    openSearchWidget(null);
    select();
    assert.equal(lastNavigation.defaultPrevented, false, JSON.stringify(options));
    assert.deepEqual(redirects, []);
  }
});

test("reopening search creates one redirect and disarms before the replacement navigation", () => {
  reset();
  openSearchWidget(null);
  openSearchWidget(null);
  let reentrant;
  const onRedirect = () => {
    reentrant = requestNavigation("/other-synchronous-navigation");
  };
  document.addEventListener(NAVIGATION_FULL_RELOAD_EVENT, onRedirect, { once: true });
  select();
  assert.equal(redirects.length, 1);
  assert.equal(reentrant.defaultPrevented, false);
});

test("search scopes interception to the activation dispatch even when propagation stops", async () => {
  reset();
  openSearchWidget(null);
  stopActivation = true;
  const activation = select();
  assert.equal(activation.eventPhase, Event.NONE);
  assert.equal(requestNavigation("/after-stopped-activation").defaultPrevented, false);
  await Promise.resolve();
  assert.equal(requestNavigation("/later-navigation").defaultPrevented, false);
  assert.deepEqual(redirects, []);

  stopActivation = false;
  select("Escape");
  assert.equal(requestNavigation("/after-escape").defaultPrevented, false);
  select("Enter");
  assert.equal(redirects.length, 1);
});

test("an already open search keeps preview navigation across repeated BFCache restores and cleans up on disposal", () => {
  reset();
  openSearchWidget(null);
  select();
  assert.equal(lastNavigation.defaultPrevented, true);

  for (const [index, kind] of ["Enter", "click", "Enter"].entries()) {
    window.dispatchEvent(new PageTransitionEvent("pagehide", { persisted: true }));
    window.dispatchEvent(new PageTransitionEvent("pageshow", { persisted: true }));
    select(kind);
    assert.equal(lastNavigation.defaultPrevented, true, `Restore ${index + 1}: ${kind}`);
    assert.equal(redirects.length, index + 2, "Each selection produces exactly one replacement navigation.");
  }

  window.dispatchEvent(new PageTransitionEvent("pagehide", { persisted: false }));
  window.dispatchEvent(new PageTransitionEvent("pageshow", { persisted: true }));
  select();
  assert.equal(lastNavigation.defaultPrevented, false, "A disposed document has no search interception.");
  assert.equal(redirects.length, 4);
});

test("each BFCache pagehide disarms the currently dispatching search activation", () => {
  reset();
  openSearchWidget(null);

  for (const index of [1, 2]) {
    form.addEventListener(
      "click",
      () => window.dispatchEvent(new PageTransitionEvent("pagehide", { persisted: true })),
      { capture: true, once: true },
    );
    select();
    assert.equal(lastNavigation.defaultPrevented, false, `Departure ${index} must disarm its activation.`);
    assert.equal(redirects.length, index - 1);

    window.dispatchEvent(new PageTransitionEvent("pageshow", { persisted: true }));
    select("Enter");
    assert.equal(lastNavigation.defaultPrevented, true, `Restore ${index} remains adapted.`);
    assert.equal(redirects.length, index);
  }
});
