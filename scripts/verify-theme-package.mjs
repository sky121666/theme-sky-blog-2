import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { appendFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

import {
  REQUIRED_PACKAGE_FILES,
  createPackageIntegrityRecord,
  validatePackageEntries,
  validatePackageMetadata,
  validatePackageSelection,
} from "./package-verification.mjs";
import { parseThemeMetadata, readThemeMetadata, readThemePackageName } from "./theme-metadata.mjs";

const packagePath = join("dist", readThemePackageName());
const packageFileName = basename(packagePath);
const expectedTheme = readThemeMetadata();
const packageManifest = JSON.parse(readFileSync("package.json", "utf8"));
const allowHistorical = !process.argv.includes("--strict-dist");

function readArgument(name) {
  const inlinePrefix = `${name}=`;
  const inline = process.argv.find((argument) => argument.startsWith(inlinePrefix));
  if (inline) {
    return inline.slice(inlinePrefix.length);
  }

  const index = process.argv.indexOf(name);
  const value = index >= 0 ? process.argv[index + 1] || "" : "";
  return value.startsWith("--") ? "" : value;
}

const integrityDirectory = readArgument("--write-integrity");
const shouldWriteIntegrity = process.argv.some(
  (argument) => argument === "--write-integrity" || argument.startsWith("--write-integrity="),
);
const shouldWriteGitHubOutput = process.argv.includes("--github-output");

if (shouldWriteIntegrity && !integrityDirectory) {
  throw new Error("--write-integrity requires a target directory");
}

if (!existsSync(packagePath)) {
  throw new Error(`Theme package not found: ${packagePath}`);
}

function fail(errors) {
  if (errors.length === 0) {
    return;
  }

  console.error(`Theme package verification failed for ${packagePath}:`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

function runArchiveCommand(command, arguments_, options = {}) {
  try {
    return execFileSync(command, arguments_, options);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`Missing ${command} command. Install unzip or run this check in CI.`, { cause: error });
    }
    throw error;
  }
}

function listPackageEntries(path) {
  return runArchiveCommand("zipinfo", ["-1", path], { encoding: "utf8" }).split(/\r?\n/).filter(Boolean);
}

function readPackageEntry(path, entry) {
  return runArchiveCommand("unzip", ["-p", path, entry]);
}

const distPackageNames = readdirSync("dist", { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith(".zip"))
  .map((entry) => entry.name);
fail(validatePackageSelection({ allowHistorical, distPackageNames, expectedPackageName: packageFileName }));

runArchiveCommand("unzip", ["-tqq", packagePath], { stdio: "pipe" });

const entries = listPackageEntries(packagePath);
fail(validatePackageEntries(entries));

const packagedTheme = parseThemeMetadata(
  readPackageEntry(packagePath, "theme.yaml").toString("utf8"),
  `${packagePath}:theme.yaml`,
);
const assetSizes = {};
for (const asset of REQUIRED_PACKAGE_FILES.filter((entry) => entry.startsWith("templates/assets/"))) {
  assetSizes[asset] = readPackageEntry(packagePath, asset).byteLength;
}

fail(
  validatePackageMetadata({
    assetSizes,
    expectedName: expectedTheme.name,
    expectedPackageName: readThemePackageName(),
    expectedVersion: expectedTheme.version,
    packageFileName,
    packageBytes: statSync(packagePath).size,
    packageManifest,
    packagedTheme,
  }),
);

const packageSha256 = createHash("sha256").update(readFileSync(packagePath)).digest("hex");
const integrityRecord = createPackageIntegrityRecord({
  packagePath: `dist/${packageFileName}`,
  sha256: packageSha256,
});

if (shouldWriteIntegrity) {
  mkdirSync(integrityDirectory, { recursive: true });
  writeFileSync(join(integrityDirectory, "SHA256SUMS"), integrityRecord, "utf8");
}

if (shouldWriteGitHubOutput) {
  const githubOutput = process.env.GITHUB_OUTPUT;
  if (!githubOutput) {
    throw new Error("--github-output requires the GITHUB_OUTPUT environment variable");
  }
  appendFileSync(githubOutput, `package-name=${packageFileName}\npackage-sha256=${packageSha256}\n`, "utf8");
}

console.log(`Theme package contents verified: ${packagePath} (sha256: ${packageSha256})`);
