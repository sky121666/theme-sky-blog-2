import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  REQUIRED_FIGLET_FONTS,
  REQUIRED_PACKAGE_FILES,
  createPackageIntegrityRecord,
  validatePackageEntries,
  validatePackageIntegrityRecord,
  validatePackageMetadata,
  validatePackageSelection,
} from "./package-verification.mjs";

const fontEntries = REQUIRED_FIGLET_FONTS.map((font) => `templates/assets/fonts/${font}.flf`);
const logoEntry = "templates/assets/images/theme-icon.png";
const validAssetSizes = Object.fromEntries([...fontEntries, logoEntry].map((entry) => [entry, 100]));

const validEntries = ["README.md", "templates/", "templates/assets/", ...REQUIRED_PACKAGE_FILES];

test("accepts one complete root-level Halo theme package", () => {
  assert.deepEqual(
    validatePackageSelection({
      distPackageNames: ["theme-sky-blog-2-1.2.3.zip", "theme-sky-blog-2-1.2.2.zip"],
      expectedPackageName: "theme-sky-blog-2-1.2.3.zip",
    }),
    [],
  );
  assert.deepEqual(validatePackageEntries(validEntries), []);
  assert.deepEqual(
    validatePackageMetadata({
      assetSizes: {
        ...validAssetSizes,
        "templates/assets/main.css": 100,
        "templates/assets/main.iife.js": 200,
      },
      expectedName: "theme-sky-blog-2",
      expectedPackageName: "theme-sky-blog-2-1.2.3.zip",
      expectedVersion: "1.2.3",
      packageFileName: "theme-sky-blog-2-1.2.3.zip",
      packageBytes: 1000,
      packageManifest: { name: "theme-sky-blog-2", version: "1.2.3" },
      packagedTheme: { name: "theme-sky-blog-2", version: "1.2.3" },
    }),
    [],
  );
});

test("rejects missing, duplicate, forbidden, and wrapped package entries", () => {
  const errors = validatePackageEntries([
    "theme-sky-blog-2/theme.yaml",
    "theme.yaml",
    "theme.yaml",
    "package.json",
    "pnpm-workspace.yaml",
    "templates/index.html",
  ]);

  assert.ok(errors.some((error) => error.includes("Unexpected package root entry")));
  assert.ok(errors.some((error) => error.includes("Duplicate package entry: theme.yaml")));
  assert.ok(errors.some((error) => error.includes("Forbidden package entry: package.json")));
  assert.ok(errors.some((error) => error.includes("Forbidden package entry: pnpm-workspace.yaml")));
  assert.ok(errors.some((error) => error.includes("Missing required package file: LICENSE")));
  assert.ok(errors.some((error) => error.includes("templates/assets/main.css")));
});

test("rejects unsafe paths and metadata or asset mismatches", () => {
  assert.ok(
    validatePackageEntries([...validEntries, "templates/../package.json"]).some((error) => error.includes("Unsafe")),
  );

  const errors = validatePackageMetadata({
    assetSizes: {
      ...validAssetSizes,
      "templates/assets/main.css": 0,
      "templates/assets/main.iife.js": 200,
    },
    expectedName: "theme-sky-blog-2",
    expectedPackageName: "theme-sky-blog-2-1.2.3.zip",
    expectedVersion: "1.2.3",
    packageFileName: "wrong.zip",
    packageBytes: 1000,
    packageManifest: { name: "wrong", version: "1.2.2" },
    packagedTheme: { name: "wrong", version: "1.2.2" },
  });

  assert.ok(errors.some((error) => error.includes("Package filename")));
  assert.ok(errors.some((error) => error.includes("package.json version")));
  assert.ok(errors.some((error) => error.includes("Packaged theme version")));
  assert.ok(errors.some((error) => error.includes("asset is empty")));
});

test("reports measured asset and ZIP sizes and still rejects invalid measurements", (t) => {
  const report = t.mock.method(console, "info", () => {});
  const bytes = 2 ** 20;
  const metadata = {
    assetSizes: Object.fromEntries(
      REQUIRED_PACKAGE_FILES.filter((entry) => entry.startsWith("templates/assets/")).map((entry) => [entry, bytes]),
    ),
    expectedName: "theme-sky-blog-2",
    expectedPackageName: "theme-sky-blog-2-1.2.3.zip",
    expectedVersion: "1.2.3",
    packageFileName: "theme-sky-blog-2-1.2.3.zip",
    packageBytes: bytes * 2,
    packageManifest: { name: "theme-sky-blog-2", version: "1.2.3" },
    packagedTheme: { name: "theme-sky-blog-2", version: "1.2.3" },
  };
  assert.deepEqual(validatePackageMetadata(metadata), []);
  assert.deepEqual(report.mock.calls[0].arguments, [
    `Package bytes: css=${bytes}, js=${bytes}, icon=${bytes}, figlet=${bytes * fontEntries.length}, zip=${bytes * 2}`,
  ]);

  for (const value of [undefined, NaN, Infinity, -1, 0]) {
    assert.deepEqual(validatePackageMetadata({ ...metadata, packageBytes: value }), [
      "Compressed theme package size is missing or invalid",
    ]);
    for (const asset of Object.keys(metadata.assetSizes)) {
      assert.deepEqual(
        validatePackageMetadata({ ...metadata, assetSizes: { ...metadata.assetSizes, [asset]: value } }),
        [`Required package asset is empty: ${asset}`],
      );
    }
  }
});

