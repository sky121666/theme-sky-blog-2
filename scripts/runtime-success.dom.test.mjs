import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const environment = installDom(`<!doctype html><html><head><title>Categories</title></head><body>
  <p id="navigation-announcer" role="status"></p>
  <main id="main" tabindex="-1">
    <script id="halo-page-data" type="application/json">
      {"categories":[],"currentPosts":[],"pageType":"categories","tags":[],"urls":{"archives":"/archives","categories":"/categories","home":"/","tags":"/tags"},"user":"guest"}
    </script>
  </main>
</body></html>`);
const Alpine = (await import("../src/common/alpine.ts")).default;
const { NAVIGATION_SAME_DOCUMENT_EVENT, NAVIGATION_START_EVENT } = await import("../src/common/navigation.ts");
const { bootstrapRuntime } = await import("../src/common/runtime.ts");

bootstrapRuntime();

test.after(async () => {
  Alpine.destroyTree(document.body);
  Alpine.stopObservingMutations();
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  environment.restore();
});

function navigationDetail(path) {
  return {
    focus: false,
    fromEntryKey: `from-${path}`,
    history: false,
    targetEntryKey: `to-${path}`,
    targetUrl: `https://blog.example.com/${path}`,
  };
}

test("same-document history navigation restores the remembered scroll position", async () => {
  const main = document.getElementById("main");
  let restored;
  Object.defineProperty(main, "scrollTop", { configurable: true, value: 345, writable: true });
  main.scrollTo = (options) => {
    restored = options;
  };
  const startDetail = navigationDetail("current");
  document.dispatchEvent(new CustomEvent(NAVIGATION_START_EVENT, { detail: startDetail }));

  const historyDetail = {
    ...navigationDetail("history"),
    history: true,
    targetEntryKey: startDetail.fromEntryKey,
  };
  document.dispatchEvent(new CustomEvent(NAVIGATION_SAME_DOCUMENT_EVENT, { detail: historyDetail }));
  await new Promise((resolve) => window.requestAnimationFrame(resolve));

  assert.deepEqual(restored, { behavior: "auto", top: 345 });
  assert.equal(main.classList.contains("loading"), false);
  assert.equal(main.hasAttribute("aria-busy"), false);
});
