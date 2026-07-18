import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const CONTRACT_FILES = Object.freeze([
  "docs/plugin-adaptation.md",
  "theme.yaml",
  "settings.yaml",
  "templates/modules/layout.html",
  "templates/modules/theme-style.html",
  "templates/post.html",
  "templates/page.html",
  "src/common/ui-actions.ts",
  "src/features/commands.ts",
  "src/common/navigation.ts",
  "src/common/runtime.ts",
  "src/styles/base.css",
  "src/styles/content.css",
]);

export const REQUIRED_PLUGIN_SURFACES = Object.freeze({
  PluginSearchWidget: {
    allowUnavailableSourceBaseline: false,
    runtimeId: "PluginSearchWidget",
    surfaceTokens: ["页脚", "SearchWidget.open()"],
    evidenceTokens: ["页脚", "搜索弹窗"],
    staticOnlyIds: ["terminal-search-command", "search-css-variables"],
  },
  PluginCommentWidget: {
    allowUnavailableSourceBaseline: false,
    runtimeId: "PluginCommentWidget",
    surfaceTokens: ["Post", "<comment-widget>", "局部导航"],
    evidenceTokens: ["<comment-widget>", "局部导航"],
    staticOnlyIds: [
      "single-page-comment-guard",
      "comment-resource-identity",
      "comment-css-variables",
      "comment-data-pjax-replay",
    ],
  },
  "plugin-shiki": {
    allowUnavailableSourceBaseline: false,
    runtimeId: "shiki",
    surfaceTokens: ["Post", "shiki-code", "Shadow DOM"],
    evidenceTokens: ["shiki-code", "Shadow DOM"],
    staticOnlyIds: ["shiki-extra-path-event", "head-lifecycle-boundary", "shiki-minimum-halo-version"],
  },
  "editor-hyperlink-card": {
    allowUnavailableSourceBaseline: true,
    runtimeId: "editor-hyperlink-card",
    surfaceTokens: ["3 种块卡片", "1 个行内卡片"],
    evidenceTokens: ["3 个块卡片", "1 个行内卡片"],
    staticOnlyIds: ["hyperlink-card-css-variables"],
  },
});

const MATRIX_HEADERS = [
  "Plugin",
  "Surface",
  "Installed version",
  "Shared source baseline",
  "Latest verified upstream",
  "Contract version",
  "Tested version",
  "Status",
  "Evidence",
];
const ALLOWED_STATUSES = new Set(["confirmed", "compatible-tested", "inferred", "unconfirmed", "not-adapted"]);
const EVIDENCE_TYPES = new Set(["live-page", "repository-static"]);
const LIVE_RESULTS = new Set(["pass", "fail", "blocked", "not-run"]);
const SEARCH_CSS_VARIABLES = [
  "--halo-search-widget-base-font-family",
  "--halo-search-widget-base-rounded",
  "--halo-search-widget-primary-color",
  "--halo-search-widget-muted-color",
  "--halo-search-widget-content-color",
  "--halo-search-widget-base-bg-color",
  "--halo-search-widget-modal-bg-color",
  "--halo-search-widget-modal-layer-color",
  "--halo-search-widget-hit-bg-color",
  "--halo-search-widget-divider-color",
  "--halo-search-widget-kbd-border-color",
  "--halo-search-widget-kbd-shadow",
];
const COMMENT_CSS_VARIABLES = [
  "--halo-cw-base-font-family",
  "--halo-cw-base-font-size",
  "--halo-cw-base-rounded",
  "--halo-cw-primary-1-color",
  "--halo-cw-primary-2-color",
  "--halo-cw-primary-3-color",
  "--halo-cw-text-1-color",
  "--halo-cw-text-2-color",
  "--halo-cw-text-3-color",
  "--halo-cw-muted-1-color",
  "--halo-cw-muted-2-color",
  "--halo-cw-muted-3-color",
  "--halo-cw-avatar-rounded",
  "--halo-cw-avatar-size",
  "--halo-cw-emoji-picker-rgb-color",
  "--halo-cw-emoji-picker-rgb-accent",
  "--halo-cw-emoji-picker-rgb-background",
  "--halo-cw-emoji-picker-rgb-input",
  "--halo-cw-emoji-picker-color-border",
  "--halo-cw-emoji-picker-color-border-over",
];
const COMMENT_ADAPTIVE_EMOJI_COLORS = new Map([
  ["--halo-cw-emoji-picker-rgb-color", "from var(--terminal-text) r g b"],
  ["--halo-cw-emoji-picker-rgb-accent", "from var(--terminal-text) r g b"],
  ["--halo-cw-emoji-picker-rgb-background", "from var(--terminal-bg) r g b"],
  ["--halo-cw-emoji-picker-rgb-input", "from var(--terminal-bg) r g b"],
]);
const HYPERLINK_CSS_VARIABLES = [
  "--halo-hyperlink-card-bg-color",
  "--halo-hyperlink-card-inline-bg-color",
  "--halo-hyperlink-card-inline-hover-bg-color",
  "--halo-hyperlink-card-title-color",
  "--halo-hyperlink-card-inline-title-color",
  "--halo-hyperlink-card-description-color",
  "--halo-hyperlink-card-link-color",
  "--halo-hyperlink-card-bg-gradient",
  "--halo-hyperlink-card-border-color",
  "--halo-hyperlink-card-border-hover-color",
  "--halo-hyperlink-card-skeleton-color",
];

