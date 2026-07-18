import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function readTemplate(name) {
  return readFileSync(new URL(`../templates/gateway_fragments/${name}`, import.meta.url), "utf8");
}

test("authentication templates provide stable fallback messages for unknown errors", () => {
  assert.match(readTemplate("login.html"), /Login failed\. Please try again\./);
  assert.match(readTemplate("signup.html"), /注册失败，请检查输入后重试/);
  assert.match(readTemplate("password_reset_email_send.html"), /无法发送重置链接，请稍后重试/);
  assert.match(readTemplate("password_reset_email_reset.html"), /密码重置失败，请检查输入后重试/);
});

test("field validation messages are associated with their inputs", () => {
  const signup = readTemplate("signup.html");
  for (const id of [
    "username-error",
    "display-name-error",
    "email-error",
    "email-code-error",
    "password-error",
    "confirm-password-error",
  ]) {
    assert.match(signup, new RegExp(`id="${id}"`));
    assert.match(signup, new RegExp(`aria-describedby=.*${id}`));
  }
  assert.match(signup, /aria-invalid=.*#fields\.hasErrors/);

  const send = readTemplate("password_reset_email_send.html");
  assert.match(send, /id="password-reset-email-error"/);
  assert.match(send, /aria-describedby=.*password-reset-email-error/);

  const reset = readTemplate("password_reset_email_reset.html");
  assert.match(reset, /id="reset-password-error"/);
  assert.match(reset, /id="reset-confirm-password-error"/);
  assert.match(reset, /aria-describedby=.*reset-password-error/);
  assert.match(reset, /aria-describedby=.*reset-confirm-password-error/);
});
