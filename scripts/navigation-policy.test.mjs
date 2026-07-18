import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";

import ts from "typescript";

const policyPath = fileURLToPath(new URL("../src/common/navigation-policy.ts", import.meta.url));
const policySource = await readFile(policyPath, "utf8");
const transpiledPolicy = ts.transpileModule(policySource, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
  fileName: policyPath,
}).outputText;
const policyModuleUrl = `data:text/javascript;base64,${Buffer.from(transpiledPolicy).toString("base64")}`;
const { isPartialNavigationCandidate, isSameDocumentUrl, resolveNavigationUrl, withoutHash } = await import(
  policyModuleUrl
);

const CURRENT_URL = new URL("https://blog.example.com/posts/hello?page=1#intro");

test("allows same-origin theme pages and compares documents without hashes", () => {
  const nextPost = new URL("https://blog.example.com/posts/next");
  assert.equal(isPartialNavigationCandidate(nextPost, CURRENT_URL), true);
  assert.equal(isSameDocumentUrl(CURRENT_URL, new URL("https://blog.example.com/posts/hello?page=1#details")), true);
  assert.equal(withoutHash(CURRENT_URL), "https://blog.example.com/posts/hello?page=1");
});

test("bypasses authentication, cross-origin, and protocol-changing destinations", () => {
  for (const path of ["/login", "/login/oauth2/code/halo", "/logout", "/password-reset/email", "/signup"]) {
    assert.equal(isPartialNavigationCandidate(new URL(path, CURRENT_URL), CURRENT_URL), false);
  }

  assert.equal(isPartialNavigationCandidate(new URL("https://other.example.com/posts/next"), CURRENT_URL), false);
  assert.equal(isPartialNavigationCandidate(new URL("http://blog.example.com/posts/next"), CURRENT_URL), false);
  assert.equal(isPartialNavigationCandidate(new URL("https://blog.example.com/login-help"), CURRENT_URL), true);
});

test("accepts safe full-navigation protocols and rejects executable URLs", () => {
  assert.equal(resolveNavigationUrl("/archives", CURRENT_URL)?.href, "https://blog.example.com/archives");
  assert.equal(resolveNavigationUrl("mailto:sky@example.com", CURRENT_URL)?.protocol, "mailto:");
  assert.equal(resolveNavigationUrl("tel:+10086", CURRENT_URL)?.protocol, "tel:");
  assert.equal(resolveNavigationUrl("javascript:alert(1)", CURRENT_URL), null);
  assert.equal(resolveNavigationUrl("data:text/html,unsafe", CURRENT_URL), null);
  assert.equal(resolveNavigationUrl("http://[invalid", CURRENT_URL), null);
});
