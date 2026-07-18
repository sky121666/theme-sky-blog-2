import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const environment = installDom(`<!doctype html><html><head><title>Home</title></head><body>
  <p id="navigation-announcer" role="status"></p>
  <main id="main" tabindex="-1">
    <script id="halo-page-data" type="application/json">
      {"categories":[],"currentPosts":[],"pageType":"index","tags":[],"urls":{"archives":"/archives","categories":"/categories","home":"/","tags":"/tags"},"user":"guest"}
    </script>
  </main>
</body></html>`);
environment.dom.virtualConsole.removeAllListeners("jsdomError");
environment.dom.virtualConsole.on("jsdomError", (error) => {
  if (!error.message.includes("Not implemented: navigation to another Document")) {
    throw error;
  }
});

const Alpine = (await import("../src/common/alpine.ts")).default;
const { NAVIGATION_ERROR_EVENT, NAVIGATION_FULL_RELOAD_EVENT, NAVIGATION_START_EVENT, NAVIGATION_SUCCESS_EVENT } =
  await import("../src/common/navigation.ts");
const { PAGE_READY_EVENT, RUNTIME_STATUS_EVENT } = await import("../src/common/runtime-events.ts");
const { bootstrapRuntime } = await import("../src/common/runtime.ts");

bootstrapRuntime();

test.after(async () => {
  window.dispatchEvent(new Event("pagehide"));
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

function resetFullNavigationState() {
  window.dispatchEvent(new Event("pagehide"));
  const pageShow = new Event("pageshow");
  Object.defineProperty(pageShow, "persisted", { value: true });
  window.dispatchEvent(pageShow);
}

test("partial navigation errors clear busy state before requesting one full reload", async () => {
  const detail = navigationDetail("failed-request");
  const main = document.getElementById("main");
  let fullReloads = 0;
  const fullReload = new Promise((resolve) => {
    document.addEventListener(
      NAVIGATION_FULL_RELOAD_EVENT,
      (event) => {
        fullReloads += 1;
        resolve(event.detail);
      },
      { once: true },
    );
  });

  document.dispatchEvent(new CustomEvent(NAVIGATION_START_EVENT, { detail }));
  assert.equal(main.classList.contains("loading"), true);
  assert.equal(main.getAttribute("aria-busy"), "true");

  document.dispatchEvent(
    new CustomEvent(NAVIGATION_ERROR_EVENT, {
      detail: { ...detail, error: new Error("request failed") },
    }),
  );
  assert.equal(main.classList.contains("loading"), false);
  assert.equal(main.hasAttribute("aria-busy"), false);

  const reloadDetail = await fullReload;
  assert.equal(reloadDetail.targetUrl, detail.targetUrl);
  assert.equal(fullReloads, 1);

  resetFullNavigationState();
  assert.equal(main.classList.contains("loading"), false);
  assert.equal(main.hasAttribute("aria-busy"), false);
});

test("failed module replay requests one full reload without declaring the page ready", async () => {
  const detail = navigationDetail("invalid-plugin-module");
  document.body.innerHTML = `
    <p id="navigation-announcer" role="status"></p>
    <main id="main" class="loading" aria-busy="true" tabindex="-1">
      <script id="halo-page-data" type="application/json">
        {"categories":null,"currentPost":{"permalink":"/invalid-plugin-module","slug":"invalid-plugin-module","title":"Invalid module"},"currentPosts":[],"pageType":"post","tags":null,"urls":{"archives":"/archives","categories":"/categories","home":"/","tags":"/tags"},"user":"guest"}
      </script>
      <script type="module" data-pjax src="https://external.example/widget.js"></script>
    </main>
  `;

  let pageReadyCount = 0;
  let fullReloads = 0;
  const statuses = [];
  const onPageReady = () => {
    pageReadyCount += 1;
  };
  const onStatus = (event) => statuses.push(event.detail);
  document.addEventListener(PAGE_READY_EVENT, onPageReady);
  document.addEventListener(RUNTIME_STATUS_EVENT, onStatus);
  const fullReload = new Promise((resolve) => {
    document.addEventListener(
      NAVIGATION_FULL_RELOAD_EVENT,
      (event) => {
        fullReloads += 1;
        resolve(event.detail);
      },
      { once: true },
    );
  });

  document.dispatchEvent(new CustomEvent(NAVIGATION_START_EVENT, { detail }));
  document.dispatchEvent(new CustomEvent(NAVIGATION_SUCCESS_EVENT, { detail }));

  const reloadDetail = await fullReload;
  assert.equal(reloadDetail.targetUrl, detail.targetUrl);
  assert.equal(fullReloads, 1);
  assert.equal(pageReadyCount, 0);
  assert.equal(
    statuses.some(
      (status) =>
        status.level === "error" && status.message === "Page initialization failed. Retrying with a full page load...",
    ),
    true,
  );

  resetFullNavigationState();
  const main = document.getElementById("main");
  assert.equal(main.classList.contains("loading"), false);
  assert.equal(main.hasAttribute("aria-busy"), false);

  document.removeEventListener(PAGE_READY_EVENT, onPageReady);
  document.removeEventListener(RUNTIME_STATUS_EVENT, onStatus);
});