test("strict package verification counts a 2 MiB CSS entry and rejects a bad CRC", (t) => {
  const root = mkdtempSync(join(tmpdir(), "theme-package-verification-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const name = "fixture-theme";
  const version = "1.0.0";
  const archiveName = `${name}-${version}.zip`;
  const archivePath = join(root, "dist", archiveName);
  mkdirSync(dirname(archivePath));
  writeFileSync(join(root, "package.json"), JSON.stringify({ name, version }));
  const yaml = `metadata:\n  name: ${name}\nspec:\n  version: ${version}\n`;
  const css = Buffer.alloc(2 * 1024 * 1024, 0x20);
  css.write("/* large fixture */");
  const fixtureContents = { "theme.yaml": yaml, "templates/assets/main.css": css };
  for (const entry of REQUIRED_PACKAGE_FILES) {
    const path = join(root, entry);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, fixtureContents[entry] ?? "sample");
  }
  // Store entries verbatim so the corruption below changes data without damaging the ZIP directory.
  execFileSync("zip", ["-0", "-q", archivePath, ...REQUIRED_PACKAGE_FILES], { cwd: root });
  const archive = readFileSync(archivePath);
  const expectedHash = createHash("sha256").update(archive).digest("hex");
  const verifier = fileURLToPath(new URL("./verify-theme-package.mjs", import.meta.url));
  const githubOutput = join(root, "github-output");
  const verify = (outputDirectory) =>
    spawnSync(process.execPath, [verifier, "--strict-dist", "--write-integrity", outputDirectory, "--github-output"], {
      cwd: root,
      encoding: "utf8",
      env: { ...process.env, GITHUB_OUTPUT: githubOutput },
    });

  const valid = verify("valid");
  assert.equal(valid.status, 0, valid.stderr);
  assert.match(valid.stdout, /Package bytes: css=2097152,/);
  assert.equal(readFileSync(join(root, "valid", "SHA256SUMS"), "utf8"), `${expectedHash}  dist/${archiveName}\n`);

  const expectedOutput = `package-name=${archiveName}\npackage-sha256=${expectedHash}\n`;
  assert.equal(readFileSync(githubOutput, "utf8"), expectedOutput);

  const payload = archive.indexOf(css);
  assert.notEqual(payload, -1, "expected the stored CSS payload in the fixture ZIP");
  archive[payload] ^= 1;
  writeFileSync(archivePath, archive);
  const corrupt = verify("corrupt");
  assert.equal(corrupt.status, 1);
  assert.match(corrupt.stdout + corrupt.stderr, /bad CRC/i);
  assert.equal(existsSync(join(root, "corrupt", "SHA256SUMS")), false);
  assert.equal(readFileSync(githubOutput, "utf8"), expectedOutput);
});

test("requires exactly one expected package selection", () => {
  assert.ok(
    validatePackageSelection({
      distPackageNames: ["theme-sky-blog-2-1.2.2.zip"],
      expectedPackageName: "theme-sky-blog-2-1.2.3.zip",
    })[0].includes("found 0"),
  );
  assert.ok(
    validatePackageSelection({
      distPackageNames: ["theme-sky-blog-2-1.2.3.zip", "theme-sky-blog-2-1.2.3.zip"],
      expectedPackageName: "theme-sky-blog-2-1.2.3.zip",
    })[0].includes("found 2"),
  );
  assert.ok(
    validatePackageSelection({
      allowHistorical: false,
      distPackageNames: ["theme-sky-blog-2-1.2.3.zip", "theme-sky-blog-2-1.2.2.zip"],
      expectedPackageName: "theme-sky-blog-2-1.2.3.zip",
    })[0].includes("only release package"),
  );
});

test("creates and validates one safe SHA-256 release integrity record", () => {
  const expectedPackagePath = "dist/theme-sky-blog-2-1.2.3.zip";
  const expectedSha256 = "a".repeat(64);
  const integrityRecord = createPackageIntegrityRecord({
    packagePath: expectedPackagePath,
    sha256: expectedSha256,
  });

  assert.equal(integrityRecord, `${expectedSha256}  ${expectedPackagePath}\n`);
  assert.deepEqual(validatePackageIntegrityRecord({ expectedPackagePath, expectedSha256, integrityRecord }), []);
});

test("rejects altered, multiple, or unsafe release integrity records", () => {
  const expectedPackagePath = "dist/theme-sky-blog-2-1.2.3.zip";
  const expectedSha256 = "a".repeat(64);
  const alteredSha256 = "b".repeat(64);
  const errors = validatePackageIntegrityRecord({
    expectedPackagePath,
    expectedSha256,
    integrityRecord: `${alteredSha256}  dist/other.zip\n`,
  });

  assert.ok(errors.some((error) => error.includes("does not match")));
  assert.ok(
    validatePackageIntegrityRecord({
      expectedPackagePath,
      expectedSha256,
      integrityRecord: `${expectedSha256}  ${expectedPackagePath}\n${expectedSha256}  dist/other.zip\n`,
    }).some((error) => error.includes("exactly one record")),
  );
  assert.throws(
    () => createPackageIntegrityRecord({ packagePath: "../theme.zip", sha256: expectedSha256 }),
    /Unsafe release package path/,
  );
});
