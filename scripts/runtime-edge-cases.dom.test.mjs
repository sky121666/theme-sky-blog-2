import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const PAGE_DATA = JSON.stringify({
  categories: [],
  currentPosts: [],
  pageType: "index",
  tags: [],
  urls: { archives: "/archives", categories: "/categories", home: "/", tags: "/tags" },
  user: "guest",
});

const environment = installDom(`<!doctype html><html><head><title>Runtime edges</title></head><body>
  <p id="navigation-announcer" role="status"></p>
  <main id="main" tabindex="-1">
    <script id="halo-page-data" type="application/json">${PAGE_DATA}</script>
    <img class="lozad" alt="" />
  </main>
</body></html>`);
environment.dom.virtualConsole.removeAllListeners("jsdomError");
environment.dom.virtualConsole.on("jsdomError", (error) => {
  if (!error.message.includes("Not implemented: navigation to another Document")) {
    throw error;
  }
});

class TestIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }

  disconnect() {}

  observe(target) {
    this.callback([{ intersectionRatio: 1, isIntersecting: true, target }], this);
  }

  unobserve() {}
}

window.IntersectionObserver = TestIntersectionObserver;
Object.defineProperty(globalThis, "IntersectionObserver", {
  configurable: true,
  value: TestIntersectionObserver,
  writable: true,
});

const Alpine = (await import("../src/common/alpine.ts")).default;
const {
  NAVIGATION_ERROR_EVENT,
  NAVIGATION_FULL_RELOAD_EVENT,
  NAVIGATION_FULL_RELOAD_RESET_EVENT,
  NAVIGATION_SAME_DOCUMENT_EVENT,
  NAVIGATION_START_EVENT,
  NAVIGATION_SUCCESS_EVENT,
} = await import("../src/common/navigation.ts");
const { PAGE_READY_EVENT, RUNTIME_STATUS_EVENT } = await import("../src/common/runtime-events.ts");
const { bootstrapRuntime, focusNavigationContext, replayNavigationScripts } = await import("../src/common/runtime.ts");

bootstrapRuntime();

test.after(async () => {
  window.dispatchEvent(new Event("pagehide"));
  Alpine.destroyTree(document.body);
  Alpine.stopObservingMutations();
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  delete globalThis.IntersectionObserver;
  environment.restore();
});

function navigationDetail(path, overrides = {}) {
  return {
    focus: false,
    fromEntryKey: `from-${path}`,
    history: false,
    targetEntryKey: `to-${path}`,
    targetUrl: `https://blog.example.com/${path}`,
    ...overrides,
  };
}

function dispatchNavigation(type, detail) {
  document.dispatchEvent(new CustomEvent(type, { detail }));
}

function resetFullNavigationState() {
  dispatchNavigation(NAVIGATION_FULL_RELOAD_RESET_EVENT, { targetUrl: window.location.href });
}

function flushMicrotasks() {
  return new Promise((resolve) => queueMicrotask(resolve));
}

function waitForEvent(target, eventName, timeoutMs = 1000) {
  return new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(() => reject(new Error(`Timed out waiting for ${eventName}.`)), timeoutMs);
    target.addEventListener(
      eventName,
      (event) => {
        window.clearTimeout(timeoutId);
        resolve(event);
      },
      { once: true },
    );
  });
}

function renderMain(content = "") {
  document.body.innerHTML = `
    <p id="navigation-announcer" role="status"></p>
    <main id="main" tabindex="-1">
      <script id="halo-page-data" type="application/json">${PAGE_DATA}</script>
      ${content}
    </main>
  `;
  return document.getElementById("main");
}

