import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const [fontManifest, settings, source, viteConfig, packageVerification] = await Promise.all([
  readFile(new URL("figlet-fonts.json", root), "utf8").then(JSON.parse),
  readFile(new URL("settings.yaml", root), "utf8"),
  readFile(new URL("src/common/figlet-fonts.ts", root), "utf8"),
  readFile(new URL("vite.config.ts", root), "utf8"),
  readFile(new URL("scripts/package-verification.mjs", root), "utf8"),
]);

test("one font manifest drives runtime loading, Vite copying, and package verification", () => {
  assert.equal(new Set(fontManifest).size, fontManifest.length);
  assert.ok(fontManifest.includes("Standard"));
  assert.match(source, /import figletFonts from "\.\.\/\.\.\/figlet-fonts\.json"/);
  assert.match(viteConfig, /new URL\("\.\/figlet-fonts\.json"/);
  assert.match(packageVerification, /new URL\("\.\.\/figlet-fonts\.json"/);
});

test("theme setting font options stay aligned with the canonical manifest", () => {
  const fontSetting = settings.match(/id: ascii_font[\s\S]*?(?=\n {4}- group:)/)?.[0] ?? "";
  const values = [...fontSetting.matchAll(/^\s+value:\s+([A-Za-z0-9_-]+)\s*$/gm)].map((match) => match[1]);
  assert.equal(values[0], "Standard");
  assert.deepEqual([...new Set(values.slice(1))].sort(), [...fontManifest].sort());
});