function plainCell(value = "") {
  return value.trim().replaceAll("`", "").replaceAll("**", "").replaceAll("&gt;", ">").replaceAll("<br>", " ");
}

function optionalVersion(value) {
  const normalized = plainCell(value);
  return normalized === "—" || normalized === "-" ? "" : normalized;
}

function parseEvidenceReferences(value) {
  return plainCell(value)
    .split(",")
    .map((reference) => reference.trim());
}

function splitMarkdownRow(line) {
  const trimmed = line.trim();
  if (!trimmed.startsWith("|") || !trimmed.endsWith("|")) {
    return [];
  }

  return trimmed
    .slice(1, -1)
    .split("|")
    .map((cell) => cell.trim());
}

function isSeparatorRow(cells) {
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

export function parseMarkdownTable(markdown, heading) {
  const lines = markdown.split(/\r?\n/);
  const headingIndex = lines.findIndex((line) => line.trim() === `## ${heading}`);
  if (headingIndex === -1) {
    return { headers: [], rows: [] };
  }

  let headerIndex = -1;
  for (let index = headingIndex + 1; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (line.startsWith("## ")) {
      break;
    }
    if (line.startsWith("|") && line.endsWith("|")) {
      headerIndex = index;
      break;
    }
  }

  if (headerIndex === -1) {
    return { headers: [], rows: [] };
  }

  const headers = splitMarkdownRow(lines[headerIndex]).map(plainCell);
  const separator = splitMarkdownRow(lines[headerIndex + 1] ?? "");
  if (separator.length !== headers.length || !isSeparatorRow(separator)) {
    return { headers, rows: [] };
  }

  const rows = [];
  for (let index = headerIndex + 2; index < lines.length; index += 1) {
    const cells = splitMarkdownRow(lines[index]);
    if (cells.length === 0) {
      break;
    }
    if (cells.length !== headers.length) {
      rows.push({ __invalidColumnCount: String(cells.length) });
      continue;
    }

    rows.push(Object.fromEntries(headers.map((header, cellIndex) => [header, cells[cellIndex]])));
  }

  return { headers, rows };
}

export function parseVersionContext(markdown) {
  const table = parseMarkdownTable(markdown, "Version context");
  const context = Object.fromEntries(
    table.rows.filter((row) => row.Key).map((row) => [plainCell(row.Key), plainCell(row.Value)]),
  );
  return { context, headers: table.headers, rows: table.rows };
}

export function parseRuntimeInventory(markdown) {
  const table = parseMarkdownTable(markdown, "Runtime inventory");
  return {
    headers: table.headers,
    rows: table.rows.map((row) => ({
      evidence: plainCell(row.Evidence),
      installedVersion: plainCell(row["Installed version"]),
      plugin: plainCell(row.Plugin),
      runtimeId: plainCell(row["Runtime ID"]),
      state: plainCell(row.State),
    })),
  };
}

export function parseCompatibilityMatrix(markdown) {
  const table = parseMarkdownTable(markdown, "Compatibility matrix");
  return {
    headers: table.headers,
    rows: table.rows.map((row) => ({
      contractVersion: plainCell(row["Contract version"]),
      evidence: plainCell(row.Evidence),
      evidenceIds: parseEvidenceReferences(row.Evidence),
      installedVersion: plainCell(row["Installed version"]),
      latestVerifiedUpstream: plainCell(row["Latest verified upstream"]),
      plugin: plainCell(row.Plugin),
      sharedSourceBaseline: plainCell(row["Shared source baseline"]),
      status: plainCell(row.Status),
      surface: plainCell(row.Surface),
      testedVersion: optionalVersion(row["Tested version"]),
    })),
  };
}

export function parseVerificationLedger(markdown) {
  const table = parseMarkdownTable(markdown, "Verification ledger");
  return {
    headers: table.headers,
    rows: table.rows.map((row) => ({
      date: plainCell(row.Date),
      environment: plainCell(row.Environment),
      evidenceId: plainCell(row["Evidence ID"]),
      evidenceType: plainCell(row["Evidence type"]),
      notes: plainCell(row.Notes),
      plugin: plainCell(row.Plugin),
      result: plainCell(row.Result),
      scope: plainCell(row.Scope),
      version: plainCell(row.Version),
    })),
  };
}

export function parseStaticOnlySurfaces(markdown) {
  const table = parseMarkdownTable(markdown, "Static-only / live-not-run surfaces");
  return {
    headers: table.headers,
    rows: table.rows.map((row) => ({
      plugin: plainCell(row.Plugin),
      state: plainCell(row.State),
      surface: plainCell(row["Static-only surface"]),
      surfaceIds: parseEvidenceReferences(row["Surface IDs"]),
    })),
  };
}

function parseSemver(value) {
  const match = value.match(/^(\d+)\.(\d+)\.(\d+)$/);
  return match ? match.slice(1).map(Number) : null;
}

function parseMinimumRange(value) {
  const match = value.match(/^>=(\d+\.\d+\.\d+)$/);
  return match ? parseSemver(match[1]) : null;
}

function compareVersionParts(left, right) {
  for (let index = 0; index < 3; index += 1) {
    if (left[index] !== right[index]) {
      return left[index] - right[index];
    }
  }
  return 0;
}

export function satisfiesMinimum(version, minimumRange) {
  const parsedVersion = parseSemver(version);
  const parsedMinimum = parseMinimumRange(minimumRange);
  return Boolean(parsedVersion && parsedMinimum && compareVersionParts(parsedVersion, parsedMinimum) >= 0);
}

function extractThemeRequires(themeYaml) {
  return themeYaml.match(/^\s*requires:\s*["']?([^\s"']+)["']?\s*$/m)?.[1] ?? "";
}

function extractThemeVersion(themeYaml) {
  return themeYaml.match(/^ {2}version:\s*["']?([^\s"']+)["']?\s*$/m)?.[1] ?? "";
}

function addIssue(issues, area, message) {
  issues.push(`[${area}] ${message}`);
}

function expectIncludes(issues, area, content, fragment, message) {
  if (!content.includes(fragment)) {
    addIssue(issues, area, message);
  }
}

function expectPattern(issues, area, content, pattern, message) {
  if (!pattern.test(content)) {
    addIssue(issues, area, message);
  }
}

function expectHeaders(issues, area, actual, required) {
  for (const header of required) {
    if (!actual.includes(header)) {
      addIssue(issues, area, `缺少列：${header}`);
    }
  }
}

function extractCssRuleBody(content, selectorPattern) {
  const match = selectorPattern.exec(content);
  if (!match) {
    return "";
  }

  const openingBraceIndex = content.indexOf("{", match.index);
  if (openingBraceIndex === -1) {
    return "";
  }

  let depth = 0;
  for (let index = openingBraceIndex; index < content.length; index += 1) {
    if (content[index] === "{") {
      depth += 1;
    } else if (content[index] === "}") {
      depth -= 1;
      if (depth === 0) {
        return content.slice(openingBraceIndex + 1, index);
      }
    }
  }

  return "";
}

function hasCssVariableDeclaration(content, variable) {
  const uncommentedContent = content.replace(/\/\*[\s\S]*?\*\//g, "");
  const escapedVariable = variable.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`${escapedVariable}\\s*:`).test(uncommentedContent);
}

function cssVariableValue(content, variable) {
  const uncommentedContent = content.replace(/\/\*[\s\S]*?\*\//g, "");
  const escapedVariable = variable.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return uncommentedContent.match(new RegExp(`${escapedVariable}\\s*:\\s*([^;]+);`))?.[1].trim() ?? "";
}

function validateVersionAndEvidenceContract(files, issues) {
  const document = files["docs/plugin-adaptation.md"];
  const versionContext = parseVersionContext(document);
  const inventory = parseRuntimeInventory(document);
  const matrix = parseCompatibilityMatrix(document);
  const ledger = parseVerificationLedger(document);
  const staticOnlySurfaces = parseStaticOnlySurfaces(document);

  expectHeaders(issues, "version-context", versionContext.headers, ["Key", "Value", "Evidence"]);
  expectHeaders(issues, "runtime-inventory", inventory.headers, [
    "Plugin",
    "Runtime ID",
    "Installed version",
    "State",
    "Evidence",
  ]);
  expectHeaders(issues, "compatibility-matrix", matrix.headers, MATRIX_HEADERS);
  expectHeaders(issues, "verification-ledger", ledger.headers, [
    "Evidence ID",
    "Date",
    "Environment",
    "Plugin",
    "Version",
    "Result",
    "Scope",
    "Notes",
    "Evidence type",
  ]);
  expectHeaders(issues, "static-only-surfaces", staticOnlySurfaces.headers, [
    "Plugin",
    "Static-only surface",
    "Surface IDs",
    "State",
  ]);

  const themeRequires = extractThemeRequires(files["theme.yaml"]);
  const themeVersion = extractThemeVersion(files["theme.yaml"]);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(versionContext.context.snapshotDate ?? "")) {
    addIssue(issues, "version-context", "snapshotDate 必须是 YYYY-MM-DD");
  }
  if (!versionContext.context.runtimeTarget?.trim()) {
    addIssue(issues, "version-context", "runtimeTarget 不能为空");
  }
  if (!parseSemver(versionContext.context.runtimeHaloVersion ?? "")) {
    addIssue(issues, "version-context", "runtimeHaloVersion 必须是 x.y.z");
  }
  if (!parseMinimumRange(versionContext.context.shikiHaloRequires ?? "")) {
    addIssue(issues, "version-context", "shikiHaloRequires 必须是 >=x.y.z");
  }
  if (versionContext.context.themeHaloRequires !== themeRequires) {
    addIssue(issues, "version-context", "themeHaloRequires 必须动态匹配 theme.yaml spec.requires");
  }

  if (!parseMinimumRange(themeRequires)) {
    addIssue(issues, "halo-version", `theme.yaml spec.requires 必须是 >=x.y.z，当前为 ${themeRequires || "空"}`);
  }
  if (!parseSemver(themeVersion)) {
    addIssue(issues, "theme-version", `theme.yaml spec.version 必须是 x.y.z，当前为 ${themeVersion || "空"}`);
  }
  if (!satisfiesMinimum(versionContext.context.runtimeHaloVersion ?? "", themeRequires)) {
    addIssue(issues, "halo-version", "当前 Halo 运行版本不满足主题核心最低版本");
  }
  if (
    !satisfiesMinimum(versionContext.context.runtimeHaloVersion ?? "", versionContext.context.shikiHaloRequires ?? "")
  ) {
    addIssue(issues, "shiki-version", "当前 Halo 运行版本不满足 plugin-shiki 1.4.1 的 >=2.25.0 条件");
  }
  expectPattern(
    issues,
    "shiki-version",
    document,
    /plugin-shiki[^\n]*可选插件[^\n]*不会把主题核心最低版本[^\n]*>=2\.23\.0/,
    "文档必须说明 Shiki 是可选插件，不能因此抬高主题核心最低版本",
  );

  const inventoryByPlugin = new Map(inventory.rows.map((row) => [row.plugin, row]));
  const matrixByPlugin = new Map(matrix.rows.map((row) => [row.plugin, row]));
  const staticOnlyByPlugin = new Map(staticOnlySurfaces.rows.map((row) => [row.plugin, row]));
  const evidenceIds = new Set();
  for (const entry of ledger.rows) {
    if (!entry.evidenceId) {
      addIssue(issues, "verification-ledger", "Evidence ID 不能为空");
      continue;
    }
    if (evidenceIds.has(entry.evidenceId)) {
      addIssue(issues, "verification-ledger", `Evidence ID 必须唯一：${entry.evidenceId}`);
      continue;
    }
    evidenceIds.add(entry.evidenceId);
  }

  const requiredPluginNames = Object.keys(REQUIRED_PLUGIN_SURFACES);
  if (inventory.rows.length !== requiredPluginNames.length || inventoryByPlugin.size !== inventory.rows.length) {
    addIssue(issues, "runtime-inventory", "运行态清单必须且只能覆盖当前四个主题插件契约");
  }
  if (matrix.rows.length !== requiredPluginNames.length || matrixByPlugin.size !== matrix.rows.length) {
    addIssue(issues, "compatibility-matrix", "兼容矩阵必须且只能覆盖当前四个主题插件契约");
  }
  if (
    staticOnlySurfaces.rows.length !== requiredPluginNames.length ||
    staticOnlyByPlugin.size !== staticOnlySurfaces.rows.length ||
    staticOnlySurfaces.rows.some((row) => !requiredPluginNames.includes(row.plugin))
  ) {
    addIssue(issues, "static-only-surfaces", "静态验证范围必须且只能覆盖当前四个主题插件契约");
  }

  for (const [plugin, requiredSurface] of Object.entries(REQUIRED_PLUGIN_SURFACES)) {
    const staticOnly = staticOnlyByPlugin.get(plugin);
    if (!staticOnly) {
      addIssue(issues, "static-only-surfaces", `缺少 ${plugin}`);
    } else {
      if (staticOnly.state !== "static-guarded / live-not-run") {
        addIssue(
          issues,
          "static-only-surfaces",
          `${plugin} State 必须是 static-guarded / live-not-run，当前为 ${staticOnly.state || "空"}`,
        );
      }
      if (!staticOnly.surface) {
        addIssue(issues, "static-only-surfaces", `${plugin} Static-only surface 不能为空`);
      }
      const nonEmptySurfaceIds = staticOnly.surfaceIds.filter(Boolean);
      if (nonEmptySurfaceIds.length !== staticOnly.surfaceIds.length) {
        addIssue(issues, "static-only-surfaces", `${plugin} Surface IDs 不能为空`);
      }
      if (new Set(nonEmptySurfaceIds).size !== nonEmptySurfaceIds.length) {
        addIssue(issues, "static-only-surfaces", `${plugin} Surface IDs 不能重复`);
      }
      const actualSurfaceIds = new Set(nonEmptySurfaceIds);
      for (const surfaceId of requiredSurface.staticOnlyIds) {
        if (!actualSurfaceIds.has(surfaceId)) {
          addIssue(issues, "static-only-surfaces", `${plugin} 缺少 Surface ID：${surfaceId}`);
        }
      }
      for (const surfaceId of actualSurfaceIds) {
        if (!requiredSurface.staticOnlyIds.includes(surfaceId)) {
          addIssue(issues, "static-only-surfaces", `${plugin} 使用未知 Surface ID：${surfaceId}`);
        }
      }
    }

    const runtime = inventoryByPlugin.get(plugin);
    if (!runtime) {
      addIssue(issues, "runtime-inventory", `缺少 ${plugin}`);
    } else {
      if (!runtime.runtimeId) {
        addIssue(issues, "runtime-inventory", `${plugin} Runtime ID 不能为空`);
      } else if (runtime.runtimeId !== requiredSurface.runtimeId) {
        addIssue(
          issues,
          "runtime-inventory",
          `${plugin} Runtime ID 必须是 ${requiredSurface.runtimeId}，当前为 ${runtime.runtimeId}`,
        );
      }
      if (!parseSemver(runtime.installedVersion)) {
        addIssue(issues, "runtime-inventory", `${plugin} Installed version 必须是 x.y.z`);
      }
      if (runtime.state !== "started") {
        addIssue(issues, "runtime-inventory", `${plugin} 当前运行态应记录为 started`);
      }
      if (!runtime.evidence) {
        addIssue(issues, "runtime-inventory", `${plugin} Evidence 不能为空`);
      }
    }

    const row = matrixByPlugin.get(plugin);
    if (!row) {
      addIssue(issues, "compatibility-matrix", `缺少 ${plugin}`);
      continue;
    }

    if (runtime && row.installedVersion !== runtime.installedVersion) {
      addIssue(issues, "compatibility-matrix", `${plugin} Installed version 必须与运行态清单一致`);
    }
    for (const token of requiredSurface.surfaceTokens) {
      if (!row.surface.includes(token)) {
        addIssue(issues, "compatibility-matrix", `${plugin} 已确认 Surface 缺少 ${token}`);
      }
    }

    if (!parseSemver(row.installedVersion) || !parseSemver(row.contractVersion)) {
      addIssue(issues, "compatibility-matrix", `${plugin} installed / contract 必须是 x.y.z 版本`);
    }
    if (row.sharedSourceBaseline !== "unavailable" && !parseSemver(row.sharedSourceBaseline)) {
      addIssue(issues, "compatibility-matrix", `${plugin} source baseline 必须是 x.y.z 或 unavailable`);
    }
    if (row.sharedSourceBaseline === "unavailable" && !requiredSurface.allowUnavailableSourceBaseline) {
      addIssue(issues, "compatibility-matrix", `${plugin} 已有共享 source skill，不能标记为 unavailable`);
    }
    if (!parseSemver(row.latestVerifiedUpstream)) {
      addIssue(issues, "compatibility-matrix", `${plugin} latest verified upstream 必须是 x.y.z`);
    }
    if (!ALLOWED_STATUSES.has(row.status)) {
      addIssue(issues, "compatibility-matrix", `${plugin} 使用了不允许的 Status：${row.status}`);
    }
    if (row.testedVersion && !parseSemver(row.testedVersion)) {
      addIssue(issues, "compatibility-matrix", `${plugin} Tested version 必须是 x.y.z 或 —`);
    }

    if (row.evidenceIds.length === 0 || row.evidenceIds.some((evidenceId) => !evidenceId)) {
      addIssue(issues, "compatibility-matrix", `${plugin} Evidence 引用不能为空，且必须使用逗号分隔的完整 ID`);
    }
    const nonEmptyEvidenceIds = row.evidenceIds.filter(Boolean);
    if (new Set(nonEmptyEvidenceIds).size !== nonEmptyEvidenceIds.length) {
      addIssue(issues, "compatibility-matrix", `${plugin} Evidence 引用不能重复`);
    }
    for (const evidenceId of nonEmptyEvidenceIds) {
      if (!evidenceIds.has(evidenceId)) {
        addIssue(issues, "verification-ledger", `${plugin} 引用了未知 Evidence ID：${evidenceId}`);
      }
    }

    const referencedEvidenceIds = new Set(nonEmptyEvidenceIds);
    const referencedEvidence = ledger.rows.filter(
      (entry) => entry.plugin === plugin && referencedEvidenceIds.has(entry.evidenceId),
    );
    if (referencedEvidence.length === 0) {
      addIssue(issues, "verification-ledger", `${plugin} 矩阵行没有引用对应证据`);
    }
    if (row.status === "confirmed" || row.status === "compatible-tested") {
      if (row.status === "confirmed" && row.contractVersion !== row.installedVersion) {
        addIssue(issues, "compatibility-matrix", `${plugin} confirmed 要求 Contract version 与 Installed version 一致`);
      }
      if (row.status === "compatible-tested") {
        const contractVersion = parseSemver(row.contractVersion);
        const installedVersion = parseSemver(row.installedVersion);
        if (!contractVersion || !installedVersion || compareVersionParts(contractVersion, installedVersion) >= 0) {
          addIssue(
            issues,
            "compatibility-matrix",
            `${plugin} compatible-tested 要求 Contract version 早于已验证的 Installed version`,
          );
        }
      }
      if (row.testedVersion !== row.installedVersion) {
        addIssue(issues, "verification-ledger", `${plugin} 的已确认状态必须由当前 Installed version 的真页测试支持`);
      }
      const hasMatchingPass = referencedEvidence.some(
        (entry) =>
          entry.evidenceType === "live-page" &&
          entry.environment !== "repository" &&
          entry.result === "pass" &&
          entry.version === row.testedVersion &&
          entry.scope.length > 0,
      );
      if (!row.testedVersion || !hasMatchingPass) {
        addIssue(issues, "verification-ledger", `${plugin} 的已确认状态缺少同版本真页 pass 证据`);
      }
      const matchingPassEvidence = referencedEvidence.find(
        (entry) =>
          entry.evidenceType === "live-page" &&
          entry.environment !== "repository" &&
          entry.result === "pass" &&
          entry.version === row.testedVersion,
      );
      for (const token of requiredSurface.evidenceTokens) {
        if (!matchingPassEvidence?.scope.includes(token)) {
          addIssue(issues, "verification-ledger", `${plugin} 真页证据 Scope 缺少 ${token}`);
        }
      }
    }
  }

  for (const entry of ledger.rows) {
    if (!LIVE_RESULTS.has(entry.result)) {
      addIssue(issues, "verification-ledger", `${entry.evidenceId || "未知证据"} Result 非法：${entry.result}`);
    }
    if (!EVIDENCE_TYPES.has(entry.evidenceType)) {
      addIssue(
        issues,
        "verification-ledger",
        `${entry.evidenceId || "未知证据"} Evidence type 非法：${entry.evidenceType || "空"}`,
      );
    } else if (entry.evidenceType === "live-page" && (!entry.environment || entry.environment === "repository")) {
      addIssue(
        issues,
        "verification-ledger",
        `${entry.evidenceId || "未知证据"} live-page 证据必须记录非 repository 真页环境`,
      );
    } else if (entry.evidenceType === "repository-static" && entry.environment !== "repository") {
      addIssue(
        issues,
        "verification-ledger",
        `${entry.evidenceId || "未知证据"} repository-static 证据的 Environment 必须是 repository`,
      );
    }
  }

  const staticEvidence = ledger.rows.find(
    (entry) =>
      entry.evidenceType === "repository-static" &&
      entry.environment === "repository" &&
      entry.plugin === "all listed surfaces",
  );
  if (!staticEvidence || staticEvidence.result !== "pass") {
    addIssue(issues, "verification-ledger", "缺少 repository 环境的静态契约验证通过记录");
  } else if (staticEvidence.version !== "theme.yaml spec.version") {
    addIssue(issues, "verification-ledger", "静态契约证据版本必须动态引用 theme.yaml spec.version");
  }

  versionContext.context.resolvedThemeVersion = themeVersion;

  return { ledger, matrix, versionContext };
}

function validateSearchContract(files, issues) {
  const layout = files["templates/modules/layout.html"];
  const actionSource = files["src/common/ui-actions.ts"];
  const commandSource = files["src/features/commands.ts"];
  const settings = files["settings.yaml"];
  const searchActionIndex = layout.indexOf('data-terminal-action="search"');
  const searchButtonStart = layout.lastIndexOf("<button", searchActionIndex);
  const searchButtonEnd = layout.indexOf(">", searchActionIndex);
  const searchButton =
    searchActionIndex >= 0 && searchButtonStart >= 0 && searchButtonEnd >= 0
      ? layout.slice(searchButtonStart, searchButtonEnd + 1)
      : "";

  expectPattern(
    issues,
    "search-template",
    searchButton,
    /th:if="\$\{[^"]*show_search\s*!=\s*false[^"]*pluginFinder\.available\('PluginSearchWidget'\)[^"]*\}"/,
    "搜索按钮必须同时受 show_search 和 PluginSearchWidget 可用性 guard 保护",
  );
  expectIncludes(issues, "search-template", searchButton, 'type="button"', "搜索入口必须是 button");
  expectIncludes(
    issues,
    "search-template",
    searchButton,
    'data-terminal-action="search"',
    "搜索入口必须绑定 terminal search action",
  );
  expectPattern(
    issues,
    "search-action",
    actionSource,
    /SearchWidget[\s\S]*typeof searchWidget\?\.open === "function"[\s\S]*searchWidget\.open\(\)/,
    "UI action 必须检测并调用 SearchWidget.open()",
  );
  expectPattern(
    issues,
    "search-command",
    commandSource,
    /openSearchWidget\(\)/,
    "search 命令必须复用带焦点恢复的 SearchWidget.open() 集成",
  );
  expectPattern(issues, "search-settings", settings, /^\s*id:\s*show_search\s*$/m, "设置中缺少 show_search");
}

