import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { once } from "node:events";
import {
  appendFileSync,
  createReadStream,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { basename, join } from "node:path";
import { text } from "node:stream/consumers";

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

async function runArchiveCommand(command, args, readOutput) {
  const child = spawn(command, args, { stdio: ["ignore", readOutput ? "pipe" : "inherit", "inherit"] });
  try {
    const [[code, signal], output] = await Promise.all([once(child, "close"), readOutput?.(child.stdout)]);
    if (code !== 0) {
      throw new Error(`${command} ${args.join(" ")} failed (${signal ?? `exit ${code}`})`);
    }
    return output;
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`Missing ${command} command. Install unzip or run this check in CI.`, { cause: error });
    }
    throw error;
  }
}

async function countBytes(stream) {
  let bytes = 0;
  for await (const chunk of stream) {
    bytes += chunk.byteLength;
  }
  return bytes;
}

const distPackageNames = readdirSync("dist", { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith(".zip"))
  .map((entry) => entry.name);
fail(validatePackageSelection({ allowHistorical, distPackageNames, expectedPackageName: packageFileName }));

await runArchiveCommand("unzip", ["-tqq", packagePath]);

const listing = await runArchiveCommand("zipinfo", ["-1", packagePath], text);
const entries = listing.split(/\r?\n/).filter(Boolean);
fail(validatePackageEntries(entries));

const packagedTheme = parseThemeMetadata(
  await runArchiveCommand("unzip", ["-p", packagePath, "theme.yaml"], text),
  `${packagePath}:theme.yaml`,
);
const assetSizes = {};
for (const asset of REQUIRED_PACKAGE_FILES.filter((entry) => entry.startsWith("templates/assets/"))) {
  assetSizes[asset] = await runArchiveCommand("unzip", ["-p", packagePath, asset], countBytes);
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

const packageHash = createHash("sha256");
for await (const chunk of createReadStream(packagePath)) {
  packageHash.update(chunk);
}
const packageSha256 = packageHash.digest("hex");
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
