import assert from "node:assert/strict";
import test from "node:test";

import { validateReleaseState } from "./release-guard-core.mjs";
import { parseThemeMetadata } from "./theme-metadata.mjs";
import {
  PINNED_ACTIONS,
  collectActionReferences,
  isPinnedActionReference,
  jobActionHasInput,
  jobHasKeyValue,
  jobHasLine,
  jobHasLinesInOrder,
  jobHasPermission,
  jobHasRun,
  jobRunCount,
  jobUses,
  parseWorkflowJobs,
  workflowActionsArePinned,
  workflowHasActiveKey,
  workflowHasTopLevelKeyValue,
  validateFormKitSchema,
  yamlScalarAtPath,
} from "./workflow-rules.mjs";

const validRelease = {
  expectedCommit: "abc123",
  headCommit: "abc123",
  packageName: "theme-sky-blog-2",
  packageVersion: "1.2.3",
  releaseTag: "v1.2.3",
  tagCommit: "abc123",
  themeName: "theme-sky-blog-2",
  themeVersion: "1.2.3",
};

test("accepts a release whose tag, commit, package, and theme agree", () => {
  assert.deepEqual(validateReleaseState(validRelease), []);
});

test("rejects release tag, package, and commit mismatches", () => {
  const errors = validateReleaseState({
    ...validRelease,
    expectedCommit: "event456",
    packageName: "wrong-theme",
    packageVersion: "1.2.2",
    releaseTag: "v1.2.4",
    tagCommit: "def456",
  });

  assert.ok(errors.some((error) => error.includes("Package name")));
  assert.ok(errors.some((error) => error.includes("Package version")));
  assert.ok(errors.some((error) => error.includes("Release tag")));
  assert.ok(errors.some((error) => error.includes("does not match tag commit")));
  assert.ok(errors.some((error) => error.includes("does not match workflow event commit")));
});

test("parses theme name and version from their anchored YAML sections", () => {
  const theme = parseThemeMetadata(`
metadata:
  name: "example-theme"
  annotations:
    name: ignored-nested-name
spec:
  version: "9.8.7" # release version
`);

  assert.deepEqual(theme, { name: "example-theme", version: "9.8.7" });
  assert.throws(() => parseThemeMetadata("metadata:\n  name: incomplete"), /spec\.version/);
});

test("workflow parser ignores commented guard text and scopes checks to jobs", () => {
  const workflow = `
# pnpm-version: 10
permissions: {}
jobs:
  build_and_verify:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      # - run: pnpm build
      # - uses: actions/checkout@v4
      - uses: ${PINNED_ACTIONS.checkout}
        with:
          persist-credentials: false
      - run: pnpm check
  github-release:
    needs: build_and_verify
    permissions:
      contents: write
    steps:
      - uses: ${PINNED_ACTIONS.downloadArtifact}
`;
  const jobs = parseWorkflowJobs(workflow);

  assert.equal(jobUses(jobs.get("build_and_verify"), PINNED_ACTIONS.checkout), true);
  assert.equal(jobHasRun(jobs.get("build_and_verify"), "pnpm check"), true);
  assert.equal(jobHasLine(jobs.get("build_and_verify"), "persist-credentials: false"), true);
  assert.equal(
    jobHasLinesInOrder(jobs.get("build_and_verify"), [`- uses: ${PINNED_ACTIONS.checkout}`, "- run: pnpm check"]),
    true,
  );
  assert.equal(
    jobHasLinesInOrder(jobs.get("build_and_verify"), ["- run: pnpm check", "persist-credentials: false"]),
    false,
  );
  assert.equal(jobRunCount(jobs.get("build_and_verify"), "pnpm build"), 0);
  assert.equal(jobHasPermission(jobs.get("build_and_verify"), "contents", "read"), true);
  assert.equal(jobHasKeyValue(jobs.get("github-release"), "needs", "build_and_verify"), true);
  assert.equal(jobHasPermission(jobs.get("github-release"), "contents", "write"), true);
  assert.equal(workflowHasActiveKey(workflow, "pnpm-version"), false);
  assert.equal(workflowHasTopLevelKeyValue(workflow, "permissions", "{}"), true);
  assert.equal(workflowActionsArePinned(workflow), true);
  assert.deepEqual(collectActionReferences(workflow), [PINNED_ACTIONS.checkout, PINNED_ACTIONS.downloadArtifact]);
});

test("workflow action policy accepts only local actions or immutable full commit SHAs", () => {
  assert.equal(isPinnedActionReference(PINNED_ACTIONS.setupNode), true);
  assert.equal(isPinnedActionReference("./.github/actions/local-check"), true);
  assert.equal(isPinnedActionReference("actions/checkout@v6"), false);
  assert.equal(isPinnedActionReference("halo-sigs/reusable-workflows/.github/workflows/theme-cd.yaml@v4"), false);
});

test("App Store release input must match the theme app id", () => {
  const theme = `
metadata:
  annotations:
    "store.halo.run/app-id": "app-example123"
`;
  const workflow = `
jobs:
  appstore-release:
    steps:
      - name: Publish verified package
        uses: ${PINNED_ACTIONS.haloAppStoreRelease}
        with:
          app-id: app-example123
      - name: Decoy input
        run: echo ignored
        with:
          app-id: app-other
`;
  const appId = yamlScalarAtPath(theme, ["metadata", "annotations", "store.halo.run/app-id"]);
  const job = parseWorkflowJobs(workflow).get("appstore-release");

  assert.equal(appId, "app-example123");
  assert.equal(jobActionHasInput(job, PINNED_ACTIONS.haloAppStoreRelease, "app-id", appId), true);
  assert.equal(jobActionHasInput(job, PINNED_ACTIONS.haloAppStoreRelease, "app-id", "app-other"), false);
});

test("settings FormKit schema rejects duplicate names and dangling condition ids", () => {
  const validSettings = `
metadata:
  name: example-setting
spec:
  forms:
    - group: appearance
      formSchema:
        - $formkit: select
          id: preset_selector
          name: preset
        - $formkit: color
          key: custom-primary
          id: custom_primary
          name: custom_primary
          if: $get(preset_selector).value === 'custom'
`;
  const theme = `
spec:
  settingName: example-setting
`;

  assert.equal(yamlScalarAtPath(theme, ["spec", "settingName"]), yamlScalarAtPath(validSettings, ["metadata", "name"]));
  assert.deepEqual(validateFormKitSchema(validSettings), []);

  const mismatchedSettingsName = validSettings.replace("name: example-setting", "name: other-setting");
  assert.notEqual(
    yamlScalarAtPath(theme, ["spec", "settingName"]),
    yamlScalarAtPath(mismatchedSettingsName, ["metadata", "name"]),
  );

  const duplicateName = validSettings.replace("name: custom_primary", "name: preset");
  assert.ok(validateFormKitSchema(duplicateName).includes("FormKit 字段 name 不得重复"));

  const duplicateKey = `${validSettings}\n        - $formkit: color\n          key: custom-primary\n          id: custom_bg\n          name: custom_bg\n`;
  assert.ok(validateFormKitSchema(duplicateKey).includes("FormKit 字段 key 不得重复"));

  const danglingCondition = validSettings.replace("$get(preset_selector)", "$get(missing_selector)");
  assert.ok(validateFormKitSchema(danglingCondition).includes("条件引用了不存在的 FormKit id：missing_selector"));
});
