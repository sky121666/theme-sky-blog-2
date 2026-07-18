import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const environment = installDom("<!doctype html><html><head></head><body></body></html>");
const { initTaskListInteraction } = await import("../src/common/task-list.ts");

test.after(() => environment.restore());

test("native task checkbox remains the only semantic and keyboard control", () => {
  document.body.innerHTML = `
    <ul data-type="taskList">
      <li id="task" data-type="taskItem" data-checked="false">
        <label role="checkbox" aria-checked="false" aria-disabled="false" aria-label="Old label" tabindex="0">
          <input id="checkbox" type="checkbox" checked>
          Native task
        </label>
      </li>
    </ul>
  `;

  const item = document.getElementById("task");
  const label = item.querySelector("label");
  const checkbox = document.getElementById("checkbox");
  let changeBindings = 0;
  const originalAddEventListener = checkbox.addEventListener.bind(checkbox);
  checkbox.addEventListener = (type, listener, options) => {
    if (type === "change") {
      changeBindings += 1;
    }
    originalAddEventListener(type, listener, options);
  };

  initTaskListInteraction();
  initTaskListInteraction();

  assert.equal(changeBindings, 1);
  assert.equal(checkbox.dataset.boundTaskList, "true");
  assert.equal(item.dataset.checked, "true");
  for (const attribute of ["role", "aria-checked", "aria-disabled", "aria-label", "tabindex"]) {
    assert.equal(label.hasAttribute(attribute), false);
  }

  checkbox.checked = false;
  checkbox.dispatchEvent(new Event("change", { bubbles: true }));
  assert.equal(item.dataset.checked, "false");
});

test("fallback task label toggles once by click Space and Enter after repeated initialization", () => {
  document.body.innerHTML = `
    <ul data-type="taskList">
      <li id="task" data-type="taskItem" data-checked="false">
        <label id="fallback-label">Fallback task</label>
      </li>
    </ul>
  `;

  const item = document.getElementById("task");
  const label = document.getElementById("fallback-label");
  initTaskListInteraction();
  initTaskListInteraction();

  assert.equal(label.dataset.boundTaskList, "true");
  assert.equal(label.getAttribute("role"), "checkbox");
  assert.equal(label.getAttribute("aria-checked"), "false");
  assert.equal(label.getAttribute("aria-label"), "Fallback task");
  assert.equal(label.tabIndex, 0);

  const click = new MouseEvent("click", { bubbles: true, cancelable: true });
  label.dispatchEvent(click);
  assert.equal(click.defaultPrevented, true);
  assert.equal(item.dataset.checked, "true");
  assert.equal(label.getAttribute("aria-checked"), "true");

  const space = new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: " " });
  label.dispatchEvent(space);
  assert.equal(space.defaultPrevented, true);
  assert.equal(item.dataset.checked, "false");

  const enter = new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "Enter" });
  label.dispatchEvent(enter);
  assert.equal(enter.defaultPrevented, true);
  assert.equal(item.dataset.checked, "true");

  const arrow = new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "ArrowDown" });
  label.dispatchEvent(arrow);
  assert.equal(arrow.defaultPrevented, false);
  assert.equal(item.dataset.checked, "true");
});

test("blank fallback labels receive a stable accessible name and missing labels are ignored", () => {
  document.body.innerHTML = `
    <ul data-type="taskList">
      <li id="blank-task" data-type="taskItem"><label>   </label></li>
      <li id="missing-label" data-type="taskItem"></li>
    </ul>
  `;

  initTaskListInteraction();

  assert.equal(document.querySelector("#blank-task label").getAttribute("aria-label"), "Toggle task");
  assert.equal(document.getElementById("missing-label").hasAttribute("data-checked"), false);
});
