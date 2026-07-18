import assert from "node:assert/strict";
import test from "node:test";

import {
  ASSET_SIZE_BUDGETS,
  PACKAGE_SIZE_BUDGETS,
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
    "templates/index.html",
  ]);

  assert.ok(errors.some((error) => error.includes("Unexpected package root entry")));
  assert.ok(errors.some((error) => error.includes("Duplicate package entry: theme.yaml")));
  assert.ok(errors.some((error) => error.includes("Forbidden package entry: package.json")));
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

test("rejects production CSS and JavaScript that exceed their raw size budgets", () => {
  const errors = validatePackageMetadata({
    assetSizes: {
      ...validAssetSizes,
      "templates/assets/main.css": ASSET_SIZE_BUDGETS["templates/assets/main.css"] + 1,
      "templates/assets/main.iife.js": ASSET_SIZE_BUDGETS["templates/assets/main.iife.js"] + 1,
    },
    expectedName: "theme-sky-blog-2",
    expectedPackageName: "theme-sky-blog-2-1.2.3.zip",
    expectedVersion: "1.2.3",
    packageFileName: "theme-sky-blog-2-1.2.3.zip",
    packageBytes: 1000,
    packageManifest: { name: "theme-sky-blog-2", version: "1.2.3" },
    packagedTheme: { name: "theme-sky-blog-2", version: "1.2.3" },
  });

  assert.ok(errors.some((error) => error.includes("templates/assets/main.css")));
  assert.ok(errors.some((error) => error.includes("templates/assets/main.iife.js")));
  assert.equal(errors.filter((error) => error.includes("Asset size budget exceeded")).length, 2);
});

test("locks production asset and package budget policy values", () => {
  assert.deepEqual(ASSET_SIZE_BUDGETS, {
    "templates/assets/main.css": 80 * 1024,
    "templates/assets/main.iife.js": 128 * 1024,
  });
  assert.deepEqual(PACKAGE_SIZE_BUDGETS, {
    compressedPackageBytes: 384 * 1024,
    figletFontBytes: 320 * 1024,
    themeIconBytes: 192 * 1024,
  });
});

test("rejects oversized icon, aggregate fonts, and compressed package", () => {
  const oversizedFonts = Object.fromEntries(fontEntries.map((entry) => [entry, 30 * 1024]));
  const errors = validatePackageMetadata({
    assetSizes: {
      ...oversizedFonts,
      [logoEntry]: PACKAGE_SIZE_BUDGETS.themeIconBytes + 1,
      "templates/assets/main.css": 100,
      "templates/assets/main.iife.js": 200,
    },
    expectedName: "theme-sky-blog-2",
    expectedPackageName: "theme-sky-blog-2-1.2.3.zip",
    expectedVersion: "1.2.3",
    packageFileName: "theme-sky-blog-2-1.2.3.zip",
    packageBytes: PACKAGE_SIZE_BUDGETS.compressedPackageBytes + 1,
    packageManifest: { name: "theme-sky-blog-2", version: "1.2.3" },
    packagedTheme: { name: "theme-sky-blog-2", version: "1.2.3" },
  });

  assert.ok(errors.some((error) => error.includes("Figlet font size budget exceeded")));
  assert.ok(errors.some((error) => error.includes("Theme icon size budget exceeded")));
  assert.ok(errors.some((error) => error.includes("Compressed package size budget exceeded")));
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
