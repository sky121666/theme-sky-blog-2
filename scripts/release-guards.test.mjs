import assert from "node:assert/strict";
import test from "node:test";

import { validateReleaseState } from "./release-guard-core.mjs";
import { parseThemeMetadata } from "./theme-metadata.mjs";
import {
  collectActionReferences,
  isPinnedActionReference,
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

test("workflow action policy accepts only local actions or immutable full commit SHAs", () => {
  const officialWorkflow = "halo-sigs/reusable-workflows/.github/workflows/theme-cd.yaml";
  const pinned = `${officialWorkflow}@${"a".repeat(40)}`;
  const workflow = `
# uses: ignored@v5
jobs:
  publish:
    uses: ${pinned}
`;

  assert.equal(isPinnedActionReference(pinned), true);
  assert.equal(isPinnedActionReference("./.github/actions/local-check"), true);
  assert.equal(isPinnedActionReference(`${officialWorkflow}@v5`), false);
  assert.deepEqual(collectActionReferences(workflow), [pinned]);
});

test("App Store release input must match the theme app id", () => {
  const theme = `
metadata:
  annotations:
    "store.halo.run/app-id": "app-example123"
`;
  const workflow = `
jobs:
  publish:
    with:
      app-id: app-example123
  decoy:
    with:
      app-id: app-other
`;
  const appId = yamlScalarAtPath(theme, ["metadata", "annotations", "store.halo.run/app-id"]);

  assert.equal(appId, "app-example123");
  assert.equal(yamlScalarAtPath(workflow, ["jobs", "publish", "with", "app-id"]), appId);
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
