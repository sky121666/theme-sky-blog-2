import assert from "node:assert/strict";
import test from "node:test";

import { auditRelease } from "./audit-release.mjs";

const reviewedInputs = {
  themeVersion: "1.3.0",
  packageVersion: "1.3.0",
  lockSha256: "2c0d006120696177c4bcaa8f78a7975ddf5843e30f5de227c7a0687c09325482",
  bundleSha256: "cfd9ac56097cb978cbee3bb5b05e7ad03478f31a33642dd618fa2db7509a8e2f",
  executableEntries: ["templates/assets/main.iife.js"],
};
const picomatch = {
  github_advisory_id: "GHSA-fc5q-39xc-vjpf",
  module_name: "picomatch",
  severity: "high",
  vulnerable_versions: "<=4.0.7",
  patched_versions: null,
  findings: [
    { version: "2.3.2", dev: true },
    { version: "4.0.7", dev: true },
  ],
};
const unrelated = { github_advisory_id: "GHSA-xxxx-xxxx-xxxx", module_name: "example", severity: "moderate" };

function report(entries) {
  const vulnerabilities = { info: 0, low: 0, moderate: 0, high: 0, critical: 0 };
  for (const entry of entries) {
    vulnerabilities[entry.severity]++;
  }
  return {
    status: Number(vulnerabilities.moderate + vulnerabilities.high + vulnerabilities.critical > 0),
    stdout: JSON.stringify({
      advisories: Object.fromEntries(entries.map((entry, index) => [index, entry])),
      metadata: { vulnerabilities },
    }),
  };
}

function scenario({
  ref = "refs/tags/v1.3.0",
  inputs = reviewedInputs,
  full = report([picomatch]),
  production = report([]),
} = {}) {
  const commands = [];
  const messages = [];
  const run = () =>
    auditRelease({
      ref,
      readInputs: () => inputs,
      audit: (...options) => {
        commands.push(options);
        if (options.length === 0) {
          return { status: 1 };
        }
        return options.includes("--prod") ? production : full;
      },
      log: (message) => messages.push(message),
    });
  return { run, commands, messages };
}

test("the reviewed v1.3.0 advisory is accepted after the independent production audit", () => {
  const result = scenario({ full: report([picomatch, { ...unrelated, severity: "low" }]) });
  assert.equal(result.run(), 0);
  assert.deepEqual(result.commands, [["--json"], ["--prod", "--json"]]);
  assert.match(result.messages.at(-1), /Applying the v1\.3\.0 exception for GHSA-fc5q-39xc-vjpf/);
});

test("an already clean full audit needs no exception", () => {
  const result = scenario({ full: report([]) });
  assert.equal(result.run(), 0);
  assert.deepEqual(result.commands, [["--json"]]);
  assert.doesNotMatch(result.messages.join("\n"), /Applying.*exception/);
});

test("branches, other versions, and modified release inputs use the standard audit", () => {
  for (const ref of ["refs/heads/v1.3.0", "refs/tags/v1.3.0-rc", "refs/tags/v1.3.1"]) {
    const result = scenario({ ref, inputs: null });
    assert.equal(result.run(), 1, ref);
    assert.deepEqual(result.commands, [[]], ref);
  }
  for (const change of [
    { themeVersion: "1.3.1" },
    { packageVersion: "1.3.1" },
    { lockSha256: "changed" },
    { bundleSha256: "changed" },
    { executableEntries: [...reviewedInputs.executableEntries, "templates/assets/other.js"] },
  ]) {
    const result = scenario({ inputs: { ...reviewedInputs, ...change } });
    assert.equal(result.run(), 1, JSON.stringify(change));
    assert.deepEqual(result.commands, [[]]);
  }
});

test("other blocking advisories and changes to the reviewed advisory still block", () => {
  for (const advisories of [
    [unrelated],
    [picomatch, unrelated],
    [{ ...picomatch, patched_versions: ">=4.0.8" }],
    [{ ...picomatch, module_name: "different" }],
    [{ ...picomatch, severity: "critical" }],
    [{ ...picomatch, findings: [{ version: "4.0.7", dev: true }] }],
    [{ ...picomatch, findings: [{ ...picomatch.findings[0], dev: false }, picomatch.findings[1]] }],
  ]) {
    const result = scenario({ full: report(advisories) });
    assert.throws(result.run, /full dependency audit blocked/);
    assert.deepEqual(result.commands, [["--json"]]);
  }
});

test("production advisories are never accepted by the exception", () => {
  const result = scenario({ production: report([picomatch]) });
  assert.throws(result.run, /production dependency audit blocked/);
  assert.deepEqual(result.commands, [["--json"], ["--prod", "--json"]]);
});

test("registry errors, malformed reports, and inconsistent totals fail closed", () => {
  for (const full of [
    { status: 1, stdout: "registry unavailable" },
    { status: 1, stdout: '{"advisories":{},"metadata":{},"error":{"code":"registry-error"}}' },
    { ...report([picomatch]), status: 0 },
    {
      status: 1,
      stdout: JSON.stringify({
        advisories: { 0: picomatch },
        metadata: { vulnerabilities: { moderate: 0, high: 1, critical: 1 } },
      }),
    },
  ]) {
    assert.throws(scenario({ full }).run, /pnpm audit/);
  }
  assert.throws(scenario({ production: { status: 1, stdout: "registry unavailable" } }).run, /pnpm audit/);
});