test("module replay ignores late completion, rejects timeouts, and blocks unsafe protocols", async () => {
  const originalSetTimeout = window.setTimeout;
  const originalClearTimeout = window.clearTimeout;
  let timeoutCallback;
  let clearedTimeout;

  window.setTimeout = (callback, delay) => {
    assert.equal(delay, 5000);
    timeoutCallback = callback;
    return 73;
  };
  window.clearTimeout = (timeoutId) => {
    clearedTimeout = timeoutId;
  };

  try {
    const loadedRoot = document.createElement("section");
    loadedRoot.innerHTML = '<script type="module" data-pjax src="/plugins/late.js"></script>';
    const replay = replayNavigationScripts(loadedRoot);
    loadedRoot.querySelector("script").dispatchEvent(new Event("load"));
    await replay;
    assert.equal(clearedTimeout, 73);
    assert.doesNotThrow(() => timeoutCallback());

    const timeoutRoot = document.createElement("section");
    timeoutRoot.innerHTML = '<script type="module" data-pjax>window.neverCompletes = true</script>';
    const timedOutReplay = replayNavigationScripts(timeoutRoot);
    timeoutCallback();
    await assert.rejects(timedOutReplay, /Timed out while replaying/);
  } finally {
    window.setTimeout = originalSetTimeout;
    window.clearTimeout = originalClearTimeout;
  }

  const emptyRoot = document.createElement("section");
  await replayNavigationScripts(emptyRoot);

  const unsafeRoot = document.createElement("section");
  unsafeRoot.innerHTML = '<script type="module" data-pjax src="blob:https://blog.example.com/widget"></script>';
  await assert.rejects(replayNavigationScripts(unsafeRoot), /cross-origin partial-navigation module/);
});

test("full-navigation intent cancels restoration and suppresses stale runtime events", async () => {
  const originalRequestAnimationFrame = window.requestAnimationFrame;
  const originalCancelAnimationFrame = window.cancelAnimationFrame;
  let animationCallback;
  let cancelCount = 0;

  window.requestAnimationFrame = (callback) => {
    animationCallback = callback;
    return 91;
  };
  window.cancelAnimationFrame = (frameId) => {
    assert.equal(frameId, 91);
    cancelCount += 1;
  };

  try {
    const detail = navigationDetail("pending");
    dispatchNavigation(NAVIGATION_SAME_DOCUMENT_EVENT, detail);
    dispatchNavigation(NAVIGATION_FULL_RELOAD_EVENT, { targetUrl: detail.targetUrl });
    assert.equal(cancelCount, 1);

    let runtimeStatusCount = 0;
    let pageReadyCount = 0;
    const onStatus = () => {
      runtimeStatusCount += 1;
    };
    const onPageReady = () => {
      pageReadyCount += 1;
    };
    document.addEventListener(RUNTIME_STATUS_EVENT, onStatus);
    document.addEventListener(PAGE_READY_EVENT, onPageReady);

    dispatchNavigation(NAVIGATION_SAME_DOCUMENT_EVENT, detail);
    dispatchNavigation(NAVIGATION_ERROR_EVENT, { ...detail, error: new Error("stale") });
    dispatchNavigation(NAVIGATION_SUCCESS_EVENT, detail);
    await flushMicrotasks();

    assert.equal(runtimeStatusCount, 0);
    assert.equal(pageReadyCount, 0);
    assert.equal(cancelCount, 1);
    assert.equal(typeof animationCallback, "function");

    document.removeEventListener(RUNTIME_STATUS_EVENT, onStatus);
    document.removeEventListener(PAGE_READY_EVENT, onPageReady);
  } finally {
    resetFullNavigationState();
    window.requestAnimationFrame = originalRequestAnimationFrame;
    window.cancelAnimationFrame = originalCancelAnimationFrame;
  }
});

