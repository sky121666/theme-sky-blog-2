import assert from "node:assert/strict";
import test from "node:test";

import { findStaleThemePackages } from "./dist-packages.mjs";

test("build cleanup removes only stale packages for the current theme", () => {
  const stalePackages = findStaleThemePackages({
    entries: [
      "theme-sky-blog-2-1.2.6.zip",
      "theme-sky-blog-2-1.2.7.zip",
      "theme-sky-blog-3-1.2.6.zip",
      "release-notes.zip",
      "theme-sky-blog-2-1.2.6.zip.sha256",
    ],
    expectedPackageName: "theme-sky-blog-2-1.2.7.zip",
    themeName: "theme-sky-blog-2",
  });

  assert.deepEqual(stalePackages, ["theme-sky-blog-2-1.2.6.zip"]);
});
