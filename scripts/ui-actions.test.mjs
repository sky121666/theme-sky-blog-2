import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const environment = installDom(`<!doctype html><html><head></head><body>
  <button id="search" data-terminal-action="search">Search</button>
  <search-modal id="modal" tabindex="-1"></search-modal>
</body></html>`);
const { initUiActions } = await import("../src/common/ui-actions.ts");

const trigger = document.getElementById("search");
const modal = document.getElementById("modal");
const shadow = modal.attachShadow({ mode: "open" });
shadow.innerHTML = '<div class="modal__wrapper" style="display: none"></div>';
const wrapper = shadow.querySelector(".modal__wrapper");

test.after(() => environment.restore());

test("search integration restores keyboard focus after the modal closes", async () => {
  window.SearchWidget = {
    open() {
      wrapper.style.display = "flex";
      modal.focus();
    },
  };
  initUiActions();

  trigger.focus();
  trigger.click();
  assert.equal(document.activeElement, modal);
  assert.equal(wrapper.style.display, "flex");

  wrapper.style.display = "none";
  window.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true, key: "Escape" }));
  await new Promise((resolve) => window.requestAnimationFrame(resolve));
  assert.equal(document.activeElement, trigger);
});

test("opening search again replaces the previous focus-restoration listener", async () => {
  let opens = 0;
  window.SearchWidget = {
    open() {
      opens += 1;
      wrapper.style.display = "flex";
      modal.focus();
    },
  };
  initUiActions();

  trigger.focus();
  trigger.click();
  trigger.focus();
  trigger.click();
  assert.equal(opens, 2);

  wrapper.style.display = "none";
  window.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  await new Promise((resolve) => window.requestAnimationFrame(resolve));
  assert.equal(document.activeElement, trigger);
});
