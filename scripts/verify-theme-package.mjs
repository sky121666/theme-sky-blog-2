import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { PACKAGE_FORBIDDEN_PATTERNS } from "./package-rules.mjs";
import { readThemePackageName } from "./theme-metadata.mjs";

const packagePath = join("dist", readThemePackageName());

if (!existsSync(packagePath)) {
  throw new Error(`Theme package not found: ${packagePath}`);
}

function listPackageEntries(path) {
  try {
    return execFileSync("zipinfo", ["-1", path], {
      encoding: "utf8",
    }).split(/\r?\n/);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("Missing zipinfo command. Install unzip or run this check in CI.");
    }

    throw error;
  }
}

const entries = listPackageEntries(packagePath);

const forbiddenEntries = entries.filter((entry) => PACKAGE_FORBIDDEN_PATTERNS.some((pattern) => pattern.test(entry)));

if (forbiddenEntries.length > 0) {
  console.error(`Forbidden entries in ${packagePath}:`);
  for (const entry of forbiddenEntries) {
    console.error(`- ${entry}`);
  }
  process.exit(1);
}

console.log(`Theme package contents verified: ${packagePath}`);
