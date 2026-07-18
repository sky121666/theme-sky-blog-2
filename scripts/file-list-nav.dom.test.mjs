import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const environment = installDom(`<!doctype html><html><head></head><body>
  <main id="main">
    <div id="list" x-data="fileListNav">
      <a id="first" data-nav-item href="/first" :class="{ selected: isSelected($el) }">first</a>
      <a id="second" data-nav-item href="/second" :class="{ selected: isSelected($el) }">second</a>
    </div>
    <input id="outside-input" />
  </main>
</body></html>`);

const Alpine = (await import("../src/common/alpine.ts")).default;
const { NAVIGATION_COMPLETE_EVENT, NAVIGATION_START_EVENT } = await import("../src/common/navigation.ts");
const { RUNTIME_STATUS_EVENT } = await import("../src/common/runtime-events.ts");
const { registerFileListNavComponent } = await import("../src/features/file-list-nav.ts");

registerFileListNavComponent();
Alpine.start();
await Promise.resolve();

test.after(async () => {
  Alpine.destroyTree(document.body);
  Alpine.stopObservingMutations();
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  environment.restore();
});

test("selection follows actual DOM order without template index arithmetic", async () => {
  assert.equal(document.getElementById("first").classList.contains("selected"), true);
  assert.equal(document.getElementById("second").classList.contains("selected"), false);

  window.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "ArrowDown" }));
  await Promise.resolve();
  assert.equal(document.getElementById("first").classList.contains("selected"), false);
  assert.equal(document.getElementById("second").classList.contains("selected"), true);
  assert.equal(document.activeElement, document.getElementById("second"));
});

test("ArrowUp from a focus-cleared selection wraps to the final DOM item", async () => {
  document.getElementById("first").dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
  window.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "ArrowUp" }));
  await Promise.resolve();
  assert.equal(document.getElementById("first").classList.contains("selected"), false);
  assert.equal(document.getElementById("second").classList.contains("selected"), true);
});

test("cancelled navigation restores global keyboard listeners on complete", () => {
  const detail = {
    fromEntryKey: "from",
    history: false,
    targetEntryKey: "to",
    targetUrl: "https://blog.example.com/next",
  };
  document.dispatchEvent(new CustomEvent(NAVIGATION_START_EVENT, { detail }));

  const whileLoading = new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "ArrowDown" });
  window.dispatchEvent(whileLoading);
  assert.equal(whileLoading.defaultPrevented, false);

  document.dispatchEvent(new CustomEvent(NAVIGATION_COMPLETE_EVENT, { detail }));
  const afterCancellation = new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "ArrowDown" });
  window.dispatchEvent(afterCancellation);
  assert.equal(afterCancellation.defaultPrevented, true);
});

test("focus outside the list clears selection and keyboard navigation restores it", async () => {
  document.getElementById("outside-input").dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
  await Promise.resolve();
  assert.equal(document.getElementById("first").classList.contains("selected"), false);
  assert.equal(document.getElementById("second").classList.contains("selected"), false);

  const enterWithoutSelection = new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "Enter" });
  window.dispatchEvent(enterWithoutSelection);
  assert.equal(enterWithoutSelection.defaultPrevented, true);

  window.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "ArrowUp" }));
  await Promise.resolve();
  assert.equal(document.getElementById("second").classList.contains("selected"), true);

  document.getElementById("first").focus();
  const fromInteractiveItem = new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "ArrowDown" });
  document.getElementById("first").dispatchEvent(fromInteractiveItem);
  await Promise.resolve();
  assert.equal(fromInteractiveItem.defaultPrevented, true);
  assert.equal(document.getElementById("second").classList.contains("selected"), true);
});

test("Enter delegates selected links to the safe navigation policy", async () => {
  const first = document.getElementById("first");
  first.setAttribute("href", "javascript:alert(1)");
  first.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
  await Promise.resolve();
  const status = new Promise((resolve) => document.addEventListener(RUNTIME_STATUS_EVENT, resolve, { once: true }));
  const enter = new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "Enter" });
  window.dispatchEvent(enter);

  const statusEvent = await status;
  assert.equal(enter.defaultPrevented, true);
  assert.equal(statusEvent.detail.level, "error");
  assert.equal(
    statusEvent.detail.message,
    "Navigation was blocked because the target URL is invalid or uses an unsupported protocol.",
  );
});

test("an empty navigation component leaves unrelated global keys untouched", () => {
  const list = document.getElementById("list");
  Alpine.destroyTree(list);
  list.remove();

  const empty = document.createElement("div");
  empty.setAttribute("x-data", "fileListNav");
  document.getElementById("main").append(empty);
  Alpine.initTree(empty);

  const event = new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "ArrowDown" });
  window.dispatchEvent(event);
  assert.equal(event.defaultPrevented, false);
});