function validateCommentContract(files, issues) {
  const post = files["templates/post.html"];
  const page = files["templates/page.html"];
  const settings = files["settings.yaml"];
  const guardPattern = /th:if="\$\{theme\.config\.features\?\.show_comments\s*==\s*true\s+and\s+haloCommentEnabled\}"/;

  expectPattern(
    issues,
    "comment-post",
    post,
    guardPattern,
    "Post 评论必须同时检查 show_comments 与 haloCommentEnabled",
  );
  expectPattern(
    issues,
    "comment-post",
    post,
    /<halo:comment\s+group="content\.halo\.run"\s+kind="Post"\s+th:attr="name=\$\{post\.metadata\.name\}"\s*><\/halo:comment>/,
    "Post 必须使用正确的 halo:comment group / kind / name",
  );
  expectIncludes(
    issues,
    "comment-post",
    post,
    'data-navigation-exit="full"',
    "Post 评论页离开时必须使用整页导航释放 CommentWidget observer",
  );
  expectPattern(
    issues,
    "comment-page",
    page,
    guardPattern,
    "SinglePage 评论必须同时检查 show_comments 与 haloCommentEnabled",
  );
  expectPattern(
    issues,
    "comment-page",
    page,
    /<halo:comment\s+group="content\.halo\.run"\s+kind="SinglePage"\s+th:attr="name=\$\{singlePage\.metadata\.name\}"\s*><\/halo:comment>/,
    "SinglePage 必须使用正确的 halo:comment group / kind / name",
  );
  expectIncludes(
    issues,
    "comment-page",
    page,
    'data-navigation-exit="full"',
    "SinglePage 评论页离开时必须使用整页导航释放 CommentWidget observer",
  );
  expectPattern(issues, "comment-settings", settings, /^\s*id:\s*show_comments\s*$/m, "设置中缺少 show_comments");
}

