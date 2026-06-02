import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const THEME_YAML = "theme.yaml";
const LOCKFILE_ENTRY = "pnpm-lock.yaml";

function readThemePackageName() {
  const yaml = readFileSync(THEME_YAML, "utf8");
  const nameMatch = yaml.match(/metadata:\s*\n(?:[ \t]+[^\n]*\n)*?[ \t]+name:\s*["']?([^"'\n]+)["']?/);
  const versionMatch = yaml.match(/\nspec:\s*\n(?:[ \t]+[^\n]*\n)*?[ \t]+version:\s*["']?([^"'\n]+)["']?/);

  if (!nameMatch || !versionMatch) {
    throw new Error(`Unable to read metadata.name or spec.version from ${THEME_YAML}`);
  }

  return `${nameMatch[1].trim()}-${versionMatch[1].trim()}.zip`;
}

const packagePath = join("dist", readThemePackageName());

if (!existsSync(packagePath)) {
  throw new Error(`Theme package not found: ${packagePath}`);
}

try {
  execFileSync("zip", ["-q", "-d", packagePath, LOCKFILE_ENTRY], {
    stdio: "pipe",
  });
  console.log(`Removed ${LOCKFILE_ENTRY} from ${packagePath}`);
} catch (error) {
  if (error.status === 12) {
    console.log(`${LOCKFILE_ENTRY} is not present in ${packagePath}`);
  } else {
    throw error;
  }
}
