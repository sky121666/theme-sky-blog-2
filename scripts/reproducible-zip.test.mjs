import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, utimesSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { rewriteZipDeterministically } from "./reproducible-zip.mjs";

function createFixtureArchive(rootDirectory, name, modifiedAt) {
  const sourceDirectory = join(rootDirectory, `source-${name}`);
  const templatesDirectory = join(sourceDirectory, "templates");
  const archivePath = join(rootDirectory, `${name}.zip`);
  mkdirSync(templatesDirectory, { recursive: true });
  writeFileSync(join(sourceDirectory, "theme.yaml"), "metadata:\n  name: deterministic\n");
  writeFileSync(join(templatesDirectory, "index.html"), "<!doctype html><title>deterministic</title>\n");

  for (const path of [
    sourceDirectory,
    templatesDirectory,
    join(sourceDirectory, "theme.yaml"),
    join(templatesDirectory, "index.html"),
  ]) {
    utimesSync(path, modifiedAt, modifiedAt);
  }

  execFileSync("zip", ["-q", archivePath, "theme.yaml", "templates/index.html"], {
    cwd: sourceDirectory,
    stdio: "pipe",
  });
  rewriteZipDeterministically(archivePath);
  return archivePath;
}

test("deterministic package rewrite removes source mtime differences", () => {
  const rootDirectory = mkdtempSync(join(tmpdir(), "theme-reproducible-zip-"));
  try {
    const firstArchive = createFixtureArchive(rootDirectory, "first", new Date("2024-01-02T03:04:05Z"));
    const secondArchive = createFixtureArchive(rootDirectory, "second", new Date("2026-07-17T12:34:56Z"));
    const digest = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");

    assert.equal(digest(firstArchive), digest(secondArchive));
    assert.deepEqual(execFileSync("unzip", ["-Z", "-1", firstArchive], { encoding: "utf8" }).trim().split(/\r?\n/), [
      "templates/index.html",
      "theme.yaml",
    ]);
  } finally {
    rmSync(rootDirectory, { force: true, recursive: true });
  }
});
