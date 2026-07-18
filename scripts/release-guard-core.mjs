const SEMVER_PATTERN = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;

export function validateReleaseState({
  expectedCommit,
  headCommit,
  packageName,
  packageVersion,
  releaseTag,
  tagCommit,
  themeName,
  themeVersion,
}) {
  const errors = [];

  if (!SEMVER_PATTERN.test(themeVersion || "")) {
    errors.push(`Theme version is not valid semver: ${themeVersion || "missing"}`);
  }
  if (packageName !== themeName) {
    errors.push(`Package name ${packageName || "missing"} does not match theme name ${themeName || "missing"}`);
  }
  if (packageVersion !== themeVersion) {
    errors.push(
      `Package version ${packageVersion || "missing"} does not match theme version ${themeVersion || "missing"}`,
    );
  }

  const expectedTag = `v${themeVersion}`;
  if (releaseTag !== expectedTag) {
    errors.push(`Release tag ${releaseTag || "missing"} does not match theme version tag ${expectedTag}`);
  }
  if (!headCommit || !tagCommit || headCommit !== tagCommit) {
    errors.push(`Checked out commit ${headCommit || "missing"} does not match tag commit ${tagCommit || "missing"}`);
  }
  if (expectedCommit && headCommit !== expectedCommit) {
    errors.push(`Checked out commit ${headCommit || "missing"} does not match workflow event commit ${expectedCommit}`);
  }

  return errors;
}

export function assertReleaseState(state) {
  const errors = validateReleaseState(state);
  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }
}