test("runtime error fallback omits an empty target and rejects stale delayed reloads", () => {
  const originalSetTimeout = window.setTimeout;
  let delayedFallback;
  window.setTimeout = (callback, delay) => {
    if (delay === 100) {
      delayedFallback = callback;
      return 101;
    }
    return originalSetTimeout(callback, delay);
  };

  const statuses = [];
  const onStatus = (event) => statuses.push(event.detail);
  document.addEventListener(RUNTIME_STATUS_EVENT, onStatus);

  try {
    const missingTarget = navigationDetail("missing-target", { targetUrl: "" });
    dispatchNavigation(NAVIGATION_ERROR_EVENT, { ...missingTarget, error: new Error("missing target") });
    assert.equal(statuses.at(-1).targetUrl, undefined);
    assert.equal(delayedFallback, undefined);

    const staleTarget = navigationDetail("stale-target");
    dispatchNavigation(NAVIGATION_ERROR_EVENT, { ...staleTarget, error: new Error("stale request") });
    assert.equal(typeof delayedFallback, "function");
    dispatchNavigation(NAVIGATION_START_EVENT, navigationDetail("newer-navigation"));

    let fullReloadCount = 0;
    const onReload = () => {
      fullReloadCount += 1;
    };
    document.addEventListener(NAVIGATION_FULL_RELOAD_EVENT, onReload);
    delayedFallback();
    assert.equal(fullReloadCount, 0);
    document.removeEventListener(NAVIGATION_FULL_RELOAD_EVENT, onReload);
  } finally {
    document.removeEventListener(RUNTIME_STATUS_EVENT, onStatus);
    window.setTimeout = originalSetTimeout;
    resetFullNavigationState();
  }
});

test("successful replacement initializes Alpine, plugins, lazy loading, and page-ready lifecycle", async () => {
  const main = renderMain("<div x-data=\"{ ready: true }\" x-text=\"ready ? 'ready' : 'no'\"></div>");
  const detail = navigationDetail("success", { focus: true });
  const statuses = [];
  const onStatus = (event) => statuses.push(event.detail);
  document.addEventListener(RUNTIME_STATUS_EVENT, onStatus);
  let pjaxCompleteCount = 0;
  const onPjaxComplete = () => {
    pjaxCompleteCount += 1;
  };
  window.addEventListener("pjax:complete", onPjaxComplete);
  const pageReady = waitForEvent(document, PAGE_READY_EVENT);

  dispatchNavigation(NAVIGATION_START_EVENT, detail);
  dispatchNavigation(NAVIGATION_SUCCESS_EVENT, detail);

  let readyEvent;
  try {
    readyEvent = await pageReady;
  } catch (error) {
    error.message += ` Runtime statuses: ${JSON.stringify(statuses)}`;
    throw error;
  }
  await new Promise((resolve) => window.requestAnimationFrame(resolve));
  assert.equal(readyEvent.detail.pageType, "index");
  assert.equal(pjaxCompleteCount, 1);
  assert.equal(main.textContent.includes("ready"), true);
  assert.equal(document.activeElement, main);
  assert.equal(document.getElementById("navigation-announcer").textContent, "Loaded Runtime edges");
  assert.equal(main.classList.contains("loading"), false);
  assert.equal(main.hasAttribute("aria-busy"), false);

  window.removeEventListener("pjax:complete", onPjaxComplete);
  document.removeEventListener(RUNTIME_STATUS_EVENT, onStatus);
});

test("replacement without a main shell still reports an unknown ready page safely", async () => {
  document.body.innerHTML = '<p id="navigation-announcer" role="status"></p>';
  const detail = navigationDetail("no-main", { focus: true });
  const pageReady = waitForEvent(document, PAGE_READY_EVENT);

  dispatchNavigation(NAVIGATION_START_EVENT, detail);
  dispatchNavigation(NAVIGATION_SUCCESS_EVENT, detail);

  const readyEvent = await pageReady;
  await new Promise((resolve) => window.requestAnimationFrame(resolve));
  assert.equal(readyEvent.detail.pageType, "unknown");
  assert.equal(document.getElementById("navigation-announcer").textContent, "Loaded Runtime edges");
});

test("replacement aborts when its main shell disconnects during module replay", async () => {
  const main = renderMain('<script type="module" data-pjax src="/plugins/pending.js"></script>');
  const detail = navigationDetail("disconnected");
  let pageReadyCount = 0;
  const onPageReady = () => {
    pageReadyCount += 1;
  };
  document.addEventListener(PAGE_READY_EVENT, onPageReady);

  dispatchNavigation(NAVIGATION_SUCCESS_EVENT, detail);
  const replayedScript = main.querySelector("script[type=module]");
  main.remove();
  replayedScript.dispatchEvent(new Event("load"));
  await flushMicrotasks();
  await flushMicrotasks();

  assert.equal(pageReadyCount, 0);
  document.removeEventListener(PAGE_READY_EVENT, onPageReady);
});

