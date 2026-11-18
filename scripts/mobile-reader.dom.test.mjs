import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const layout = readFileSync(new URL("../templates/modules/layout.html", import.meta.url), "utf8");
const environment = installDom(layout);
const main = document.getElementById("main");
main.replaceChildren();
document.querySelector("header").remove();
window.haloData = { pageType: "post", currentPost: { slug: "test" }, urls: { home: "/" } };
window.matchMedia = (query) => ({ matches: query === "(width < 48rem)" });
const viewport = new window.EventTarget();
viewport.height = 470;
viewport.scale = 1;
Object.defineProperty(window, "visualViewport", { configurable: true, value: viewport });

const Alpine = (await import("../src/common/alpine.ts")).default;
const { dispatchPageReady } = await import("../src/common/runtime-events.ts");
const { registerTerminalInputComponent } = await import("../src/features/terminal-input.ts");
registerTerminalInputComponent();
Alpine.start();
await Alpine.nextTick();

test.after(() => {
  Alpine.destroyTree(document.body);
  Alpine.stopObservingMutations();
  environment.restore();
});

test("reader tools disclose the persistent input and footer and Escape returns focus to their button", async () => {
  const toggle = document.querySelector("button[aria-controls='terminal-tools']");
  assert.ok(toggle, "reader needs a visible disclosure control");
  const tools = document.getElementById(toggle.getAttribute("aria-controls"));
  const input = document.getElementById("terminal-command-input");
  assert.ok(tools.contains(input));
  assert.ok(tools.querySelector("footer"));
  assert.equal(toggle.getAttribute("aria-expanded"), "false");
  toggle.click();
  await Alpine.nextTick();
  assert.equal(toggle.getAttribute("aria-expanded"), "true");

  input.focus();
  input.value = "中文";
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "Escape", isComposing: true }));
  await Alpine.nextTick();
  assert.equal(input.value, "中文");
  assert.equal(toggle.getAttribute("aria-expanded"), "true");
  input.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "Escape" }));
  await Alpine.nextTick();
  assert.equal(input.value, "");
  assert.equal(toggle.getAttribute("aria-expanded"), "false");
  assert.equal(document.activeElement, toggle);

  toggle.click();
  await Alpine.nextTick();
  window.haloData.pageType = "category";
  main.focus({ preventScroll: true });
  dispatchPageReady({ pageType: "category" });
  await Alpine.nextTick();
  assert.equal(document.activeElement, main);
  assert.equal(document.getElementById("terminal-command-input"), input);
  window.haloData.pageType = "post";
  dispatchPageReady({ pageType: "post" });
  await Alpine.nextTick();
  assert.equal(toggle.getAttribute("aria-expanded"), "false");
});

test("the focused mobile command line follows the visual viewport and releases its height on blur", async () => {
  const toggle = document.querySelector("button[aria-controls='terminal-tools']");
  toggle.click();
  await Alpine.nextTick();
  const input = document.getElementById("terminal-command-input");
  input.focus();
  viewport.dispatchEvent(new Event("resize"));
  assert.equal(document.body.style.getPropertyValue("--terminal-keyboard-height"), "470px");
  viewport.height = 425;
  viewport.dispatchEvent(new Event("resize"));
  assert.equal(document.body.style.getPropertyValue("--terminal-keyboard-height"), "425px");
  input.blur();
  assert.equal(document.body.style.getPropertyValue("--terminal-keyboard-height"), "");
});
