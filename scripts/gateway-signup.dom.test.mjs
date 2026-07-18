import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const template = await readFile(new URL("../templates/gateway_fragments/signup.html", import.meta.url), "utf8");
const scriptBlocks = [...template.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((match) => match[1]);
const verificationScript = scriptBlocks
  .find((script) => script.includes("throwRequestFailure"))
  ?.replace(/altchaEnabled\s*=\s*\[\[\$\{[^\n]+\]\];/, "altchaEnabled = false;");

assert.ok(verificationScript, "signup verification script should be extractable");

function createHarness(responseFactory) {
  const environment = installDom(`<!doctype html><html><body>
    <input id="email" value=" sky@example.com ">
    <button id="emailCodeSendButton"></button>
  </body></html>`);
  let sendRequest;
  window.Response = globalThis.Response;
  window.fetch = responseFactory;
  window.requestAltchaChallengeResult = async () => "";
  window.sendVerificationCode = (_button, callback) => {
    sendRequest = callback;
  };
  window.eval(verificationScript);
  assert.equal(typeof sendRequest, "function");
  return { environment, sendRequest };
}

test("registration email request rejects JSON error messages", async () => {
  const { environment, sendRequest } = createHarness(
    async () =>
      new Response(JSON.stringify({ message: "邮箱发送受限" }), {
        headers: { "content-type": "application/json" },
        status: 429,
      }),
  );
  await assert.rejects(sendRequest, /邮箱发送受限/);
  environment.restore();
});

test("registration email request rejects non-JSON HTTP failures with a stable message", async () => {
  const { environment, sendRequest } = createHarness(async () => new Response("busy", { status: 503 }));
  await assert.rejects(sendRequest, /HTTP 503/);
  environment.restore();
});

test("registration email request resolves only successful responses and trims the address", async () => {
  let requestBody = "";
  const { environment, sendRequest } = createHarness(async (_url, options) => {
    requestBody = options.body;
    return new Response(null, { status: 204 });
  });
  const response = await sendRequest();
  assert.equal(response.status, 204);
  assert.deepEqual(JSON.parse(requestBody), { email: "sky@example.com" });
  environment.restore();
});
