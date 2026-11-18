import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

import { readThemeMetadata, readThemePackageName } from "./theme-metadata.mjs";

const releaseVersion = "1.3.0";
const releaseRef = `refs/tags/v${releaseVersion}`;
const advisoryId = "GHSA-fc5q-39xc-vjpf";
const browserBundle = "templates/assets/main.iife.js";
const reviewedLock = "2c0d006120696177c4bcaa8f78a7975ddf5843e30f5de227c7a0687c09325482";
const reviewedBundle = "cfd9ac56097cb978cbee3bb5b05e7ad03478f31a33642dd618fa2db7509a8e2f";
const reviewedVersions = ["2.3.2", "4.0.7"];
const blockingSeverities = ["moderate", "high", "critical"];
const auditSeverities = ["info", "low", ...blockingSeverities];

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function readReleaseInputs() {
  const packagePath = `dist/${readThemePackageName()}`;
  const entries = execFileSync("zipinfo", ["-1", packagePath], { encoding: "utf8" });
  return {
    themeVersion: readThemeMetadata().version,
    packageVersion: JSON.parse(readFileSync("package.json", "utf8")).version,
    lockSha256: sha256(readFileSync("pnpm-lock.yaml")),
    bundleSha256: sha256(execFileSync("unzip", ["-p", packagePath, browserBundle])),
    executableEntries: entries.split(/\r?\n/).filter((entry) => /\.(?:js|mjs|cjs|wasm|jar|class)$/i.test(entry)),
  };
}

function matchesReviewedInputs({ themeVersion, packageVersion, lockSha256, bundleSha256, executableEntries }) {
  return (
    themeVersion === releaseVersion &&
    packageVersion === releaseVersion &&
    lockSha256 === reviewedLock &&
    bundleSha256 === reviewedBundle &&
    executableEntries.length === 1 &&
    executableEntries[0] === browserBundle
  );
}

function runPnpmAudit(...options) {
  const result = spawnSync("pnpm", ["audit", "--audit-level", "moderate", ...options], {
    encoding: "utf8",
    stdio: ["ignore", options.includes("--json") ? "pipe" : "inherit", "inherit"],
  });
  if (result.error) {
    throw result.error;
  }
  if (result.signal) {
    throw new Error(`pnpm audit was interrupted by ${result.signal}`);
  }
  return result;
}

function readBlockingAdvisories({ status, stdout }) {
  let report;
  try {
    report = JSON.parse(stdout);
  } catch {
    throw new Error("pnpm audit did not return a JSON report.");
  }
  const { advisories, metadata } = report ?? {};
  if (
    !advisories ||
    typeof advisories !== "object" ||
    Array.isArray(advisories) ||
    Object.keys(report).some((key) => key !== "advisories" && key !== "metadata")
  ) {
    throw new Error("pnpm audit returned an unexpected report.");
  }

  const entries = Object.values(advisories);
  const blockers = entries.filter((entry) => blockingSeverities.includes(entry?.severity));
  const matchesSummary = blockingSeverities.every(
    (severity) =>
      metadata?.vulnerabilities?.[severity] === blockers.filter((entry) => entry.severity === severity).length,
  );
  if (
    !matchesSummary ||
    entries.some((entry) => !auditSeverities.includes(entry?.severity)) ||
    status !== Number(blockers.length > 0)
  ) {
    throw new Error("pnpm audit exit status and advisory counts do not agree.");
  }
  return blockers;
}

function matchesReviewedAdvisory({
  github_advisory_id,
  module_name,
  severity,
  vulnerable_versions,
  patched_versions,
  findings,
}) {
  return (
    github_advisory_id === advisoryId &&
    module_name === "picomatch" &&
    severity === "high" &&
    vulnerable_versions === "<=4.0.7" &&
    patched_versions === null &&
    Array.isArray(findings) &&
    findings.length === reviewedVersions.length &&
    reviewedVersions.every((version) =>
      findings.some((finding) => finding?.version === version && finding.dev === true),
    )
  );
}

function describeAdvisories(advisories) {
  return advisories
    .map(({ github_advisory_id, module_name, severity }) =>
      JSON.stringify({ github_advisory_id, module_name, severity }),
    )
    .join("\n");
}

export function auditRelease({
  ref = process.env.GITHUB_REF,
  readInputs = readReleaseInputs,
  audit = runPnpmAudit,
  log = console.log,
} = {}) {
  if (ref !== releaseRef) {
    return audit().status;
  }
  if (!matchesReviewedInputs(readInputs())) {
    log(
      "The v1.3.0 audit exception requires the reviewed lockfile and packaged browser bundle. Running the full audit.",
    );
    return audit().status;
  }

  const blockers = readBlockingAdvisories(audit("--json"));
  if (blockers.length === 0) {
    log("The full dependency audit passed.");
    return 0;
  }
  if (blockers.length !== 1 || !matchesReviewedAdvisory(blockers[0])) {
    throw new Error(`The full dependency audit blocked this release:\n${describeAdvisories(blockers)}`);
  }

  const productionBlockers = readBlockingAdvisories(audit("--prod", "--json"));
  if (productionBlockers.length > 0) {
    throw new Error(`The production dependency audit blocked this release:\n${describeAdvisories(productionBlockers)}`);
  }

  log(
    `Production dependencies passed the audit. Applying the v1.3.0 exception for ${advisoryId} on development-only picomatch 2.3.2 and 4.0.7.`,
  );
  return 0;
}

if (import.meta.main) {
  try {
    process.exitCode = auditRelease();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
