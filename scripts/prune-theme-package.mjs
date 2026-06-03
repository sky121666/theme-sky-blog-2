import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { PACKAGE_EXCLUDE_ENTRIES } from "./package-rules.mjs";
import { readThemePackageName } from "./theme-metadata.mjs";

const packagePath = join("dist", readThemePackageName());

if (!existsSync(packagePath)) {
  throw new Error(`Theme package not found: ${packagePath}`);
}

for (const entry of PACKAGE_EXCLUDE_ENTRIES) {
  try {
    execFileSync("zip", ["-q", "-d", packagePath, entry], {
      stdio: "pipe",
    });
    console.log(`Removed ${entry} from ${packagePath}`);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("Missing zip command. Install zip before running pnpm build.");
    }

    if (error.status !== 12) {
      throw error;
    }
  }
}