test("replacement aborts when a newer navigation wins during module replay", async () => {
  const main = renderMain('<script type="module" data-pjax src="/plugins/pending.js"></script>');
  const staleDetail = navigationDetail("stale-success");
  let pageReadyCount = 0;
  const onPageReady = () => {
    pageReadyCount += 1;
  };
  document.addEventListener(PAGE_READY_EVENT, onPageReady);

  dispatchNavigation(NAVIGATION_SUCCESS_EVENT, staleDetail);
  const replayedScript = main.querySelector("script[type=module]");
  dispatchNavigation(NAVIGATION_START_EVENT, navigationDetail("newer-success"));
  replayedScript.dispatchEvent(new Event("load"));
  await flushMicrotasks();
  await flushMicrotasks();

  assert.equal(pageReadyCount, 0);
  assert.equal(main.classList.contains("loading"), true);
  main.classList.remove("loading");
  main.removeAttribute("aria-busy");
  document.removeEventListener(PAGE_READY_EVENT, onPageReady);
});

test("a full-navigation race suppresses replacement failure recovery", async () => {
  renderMain('<script type="module" data-pjax src="https://external.example/plugin.js"></script>');
  const detail = navigationDetail("full-navigation-race");
  const statuses = [];
  const onStatus = (event) => statuses.push(event.detail);
  document.addEventListener(RUNTIME_STATUS_EVENT, onStatus);

  dispatchNavigation(NAVIGATION_SUCCESS_EVENT, detail);
  dispatchNavigation(NAVIGATION_FULL_RELOAD_EVENT, { targetUrl: detail.targetUrl });
  await flushMicrotasks();
  await flushMicrotasks();

  assert.equal(
    statuses.some((status) => status.message.includes("Page initialization failed")),
    false,
  );
  document.removeEventListener(RUNTIME_STATUS_EVENT, onStatus);
  resetFullNavigationState();
});

test("scroll history evicts its oldest entry and resolves encoded and malformed hashes", async () => {
  const main = renderMain(`
    <h2 name="named target">Named target</h2>
    <h2 id="%E0%A4%A">Malformed target</h2>
  `);
  let restoredTop;
  main.scrollTo = ({ top }) => {
    restoredTop = top;
  };

  for (let index = 0; index <= 100; index += 1) {
    main.scrollTop = index + 1;
    dispatchNavigation(NAVIGATION_START_EVENT, navigationDetail(`evict-${index}`, { fromEntryKey: `evict-${index}` }));
  }

  dispatchNavigation(
    NAVIGATION_SAME_DOCUMENT_EVENT,
    navigationDetail("evicted-history", { history: true, targetEntryKey: "evict-0" }),
  );
  await new Promise((resolve) => window.requestAnimationFrame(resolve));
  assert.equal(restoredTop, 0);

  window.history.replaceState({}, "", "/#named%20target");
  const namedTarget = document.getElementsByName("named target")[0];
  let namedScrolled = false;
  namedTarget.scrollIntoView = () => {
    namedScrolled = true;
  };
  dispatchNavigation(NAVIGATION_SAME_DOCUMENT_EVENT, navigationDetail("named-hash", { focus: true }));
  await new Promise((resolve) => window.requestAnimationFrame(resolve));
  assert.equal(namedScrolled, true);
  assert.equal(document.activeElement, namedTarget);

  window.history.replaceState({}, "", "/#%E0%A4%A");
  const malformedTarget = document.getElementById("%E0%A4%A");
  let malformedScrolled = false;
  malformedTarget.scrollIntoView = () => {
    malformedScrolled = true;
  };
  dispatchNavigation(NAVIGATION_SAME_DOCUMENT_EVENT, navigationDetail("malformed-hash"));
  await new Promise((resolve) => window.requestAnimationFrame(resolve));
  assert.equal(malformedScrolled, true);
});

test("focus helper ignores non-HTML targets when no main landmark exists", () => {
  document.getElementById("main")?.remove();
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  assert.doesNotThrow(() => focusNavigationContext(navigationDetail("svg", { focus: true }), svg));
});
