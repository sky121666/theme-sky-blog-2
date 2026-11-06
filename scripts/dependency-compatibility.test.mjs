import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { ESLint } from "eslint";

const root = fileURLToPath(new URL("..", import.meta.url));
const require = createRequire(import.meta.url);

test("the packager's glob consumer preserves file filters and negative patterns", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "theme-package-glob-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const files = [
    "templates/index.html",
    "templates/pages/关于 页面.html",
    "templates/assets/main.css",
    "templates/assets/main.js.map",
    "templates/.fixture.env",
    "README.md",
  ];
  for (const file of files) {
    await mkdir(dirname(join(directory, file)), { recursive: true });
    await writeFile(join(directory, file), "fixture");
  }

  const packageRequire = createRequire(require.resolve("@halo-dev/theme-package-cli/package.json"));
  const archiverRequire = createRequire(packageRequire.resolve("archiver"));
  const utils = archiverRequire("archiver-utils");
  const matched = utils.file.expand({ cwd: directory, dot: true, filter: "isFile" }, [
    "templates/**/*",
    "templates/index.html",
    "!**/*.map",
    "!**/.fixture.env",
  ]);

  assert.deepEqual(matched.sort(), [
    "templates/assets/main.css",
    "templates/index.html",
    "templates/pages/关于 页面.html",
  ]);
});

test("lint still includes theme sources and excludes generated assets after matcher updates", async () => {
  const eslint = new ESLint({ cwd: root, cache: false, fix: false });
  for (const path of ["src/common/navigation.ts", "src/common/search-preview.ts", "scripts/check-release.mjs"]) {
    assert.equal(await eslint.isPathIgnored(path), false, `${path} must remain linted`);
    const config = await eslint.calculateConfigForFile(path);
    assert.ok(config?.rules?.["@typescript-eslint/no-unused-vars"], `${path} must retain the configured rules`);
  }
  for (const path of ["templates/assets/main.iife.js", "dist/generated.js", "node_modules/fixture/index.js"]) {
    assert.equal(await eslint.isPathIgnored(path), true, `${path} must remain excluded`);
  }
});
