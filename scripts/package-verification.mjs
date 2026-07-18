import { readFileSync } from "node:fs";

import { PACKAGE_FORBIDDEN_PATTERNS } from "./package-rules.mjs";

const SHA256_PATTERN = /^[0-9a-f]{64}$/;
const RELEASE_PACKAGE_PATH_PATTERN = /^dist\/[A-Za-z0-9][A-Za-z0-9._+-]*\.zip$/;

export const REQUIRED_FIGLET_FONTS = JSON.parse(readFileSync(new URL("../figlet-fonts.json", import.meta.url), "utf8"));

export const ASSET_SIZE_BUDGETS = Object.freeze({
  "templates/assets/main.css": 80 * 1024,
  "templates/assets/main.iife.js": 128 * 1024,
});

export const PACKAGE_SIZE_BUDGETS = Object.freeze({
  compressedPackageBytes: 384 * 1024,
  figletFontBytes: 320 * 1024,
  themeIconBytes: 192 * 1024,
});

export const REQUIRED_PACKAGE_FILES = [
  "LICENSE",
  "settings.yaml",
  "theme.yaml",
  "templates/archives.html",
  "templates/assets/images/theme-icon.png",
  "templates/assets/main.css",
  "templates/assets/main.iife.js",
  "templates/author.html",
  "templates/categories.html",
  "templates/category.html",
  "templates/error/error.html",
  "templates/index.html",
  "templates/page.html",
  "templates/post.html",
  "templates/tag.html",
  "templates/tags.html",
  ...REQUIRED_FIGLET_FONTS.map((font) => `templates/assets/fonts/${font}.flf`),
];

function isAllowedRootEntry(entry) {
  if (["LICENSE", "README.md"].includes(entry)) {
    return true;
  }
  if (/^[^/]+\.ya?ml$/.test(entry)) {
    return true;
  }
  return entry === "templates/" || entry.startsWith("templates/") || entry === "i18n/" || entry.startsWith("i18n/");
}

export function validatePackageSelection({ allowHistorical = true, distPackageNames, expectedPackageName }) {
  const zipPackages = distPackageNames.filter((name) => name.endsWith(".zip"));
  if (!allowHistorical && (zipPackages.length !== 1 || zipPackages[0] !== expectedPackageName)) {
    return [
      `Expected ${expectedPackageName} to be the only release package, found ${zipPackages.join(", ") || "none"}`,
    ];
  }

  const matchingPackages = distPackageNames.filter((name) => name === expectedPackageName);
  if (matchingPackages.length !== 1) {
    return [`Expected exactly one ${expectedPackageName} package, found ${matchingPackages.length}`];
  }
  return [];
}

export function validatePackageEntries(entries) {
  const errors = [];
  const normalizedEntries = entries.filter(Boolean);
  const seen = new Set();

  for (const entry of normalizedEntries) {
    if (seen.has(entry)) {
      errors.push(`Duplicate package entry: ${entry}`);
    }
    seen.add(entry);

    const segments = entry.split("/");
    if (
      entry.startsWith("/") ||
      entry.includes("\\") ||
      segments.some((segment) => segment === "." || segment === "..")
    ) {
      errors.push(`Unsafe package entry path: ${entry}`);
      continue;
    }
    if (!isAllowedRootEntry(entry)) {
      errors.push(`Unexpected package root entry: ${entry}`);
    }
    if (PACKAGE_FORBIDDEN_PATTERNS.some((pattern) => pattern.test(entry))) {
      errors.push(`Forbidden package entry: ${entry}`);
    }
  }

  for (const requiredFile of REQUIRED_PACKAGE_FILES) {
    if (!seen.has(requiredFile)) {
      errors.push(`Missing required package file: ${requiredFile}`);
    }
  }

  if (!normalizedEntries.some((entry) => entry.startsWith("templates/") && entry.endsWith(".html"))) {
    errors.push("Package must contain at least one template HTML file");
  }

  return errors;
}

