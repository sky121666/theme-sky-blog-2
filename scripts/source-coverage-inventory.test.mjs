import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

function collectTypeScriptFiles(directory, prefix = "src") {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const relativePath = `${prefix}/${entry.name}`;
    if (entry.isDirectory()) {
      return collectTypeScriptFiles(new URL(`../${relativePath}/`, import.meta.url), relativePath);
    }
    return entry.name.endsWith(".ts") ? [relativePath] : [];
  });
}

const sourceFiles = collectTypeScriptFiles(new URL("../src/", import.meta.url)).sort();
const staticallyVerifiedFiles = new Set(["src/common/types.ts", "src/main.ts", "src/vite-env.d.ts"]);
const runtimeModules = sourceFiles.filter((path) => !staticallyVerifiedFiles.has(path));
const environment = installDom("<!doctype html><html><head></head><body></body></html>");

test.after(() => environment.restore());

test("every executable TypeScript source module is loaded by the coverage suite", async () => {
  assert.ok(runtimeModules.length > 0);
  for (const path of runtimeModules) {
    await assert.doesNotReject(import(new URL(`../${path}`, import.meta.url)), path);
  }
});

test("browser entrypoint keeps every registered component connected to runtime bootstrap", () => {
  const main = readFileSync(new URL("../src/main.ts", import.meta.url), "utf8");
  for (const registration of [
    "registerAsciiTitleComponent",
    "registerFileListNavComponent",
    "registerPostViewerComponent",
    "registerTerminalInputComponent",
    "registerTypewriterComponent",
  ]) {
    assert.match(main, new RegExp(`import \\{ ${registration} \\}`), registration);
    assert.match(main, new RegExp(`${registration}\\(\\);`), registration);
  }
  assert.match(main, /import \{ bootstrapRuntime \} from "\.\/common\/runtime";/);
  assert.match(main, /bootstrapRuntime\(\);/);
});

test("source inventory explicitly classifies the non-runtime declaration and CSS entrypoint files", () => {
  assert.deepEqual(
    sourceFiles.filter((path) => staticallyVerifiedFiles.has(path)),
    ["src/common/types.ts", "src/main.ts", "src/vite-env.d.ts"],
  );
});
