import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { collectAssetVersions } from "./runtime-assets.mjs";

const theme = "theme-sky-blog-2";

test("the theme version check accepts both legacy URLs and content revisions", () => {
  const prefix = `/themes/${theme}/assets/`;
  const html = `<link href="${prefix}main.css?v=1.2.13"><script src="${prefix}main.iife.js?v=1.2.13&amp;r=abc"></script>`;
  assert.deepEqual(collectAssetVersions(html, theme), ["1.2.13", "1.2.13"]);
});

test("the generated asset fragment uses the actual content revisions", async () => {
  const fragment = await readFile(new URL("../templates/modules/runtime-assets.html", import.meta.url), "utf8");
  for (const asset of ["main.css", "main.iife.js"]) {
    const bytes = await readFile(new URL(`../templates/assets/${asset}`, import.meta.url));
    const revision = createHash("sha256").update(bytes).digest("hex").slice(0, 12);
    assert.ok(fragment.includes(`/assets/${asset}(v=\${theme.spec.version},r='${revision}')`));
  }
});
