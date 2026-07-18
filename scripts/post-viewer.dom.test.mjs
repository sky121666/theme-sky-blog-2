import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const environment = installDom(`<!doctype html><html><head></head><body>
  <main id="main"><article x-data="postViewer">
    <span id="progress" x-text="readingProgress"></span>
    <div class="terminal-content"><h2>Heading</h2></div>
  </article></main>
  <input id="editor" />
</body></html>`);

const Alpine = (await import("../src/common/alpine.ts")).default;
const { NAVIGATION_COMPLETE_EVENT, NAVIGATION_START_EVENT } = await import("../src/common/navigation.ts");
const { registerPostViewerComponent } = await import("../src/features/post-viewer.ts");

registerPostViewerComponent();
Alpine.start();
await Promise.resolve();

test.after(async () => {
  Alpine.destroyTree(document.body);
  Alpine.stopObservingMutations();
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  environment.restore();
});

test("cancelled navigation restores post keyboard and progress listeners", () => {
  const detail = {
    fromEntryKey: "from",
    history: false,
    targetEntryKey: "to",
    targetUrl: "https://blog.example.com/post",
  };
  document.dispatchEvent(new CustomEvent(NAVIGATION_START_EVENT, { detail }));
  const whileLoading = new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "j" });
  window.dispatchEvent(whileLoading);
  assert.equal(whileLoading.defaultPrevented, false);

  document.dispatchEvent(new CustomEvent(NAVIGATION_COMPLETE_EVENT, { detail }));
  const afterCancellation = new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "j" });
  window.dispatchEvent(afterCancellation);
  assert.equal(afterCancellation.defaultPrevented, true);
});

test("Shift+Space scrolls upward and repeated global shortcuts are ignored", () => {
  const main = document.getElementById("main");
  Object.defineProperty(main, "clientHeight", { configurable: true, value: 500 });
  let lastScroll = null;
  main.scrollBy = (options) => {
    lastScroll = options;
  };

  const shiftSpace = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    key: " ",
    shiftKey: true,
  });
  window.dispatchEvent(shiftSpace);
  assert.equal(shiftSpace.defaultPrevented, true);
  assert.equal(lastScroll.top, -400);

  const repeated = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    key: "j",
    repeat: true,
  });
  window.dispatchEvent(repeated);
  assert.equal(repeated.defaultPrevented, false);
});

test("post keyboard controls cover directional, paging, and boundary scrolling", () => {
  const main = document.getElementById("main");
  Object.defineProperty(main, "clientHeight", { configurable: true, value: 500 });
  Object.defineProperty(main, "scrollHeight", { configurable: true, value: 1500 });
  const calls = [];
  main.scrollBy = (options) => calls.push(["by", options.top]);
  main.scrollTo = (options) => calls.push(["to", options.top]);

  for (const key of ["ArrowDown", "j", "ArrowUp", "k", "PageDown", "PageUp", "End", "Home"]) {
    const event = new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key });
    window.dispatchEvent(event);
    assert.equal(event.defaultPrevented, true, key);
  }

  assert.deepEqual(calls, [
    ["by", 100],
    ["by", 100],
    ["by", -100],
    ["by", -100],
    ["by", 400],
    ["by", -400],
    ["to", 1500],
    ["to", 0],
  ]);

  const editorEvent = new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "j" });
  document.getElementById("editor").dispatchEvent(editorEvent);
  assert.equal(editorEvent.defaultPrevented, false);
});

test("scroll events update and clamp reading progress through one animation frame", async () => {
  const main = document.getElementById("main");
  Object.defineProperty(main, "clientHeight", { configurable: true, value: 500 });
  Object.defineProperty(main, "scrollHeight", { configurable: true, value: 1500 });
  Object.defineProperty(main, "scrollTop", { configurable: true, value: 500, writable: true });

  main.dispatchEvent(new Event("scroll"));
  main.dispatchEvent(new Event("scroll"));
  await new Promise((resolve) => window.requestAnimationFrame(resolve));
  await Promise.resolve();
  assert.equal(document.getElementById("progress").textContent, "50");

  main.scrollTop = 5000;
  main.dispatchEvent(new Event("scroll"));
  await new Promise((resolve) => window.requestAnimationFrame(resolve));
  await Promise.resolve();
  assert.equal(document.getElementById("progress").textContent, "100");
});
