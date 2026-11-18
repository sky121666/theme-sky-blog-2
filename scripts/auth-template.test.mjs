import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function readTemplate(name) {
  return readFileSync(new URL(`../templates/gateway_fragments/${name}`, import.meta.url), "utf8");
}

test("authentication templates provide stable fallback messages for unknown errors", () => {
  assert.match(readTemplate("login.html"), /Login failed\. Please try again\./);
  assert.match(readTemplate("terminal_signup.html"), /注册失败，请检查输入后重试/);
  assert.match(readTemplate("password_reset_email_send.html"), /无法发送重置链接，请稍后重试/);
  assert.match(readTemplate("password_reset_email_reset.html"), /密码重置失败，请检查输入后重试/);
});

test("login uses Halo's feedback after a password reset or OAuth account-link redirect", () => {
  const login = readTemplate("login.html");
  assert.match(login, /param\.password_reset\.size\(\) > 0[^>]*>[\s\S]*?th:text="#\{form\.messages\.passwordReset\}"/);
  assert.match(login, /param\.oauth2_bind\.size\(\) > 0[^>]*>[\s\S]*?th:text="#\{form\.messages\.oauth2Bind\}"/);
});

test("field validation messages are associated with their inputs", () => {
  const signup = readTemplate("terminal_signup.html");
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

test("Passkey 2 login context retains its host form and provider selectors", () => {
  const login = readTemplate("login.html");
  assert.match(login, /<form[\s\S]*?id="login-form"/);
  assert.match(login, /id="remember-me"[\s\S]*?name="remember-me"/);
  assert.match(login, /<ul class="pill-items terminal-provider-list">/);
  assert.match(login, /<a th:href="@\{\/login\(method=\$\{provider\.metadata\.name\}\)\}"/);
  assert.match(login, /#strings\.startsWith\(fragmentTemplateName, 'plugin:'\)/);
  assert.doesNotMatch(login, /<script[^>]+login-context\.js/);
});

test("Passkey 2.0.0 uses its delegated link instead of the broken direct submit", () => {
  const login = readTemplate("login.html");
  assert.match(
    login,
    /authProvider\.metadata\.name == 'passkey' and pluginFinder\.available\('auth-passkey', '2\.0\.0'\)/,
  );
  assert.match(
    login,
    /class="pill-items mt-8" th:if="\$\{delegatedPasskey\}"[\s\S]*?<a\b[\s\S]*?\/login\(method=\$\{authProvider\.metadata\.name\}\)/,
  );
  assert.match(login, /th:unless="\$\{delegatedPasskey\}"[\s\S]*?<button\s+type="submit"/);
});

test("registration preserves the core consent field and defers advanced Pro forms to Halo", () => {
  const signup = readTemplate("terminal_signup.html");
  assert.match(signup, /th:if="\$\{agreementPages != null and !#lists\.isEmpty\(agreementPages\)\}"/);
  assert.match(signup, /type="checkbox"\s+id="agreedToTerms"\s+name="agreedToTerms"\s+value="true"[^>]+required/);
  assert.match(signup, /th:errors="\*\{agreedToTerms\}"/);
  const root = readFileSync(new URL("../templates/signup.html", import.meta.url), "utf8");
  assert.match(root, /nativeSignup \? 'gateway_fragments\/signup' : 'gateway_fragments\/terminal_signup'/);
  assert.match(root, /globalInfo\.mustVerifyPhoneOnRegistration/);
  assert.match(root, /globalInfo\.restrictRegistrationDomain and globalInfo\.mustVerifyEmailOnRegistration/);
});

test("authentication layout accepts the three arguments supplied by Halo fallback pages", () => {
  const signature = readTemplate("layout.html").match(/th:fragment="layout\s*\(([^)]+)\)"/)?.[1];
  assert.ok(signature, "authentication layout must expose the Halo layout fragment");
  assert.deepEqual(
    signature.split(",").map((argument) => argument.trim()),
    ["title", "head", "body"],
  );
});

test("theme authentication pages keep their page type outside the shared layout arguments", () => {
  for (const [file, pageType] of [
    ["login.html", "login"],
    ["signup.html", "signup"],
    ["logout.html", "logout"],
    ["password-reset/email/send.html", "reset"],
    ["password-reset/email/reset.html", "reset"],
  ]) {
    const template = readFileSync(new URL(`../templates/${file}`, import.meta.url), "utf8");
    const layoutCall = template.match(/th:replace="(~\{gateway_fragments\/layout[^"]+)"/)?.[1];
    assert.ok(layoutCall, `${file} must continue using the shared authentication layout`);
    assert.doesNotMatch(layoutCall, /pageType\s*=/, `${file} must accept Halo's three-argument contract`);
    assert.match(template, new RegExp(`th:with="authPageType='${pageType}'"`));
  }
});

test("login form fragment routing preserves Halo built-in and plugin template names", () => {
  const expression = readTemplate("login.html").match(/__\$\{(.+?)\}__::form/)?.[1];
  assert.ok(expression, "login must delegate the selected provider's form fragment");
  // Only the strings helper differs from JavaScript in this template's conditional expression.
  // This checks routing values, not Thymeleaf rendering.
  const resolve = new Function(
    "fragmentTemplateName",
    "startsWith",
    `return (${expression.replaceAll("#strings.startsWith", "startsWith")});`,
  );
  for (const [name, expected] of [
    ["login_local", "gateway_fragments/login_local"],
    ["login_email-code", "login_email-code"],
    ["login_future-provider", "login_future-provider"],
    ["plugin:PluginPasskey:login_passkey", "plugin:PluginPasskey:login_passkey"],
  ]) {
    assert.equal(
      resolve(name, (value, prefix) => value.startsWith(prefix)),
      expected,
    );
  }
});

test("Halo authentication assets are versioned with the running core version", () => {
  const common = readTemplate("common.html");
  for (const asset of ["/js/main.js", "/images/wordmark.svg"]) {
    const assetTag = common.split("\n").find((line) => line.includes(asset));
    assert.ok(assetTag, `${asset} must remain available`);
    assert.match(assetTag, /\?v=.*site\.version/, `${asset} must invalidate stale resources after a Halo upgrade`);
  }
});

test("Halo Pro loads the combined ALTCHA module when the provider is enabled", () => {
  const common = readTemplate("common.html");
  const altcha = common.match(
    /th:if="\$\{#strings\.equalsIgnoreCase\(globalInfo\.captchaProvider, 'ALTCHA'\)\}"[\s\S]*?<\/th:block>/,
  )?.[0];
  assert.ok(altcha, "ALTCHA assets must be conditional on the configured provider");
  assert.match(
    altcha,
    /<script[^>]*src="[^"]*\/webjars\/altcha\/dist\/main\/altcha\.i18n\.min\.js[^"]*"[^>]*type="module"/,
  );
  assert.match(altcha, /\/js\/altcha-utils\.js\?v=.*site\.version/);
  assert.doesNotMatch(common, /\/dist\/altcha\.i18n\.js|\/js\/altcha-lib\.iife\.js/);
  for (const name of [
    "login.html",
    "terminal_signup.html",
    "password_reset_email_send.html",
    "password_reset_email_reset.html",
  ]) {
    assert.match(readTemplate(name), /<div halo:captcha\b/, name);
  }
});
