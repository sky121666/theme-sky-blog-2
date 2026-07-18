import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const environment = installDom(`<!doctype html><html><head></head><body>
  <button id="button">Action</button><div id="plain"></div>
</body></html>`);
const { isInteractiveEventTarget, shouldIgnoreGlobalKeyboardEvent } = await import("../src/common/keyboard.ts");
const { logError, logInfo, logWarn } = await import("../src/common/logger.ts");
const { PAGE_READY_EVENT, RUNTIME_STATUS_EVENT, dispatchPageReady, dispatchRuntimeStatus } =
  await import("../src/common/runtime-events.ts");

const originalConsole = { error: console.error, log: console.log, warn: console.warn };

test.after(() => {
  console.error = originalConsole.error;
  console.log = originalConsole.log;
  console.warn = originalConsole.warn;
  environment.restore();
});

test("theme logger is silent by default and emits prefixed diagnostics only in debug mode", () => {
  const calls = [];
  console.error = (...args) => calls.push(["error", ...args]);
  console.warn = (...args) => calls.push(["warn", ...args]);
  console.log = (...args) => calls.push(["info", ...args]);

  logError("hidden");
  logWarn("hidden");
  logInfo("hidden");
  assert.deepEqual(calls, []);

  document.documentElement.setAttribute("data-debug", "");
  logError("failure", 1);
  logWarn("warning", 2);
  logInfo("ready", 3);
  assert.deepEqual(calls, [
    ["error", "[Theme]", "failure", 1],
    ["warn", "[Theme]", "warning", 2],
    ["info", "[Theme]", "ready", 3],
  ]);
  document.documentElement.removeAttribute("data-debug");
});

test("runtime lifecycle events expose their typed details to document listeners", () => {
  let pageDetail;
  let statusDetail;
  document.addEventListener(PAGE_READY_EVENT, (event) => (pageDetail = event.detail), { once: true });
  document.addEventListener(RUNTIME_STATUS_EVENT, (event) => (statusDetail = event.detail), { once: true });

  dispatchPageReady({ pageType: "post" });
  dispatchRuntimeStatus({ level: "warning", message: "Retrying", targetUrl: "/post" });

  assert.deepEqual(pageDetail, { pageType: "post" });
  assert.deepEqual(statusDetail, { level: "warning", message: "Retrying", targetUrl: "/post" });
});

test("global shortcuts ignore interactive targets, modifiers, repeats, and composition", () => {
  const button = document.getElementById("button");
  const plain = document.getElementById("plain");
  let buttonInteractive;
  let buttonIgnored;
  let plainInteractive;
  let plainIgnored;
  button.addEventListener(
    "keydown",
    (event) => {
      buttonInteractive = isInteractiveEventTarget(event);
      buttonIgnored = shouldIgnoreGlobalKeyboardEvent(event);
    },
    { once: true },
  );
  plain.addEventListener(
    "keydown",
    (event) => {
      plainInteractive = isInteractiveEventTarget(event);
      plainIgnored = shouldIgnoreGlobalKeyboardEvent(event);
    },
    { once: true },
  );
  button.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "j" }));
  plain.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "j" }));

  assert.equal(buttonInteractive, true);
  assert.equal(plainInteractive, false);
  assert.equal(buttonIgnored, true);
  assert.equal(plainIgnored, false);
  assert.equal(shouldIgnoreGlobalKeyboardEvent(new KeyboardEvent("keydown", { ctrlKey: true, key: "j" })), true);
  assert.equal(shouldIgnoreGlobalKeyboardEvent(new KeyboardEvent("keydown", { key: "j", repeat: true })), true);
  assert.equal(shouldIgnoreGlobalKeyboardEvent(new KeyboardEvent("keydown", { isComposing: true, key: "j" })), true);
});
