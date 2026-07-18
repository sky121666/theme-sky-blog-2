import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const environment = installDom(`<!doctype html><html><head></head><body>
  <span id="typed" x-data="typewriter('abc', 1)" x-text="display"></span>
</body></html>`);
const Alpine = (await import("../src/common/alpine.ts")).default;
const { registerTypewriterComponent } = await import("../src/features/typewriter.ts");

registerTypewriterComponent();
Alpine.start();

test.after(async () => {
  Alpine.destroyTree(document.body);
  Alpine.stopObservingMutations();
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  environment.restore();
});

test("typewriter reveals text and clears its interval after completion", async () => {
  await new Promise((resolve) => window.setTimeout(resolve, 25));
  assert.equal(document.getElementById("typed").textContent, "abc");
});

test("reduced-motion preference renders new typewriter content immediately", async () => {
  const originalMatchMedia = window.matchMedia;
  window.matchMedia = (query) => ({
    addEventListener() {},
    addListener() {},
    dispatchEvent: () => false,
    matches: query === "(prefers-reduced-motion: reduce)",
    media: query,
    onchange: null,
    removeEventListener() {},
    removeListener() {},
  });

  const node = document.createElement("span");
  node.id = "instant";
  node.setAttribute("x-data", "typewriter('instant', 1000)");
  node.setAttribute("x-text", "display");
  document.body.append(node);
  Alpine.initTree(node);
  await Promise.resolve();

  assert.equal(node.textContent, "instant");
  window.matchMedia = originalMatchMedia;
});

test("destroying a typewriter prevents further timer-driven DOM updates", async () => {
  const node = document.createElement("span");
  node.setAttribute("x-data", "typewriter('cancelled', 5)");
  node.setAttribute("x-text", "display");
  document.body.append(node);
  Alpine.initTree(node);
  await new Promise((resolve) => window.setTimeout(resolve, 8));
  Alpine.destroyTree(node);
  const textAtDestroy = node.textContent;
  await new Promise((resolve) => window.setTimeout(resolve, 60));
  assert.equal(node.textContent, textAtDestroy);
});
