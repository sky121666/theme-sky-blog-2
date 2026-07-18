import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const environment = installDom(`<!doctype html><html><head></head><body>
  <div id="terminal" x-data="terminalInput('~/blog')">
    <input id="command-input" x-ref="cmdInput" type="text">
  </div>
</body></html>`);

window.haloData = {
  categories: [],
  categoriesLoaded: true,
  currentPosts: [],
  homePosts: [],
  pageType: "index",
  tags: [],
  tagsLoaded: true,
  urls: {
    archives: "/archives",
    categories: "/categories",
    home: "/",
    tags: "/tags",
  },
  user: "guest",
};

const Alpine = (await import("../src/common/alpine.ts")).default;
const { PAGE_READY_EVENT, RUNTIME_STATUS_EVENT } = await import("../src/common/runtime-events.ts");
const { registerTerminalInputComponent, shouldAutoFocusTerminal } = await import("../src/features/terminal-input.ts");

registerTerminalInputComponent();
Alpine.start();
await Promise.resolve();

const terminal = Alpine.$data(document.getElementById("terminal"));
const commandInput = document.getElementById("command-input");

test.after(async () => {
  Alpine.destroyTree(document.body);
  Alpine.stopObservingMutations();
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  environment.restore();
});

test("terminal history deduplicates adjacent commands and stays within bounds", async () => {
  terminal.command = "help";
  await terminal.executeCommand();
  terminal.command = "help";
  await terminal.executeCommand();
  terminal.command = "clear";
  await terminal.executeCommand();

  assert.deepEqual([...terminal.history], ["help", "clear"]);

  terminal.navigateHistory(-1);
  assert.equal(terminal.command, "clear");
  terminal.navigateHistory(-1);
  assert.equal(terminal.command, "help");
  terminal.navigateHistory(-1);
  assert.equal(terminal.command, "help");
  terminal.navigateHistory(1);
  assert.equal(terminal.command, "clear");
  terminal.navigateHistory(1);
  assert.equal(terminal.command, "");
});

test("terminal keyboard handling respects IME and applies Tab and Escape behavior", () => {
  terminal.history = [];
  terminal.historyIndex = -1;
  terminal.command = "help";
  const composingEnter = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    isComposing: true,
    key: "Enter",
  });
  terminal.handleKeydown(composingEnter);
  assert.equal(composingEnter.defaultPrevented, false);
  assert.equal(terminal.command, "help");
  assert.deepEqual([...terminal.history], []);

  terminal.command = "he";
  const tab = new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "Tab" });
  terminal.handleKeydown(tab);
  assert.equal(tab.defaultPrevented, true);
  assert.equal(terminal.command, "help");
  terminal.handleKeydown(new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "Tab" }));
  assert.equal(terminal.command, "help");

  commandInput.focus();
  terminal.output = "output";
  terminal.showHelp = true;
  const escape = new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "Escape" });
  terminal.handleKeydown(escape);
  assert.equal(escape.defaultPrevented, true);
  assert.equal(terminal.command, "");
  assert.equal(terminal.output, "");
  assert.equal(terminal.showHelp, false);
  assert.notEqual(document.activeElement, commandInput);
});

test("terminal result application and unexpected failures keep deterministic UI state", async () => {
  terminal.applyResult({ newPath: "~/blog/tags" });
  assert.equal(terminal.currentPath, "~/blog/tags");
  assert.equal(terminal.output, "");
  terminal.applyResult({ output: "result" });
  assert.equal(terminal.output, "result");
  terminal.applyResult({ showHelp: true });
  assert.equal(terminal.showHelp, true);

  window.haloData.pageType = "index";
  assert.match(terminal.helpText, /^List Page Commands:/);
  window.haloData.pageType = "post";
  assert.match(terminal.helpText, /^Post Page Commands:/);

  terminal.history = [];
  terminal.navigateHistory(-1);
  assert.deepEqual([...terminal.history], []);

  const main = document.createElement("main");
  main.id = "main";
  main.scrollTo = () => {
    throw new Error("scroll unavailable");
  };
  document.body.append(main);
  terminal.command = "top";
  await terminal.executeCommand();
  assert.equal(terminal.output, "Command failed unexpectedly. Please try again.");
  main.remove();

  terminal.command = "   ";
  await terminal.executeCommand();
  assert.equal(terminal.output, "Command failed unexpectedly. Please try again.");
});

test("a stale delayed command cannot overwrite the latest terminal result", async () => {
  terminal.command = "ls";
  const staleExecution = terminal.executeCommand();
  assert.equal(terminal.output, "Loading...");

  terminal.command = "help";
  await terminal.executeCommand();
  assert.equal(terminal.showHelp, true);
  assert.equal(terminal.output, "");

  await staleExecution;
  assert.equal(terminal.showHelp, true);
  assert.equal(terminal.output, "");
});

test("page-ready and runtime-status events update the terminal until destroy", () => {
  commandInput.focus();
  window.haloData = {
    ...window.haloData,
    currentPost: { permalink: "/posts/new-post", slug: "new-post", title: "New post" },
    pageType: "post",
  };
  document.dispatchEvent(new CustomEvent(PAGE_READY_EVENT, { detail: { pageType: "post" } }));
  assert.equal(terminal.currentPath, "~/blog/new-post");
  assert.notEqual(document.activeElement, commandInput);

  terminal.showHelp = true;
  document.dispatchEvent(
    new CustomEvent(RUNTIME_STATUS_EVENT, {
      detail: { level: "warning", message: "Cached data is still in use." },
    }),
  );
  assert.equal(terminal.showHelp, false);
  assert.equal(terminal.output, "[WARNING] Cached data is still in use.");

  terminal.destroy();
  const pathAfterDestroy = terminal.currentPath;
  const outputAfterDestroy = terminal.output;
  window.haloData = { ...window.haloData, pageType: "tags" };
  document.dispatchEvent(new CustomEvent(PAGE_READY_EVENT, { detail: { pageType: "tags" } }));
  document.dispatchEvent(
    new CustomEvent(RUNTIME_STATUS_EVENT, {
      detail: { level: "error", message: "This event must be ignored." },
    }),
  );

  assert.equal(terminal.currentPath, pathAfterDestroy);
  assert.equal(terminal.output, outputAfterDestroy);
  assert.equal(terminal.pageReadyHandler, null);
  assert.equal(terminal.runtimeStatusHandler, null);
});

test("terminal autofocus is limited to desktop list pages", () => {
  const originalMatchMedia = window.matchMedia;
  window.matchMedia = () => ({ matches: true });
  assert.equal(shouldAutoFocusTerminal("index"), true);
  assert.equal(shouldAutoFocusTerminal("post"), false);
  assert.equal(shouldAutoFocusTerminal("page"), false);

  window.matchMedia = () => ({ matches: false });
  assert.equal(shouldAutoFocusTerminal("index"), false);
  window.matchMedia = originalMatchMedia;
});