function validateCssContract(files, issues) {
  const baseCss = files["src/styles/base.css"];
  const contentCss = files["src/styles/content.css"];
  const terminalPluginScope = extractCssRuleBody(baseCss, /html\.terminal-theme\.color-scheme-dark\s*\{/);
  const hyperlinkPluginScope = extractCssRuleBody(
    contentCss,
    /\.terminal-theme\s+hyperlink-card\s*,\s*\.terminal-theme\s+hyperlink-inline-card\s*\{/,
  );

  expectPattern(
    issues,
    "plugin-css",
    baseCss,
    /html\.terminal-theme\.color-scheme-dark\s*\{/,
    "搜索与评论变量必须限定在主题暗色根节点",
  );
  for (const variable of SEARCH_CSS_VARIABLES) {
    if (!hasCssVariableDeclaration(terminalPluginScope, variable)) {
      addIssue(issues, "search-css", `暗色主题作用域缺少搜索插件变量 ${variable}`);
    }
  }
  for (const variable of COMMENT_CSS_VARIABLES) {
    if (!hasCssVariableDeclaration(terminalPluginScope, variable)) {
      addIssue(issues, "comment-css", `暗色主题作用域缺少评论插件变量 ${variable}`);
    }
  }
  for (const [variable, expectedValue] of COMMENT_ADAPTIVE_EMOJI_COLORS) {
    if (cssVariableValue(terminalPluginScope, variable) !== expectedValue) {
      addIssue(issues, "comment-css", `${variable} 必须从当前终端主题变量派生，不能写死 RGB 色值`);
    }
  }

  expectPattern(
    issues,
    "shiki-css",
    contentCss,
    /\.terminal-content pre,\s*\.terminal-content shiki-code\s*\{[\s\S]*?overflow-x:\s*auto;/,
    "shiki-code 必须继承终端代码块边框、背景与横向滚动契约",
  );
  expectIncludes(
    issues,
    "hyperlink-css",
    contentCss,
    ".terminal-content hyperlink-card",
    "缺少块超链接卡片 DOM 选择器",
  );
  expectIncludes(
    issues,
    "hyperlink-css",
    contentCss,
    ".terminal-content hyperlink-inline-card",
    "缺少行内超链接卡片 DOM 选择器",
  );
  for (const theme of ["regular", "small", "grid"]) {
    expectIncludes(
      issues,
      "hyperlink-css",
      contentCss,
      `hyperlink-card[theme="${theme}"]`,
      `缺少 hyperlink-card ${theme} 主题选择器`,
    );
  }
  for (const variable of HYPERLINK_CSS_VARIABLES) {
    if (!hasCssVariableDeclaration(hyperlinkPluginScope, variable)) {
      addIssue(issues, "hyperlink-css", `超链接卡片组件作用域缺少变量 ${variable}`);
    }
  }
  expectIncludes(
    issues,
    "hyperlink-css",
    hyperlinkPluginScope,
    "color-scheme: dark",
    "超链接卡片变量作用域必须声明暗色 color-scheme",
  );
}

function validatePartialNavigationScriptContract(files, issues) {
  const navigation = files["src/common/navigation.ts"];
  const themeStyle = files["templates/modules/theme-style.html"];
  const runtime = files["src/common/runtime.ts"];

  expectIncludes(
    issues,
    "partial-navigation",
    runtime,
    "querySelectorAll<HTMLScriptElement>('script[type=\"module\"][data-pjax]')",
    "原生局部导航只允许重放显式 data-pjax 的 module script",
  );
  expectIncludes(
    issues,
    "partial-navigation",
    runtime,
    'script.getAttribute("src")',
    "原生局部导航脚本重放必须区分外部与内联模块",
  );
  expectIncludes(
    issues,
    "partial-navigation",
    runtime,
    "clone.textContent = script.textContent",
    "原生局部导航必须重放 CommentWidget 显式 opt-in 的内联 module script",
  );
  expectIncludes(
    issues,
    "partial-navigation",
    runtime,
    "MODULE_REPLAY_EVENT_PREFIX",
    "内联 module script 必须提供执行完成信号",
  );
  expectIncludes(
    issues,
    "partial-navigation",
    runtime,
    "window.addEventListener(completionEventName",
    "内联 module script 必须等待执行完成信号",
  );
  expectIncludes(
    issues,
    "partial-navigation",
    runtime,
    "window.dispatchEvent(new Event",
    "内联 module script 必须在执行完成后发送信号",
  );
  expectIncludes(
    issues,
    "partial-navigation",
    runtime,
    'PJAX_COMPAT_COMPLETE_EVENT = "pjax:complete"',
    "必须保留 Shiki extraPathPatterns 的局部导航兼容事件",
  );
  expectIncludes(
    issues,
    "partial-navigation",
    runtime,
    "window.dispatchEvent(new CustomEvent(PJAX_COMPAT_COMPLETE_EVENT))",
    "必须在 window 上触发 Shiki 局部导航兼容事件",
  );
  expectIncludes(
    issues,
    "partial-navigation",
    navigation,
    "getHeadNavigationContractSignatures",
    "必须比较页面元数据和未标记内联样式以外的 head 生命周期契约",
  );
  expectIncludes(
    issues,
    "partial-navigation",
    navigation,
    "isInertInlineStyleElement",
    "未标记内联样式不得误触发整页导航",
  );
  expectIncludes(
    issues,
    "partial-navigation",
    navigation,
    'THEME_NAVIGATION_STYLE_ATTRIBUTE = "data-theme-navigation-style"',
    "主题声明式内联样式必须纳入 head 生命周期契约",
  );
  expectIncludes(
    issues,
    "partial-navigation",
    themeStyle,
    "data-theme-navigation-style",
    "主题声明式样式必须带有 head 生命周期标记",
  );
  expectIncludes(
    issues,
    "partial-navigation",
    navigation,
    "headNavigationContractChanged(parsedDocument, finalTarget)",
    "head 生命周期契约变化时必须切换为整页导航",
  );
  expectIncludes(
    issues,
    "partial-navigation",
    navigation,
    "syncPageMetadata(parsedDocument)",
    "局部导航必须同步 Halo 输出的页面元数据",
  );
  expectIncludes(
    issues,
    "partial-navigation",
    navigation,
    'NAVIGATION_FULL_RELOAD_EVENT = "theme:navigation-full-reload"',
    "整页导航意图必须使旧的插件初始化与回退逻辑失效",
  );
  expectIncludes(
    issues,
    "partial-navigation",
    navigation,
    'NAVIGATION_FULL_RELOAD_RESET_EVENT = "theme:navigation-full-reload-reset"',
    "整页导航被阻止或 BFCache 恢复时必须解除生命周期锁",
  );
  expectIncludes(
    issues,
    "partial-navigation",
    navigation,
    "this.prepareForFullNavigation(target)",
    "整页导航前必须取消仍在进行的局部导航",
  );
  expectIncludes(
    issues,
    "partial-navigation",
    runtime,
    "document.addEventListener(NAVIGATION_FULL_RELOAD_EVENT",
    "运行时必须同步锁定整页导航生命周期",
  );
  expectIncludes(
    issues,
    "partial-navigation",
    runtime,
    "new URL(source, window.location.href)",
    "原生局部导航脚本重放必须标准化脚本 URL",
  );
  expectIncludes(
    issues,
    "partial-navigation",
    runtime,
    "sourceUrl.origin !== window.location.origin",
    "原生局部导航脚本重放必须拒绝跨源脚本",
  );
  expectIncludes(
    issues,
    "partial-navigation",
    runtime,
    '["http:", "https:"]',
    "原生局部导航脚本重放必须限制 http / https 协议",
  );
  expectIncludes(
    issues,
    "partial-navigation",
    runtime,
    'document.createElement("script")',
    "原生局部导航脚本重放必须创建新的 script 节点",
  );
  expectIncludes(
    issues,
    "partial-navigation",
    runtime,
    'clone.type = "module"',
    "原生局部导航重放的新脚本必须保留 module 类型",
  );
  expectIncludes(
    issues,
    "partial-navigation",
    runtime,
    "clone.src = sourceUrl.toString()",
    "原生局部导航重放的新脚本必须使用已校验 URL",
  );
  expectIncludes(
    issues,
    "partial-navigation",
    runtime,
    'sourceUrl.searchParams.set("_theme_navigation"',
    "原生局部导航必须为外部 module script 生成逐次求值的唯一 URL",
  );
  for (const attribute of ["crossorigin", "integrity", "nonce", "referrerpolicy"]) {
    expectIncludes(
      issues,
      "partial-navigation",
      runtime,
      `"${attribute}"`,
      `原生局部导航脚本重放必须保留 ${attribute}`,
    );
  }
  expectPattern(
    issues,
    "partial-navigation",
    runtime,
    /\[\s*"crossorigin",\s*"integrity",\s*"nonce",\s*"referrerpolicy"\s*\]/,
    "原生局部导航脚本重放必须保留 nonce",
  );
  expectIncludes(
    issues,
    "partial-navigation",
    runtime,
    "script.replaceWith(clone)",
    "原生局部导航脚本重放必须替换原脚本节点",
  );
  expectPattern(
    issues,
    "partial-navigation",
    runtime,
    /async function initializeReplacedPage[\s\S]*?await replayNavigationScripts\(main\)[\s\S]*?Alpine\.initTree\(main\)/,
    "原生局部导航必须等待模块重放完成后再初始化 Alpine",
  );
  expectIncludes(
    issues,
    "partial-navigation",
    runtime,
    "await Promise.all(pendingScripts)",
    "原生局部导航必须等待全部 opt-in 模块完成",
  );
}

function validateHaloCoreContract(files, issues) {
  expectIncludes(
    issues,
    "halo-core",
    files["templates/modules/layout.html"],
    "<halo:footer />",
    "布局模板必须保留 Halo Core footer 注入点",
  );
}

export function validatePluginContracts(files) {
  const issues = [];
  for (const path of CONTRACT_FILES) {
    if (typeof files[path] !== "string") {
      addIssue(issues, "files", `缺少必需文件：${path}`);
    }
  }
  if (issues.length > 0) {
    return { context: {}, evidenceRows: [], issues, matrixRows: [] };
  }

  const { ledger, matrix, versionContext } = validateVersionAndEvidenceContract(files, issues);
  validateSearchContract(files, issues);
  validateCommentContract(files, issues);
  validateCssContract(files, issues);
  validatePartialNavigationScriptContract(files, issues);
  validateHaloCoreContract(files, issues);

  return {
    context: versionContext.context,
    evidenceRows: ledger.rows,
    issues,
    matrixRows: matrix.rows,
  };
}

export function readContractFiles(rootDirectory) {
  return Object.fromEntries(
    CONTRACT_FILES.map((path) => {
      const absolutePath = resolve(rootDirectory, path);
      if (!existsSync(absolutePath)) {
        throw new Error(`Missing required contract file: ${path}`);
      }
      return [path, readFileSync(absolutePath, "utf8")];
    }),
  );
}

export function validateRepository(rootDirectory) {
  return validatePluginContracts(readContractFiles(rootDirectory));
}

function runCli() {
  const defaultRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
  const rootDirectory = process.argv[2] ? resolve(process.argv[2]) : defaultRoot;

  try {
    const result = validateRepository(rootDirectory);
    if (result.issues.length > 0) {
      console.error("Plugin compatibility contract validation failed:");
      for (const issue of result.issues) {
        console.error(`- ${issue}`);
      }
      process.exitCode = 1;
      return;
    }

    console.log("Plugin compatibility contract validation passed.");
    console.log(`- Matrix rows: ${result.matrixRows.length}`);
    console.log(`- Evidence records: ${result.evidenceRows.length}`);
    console.log(`- Halo runtime: ${result.context.runtimeHaloVersion}`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : "";
if (invokedPath === fileURLToPath(import.meta.url)) {
  runCli();
}
