import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

for (const [scenario, initialState] of [
  ["an unkeyed entry", {}],
  ["a keyed entry awaiting swup initialization", { themePartialNavigationKey: "existing" }],
]) {
  test(`first startup failure with ${scenario} preserves native anchors and full command navigation`, async (t) => {
    const environment = installDom(
      '<html><head><title>Current</title></head><body><main id="main"><a href="/clicked">Open</a></main></body></html>',
    );
    t.after(async () => {
      await new Promise((resolve) => setImmediate(resolve));
      environment.restore();
    });
    environment.dom.virtualConsole.removeAllListeners("jsdomError");
    environment.dom.virtualConsole.on("jsdomError", (error) => {
      if (!error.message.includes("Not implemented: navigation to another Document")) throw error;
    });
    const { startPartialNavigation, navigateToUrl, NAVIGATION_FULL_RELOAD_EVENT } =
      await import("../src/common/navigation.ts");
    history.replaceState(initialState, "", "/visible");
    const historyWrite = t.mock.method(history, "replaceState", () => {
      throw new DOMException("Navigation history is unavailable", "SecurityError");
    });
    const requests = [];
    t.mock.method(globalThis, "fetch", async (url) => {
      requests.push(String(url));
      return new Response("unavailable", { status: 503 });
    });
    const fullLoads = [];
    document.addEventListener(NAVIGATION_FULL_RELOAD_EVENT, (event) => fullLoads.push(event.detail.targetUrl));

    await startPartialNavigation();
    await new Promise((resolve) => setImmediate(resolve));
    assert.ok(historyWrite.mock.callCount() >= 1);
    historyWrite.mock.restore();

    let nativeClick;
    window.addEventListener(
      "click",
      (event) => {
        nativeClick = !event.defaultPrevented;
        event.preventDefault(); // JSDOM cannot actually leave the document.
      },
      { once: true },
    );
    document.querySelector("a").click();
    assert.equal(nativeClick, true);
    assert.deepEqual(fullLoads, []);
    assert.equal(navigateToUrl("/from-command"), true);
    await new Promise((resolve) => setImmediate(resolve));
    assert.deepEqual(fullLoads, ["https://blog.example.com/from-command"]);
    assert.deepEqual(requests, []);
  });
}
