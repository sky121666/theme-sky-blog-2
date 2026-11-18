import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const environment = installDom(`<!doctype html><html><head></head><body>
  <main id="main"><article x-data="postViewer">
    <span id="progress" x-text="readingProgress"></span>
    <h1>Page title</h1>
    <div class="terminal-content"><h1>Introduction</h1><h2>Heading</h2></div>
  </article></main>
  <input id="editor" />
</body></html>`);

const resizeObservers = new Set();
window.ResizeObserver = class {
  constructor(callback) {
    this.callback = callback;
    this.targets = new Set();
    resizeObservers.add(this);
  }
  observe(target) {
    this.targets.add(target);
  }
  disconnect() {
    this.targets.clear();
    resizeObservers.delete(this);
  }
};

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

test("the viewer TOC indexes body H1 headings and skips the page title", () => {
  const viewer = document.querySelector('[x-data="postViewer"]');
  assert.deepEqual(
    Alpine.$data(viewer).tocItems.map(({ level, text }) => [level, text]),
    [
      [1, "Introduction"],
      [2, "Heading"],
    ],
  );
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

test("focused reader landmark keeps shortcuts while nested controls keep their own keys", () => {
  const main = document.getElementById("main");
  const button = document.createElement("button");
  main.append(button);
  main.tabIndex = 0;
  let scrollCount = 0;
  main.scrollBy = () => (scrollCount += 1);

  try {
    main.focus();
    const readerKey = new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "j" });
    main.dispatchEvent(readerKey);
    assert.equal(readerKey.defaultPrevented, true);
    assert.equal(scrollCount, 1);

    button.focus();
    const controlKey = new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "j" });
    button.dispatchEvent(controlKey);
    assert.equal(controlKey.defaultPrevented, false);
    assert.equal(scrollCount, 1);
  } finally {
    button.remove();
    main.tabIndex = -1;
    main.blur();
  }
});

test("reading progress ends at the body, including after scrolling into long comments", async () => {
  const main = document.getElementById("main");
  const content = main.querySelector(".terminal-content");
  main.getBoundingClientRect = () => ({ top: 40 });
  Object.defineProperty(main, "clientHeight", { configurable: true, value: 500 });
  Object.defineProperty(main, "scrollHeight", { configurable: true, value: 8000 });
  let top = 540;
  content.getBoundingClientRect = () => ({ top, bottom: top + 1000, height: 1000 });

  for (const [nextTop, expected] of [
    [540, "0"],
    [40, "50"],
    [-459, "99"],
    [-460, "100"],
    [-3000, "100"],
  ]) {
    top = nextTop;
    main.scrollTop = 540 - top;
    main.dispatchEvent(new Event("scroll"));
    main.dispatchEvent(new Event("scroll"));
    await nextFrame();
    assert.equal(document.getElementById("progress").textContent, expected);
  }
});

function nextFrame() {
  return new Promise((resolve) => window.requestAnimationFrame(resolve));
}

test("body growth, expanded TOC and viewport resizing update progress without scrolling", async () => {
  const main = document.getElementById("main");
  const content = main.querySelector(".terminal-content");
  const viewer = main.querySelector("[x-data]");
  main.getBoundingClientRect = () => ({ top: 80 });
  let viewportHeight = 500;
  Object.defineProperty(main, "clientHeight", { configurable: true, get: () => viewportHeight });
  let top = 180;
  let height = 400;
  content.getBoundingClientRect = () => ({ top, bottom: top + height, height });
  main.scrollTop = 0;

  async function afterResize(target, expected) {
    for (const observer of resizeObservers) {
      if (observer.targets.has(target)) observer.callback([{ target }]);
    }
    await nextFrame();
    assert.equal(document.getElementById("progress").textContent, expected);
  }

  await afterResize(viewer, "100");
  height = 800;
  await afterResize(content, "50");
  top = 380;
  await afterResize(viewer, "25");
  viewportHeight = 1100;
  await afterResize(main, "100");

  document.dispatchEvent(new CustomEvent(NAVIGATION_START_EVENT));
  assert.equal(resizeObservers.size, 0);
  document.dispatchEvent(new CustomEvent(NAVIGATION_COMPLETE_EVENT));
  assert.equal(resizeObservers.size, 1);
  Alpine.destroyTree(viewer);
  assert.equal(resizeObservers.size, 0);
});
