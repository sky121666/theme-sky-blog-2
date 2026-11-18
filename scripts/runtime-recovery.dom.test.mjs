import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

function page(path, plugins = "") {
  return `<html><head><title>${path}</title></head><body>
    <main id="main" tabindex="-1">
      <script id="halo-page-data" type="application/json">{"pageType":"post"}</script>
      <button x-data="counter" @click="count++" x-text="count">server</button>
      <button data-terminal-action="search">Search</button>
      ${plugins}
    </main>
  </body></html>`;
}

const environment = installDom(page("source"));
environment.dom.virtualConsole.removeAllListeners("jsdomError");
environment.dom.virtualConsole.on("jsdomError", (error) => {
  if (!error.message.includes("Not implemented: navigation to another Document")) throw error;
});
const Alpine = (await import("../src/common/alpine.ts")).default;
const { bootstrapRuntime } = await import("../src/common/runtime.ts");
const { navigateToUrl, navigateWithFullReload, NAVIGATION_FULL_RELOAD_EVENT, NAVIGATION_FULL_RELOAD_RESET_EVENT } =
  await import("../src/common/navigation.ts");
const { PAGE_READY_EVENT, RUNTIME_STATUS_EVENT } = await import("../src/common/runtime-events.ts");

let mounts = 0;
Alpine.data("counter", () => ({
  count: 0,
  init() {
    mounts++;
  },
}));
bootstrapRuntime();

test.after(() => {
  window.dispatchEvent(new Event("pagehide"));
  Alpine.destroyTree(document.body);
  Alpine.stopObservingMutations();
  environment.restore();
});

for (const interruption of ["module error", "full navigation during replay"]) {
  test(`watchdog restores the visible controls exactly once after ${interruption}`, async (t) => {
    const path = interruption === "module error" ? "/failed-module" : "/interrupted-module";
    const plugins =
      '<script type="module" data-pjax src="/ready.js"></script><script type="module" data-pjax src="/slow.js"></script>';
    const loads = t.mock.method(globalThis, "fetch", async (url) => {
      const route = new URL(url).pathname;
      const response = new Response(page(route, route === path ? plugins : ""), {
        headers: { "content-type": "text/html" },
      });
      Object.defineProperty(response, "url", { value: url });
      return response;
    });
    let watchdog;
    const setTimer = window.setTimeout.bind(window);
    t.mock.method(window, "setTimeout", (callback, ms, ...args) => {
      if (ms === 10000) watchdog = callback;
      return setTimer(callback, ms, ...args);
    });
    const openSearch = t.mock.fn();
    window.SearchWidget = { open: openSearch };
    t.after(() => {
      delete window.SearchWidget;
    });
    const signal = new AbortController();
    t.after(() => signal.abort());
    const listen = { signal: signal.signal };
    const fullLoads = [],
      statuses = [],
      ready = [],
      compat = [];
    document.addEventListener(NAVIGATION_FULL_RELOAD_EVENT, (e) => fullLoads.push(e.detail.targetUrl), listen);
    document.addEventListener(RUNTIME_STATUS_EVENT, (e) => statuses.push(e.detail), listen);
    document.addEventListener(PAGE_READY_EVENT, () => ready.push(document.title), listen);
    window.addEventListener("pjax:complete", () => compat.push(document.title), listen);
    const initialMounts = mounts;
    navigateToUrl(path);
    await t.waitFor(() => assert.ok(document.querySelector('script[src*="/slow.js?_theme_navigation="]')));
    const replayed = [...document.querySelectorAll('script[type="module"]')];
    const pending = replayed[1];
    replayed[0].dispatchEvent(new Event("load"));
    if (interruption === "module error") pending.dispatchEvent(new Event("error"));
    else navigateWithFullReload("/leave");
    await t.waitFor(() => assert.equal(typeof watchdog, "function"));
    assert.equal(mounts, initialMounts);
    assert.deepEqual(ready, []);

    watchdog();
    await Alpine.nextTick();
    const counter = document.querySelector("[x-data=counter]");
    counter.click();
    document.querySelector("[data-terminal-action=search]").click();
    await Alpine.nextTick();
    assert.equal(counter.textContent, "1");
    assert.equal(openSearch.mock.callCount(), 1);
    assert.equal(mounts, initialMounts + 1);
    assert.deepEqual(ready, [path]);
    assert.equal(document.getElementById("main").hasAttribute("aria-busy"), false);
    assert.equal(statuses.at(-1).level, "error");
    assert.match(statuses.at(-1).message, /plugin/i);
    assert.deepEqual([...document.querySelectorAll('script[type="module"]')], replayed);

    document.dispatchEvent(
      new CustomEvent(NAVIGATION_FULL_RELOAD_RESET_EVENT, { detail: { targetUrl: location.href } }),
    );
    await new Promise((resolve) => window.requestAnimationFrame(resolve));
    assert.equal(mounts, initialMounts + 1);
    assert.deepEqual(ready, [path]);
    assert.deepEqual(compat, []);
    assert.equal(fullLoads.length, 1);

    navigateToUrl("/next");
    await t.waitFor(() => assert.equal(ready.at(-1), "/next"));
    // A slow replay from the previous page cannot hold this visit open or retry a full load.
    if (interruption !== "module error") pending.dispatchEvent(new Event("error"));
    await new Promise((resolve) => window.requestAnimationFrame(resolve));
    assert.deepEqual(ready, [path, "/next"]);
    assert.deepEqual(compat, ["/next"]);
    assert.equal(loads.mock.callCount(), 2);
    assert.equal(fullLoads.length, 1);
  });
}