export function validatePackageMetadata({
  assetSizes,
  expectedName,
  expectedPackageName,
  expectedVersion,
  packageFileName,
  packageBytes,
  packageManifest,
  packagedTheme,
}) {
  const errors = [];

  if (packageFileName !== expectedPackageName) {
    errors.push(`Package filename ${packageFileName} does not match ${expectedPackageName}`);
  }
  if (packageManifest.name !== expectedName) {
    errors.push(`package.json name ${packageManifest.name || "missing"} does not match ${expectedName}`);
  }
  if (packageManifest.version !== expectedVersion) {
    errors.push(`package.json version ${packageManifest.version || "missing"} does not match ${expectedVersion}`);
  }
  if (packagedTheme.name !== expectedName) {
    errors.push(`Packaged theme name ${packagedTheme.name || "missing"} does not match ${expectedName}`);
  }
  if (packagedTheme.version !== expectedVersion) {
    errors.push(`Packaged theme version ${packagedTheme.version || "missing"} does not match ${expectedVersion}`);
  }

  for (const asset of REQUIRED_PACKAGE_FILES.filter((entry) => entry.startsWith("templates/assets/"))) {
    if (!Number.isFinite(assetSizes[asset]) || assetSizes[asset] <= 0) {
      errors.push(`Required package asset is empty: ${asset}`);
    }
  }

  for (const [asset, maximumBytes] of Object.entries(ASSET_SIZE_BUDGETS)) {
    if (Number.isFinite(assetSizes[asset]) && assetSizes[asset] > maximumBytes) {
      errors.push(`Asset size budget exceeded: ${asset} is ${assetSizes[asset]} bytes, maximum is ${maximumBytes}`);
    }
  }

  const figletFontBytes = REQUIRED_FIGLET_FONTS.map((font) => assetSizes[`templates/assets/fonts/${font}.flf`]);
  if (figletFontBytes.every(Number.isFinite)) {
    const total = figletFontBytes.reduce((sum, bytes) => sum + bytes, 0);
    if (total > PACKAGE_SIZE_BUDGETS.figletFontBytes) {
      errors.push(
        `Figlet font size budget exceeded: ${total} bytes, maximum is ${PACKAGE_SIZE_BUDGETS.figletFontBytes}`,
      );
    }
  }

  const themeIconBytes = assetSizes["templates/assets/images/theme-icon.png"];
  if (Number.isFinite(themeIconBytes) && themeIconBytes > PACKAGE_SIZE_BUDGETS.themeIconBytes) {
    errors.push(
      `Theme icon size budget exceeded: ${themeIconBytes} bytes, maximum is ${PACKAGE_SIZE_BUDGETS.themeIconBytes}`,
    );
  }

  if (!Number.isFinite(packageBytes) || packageBytes <= 0) {
    errors.push("Compressed theme package size is missing or invalid");
  } else if (packageBytes > PACKAGE_SIZE_BUDGETS.compressedPackageBytes) {
    errors.push(
      `Compressed package size budget exceeded: ${packageBytes} bytes, maximum is ${PACKAGE_SIZE_BUDGETS.compressedPackageBytes}`,
    );
  }

  return errors;
}

function validateIntegrityIdentity({ packagePath, sha256 }) {
  const errors = [];

  if (!SHA256_PATTERN.test(sha256 || "")) {
    errors.push(`Invalid package SHA-256: ${sha256 || "missing"}`);
  }
  if (!RELEASE_PACKAGE_PATH_PATTERN.test(packagePath || "")) {
    errors.push(`Unsafe release package path: ${packagePath || "missing"}`);
  }

  return errors;
}

export function createPackageIntegrityRecord({ packagePath, sha256 }) {
  const errors = validateIntegrityIdentity({ packagePath, sha256 });
  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }

  return `${sha256}  ${packagePath}\n`;
}

export function validatePackageIntegrityRecord({ expectedPackagePath, expectedSha256, integrityRecord }) {
  const errors = validateIntegrityIdentity({ packagePath: expectedPackagePath, sha256: expectedSha256 });
  const normalizedRecord = String(integrityRecord || "").replace(/\r\n/g, "\n");
  const lines = normalizedRecord.endsWith("\n")
    ? normalizedRecord.slice(0, -1).split("\n")
    : normalizedRecord.split("\n");

  if (lines.length !== 1) {
    errors.push(`Integrity manifest must contain exactly one record, found ${lines.length}`);
    return errors;
  }

  const match = lines[0].match(/^([0-9a-f]{64}) {2}(.+)$/);
  if (!match) {
    errors.push("Integrity manifest record must use lowercase SHA-256 and a safe relative package path");
    return errors;
  }

  const [, recordedSha256, recordedPackagePath] = match;
  errors.push(...validateIntegrityIdentity({ packagePath: recordedPackagePath, sha256: recordedSha256 }));
  if (recordedSha256 !== expectedSha256) {
    errors.push(`Integrity manifest SHA-256 ${recordedSha256} does not match ${expectedSha256}`);
  }
  if (recordedPackagePath !== expectedPackagePath) {
    errors.push(`Integrity manifest path ${recordedPackagePath} does not match ${expectedPackagePath}`);
  }

  return errors;
}
