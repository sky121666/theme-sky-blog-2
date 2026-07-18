import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { CRITICAL_COVERAGE_POLICY, parseCoverageReport, validateCoveragePolicy } from "./coverage-policy.mjs";

const ROOT_DIRECTORY = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TEST_DIRECTORY = join(ROOT_DIRECTORY, "scripts");
const testFiles = readdirSync(TEST_DIRECTORY)
  .filter((fileName) => fileName.endsWith(".test.mjs"))
  .sort()
  .map((fileName) => join("scripts", fileName));

const result = spawnSync(
  process.execPath,
  [
    "--experimental-test-coverage",
    "--test-coverage-include=src/**/*.ts",
    "--test-coverage-lines=95",
    "--test-coverage-branches=85",
    "--test-coverage-functions=95",
    "--import",
    "tsx",
    "--test",
    ...testFiles,
  ],
  {
    cwd: ROOT_DIRECTORY,
    encoding: "utf8",
    env: { ...process.env, FORCE_COLOR: "0", NO_COLOR: "1" },
    maxBuffer: 16 * 1024 * 1024,
  },
);

process.stdout.write(result.stdout ?? "");
process.stderr.write(result.stderr ?? "");

if (result.error) {
  console.error(`Unable to execute the coverage suite: ${result.error.message}`);
  process.exit(1);
}
if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

const rows = parseCoverageReport(`${result.stdout ?? ""}\n${result.stderr ?? ""}`);
const issues = validateCoveragePolicy(rows);
if (issues.length > 0) {
  console.error("Critical source coverage policy failed:");
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
}

const summary = Object.entries(CRITICAL_COVERAGE_POLICY)
  .map(([fileName]) => {
    const coverage = rows.get(fileName);
    return `${fileName}=${coverage.lines.toFixed(2)}/${coverage.branches.toFixed(2)}/${coverage.functions.toFixed(2)}`;
  })
  .join(", ");
console.log(`Critical source coverage policy passed (lines/branches/functions): ${summary}`);