for (const outcome of ["load", "error"]) {
  test(`an anchor chosen in the new document keeps its scroll and URL after a late module ${outcome}`, async (t) => {
    const path = "/reading-" + outcome;
    const content =
      '<a href="#chapter">Chapter</a><h2 id="chapter">Chapter</h2><script type="module" data-pjax src="/late.js"></script>';
    t.mock.method(globalThis, "fetch", async (url) => {
      const response = new Response(page(path, content), { headers: { "content-type": "text/html" } });
      Object.defineProperty(response, "url", { value: url });
      return response;
    });
    const listener = new AbortController();
    t.after(() => listener.abort());
    const options = { signal: listener.signal };
    const fullLoads = [],
      ready = [],
      statuses = [];
    document.addEventListener(NAVIGATION_FULL_RELOAD_EVENT, (e) => fullLoads.push(e.detail.targetUrl), options);
    document.addEventListener(PAGE_READY_EVENT, () => ready.push(location.hash), options);
    document.addEventListener(RUNTIME_STATUS_EVENT, (e) => statuses.push(e.detail), options);
    navigateToUrl(path);
    await t.waitFor(() => {
      assert.equal(document.title, path);
      assert.ok(document.querySelector('script[src*="/late.js?_theme_navigation="]'));
    });
    const main = document.getElementById("main");
    const chapter = document.getElementById("chapter");
    const jump = t.mock.method(chapter, "scrollIntoView", () => {
      main.scrollTop = 200;
    });
    main.querySelector("a").click();
    await new Promise((resolve) => window.requestAnimationFrame(resolve));
    assert.equal(location.hash, "#chapter");
    assert.equal(main.scrollTop, 200);
    main.scrollTop = 880;
    main.querySelector('script[type="module"]').dispatchEvent(new Event(outcome));
    await new Promise((resolve) => window.requestAnimationFrame(() => window.requestAnimationFrame(resolve)));
    assert.deepEqual(fullLoads, []);
    assert.deepEqual(ready, ["#chapter"]);
    assert.equal(jump.mock.callCount(), 1);
    assert.equal(main.scrollTop, 880);
    assert.equal(document.activeElement, chapter);
    const counter = main.querySelector("[x-data=counter]");
    counter.click();
    await Alpine.nextTick();
    assert.equal(counter.textContent, "1");
    if (outcome === "error") assert.match(statuses.at(-1).message, /plugin/i);
  });
}
