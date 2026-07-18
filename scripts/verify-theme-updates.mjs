import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { parseThemeMetadata } from "./theme-metadata.mjs";
import {
  PINNED_ACTIONS,
  collectActionReferences,
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

function parsePackageManifest(content) {
  try {
    return JSON.parse(content);
  } catch {
    return null;
  }
}

function listHtmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      return listHtmlFiles(path);
    }
    return entry.isFile() && entry.name.endsWith(".html") ? [path] : [];
  });
}

function listTypeScriptFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      return listTypeScriptFiles(path);
    }
    return entry.isFile() && entry.name.endsWith(".ts") ? [path] : [];
  });
}

const checks = [
  {
    file: "src/styles/base.css",
    message: "base.css should respect prefers-reduced-motion",
    test: (content) => content.includes("@media (prefers-reduced-motion: reduce)"),
  },
  {
    file: "src/styles/base.css",
    message: "base.css should not depend on Google Fonts",
    test: (content) => !content.includes("fonts.googleapis.com") && !content.includes("@import url("),
  },
  {
    file: "templates/gateway_fragments/layout.html",
    message: "gateway layout should reuse shared themeStyle fragment",
    test: (content) => content.includes('th:replace="~{modules/theme-style :: themeStyle}"'),
  },
  {
    file: "templates/modules/layout.html",
    message: "search control should be a semantic button bound to the official search widget action",
    test: (content) =>
      content.includes('type="button"') &&
      content.includes('data-terminal-action="search"') &&
      !content.includes("SearchWidget.open()") &&
      !content.includes('href="javascript:void(0)"'),
  },
  {
    file: "templates/post.html",
    message: "post template should not use javascript hrefs",
    test: (content) => !content.includes('href="javascript:') && !content.includes("onclick="),
  },
  {
    file: "templates",
    readFile: false,
    message: "templates should not use javascript hrefs",
    test: () => listHtmlFiles("templates").every((file) => !readFileSync(file, "utf8").includes('href="javascript:')),
  },
  {
    file: "templates",
    readFile: false,
    message: "templates should avoid inline onclick outside the standalone error page",
    test: () =>
      listHtmlFiles("templates")
        .filter((file) => file !== join("templates", "error", "error.html"))
        .every((file) => !readFileSync(file, "utf8").includes("onclick=")),
  },
  {
    file: "templates/post.html",
    message: "post template should include terminal TOC and reading progress",
    test: (content) => content.includes("[TOC]") && content.includes("READ_PROGRESS") && content.includes("tocItems"),
  },
  {
    file: "templates/post.html",
    message: "post template should expose optional Halo comments",
    test: (content) =>
      content.includes("<halo:comment") && content.includes("</halo:comment>") && content.includes("show_comments"),
  },
  {
    file: "README.md",
    message: "README should document the official comment widget dependency and canonical contract",
    test: (content) =>
      content.includes("PluginCommentWidget") &&
      content.includes("docs/plugin-adaptation.md") &&
      content.includes("唯一真值") &&
      content.includes("Halo `>=2.23.0`"),
  },
  {
    file: "README.md",
    message: "README should document the actual Node.js and pnpm requirements",
    test: (content) =>
      content.includes("`^22.22.1 || ^24.0.0`") &&
      content.includes("CI 使用 Node.js 22.22.1 与 Node.js 24") &&
      content.includes("CD 使用 Node.js 24") &&
      content.includes("pnpm 10.x") &&
      content.includes("pnpm 10.34.5") &&
      !content.includes("Node.js 20.19+ 或 22.12+"),
  },
  {
    file: "README.md",
    message: "README should document the immutable single-artifact release workflow",
    test: (content) =>
      content.includes("完整 commit SHA") &&
      content.includes("只构建并验证一次") &&
      content.includes("GitHub Release 与 Halo 应用市场复用同一份已验证产物") &&
      content.includes("不要在 `package.json` 中恢复 `packageManager`") &&
      !content.includes("theme-cd.yaml@v4"),
  },
  {
    file: "README.md",
    message: "README should document the Halo installed-theme cache refresh boundary",
    test: (content) =>
      content.includes("dist/theme-sky-blog-2-<version>.zip") &&
      content.includes("本地目录挂载式开发不通过控制台") &&
      content.includes("/apis/api.console.halo.run/v1alpha1/themes/theme-sky-blog-2/reload") &&
      content.includes("仅重启容器不会刷新已安装主题版本") &&
      content.includes("不需要上传 ZIP") &&
      content.includes("pnpm check:runtime-version") &&
      content.includes("pnpm verify:package") &&
      content.includes("Runtime asset version mismatch") &&
      content.includes("pnpm reload:theme") &&
      content.includes("HALO_PAT"),
  },
  {
    file: "README.md",
    message: "README project structure should match the split runtime and style layout",
    test: (content) =>
      content.includes("common/") &&
      content.includes("features/") &&
      content.includes("base / content / auth / tailwind") &&
      content.includes("gateway_fragments/") &&
      content.includes("scripts/") &&
      !content.includes("main.css     # 终端 CSS 样式与 Tailwind 扩展"),
  },
  {
    file: "package.json",
    message: "package metadata should enforce the documented Node.js and pnpm requirements",
    test: (content) => {
      const manifest = parsePackageManifest(content);
      return (
        manifest?.engines?.node === "^22.22.1 || ^24.0.0" &&
        manifest?.engines?.pnpm === ">=10.6.5 <11" &&
        !("packageManager" in manifest) &&
        manifest?.devDependencies?.["@types/node"] === "^22.20.1" &&
        !("pjax" in (manifest.dependencies || {})) &&
        !("pjax" in (manifest.devDependencies || {})) &&
        !("@typescript-eslint/eslint-plugin" in manifest.devDependencies) &&
        !("@typescript-eslint/parser" in manifest.devDependencies)
      );
    },
  },
  {
    file: "theme.yaml",
    message: "theme and package versions should stay in sync for asset cache busting",
    test: (content) => {
      const theme = parseThemeMetadata(content);
      const manifest = parsePackageManifest(readFileSync("package.json", "utf8"));
      return theme.name === manifest?.name && theme.version === manifest?.version;
    },
  },
  {
    file: "theme.yaml",
    message: "theme metadata should use the SKY terminal logo and author identity",
    test: (content) =>
      content.includes("name: sky") &&
      content.includes('logo: "/themes/theme-sky-blog-2/assets/images/theme-icon.png"'),
  },
  {
    file: "theme.yaml",
    message: "theme settingName should match settings metadata.name",
    test: (content) => {
      const settingName = yamlScalarAtPath(content, ["spec", "settingName"]);
      const settingsName = yamlScalarAtPath(readFileSync("settings.yaml", "utf8"), ["metadata", "name"]);
      return Boolean(settingName && settingName === settingsName);
    },
  },
  {
    file: "src/images/theme-icon.png",
    readFile: false,
    message: "theme logo should remain a valid 512x512 PNG optimized for Halo theme lists",
    test: () => {
      const icon = readFileSync("src/images/theme-icon.png");
      return (
        icon.length > 24 &&
        icon.subarray(0, 8).toString("hex") === "89504e470d0a1a0a" &&
        icon.readUInt32BE(16) === 512 &&
        icon.readUInt32BE(20) === 512
      );
    },
  },
  {
    file: "package.json",
    message: "prettier scripts should cover TS, JS, CJS, MJS, CSS, JSON, YAML, and HTML sources",
    test: (content) =>
      content.includes("ts,js,cjs,mjs,css,json,yaml,yml,html") &&
      content.includes("*.{ts,js,cjs,mjs,css,json,yaml,yml,html}"),
  },
  {
    file: "package.json",
    message: "package scripts should expose runtime, release, test, formatting, and package checks",
    test: (content) => {
      const scripts = parsePackageManifest(content)?.scripts;
      return (
        scripts?.["check:runtime-version"] === "node scripts/check-runtime-version.mjs" &&
        scripts?.["check:release"] === "node scripts/check-release.mjs" &&
        scripts?.["reload:theme"] === "node scripts/reload-theme.mjs" &&
        scripts?.["smoke:live"] === "node scripts/live-smoke.mjs" &&
        scripts?.test === "node --import tsx --test scripts/*.test.mjs" &&
        scripts?.["test:coverage"] === "node scripts/run-tests-with-coverage.mjs" &&
        scripts?.["prettier:check"]?.startsWith("prettier --check ") &&
        scripts["prettier:check"].includes("README.md") &&
        scripts["prettier:check"].includes("templates/**/*.html") &&
        scripts?.check ===
          "pnpm test:coverage && pnpm verify:plugin-contracts && pnpm prettier:check && pnpm verify:theme-updates && pnpm lint" &&
        scripts?.["verify:plugin-contracts"] === "node scripts/plugin-contracts.mjs" &&
        scripts?.["verify:package"] === "node scripts/verify-theme-package.mjs"
      );
    },
  },
  {
    file: "package.json",
    message: "DOM regression dependencies should replace unused Iconify build dependencies",
    test: (content) => {
      const manifest = parsePackageManifest(content);
      return (
        manifest?.devDependencies?.jsdom &&
        manifest?.devDependencies?.tsx &&
        !manifest?.devDependencies?.["@iconify-json/tabler"] &&
        !manifest?.devDependencies?.["@iconify/tailwind"]
      );
    },
  },
  {
    file: "scripts/check-runtime-version.mjs",
    message: "runtime version check should compare Halo page asset versions with theme.yaml",
    test: (content) =>
      content.includes(
        'import { collectAssetVersions, fetchHomeHtml, normalizeBaseUrl } from "./runtime-assets.mjs"',
      ) &&
      content.includes('import { readThemeMetadata } from "./theme-metadata.mjs"') &&
      content.includes('fetchHomeHtml(baseUrl, "_runtime_version_check")') &&
      content.includes("Runtime asset version mismatch") &&
      content.includes("pnpm reload:theme") &&
      !content.includes("Re-upload") &&
      content.includes("HALO_BASE_URL") &&
      !content.includes("new URL("),
  },
  {
    file: "scripts/check-release.mjs",
    message: "release guard should reject modified or untracked workspace files before tag validation",
    test: (content) =>
      content.includes('git("status", "--porcelain=v1", "--untracked-files=all")') &&
      content.includes("Release requires a clean tracked snapshot") &&
      content.includes("Commit the intended theme sources before tagging"),
  },
  {
    file: "scripts/runtime-assets.mjs",
    message: "runtime asset helper should centralize Halo page fetching and asset version extraction",
    test: (content) =>
      content.includes("export function normalizeBaseUrl") &&
      content.includes("export function collectAssetVersions") &&
      content.includes("export async function fetchHomeHtml") &&
      content.includes("Cache-Control") &&
      content.includes("main\\\\.(?:css|iife\\\\.js)"),
  },
  {
    file: "scripts/theme-metadata.mjs",
    message: "theme metadata helper should centralize theme.yaml name and version parsing",
    test: (content) =>
      content.includes("export function readThemeMetadata") &&
      content.includes("export function readThemePackageName") &&
      content.includes("metadata.name") &&
      content.includes("spec.version"),
  },
  {
    file: "scripts/reload-theme.mjs",
    message: "theme reload helper should use env token and verify runtime asset version",
    test: (content) =>
      content.includes(
        'import { collectAssetVersions, fetchHomeHtml, normalizeBaseUrl } from "./runtime-assets.mjs"',
      ) &&
      content.includes('import { readThemeMetadata } from "./theme-metadata.mjs"') &&
      content.includes("HALO_PAT") &&
      content.includes("FIVEEE_PAT") &&
      content.includes("HALO_TOKEN") &&
      content.includes("/apis/api.console.halo.run/v1alpha1/themes/") &&
      content.includes("Authorization: `Bearer ${token}`") &&
      content.includes('fetchHomeHtml(baseUrl, "_theme_reload_check")') &&
      content.includes("waitForRuntimeVersion") &&
      !content.includes("Upload dist/") &&
      !content.includes("console.log(token"),
  },
  {
    file: ".github/workflows/ci.yaml",
    message: "CI should use immutable Node 24 actions and validate the supported Node LTS matrix with least privilege",
    test: (content) => {
      const validate = parseWorkflowJobs(content).get("validate");
      const actionReferences = collectActionReferences(content);
      return (
        workflowHasTopLevelKeyValue(content, "permissions", "{}") &&
        workflowActionsArePinned(content) &&
        actionReferences.length === 3 &&
        jobHasPermission(validate, "contents", "read") &&
        jobUses(validate, PINNED_ACTIONS.checkout) &&
        jobHasKeyValue(validate, "persist-credentials", "false") &&
        jobUses(validate, PINNED_ACTIONS.pnpmSetup) &&
        jobHasKeyValue(validate, "version", "10.34.5") &&
        jobUses(validate, PINNED_ACTIONS.setupNode) &&
        jobHasKeyValue(validate, "node-version", '["22.22.1", "24"]') &&
        jobHasKeyValue(validate, "node-version", "${{ matrix.node-version }}") &&
        jobHasRun(validate, "pnpm install --frozen-lockfile") &&
        jobHasRun(validate, "pnpm check") &&
        jobHasRun(validate, "pnpm build") &&
        jobHasRun(validate, "pnpm verify:package -- --strict-dist") &&
        jobHasRun(validate, "pnpm audit --audit-level moderate") &&
        jobHasKeyValue(validate, "if", "matrix.node-version == '24'")
      );
    },
  },
  {
    file: ".github/workflows/cd.yaml",
    message: "CD should build once with read-only permissions and promote one verified artifact",
    test: (content) => {
      const jobs = parseWorkflowJobs(content);
      const build = jobs.get("build_and_verify");
      const githubRelease = jobs.get("github-release");
      const appStoreRelease = jobs.get("appstore-release");
      const actionReferences = collectActionReferences(content);
      const themeAppId = yamlScalarAtPath(readFileSync("theme.yaml", "utf8"), [
        "metadata",
        "annotations",
        "store.halo.run/app-id",
      ]);
      const integrityCheck = "sha256sum --check --strict release-integrity/SHA256SUMS";
      const outputDigestCheck = 'echo "$PACKAGE_SHA256  dist/$PACKAGE_NAME" | sha256sum --check --strict -';
      return (
        workflowHasTopLevelKeyValue(content, "permissions", "{}") &&
        content.includes('on:\n  push:\n    tags:\n      - "v*"') &&
        content.includes(
          "concurrency:\n  group: cd-${{ github.repository }}-${{ github.ref }}\n  cancel-in-progress: false",
        ) &&
        !content.includes("release:\n    types:\n      - published") &&
        workflowActionsArePinned(content) &&
        actionReferences.length === 7 &&
        jobHasPermission(build, "contents", "read") &&
        jobUses(build, PINNED_ACTIONS.checkout) &&
        jobHasKeyValue(build, "ref", "${{ github.sha }}") &&
        jobHasKeyValue(build, "fetch-depth", "0") &&
        jobHasKeyValue(build, "fetch-tags", "true") &&
        jobHasKeyValue(build, "persist-credentials", "false") &&
        jobUses(build, PINNED_ACTIONS.pnpmSetup) &&
        jobHasKeyValue(build, "version", "10.34.5") &&
        jobUses(build, PINNED_ACTIONS.setupNode) &&
        jobHasKeyValue(build, "node-version", "24") &&
        jobRunCount(build, "pnpm install --frozen-lockfile") === 1 &&
        jobHasRun(
          build,
          'pnpm check:release -- --tag "${{ github.ref_name }}" --expected-commit "${{ github.sha }}"',
        ) &&
        jobHasRun(build, `printf 'release-commit=%s\\n' "$(git rev-parse HEAD)" >> "$GITHUB_OUTPUT"`) &&
        jobHasRun(build, "pnpm check") &&
        jobRunCount(build, "pnpm build") === 1 &&
        jobHasRun(build, "pnpm verify:package -- --strict-dist --write-integrity release-integrity --github-output") &&
        jobRunCount(build, "pnpm audit --audit-level moderate") === 1 &&
        jobUses(build, PINNED_ACTIONS.uploadArtifact) &&
        jobHasKeyValue(build, "name", "verified-theme-package") &&
        jobHasLine(build, "dist/${{ steps.package.outputs.package-name }}") &&
        jobHasLine(build, "release-integrity/SHA256SUMS") &&
        jobHasKeyValue(build, "package-name", "${{ steps.package.outputs.package-name }}") &&
        jobHasKeyValue(build, "package-sha256", "${{ steps.package.outputs.package-sha256 }}") &&
        jobHasKeyValue(build, "release-commit", "${{ steps.release-identity.outputs.release-commit }}") &&
        jobHasKeyValue(githubRelease, "needs", "build_and_verify") &&
        jobHasPermission(githubRelease, "contents", "write") &&
        jobUses(githubRelease, PINNED_ACTIONS.downloadArtifact) &&
        jobHasKeyValue(githubRelease, "name", "verified-theme-package") &&
        jobHasRun(githubRelease, integrityCheck) &&
        jobHasRun(githubRelease, outputDigestCheck) &&
        jobHasLinesInOrder(githubRelease, [
          'cp "dist/$PACKAGE_NAME" "$PACKAGE_NAME"',
          `printf '%s  %s\\n' "$PACKAGE_SHA256" "$PACKAGE_NAME" > SHA256SUMS`,
          "sha256sum --check --strict SHA256SUMS",
        ]) &&
        jobHasLinesInOrder(githubRelease, [
          "verify_remote_tag_commit() {",
          'REMOTE_TAG_COMMIT="$(gh api "repos/$GH_REPO/commits/$RELEASE_TAG" --jq .sha)"',
          'if [ "$REMOTE_TAG_COMMIT" != "$EXPECTED_COMMIT" ]; then',
          "verify_remote_tag_commit",
          'if gh release view "$RELEASE_TAG" >/dev/null 2>&1; then',
          'IS_DRAFT="$(gh release view "$RELEASE_TAG" --json isDraft --jq .isDraft)"',
          'gh release create "$RELEASE_TAG" --draft --verify-tag --title "$RELEASE_TAG" --generate-notes',
          'ASSETS=("$PACKAGE_NAME" SHA256SUMS)',
          "MISSING_ASSETS=()",
          'for ASSET in "${ASSETS[@]}"; do',
          'if gh release download "$RELEASE_TAG" --pattern "$ASSET" --dir existing-release-assets 2>/dev/null; then',
          'cmp --silent "release-artifact/$ASSET" "existing-release-assets/$ASSET" || {',
          'MISSING_ASSETS+=("$ASSET")',
          'if [ "$IS_DRAFT" != "true" ] && [ "${#MISSING_ASSETS[@]}" -gt 0 ]; then',
          'for ASSET in "${MISSING_ASSETS[@]}"; do',
          'gh release upload "$RELEASE_TAG" "release-artifact/$ASSET"',
          "verify_remote_tag_commit",
          'if [ "$IS_DRAFT" = "true" ]; then',
          'gh release edit "$RELEASE_TAG" --draft=false',
          'RELEASE_ID="$(gh api "repos/$GH_REPO/releases/tags/$RELEASE_TAG" --jq .id)"',
          'if ! [[ "$RELEASE_ID" =~ ^[0-9]+$ ]]; then',
          `printf 'release-id=%s\\n' "$RELEASE_ID" >> "$GITHUB_OUTPUT"`,
        ]) &&
        jobHasKeyValue(githubRelease, "release-id", "${{ steps.release.outputs.release-id }}") &&
        jobHasKeyValue(githubRelease, "GH_REPO", "${{ github.repository }}") &&
        jobHasKeyValue(githubRelease, "EXPECTED_COMMIT", "${{ needs.build_and_verify.outputs.release-commit }}") &&
        jobHasKeyValue(githubRelease, "RELEASE_TAG", "${{ github.ref_name }}") &&
        !content.includes("--clobber") &&
        !jobUses(githubRelease, PINNED_ACTIONS.checkout) &&
        jobRunCount(githubRelease, "pnpm install --frozen-lockfile") === 0 &&
        jobRunCount(githubRelease, "pnpm build") === 0 &&
        jobHasKeyValue(appStoreRelease, "needs", "[build_and_verify, github-release]") &&
        jobHasPermission(appStoreRelease, "contents", "read") &&
        !jobHasPermission(appStoreRelease, "contents", "write") &&
        jobUses(appStoreRelease, PINNED_ACTIONS.downloadArtifact) &&
        jobHasKeyValue(appStoreRelease, "name", "verified-theme-package") &&
        jobHasRun(appStoreRelease, integrityCheck) &&
        jobHasRun(appStoreRelease, outputDigestCheck) &&
        jobUses(appStoreRelease, PINNED_ACTIONS.haloAppStoreRelease) &&
        Boolean(themeAppId) &&
        jobActionHasInput(appStoreRelease, PINNED_ACTIONS.haloAppStoreRelease, "app-id", themeAppId) &&
        jobHasKeyValue(appStoreRelease, "release-id", "${{ needs.github-release.outputs.release-id }}") &&
        jobHasKeyValue(appStoreRelease, "assets-dir", "release-artifact/dist") &&
        jobHasKeyValue(appStoreRelease, "halo-pat", "${{ secrets.HALO_PAT }}") &&
        !jobUses(appStoreRelease, PINNED_ACTIONS.checkout) &&
        jobRunCount(appStoreRelease, "pnpm install --frozen-lockfile") === 0 &&
        jobRunCount(appStoreRelease, "pnpm build") === 0 &&
        !content.includes("reusable-workflows") &&
        !workflowHasActiveKey(content, "pnpm-version")
      );
    },
  },
  {
    file: "scripts/reproducible-zip.mjs",
    message: "release ZIP normalization should fix timestamps, permissions, ordering, and extra metadata",
    test: (content) =>
      content.includes('FIXED_ARCHIVE_TIME = new Date("2000-01-01T00:00:00.000Z")') &&
      content.includes("sort(compareArchiveNames)") &&
      content.includes("compareArchiveNames(left.archivePath, right.archivePath)") &&
      content.includes("chmodSync(entry.absolutePath, 0o644)") &&
      content.includes('env: { ...process.env, TZ: "UTC" }') &&
      content.includes('["-X", "-q", "-9", normalizedArchivePath'),
  },
  {
    file: "scripts/prune-theme-package.mjs",
    message: "theme package pruning should finish with deterministic ZIP normalization",
    test: (content) =>
      content.includes('from "./reproducible-zip.mjs"') && content.includes("rewriteZipDeterministically(packagePath)"),
  },
  {
    file: "scripts/reproducible-zip.test.mjs",
    message: "deterministic ZIP normalization should have a behavior test across different source mtimes",
    test: (content) => content.includes("removes source mtime differences") && content.includes("assert.equal(digest("),
  },
  {
    file: "scripts/package-rules.mjs",
    message: "package forbidden entries should be centralized for CI and local verification",
    test: (content) =>
      content.includes("export const PACKAGE_EXCLUDE_ENTRIES") &&
      content.includes("export const PACKAGE_FORBIDDEN_PATTERNS") &&
      [
        "pnpm-lock\\.yaml",
        "package\\.json",
        "scripts\\/",
        "node_modules\\/",
        "\\.git\\/",
        "build\\.gradle",
        "settings\\.gradle",
        "gradlew",
        "gradle\\/",
        "\\.playwright-mcp\\/",
        "src\\/",
        "\\.github\\/",
        "eslint\\.config",
        "vite\\.config",
        "tailwind\\.config",
        "tsconfig\\.json",
      ].every((entry) => content.includes(entry)),
  },
  {
    file: "scripts/verify-theme-package.mjs",
    message: "theme package verifier should validate archive integrity, entries, metadata, and required assets",
    test: (content) =>
      content.includes('from "./package-verification.mjs"') &&
      content.includes("validatePackageSelection") &&
      content.includes("validatePackageEntries") &&
      content.includes("validatePackageMetadata") &&
      content.includes("createPackageIntegrityRecord") &&
      content.includes("--write-integrity") &&
      content.includes("GITHUB_OUTPUT") &&
      content.includes("zipinfo") &&
      content.includes('runArchiveCommand("unzip", ["-tqq"'),
  },
  {
    file: "scripts/package-verification.test.mjs",
    message: "package verification should cover valid and invalid archive contracts",
    test: (content) =>
      content.includes("accepts one complete root-level Halo theme package") &&
      content.includes("rejects missing, duplicate, forbidden, and wrapped package entries") &&
      content.includes("rejects unsafe paths and metadata or asset mismatches") &&
      content.includes("locks production asset and package budget policy values") &&
      content.includes("rejects oversized icon, aggregate fonts, and compressed package") &&
      content.includes("creates and validates one safe SHA-256 release integrity record") &&
      content.includes("rejects altered, multiple, or unsafe release integrity records"),
  },
  {
    file: "scripts/run-tests-with-coverage.mjs",
    message: "coverage wrapper should enforce global and critical source thresholds",
    test: (content) =>
      content.includes('"--test-coverage-include=src/**/*.ts"') &&
      content.includes('"--test-coverage-lines=95"') &&
      content.includes('"--test-coverage-branches=85"') &&
      content.includes('"--test-coverage-functions=95"') &&
      content.includes("parseCoverageReport") &&
      content.includes("validateCoveragePolicy"),
  },
  {
    file: "scripts/coverage-policy.test.mjs",
    message: "coverage policy should test Node 22 and Node 24 report formats plus every critical metric",
    test: (content) =>
      content.includes("coverage report parser keeps critical TypeScript metrics") &&
      content.includes("coverage report parser accepts Node 22 TAP comment prefixes") &&
      content.includes("critical coverage policy rejects missing rows and each low metric") &&
      content.includes("critical coverage policy accepts every metric at its floor"),
  },
  {
    file: "scripts/live-smoke.mjs",
    message: "live smoke should require no-cache browser evidence, resource budgets, and explicit plugin observations",
    test: (content) =>
      content.includes("ASSET_SIZE_BUDGETS") &&
      content.includes("BROWSER_RESOURCE_BUDGETS") &&
      content.includes("Network.setCacheDisabled") &&
      content.includes("pluginSurfaceObservationIssues") &&
      content.includes("smokeCompletionIssues"),
  },
  {
    file: "scripts/live-smoke.test.mjs",
    message: "live smoke policy should prevent HTTP-only, budget, browser fallback, and plugin evidence regressions",
    test: (content) =>
      content.includes("live resource budget policy stays aligned with packaged core assets") &&
      content.includes("startup failure falls through to the next discovered browser") &&
      content.includes("plugin samples are reported as observed or explicitly skipped") &&
      content.includes("HTTP-only evidence can never satisfy complete smoke verification"),
  },
  {
    file: "scripts/release-guards.test.mjs",
    message: "release guards should cover tag, commit, package, and anchored workflow rules",
    test: (content) =>
      content.includes("accepts a release whose tag, commit, package, and theme agree") &&
      content.includes("rejects release tag, package, and commit mismatches") &&
      content.includes("workflow parser ignores commented guard text") &&
      content.includes("workflow action policy accepts only local actions or immutable full commit SHAs") &&
      content.includes("App Store release input must match the theme app id") &&
      content.includes("settings FormKit schema rejects duplicate names and dangling condition ids"),
  },
  {
    file: "settings.yaml",
    message: "comment setting should name the official comment widget plugin",
    test: (content) => content.includes("官方评论组件 PluginCommentWidget"),
  },
  {
    file: "settings.yaml",
    message: "theme settings FormKit fields should have unique ids, names, keys, and valid conditional references",
    test: (content) => validateFormKitSchema(content).length === 0,
  },
  {
    file: "src/common/runtime.ts",
    message: "partial-navigation runtime should replay same-origin module scripts opted in with data-pjax",
    test: (content) =>
      content.includes('script[type="module"][data-pjax]') &&
      content.includes("replayNavigationScripts(main)") &&
      content.includes("sourceUrl.origin !== window.location.origin"),
  },
  {
    file: "src/common/navigation.ts",
    message:
      "native partial navigation should safely fetch, parse, abort, update keyed history, and expose lifecycle events",
    test: (content) =>
      content.includes("await fetch(") &&
      content.includes("new AbortController()") &&
      content.includes("cancelActiveNavigation()") &&
      content.includes("this.activeNavigationDetail") &&
      content.includes("waitForPageInitialization()") &&
      content.includes("currentPageRequiresFullNavigationExit()") &&
      content.includes('NAVIGATION_FULL_RELOAD_EVENT = "theme:navigation-full-reload"') &&
      content.includes('NAVIGATION_FULL_RELOAD_RESET_EVENT = "theme:navigation-full-reload-reset"') &&
      content.includes("prepareForFullNavigation(target: URL)") &&
      content.includes('window.addEventListener("pageshow", this.handlePageShow)') &&
      content.includes("new DOMParser()") &&
      content.includes("window.history.pushState") &&
      content.includes('const HISTORY_ENTRY_KEY = "themePartialNavigationKey"') &&
      content.includes("targetEntryKey") &&
      content.includes("NAVIGATION_SAME_DOCUMENT_EVENT") &&
      content.includes("if (this.abortController)") &&
      content.includes("getHeadNavigationContractSignatures") &&
      content.includes("headNavigationContractChanged(parsedDocument, finalTarget)") &&
      content.includes("syncPageMetadata(parsedDocument)") &&
      content.includes("event.preventDefault();\n      reportUnsafeNavigation()") &&
      content.includes("Alpine.mutateDom") &&
      content.includes("Alpine.destroyTree") &&
      content.includes('"theme:navigation-error"') &&
      content.includes("NAVIGATION_ERROR_EVENT"),
  },
  {
    file: "src/common/runtime.ts",
    message: "partial navigation should restore keyed scroll positions and await plugin modules before Alpine",
    test: (content) =>
      content.includes("scrollPositions.get(detail.targetEntryKey)") &&
      content.includes("await replayNavigationScripts(main)") &&
      content.includes("await Promise.all(pendingScripts)") &&
      content.includes("MODULE_REPLAY_EVENT_PREFIX") &&
      content.includes("window.addEventListener(completionEventName") &&
      content.includes('PJAX_COMPAT_COMPLETE_EVENT = "pjax:complete"') &&
      content.includes("window.dispatchEvent(new CustomEvent(PJAX_COMPAT_COMPLETE_EVENT))") &&
      content.includes("document.addEventListener(NAVIGATION_FULL_RELOAD_EVENT") &&
      content.includes("fullNavigationPending") &&
      content.includes("setPartialNavigationBarrier(initialization)") &&
      content.includes('sourceUrl.searchParams.set("_theme_navigation"'),
  },
  {
    file: "src",
    readFile: false,
    message: "source should not import the removed Pjax package",
    test: () => {
      const pjaxImport = /(?:from\s+["']pjax["']|import\s*\(\s*["']pjax["']\s*\)|import\s+["']pjax["'])/;
      return listTypeScriptFiles("src").every((file) => !pjaxImport.test(readFileSync(file, "utf8")));
    },
  },
  {
    file: "templates/modules/layout.html",
    message: "authentication links should bypass partial navigation",
    test: (content) =>
      /th:href="@\{\/login\}"[\s\S]*?data-navigation="full"/.test(content) &&
      /th:href="@\{\/logout\}"[^>]*data-navigation="full"/.test(content),
  },
  {
    file: "src/common/ui-actions.ts",
    message: "UI actions should call the official Halo SearchWidget without inline handlers",
    test: (content) =>
      content.includes("SearchWidget") &&
      content.includes("searchWidget.open()") &&
      content.includes('action === "search"') &&
      !content.includes('action === "back"') &&
      content.includes("logWarn"),
  },
  {
    file: "src/features/file-list-nav.ts",
    message: "file-list navigation should derive selection from DOM order and recover after cancelled navigation",
    test: (content) =>
      content.includes("isSelected(item: HTMLElement)") &&
      content.includes("NAVIGATION_COMPLETE_EVENT") &&
      !content.includes("NAVIGATION_ERROR_EVENT"),
  },
  {
    file: "templates",
    readFile: false,
    message: "file-list templates should not duplicate keyboard indexes",
    test: () =>
      listHtmlFiles("templates").every((file) => {
        const content = readFileSync(file, "utf8");
        return !content.includes("data-index") && !content.includes("dataset.index");
      }),
  },
  {
    file: "src/common/page-data.ts",
    message: "direct-entry post fallback should use one bounded recent-post request",
    test: (content) =>
      content.includes("fetchRecentHomePosts") &&
      content.includes("page=1&size=${HOME_POST_PAGE_SIZE}") &&
      !content.includes("HOME_POST_MAX_PAGES"),
  },
  {
    file: "templates/modules/layout.html",
    message: "global layout should not query or serialize every taxonomy on unrelated pages",
    test: (content) =>
      !content.includes("categoryFinder.listAll()") &&
      !content.includes("tagFinder.listAll()") &&
      content.includes('"categories": /*[[${categories != null ? categories : null}]]*/ null') &&
      content.includes('"tags": /*[[${tags != null ? tags : null}]]*/ null'),
  },
  {
    file: "src/features/ascii-title.ts",
    message: "async ASCII rendering should not mutate an Alpine component after destruction",
    test: (content) =>
      content.includes("renderGeneration") &&
      content.includes("destroy()") &&
      content.includes("generation !== this.renderGeneration"),
  },
  {
    file: "templates/gateway_fragments/layout.html",
    message: "gateway pages should reuse the shared configurable CRT layer instead of rendering a second overlay",
    test: (content) =>
      content.includes("modules/theme-style :: themeStyle") &&
      !content.includes("CRT Overlay Config") &&
      !content.includes("pointer-events-none fixed inset-0 z-50"),
  },
  {
    file: "templates/post.html",
    message: "post metadata and terminal parent navigation should match their actual semantics",
    test: (content) =>
      content.includes("Characters:") &&
      content.includes("Published:") &&
      /th:href="@\{\/\}"[\s\S]*?>\s*cd \.\./.test(content) &&
      !content.includes('data-terminal-action="back"'),
  },
  {
    file: "templates/gateway_fragments/signup.html",
    message: "signup email verification should reject every non-successful HTTP response",
    test: (content) =>
      content.includes("await throwRequestFailure(response)") &&
      content.includes("payload.message") &&
      content.includes("HTTP ${response.status}") &&
      !content.includes("if (e.message) throw e"),
  },
  {
    file: "src/common/runtime.ts",
    message: "runtime should bind UI actions on first load and after native partial-navigation updates",
    test: (content) =>
      content.includes('import { initUiActions } from "./ui-actions"') &&
      content.includes("initUiActions(main)") &&
      content.includes("initUiActions()"),
  },
  {
    file: "src/common/page-data.ts",
    message: "page data parser should respect the debug logging switch",
    test: (content) =>
      content.includes('import { logError } from "./logger"') &&
      content.includes('logError("Failed to parse halo page data.", error)') &&
      !content.includes("console.error"),
  },
  {
    file: "src/styles/base.css",
    message: "base styles should expose comment widget theme variables",
    test: (content) =>
      content.includes("html.terminal-theme.color-scheme-dark") &&
      content.includes("--halo-cw-base-font-family: var(--terminal-font-family)") &&
      content.includes("--halo-cw-primary-1-color: var(--terminal-text)") &&
      content.includes("--halo-cw-text-1-color: var(--terminal-text)") &&
      content.includes("--halo-cw-muted-1-color:") &&
      content.includes("--halo-cw-emoji-picker-rgb-color:") &&
      content.includes("--halo-cw-emoji-picker-color-border-over:"),
  },
  {
    file: "tailwind.config.js",
    message: "Tailwind mono font should use the shared terminal font variable",
    test: (content) => content.includes('mono: ["var(--terminal-font-family)"]') && !content.includes('"Fira Code"'),
  },
  {
    file: "src/styles/content.css",
    message: "content styles should use the shared terminal font variable",
    test: (content) => !content.includes('"Fira Code"') && content.includes("var(--terminal-font-family)"),
  },
  {
    file: "src/styles",
    readFile: false,
    message: "style modules should not hardcode Fira Code outside the shared font stack",
    test: () =>
      readdirSync("src/styles")
        .filter((file) => file.endsWith(".css") && file !== "base.css")
        .every((file) => !readFileSync(join("src/styles", file), "utf8").includes('"Fira Code"')),
  },
  {
    file: "src/features/commands.ts",
    message: "terminal commands should expose article navigation helpers",
    test: (content) =>
      ["toc", "jump", "top", "bottom", "copy"].every((command) => new RegExp(`\\[\\s*"${command}"\\s*,`).test(content)),
  },
  {
    file: "src/features/autocomplete.ts",
    message: "terminal autocomplete should match the documented list and post commands",
    test: (content) =>
      ["top", "bottom"].every((command) => new RegExp(`const LIST_COMMANDS =[\\s\\S]*"${command}"`).test(content)) &&
      ["toc", "jump", "top", "bottom", "copy", "search"].every((command) =>
        new RegExp(`const POST_COMMANDS =[\\s\\S]*"${command}"`).test(content),
      ) &&
      ["top", "bottom", "toc", "copy"].every((command) =>
        new RegExp(`const NO_ARG_COMMANDS =[\\s\\S]*"${command}"`).test(content),
      ),
  },
  {
    file: "src/features/commands.ts",
    message: "post command help should document global search",
    test: (content) => content.includes("Post Page Commands:") && content.includes("search        - Open search"),
  },
  {
    file: "settings.yaml",
    message: "custom code field should describe footer injection accurately",
    test: (content) =>
      content.includes("- $formkit: code") &&
      content.includes("label: 自定义底部代码") &&
      content.includes("将直接注入到 body 底部") &&
      content.includes("可信管理员代码") &&
      content.includes("language: html") &&
      content.includes("height: 180px"),
  },
  {
    file: "templates",
    readFile: false,
    message: 'external target="_blank" links should include rel="noopener noreferrer"',
    test: () =>
      listHtmlFiles("templates").every((file) =>
        [...readFileSync(file, "utf8").matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)].every((match) =>
          /rel="[^"]*\bnoopener\b[^"]*\bnoreferrer\b[^"]*"/.test(match[0]),
        ),
      ),
  },
  {
    file: "gradle",
    readFile: false,
    message: "obsolete Gradle wrapper files should not remain in this pnpm/Vite theme",
    test: () =>
      [
        "build.gradle",
        "settings.gradle",
        "gradlew",
        "gradlew.bat",
        "gradle/wrapper/gradle-wrapper.properties",
        "gradle/wrapper/gradle-wrapper.jar",
      ].every((file) => !existsSync(file)),
  },
  {
    file: ".playwright-mcp",
    readFile: false,
    message: "browser verification snapshots should be ignored by git, prettier, and eslint",
    test: () =>
      [".gitignore", ".prettierignore", "eslint.config.mjs"].every((file) =>
        readFileSync(file, "utf8").includes(".playwright-mcp"),
      ),
  },
  {
    file: "scripts/prune-theme-package.mjs",
    message: "theme package pruning should cover local tooling and obsolete Gradle entries",
    test: (content) =>
      content.includes('import { PACKAGE_EXCLUDE_ENTRIES } from "./package-rules.mjs"') &&
      content.includes('from "./theme-metadata.mjs"') &&
      content.includes("readThemePackageName") &&
      content.includes("findStaleThemePackages") &&
      content.includes("for (const entry of PACKAGE_EXCLUDE_ENTRIES)") &&
      !content.includes("const PACKAGE_EXCLUDE_ENTRIES ="),
  },
];

let failed = false;

for (const check of checks) {
  const content = check.readFile === false ? "" : readFileSync(check.file, "utf8");
  if (!check.test(content)) {
    failed = true;
    console.error(`FAIL ${check.file}: ${check.message}`);
  }
}

if (failed) {
  process.exit(1);
}

console.log("Theme update checks passed.");
