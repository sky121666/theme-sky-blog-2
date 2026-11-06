import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const common = readFileSync(new URL("../templates/gateway_fragments/common.html", import.meta.url), "utf8");
const socialFragment = common.slice(
  common.indexOf('<div th:remove="tag" th:fragment="socialAuthProviders">'),
  common.indexOf('<div th:remove="tag" th:fragment="passwordResetMethods">'),
);
const socialScript = socialFragment.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(socialScript, "social login must expose its remember-me synchronization script");

function createHarness(checked = false, includeCheckbox = true) {
  const checkbox = includeCheckbox ? `<input type="checkbox" id="remember-me" ${checked ? "checked" : ""}>` : "";
  const environment = installDom(`<!doctype html><html><body>${checkbox}${socialFragment}</body></html>`);
  const form = document.querySelector(".social-auth-provider-form");
  form.action = "/login/social/github";
  window.eval(socialScript);
  return { environment, form };
}

test("social login submits a restored checked remember-me state without a change event", () => {
  const { environment, form } = createHarness(true);
  try {
    form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
    assert.equal(new window.FormData(form).get("remember-me"), "true");
    assert.equal(new URL(form.action).pathname, "/login/social/github");
    assert.equal(new URL(form.action).search, "");
  } finally {
    environment.restore();
  }
});

test("social login reads the latest unchecked state when submitting", () => {
  const { environment, form } = createHarness(false);
  try {
    const checkbox = document.getElementById("remember-me");
    checkbox.checked = true;
    checkbox.dispatchEvent(new window.Event("change", { bubbles: true }));
    checkbox.checked = false;
    form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
    assert.equal(new window.FormData(form).get("remember-me"), "false");
  } finally {
    environment.restore();
  }
});

test("social login without a remember-me checkbox keeps the existing false form field", () => {
  const { environment, form } = createHarness(false, false);
  try {
    form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
    assert.equal(new window.FormData(form).get("remember-me"), "false");
  } finally {
    environment.restore();
  }
});
