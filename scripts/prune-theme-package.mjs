import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, unlinkSync } from "node:fs";
import { join } from "node:path";

import { findStaleThemePackages } from "./dist-packages.mjs";
import { PACKAGE_EXCLUDE_ENTRIES } from "./package-rules.mjs";
import { rewriteZipDeterministically } from "./reproducible-zip.mjs";
import { readThemeMetadata, readThemePackageName } from "./theme-metadata.mjs";

const packageFileName = readThemePackageName();
const packagePath = join("dist", packageFileName);

if (!existsSync(packagePath)) {
  throw new Error(`Theme package not found: ${packagePath}`);
}

const { name: themeName } = readThemeMetadata();
const distEntries = readdirSync("dist", { withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name);

for (const stalePackage of findStaleThemePackages({
  entries: distEntries,
  expectedPackageName: packageFileName,
  themeName,
})) {
  unlinkSync(join("dist", stalePackage));
  console.log(`Removed stale theme package dist/${stalePackage}`);
}

for (const entry of PACKAGE_EXCLUDE_ENTRIES) {
  try {
    execFileSync("zip", ["-q", "-d", packagePath, entry], {
      stdio: "pipe",
    });
    console.log(`Removed ${entry} from ${packagePath}`);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("Missing zip command. Install zip before running pnpm build.", { cause: error });
    }

    if (error.status !== 12) {
      throw error;
    }
  }
}

rewriteZipDeterministically(packagePath);
console.log(`Normalized ${packagePath} for reproducible release builds`);
