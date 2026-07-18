import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const environment = installDom(`<!doctype html><html><head><title>Next page</title></head><body>
  <p id="navigation-announcer" role="status"></p>
  <main id="main" tabindex="-1"><h2 id="section">Section</h2></main>
</body></html>`);
const { announceNavigation, focusNavigationContext, replayNavigationScripts } =
  await import("../src/common/runtime.ts");

test.after(() => environment.restore());

function navigationDetail(focus) {
  return {
    focus,
    fromEntryKey: "from",
    history: false,
    targetEntryKey: "to",
    targetUrl: "https://blog.example.com/next",
  };
}

test("keyboard partial navigation focuses the new main landmark and announces the route", () => {
  focusNavigationContext(navigationDetail(true), null);
  announceNavigation();
  assert.equal(document.activeElement, document.getElementById("main"));
  assert.equal(document.getElementById("navigation-announcer").textContent, "Loaded Next page");
});

test("mouse partial navigation does not steal focus", () => {
  document.activeElement?.blur();
  focusNavigationContext(navigationDetail(false), null);
  assert.notEqual(document.activeElement, document.getElementById("main"));
});

test("hash navigation makes the target programmatically focusable", () => {
  const target = document.getElementById("section");
  focusNavigationContext(navigationDetail(true), target);
  assert.equal(document.activeElement, target);
  assert.equal(target.getAttribute("tabindex"), "-1");
});

test("invalid data-pjax modules fail atomically instead of declaring the page ready", async () => {
  const root = document.createElement("section");
  root.innerHTML = `
    <script type="module" data-pjax>window.validInline = true</script>
    <script type="module" data-pjax src="https://external.example/widget.js"></script>
  `;
  const originalInline = root.querySelector("script");

  await assert.rejects(replayNavigationScripts(root), /cross-origin partial-navigation module/);
  assert.equal(root.querySelector("script"), originalInline);

  root.innerHTML = '<script type="module" data-pjax></script>';
  await assert.rejects(replayNavigationScripts(root), /empty partial-navigation module/);

  root.innerHTML = '<script type="module" data-pjax src="http://["></script>';
  await assert.rejects(replayNavigationScripts(root), /invalid source URL/);
});

test("same-origin external modules are cache-busted, preserve security attributes, and wait for load", async () => {
  const root = document.createElement("section");
  root.innerHTML = `
    <script
      type="module"
      data-pjax
      src="/plugins/widget.js?v=3"
      crossorigin="anonymous"
      integrity="sha256-example"
      nonce="nonce-value"
      referrerpolicy="no-referrer"
    ></script>
  `;
  const replay = replayNavigationScripts(root);
  const clone = root.querySelector("script");

  assert.match(clone.src, /^https:\/\/blog\.example\.com\/plugins\/widget\.js\?v=3&_theme_navigation=\d+$/);
  assert.equal(clone.getAttribute("crossorigin"), "anonymous");
  assert.equal(clone.getAttribute("integrity"), "sha256-example");
  assert.equal(clone.nonce, "nonce-value");
  assert.equal(clone.getAttribute("referrerpolicy"), "no-referrer");

  clone.dispatchEvent(new Event("load"));
  await replay;
});

test("inline modules wait for their completion event and propagate replay errors", async () => {
  const inlineRoot = document.createElement("section");
  inlineRoot.innerHTML = '<script type="module" data-pjax>window.inlineWidget = true</script>';
  const inlineReplay = replayNavigationScripts(inlineRoot);
  const clone = inlineRoot.querySelector("script");
  const completionEventName = clone.textContent.match(/window\.dispatchEvent\(new Event\("([^"]+)"\)\)/)?.[1];
  assert.ok(completionEventName);
  window.dispatchEvent(new Event(completionEventName));
  await inlineReplay;

  const failedRoot = document.createElement("section");
  failedRoot.innerHTML = '<script type="module" data-pjax src="/plugins/fail.js"></script>';
  const failedReplay = replayNavigationScripts(failedRoot);
  failedRoot.querySelector("script").dispatchEvent(new Event("error"));
  await assert.rejects(failedReplay, /Failed to replay/);
});

test("focus and announcement helpers are safe when their landmarks are absent", () => {
  const main = document.getElementById("main");
  const announcer = document.getElementById("navigation-announcer");
  main.remove();
  announcer.remove();
  assert.doesNotThrow(() => focusNavigationContext(navigationDetail(true), null));
  assert.doesNotThrow(() => announceNavigation());
  document.body.append(main, announcer);
});
