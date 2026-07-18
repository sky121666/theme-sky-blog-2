import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

import { assertReleaseState } from "./release-guard-core.mjs";
import { readThemeMetadata } from "./theme-metadata.mjs";

function readArgument(name) {
  const inlinePrefix = `${name}=`;
  const inline = process.argv.find((argument) => argument.startsWith(inlinePrefix));
  if (inline) {
    return inline.slice(inlinePrefix.length);
  }

  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : "";
}

function readEventReleaseTag() {
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (!eventPath || !existsSync(eventPath)) {
    return "";
  }

  const event = JSON.parse(readFileSync(eventPath, "utf8"));
  return event.release?.tag_name || "";
}

function git(...arguments_) {
  return execFileSync("git", arguments_, { encoding: "utf8" }).trim();
}

const { name: themeName, version: themeVersion } = readThemeMetadata();
const packageManifest = JSON.parse(readFileSync("package.json", "utf8"));
const releaseTag = readArgument("--tag") || readEventReleaseTag() || process.env.GITHUB_REF_NAME || "";
const expectedCommitish = readArgument("--expected-commit") || process.env.GITHUB_SHA || "";
const expectedCommit = expectedCommitish ? git("rev-parse", "--verify", `${expectedCommitish}^{commit}`) : "";
const expectedTag = `v${themeVersion}`;

const worktreeStatus = git("status", "--porcelain=v1", "--untracked-files=all");
if (worktreeStatus) {
  const changedEntries = worktreeStatus.split(/\r?\n/).filter(Boolean);
  throw new Error(
    `Release requires a clean tracked snapshot; found ${changedEntries.length} modified or untracked entries. Commit the intended theme sources before tagging.`,
  );
}

if (releaseTag !== expectedTag) {
  throw new Error(`Release tag ${releaseTag || "missing"} does not match theme version tag ${expectedTag}`);
}

const headCommit = git("rev-parse", "HEAD");
const tagCommit = git("rev-parse", "--verify", `refs/tags/${releaseTag}^{commit}`);

assertReleaseState({
  expectedCommit,
  headCommit,
  packageName: packageManifest.name,
  packageVersion: packageManifest.version,
  releaseTag,
  tagCommit,
  themeName,
  themeVersion,
});

console.log(`Release guard passed: ${releaseTag} -> ${headCommit}`);
