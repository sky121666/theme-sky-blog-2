import assert from "node:assert/strict";
import test from "node:test";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  REQUIRED_PLUGIN_SURFACES,
  parseCompatibilityMatrix,
  parseStaticOnlySurfaces,
  readContractFiles,
  satisfiesMinimum,
  validatePluginContracts,
} from "./plugin-contracts.mjs";

const ROOT_DIRECTORY = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function loadFiles() {
  return readContractFiles(ROOT_DIRECTORY);
}

function updateFile(files, path, update) {
  return { ...files, [path]: update(files[path]) };
}

function updateMatrixRow(markdown, plugin, update) {
  const marker = `| \`${plugin}\` |`;
  return markdown
    .split(/\r?\n/)
    .map((line) => (line.replace(/\s+/g, " ").startsWith(marker) ? update(line) : line))
    .join("\n");
}

function updateRowByColumnCount(markdown, markerValue, expectedColumnCount, update) {
  const marker = `| \`${markerValue}\` |`;
  return markdown
    .split(/\r?\n/)
    .map((line) => {
      const normalized = line.replace(/\s+/g, " ");
      const columnCount = line.trim().startsWith("|") ? line.trim().slice(1, -1).split("|").length : 0;
      return normalized.startsWith(marker) && columnCount === expectedColumnCount ? update(line) : line;
    })
    .join("\n");
}

function updateMarkdownCells(line, updates) {
  const cells = line
    .trim()
    .slice(1, -1)
    .split("|")
    .map((cell) => cell.trim());
  for (const [index, value] of Object.entries(updates)) {
    cells[Number(index)] = value;
  }
  return `| ${cells.join(" | ")} |`;
}

function assertHasIssue(result, text) {
  assert.ok(
    result.issues.some((issue) => issue.includes(text)),
    `Expected an issue containing ${JSON.stringify(text)}.\nActual:\n${result.issues.join("\n")}`,
  );
}

test("current repository satisfies the local plugin compatibility contract", () => {
  const result = validatePluginContracts(loadFiles());
  assert.equal(result.issues.length, 0, result.issues.join("\n"));
  assert.equal(result.matrixRows.length, 4);
  const evidenceIds = result.evidenceRows.map((row) => row.evidenceId);
  assert.equal(new Set(evidenceIds).size, evidenceIds.length);
  assert.ok(
    result.evidenceRows.some(
      (row) => row.evidenceType === "repository-static" && row.environment === "repository" && row.result === "pass",
    ),
  );
});

test("matrix parser keeps installed, source, contract, and tested versions separate", () => {
  const document = loadFiles()["docs/plugin-adaptation.md"];
  const matrix = parseCompatibilityMatrix(document);
  assert.deepEqual(matrix.rows.map((row) => row.plugin).sort(), Object.keys(REQUIRED_PLUGIN_SURFACES).sort());

  const search = matrix.rows.find((row) => row.plugin === "PluginSearchWidget");
  assert.deepEqual(
    {
      contract: search?.contractVersion,
      installed: search?.installedVersion,
      source: search?.sharedSourceBaseline,
      tested: search?.testedVersion,
    },
    { contract: "1.7.1", installed: "1.7.1", source: "1.7.1", tested: "1.7.1" },
  );

  const hyperlink = matrix.rows.find((row) => row.plugin === "editor-hyperlink-card");
  assert.equal(hyperlink?.sharedSourceBaseline, "unavailable");
});

test("static-only parser keeps every live-not-run plugin surface explicit", () => {
  const document = loadFiles()["docs/plugin-adaptation.md"];
  const table = parseStaticOnlySurfaces(document);
  assert.deepEqual(table.rows.map((row) => row.plugin).sort(), Object.keys(REQUIRED_PLUGIN_SURFACES).sort());
  assert.ok(table.rows.every((row) => row.state === "static-guarded / live-not-run"));
  assert.deepEqual(
    table.rows.find((row) => row.plugin === "PluginSearchWidget")?.surfaceIds,
    REQUIRED_PLUGIN_SURFACES.PluginSearchWidget.staticOnlyIds,
  );
});

test("static-only surfaces cannot be promoted to live-confirmed without evidence", () => {
  const files = updateFile(loadFiles(), "docs/plugin-adaptation.md", (document) =>
    document.replace("static-guarded / live-not-run", "confirmed"),
  );
  assertHasIssue(validatePluginContracts(files), "PluginSearchWidget State 必须是 static-guarded / live-not-run");
});

test("static-only surface IDs cannot silently drop or invent guarded contracts", () => {
  const missingSurfaceFiles = updateFile(loadFiles(), "docs/plugin-adaptation.md", (document) =>
    document.replace("`terminal-search-command`, `search-css-variables`", "`terminal-search-command`"),
  );
  assertHasIssue(
    validatePluginContracts(missingSurfaceFiles),
    "PluginSearchWidget 缺少 Surface ID：search-css-variables",
  );

  const unknownPluginFiles = updateFile(loadFiles(), "docs/plugin-adaptation.md", (document) =>
    updateRowByColumnCount(document, "editor-hyperlink-card", 4, (line) =>
      updateMarkdownCells(line, { 0: "`unknown-plugin`" }),
    ),
  );
  assertHasIssue(validatePluginContracts(unknownPluginFiles), "静态验证范围必须且只能覆盖当前四个主题插件契约");

  const unknownSurfaceFiles = updateFile(loadFiles(), "docs/plugin-adaptation.md", (document) =>
    document.replace("`terminal-search-command`, `search-css-variables`", "`terminal-search-command`, `unknown`"),
  );
  assertHasIssue(validatePluginContracts(unknownSurfaceFiles), "PluginSearchWidget 使用未知 Surface ID：unknown");

  const emptySurfaceFiles = updateFile(loadFiles(), "docs/plugin-adaptation.md", (document) =>
    document.replace(
      "`terminal-search-command`, `search-css-variables`",
      "`terminal-search-command`, , `search-css-variables`",
    ),
  );
  assertHasIssue(validatePluginContracts(emptySurfaceFiles), "PluginSearchWidget Surface IDs 不能为空");

  const duplicateSurfaceFiles = updateFile(loadFiles(), "docs/plugin-adaptation.md", (document) =>
    document.replace(
      "`terminal-search-command`, `search-css-variables`",
      "`terminal-search-command`, `terminal-search-command`",
    ),
  );
  assertHasIssue(validatePluginContracts(duplicateSurfaceFiles), "PluginSearchWidget Surface IDs 不能重复");
});

test("plugin versions are sourced from the canonical matrix instead of duplicated in the validator", () => {
  const files = updateFile(loadFiles(), "docs/plugin-adaptation.md", (document) =>
    document.replaceAll("`1.7.1`", "`1.7.2`"),
  );
  const result = validatePluginContracts(files);
  assert.equal(result.issues.length, 0, result.issues.join("\n"));
  assert.equal(result.matrixRows.find((row) => row.plugin === "PluginSearchWidget")?.contractVersion, "1.7.2");
});

test("matrix evidence references use exact complete IDs instead of substring matches", () => {
  const files = updateFile(loadFiles(), "docs/plugin-adaptation.md", (document) =>
    updateRowByColumnCount(document, "live-search-2026-07-18", 9, (line) =>
      updateMarkdownCells(line, { 0: "`live-search`" }),
    ),
  );
  const result = validatePluginContracts(files);
  assertHasIssue(result, "PluginSearchWidget 引用了未知 Evidence ID：live-search-2026-07-18");
});

test("verification ledger rejects duplicate and empty Evidence IDs", () => {
  const duplicateFiles = updateFile(loadFiles(), "docs/plugin-adaptation.md", (document) =>
    updateRowByColumnCount(document, "live-search-2026-07-17", 9, (line) =>
      updateMarkdownCells(line, { 0: "`live-search-2026-07-18`" }),
    ),
  );
  assertHasIssue(validatePluginContracts(duplicateFiles), "Evidence ID 必须唯一：live-search-2026-07-18");

  const emptyFiles = updateFile(loadFiles(), "docs/plugin-adaptation.md", (document) =>
    updateRowByColumnCount(document, "live-search-2026-07-18", 9, (line) => updateMarkdownCells(line, { 0: "" })),
  );
  assertHasIssue(validatePluginContracts(emptyFiles), "Evidence ID 不能为空");
});

test("matrix rejects unknown and empty comma-separated evidence references", () => {
  const unknownFiles = updateFile(loadFiles(), "docs/plugin-adaptation.md", (document) =>
    updateRowByColumnCount(document, "PluginSearchWidget", 9, (line) =>
      updateMarkdownCells(line, { 8: "`missing-live-evidence`, `static-contract-2026-07-18`" }),
    ),
  );
  assertHasIssue(validatePluginContracts(unknownFiles), "引用了未知 Evidence ID：missing-live-evidence");

  const emptyFiles = updateFile(loadFiles(), "docs/plugin-adaptation.md", (document) =>
    updateRowByColumnCount(document, "PluginSearchWidget", 9, (line) =>
      updateMarkdownCells(line, {
        8: "`live-search-2026-07-18`, , `static-contract-2026-07-18`",
      }),
    ),
  );
  assertHasIssue(validatePluginContracts(emptyFiles), "Evidence 引用不能为空");

  const duplicateFiles = updateFile(loadFiles(), "docs/plugin-adaptation.md", (document) =>
    updateRowByColumnCount(document, "PluginSearchWidget", 9, (line) =>
      updateMarkdownCells(line, {
        8: "`live-search-2026-07-18`, `live-search-2026-07-18`, `static-contract-2026-07-18`",
      }),
    ),
  );
  assertHasIssue(validatePluginContracts(duplicateFiles), "PluginSearchWidget Evidence 引用不能重复");
});

test("confirmed requires contract, tested, and installed versions to describe the same release", () => {
  const files = updateFile(loadFiles(), "docs/plugin-adaptation.md", (document) =>
    updateRowByColumnCount(document, "PluginSearchWidget", 9, (line) => updateMarkdownCells(line, { 5: "`9.9.9`" })),
  );
  const result = validatePluginContracts(files);
  assertHasIssue(result, "PluginSearchWidget confirmed 要求 Contract version 与 Installed version 一致");
});

test("compatible-tested requires an older contract and a live-tested installed version", () => {
  const validFiles = updateFile(loadFiles(), "docs/plugin-adaptation.md", (document) =>
    updateRowByColumnCount(document, "PluginSearchWidget", 9, (line) =>
      updateMarkdownCells(line, { 5: "`1.7.0`", 7: "`compatible-tested`" }),
    ),
  );
  const validResult = validatePluginContracts(validFiles);
  assert.equal(validResult.issues.length, 0, validResult.issues.join("\n"));

  const invalidFiles = updateFile(loadFiles(), "docs/plugin-adaptation.md", (document) =>
    updateRowByColumnCount(document, "PluginSearchWidget", 9, (line) =>
      updateMarkdownCells(line, { 7: "`compatible-tested`" }),
    ),
  );
  assertHasIssue(
    validatePluginContracts(invalidFiles),
    "PluginSearchWidget compatible-tested 要求 Contract version 早于已验证的 Installed version",
  );
});

test("only editor-hyperlink-card may use an unavailable shared source baseline", () => {
  const files = updateFile(loadFiles(), "docs/plugin-adaptation.md", (document) =>
    updateRowByColumnCount(document, "PluginSearchWidget", 9, (line) =>
      updateMarkdownCells(line, { 3: "`unavailable`" }),
    ),
  );
  const result = validatePluginContracts(files);
  assertHasIssue(result, "PluginSearchWidget 已有共享 source skill，不能标记为 unavailable");
});

test("runtime inventory keeps canonical IDs and non-empty evidence", () => {
  const wrongIdFiles = updateFile(loadFiles(), "docs/plugin-adaptation.md", (document) =>
    updateRowByColumnCount(document, "plugin-shiki", 5, (line) => updateMarkdownCells(line, { 1: "`plugin-shiki`" })),
  );
  assertHasIssue(validatePluginContracts(wrongIdFiles), "plugin-shiki Runtime ID 必须是 shiki");

  const emptyEvidenceFiles = updateFile(loadFiles(), "docs/plugin-adaptation.md", (document) =>
    updateRowByColumnCount(document, "PluginCommentWidget", 5, (line) => updateMarkdownCells(line, { 4: "" })),
  );
  assertHasIssue(validatePluginContracts(emptyEvidenceFiles), "PluginCommentWidget Evidence 不能为空");
});

test("search button cannot lose the PluginSearchWidget availability guard", () => {
  const files = updateFile(loadFiles(), "templates/modules/layout.html", (content) =>
    content.replace("pluginFinder.available('PluginSearchWidget')", "true"),
  );
  const result = validatePluginContracts(files);
  assertHasIssue(result, "搜索按钮必须同时受 show_search 和 PluginSearchWidget 可用性 guard 保护");
});

test("comment cannot be marked confirmed while its live evidence remains not-run", () => {
  const files = updateFile(loadFiles(), "docs/plugin-adaptation.md", (document) =>
    updateMatrixRow(document, "live-comment-2026-07-18", (line) => updateMarkdownCells(line, { 5: "`not-run`" })),
  );
  const result = validatePluginContracts(files);
  assertHasIssue(result, "PluginCommentWidget 的已确认状态缺少同版本真页 pass 证据");
});

test("confirmed plugin evidence must be typed as a real page run", () => {
  const repositoryEnvironmentFiles = updateFile(loadFiles(), "docs/plugin-adaptation.md", (document) =>
    updateRowByColumnCount(document, "live-search-2026-07-18", 9, (line) =>
      updateMarkdownCells(line, { 2: "repository" }),
    ),
  );
  const repositoryEnvironmentResult = validatePluginContracts(repositoryEnvironmentFiles);
  assertHasIssue(repositoryEnvironmentResult, "live-search-2026-07-18 live-page 证据必须记录非 repository 真页环境");
  assertHasIssue(repositoryEnvironmentResult, "PluginSearchWidget 的已确认状态缺少同版本真页 pass 证据");

  const staticTypeFiles = updateFile(loadFiles(), "docs/plugin-adaptation.md", (document) =>
    updateRowByColumnCount(document, "live-search-2026-07-18", 9, (line) =>
      updateMarkdownCells(line, { 8: "repository-static" }),
    ),
  );
  assertHasIssue(
    validatePluginContracts(staticTypeFiles),
    "live-search-2026-07-18 repository-static 证据的 Environment 必须是 repository",
  );
});

test("confirmed plugin evidence must cover the declared live surface", () => {
  const files = updateFile(loadFiles(), "docs/plugin-adaptation.md", (document) =>
    updateMatrixRow(document, "live-comment-2026-07-18", (line) => updateMarkdownCells(line, { 6: "仅记录其他页面" })),
  );
  const result = validatePluginContracts(files);
  assertHasIssue(result, "PluginCommentWidget 真页证据 Scope 缺少 <comment-widget>");
});

test("confirmed plugin cannot reuse evidence from an older installed version", () => {
  const files = updateFile(loadFiles(), "docs/plugin-adaptation.md", (document) => {
    const withInventoryUpgrade = updateMatrixRow(document, "PluginSearchWidget", (line) => {
      const normalized = line.replace(/\s+/g, " ");
      if (!normalized.includes("| `PluginSearchWidget` | `PluginSearchWidget` |")) {
        return line;
      }
      return updateMarkdownCells(line, { 2: "`1.7.2`" });
    });
    return updateMatrixRow(withInventoryUpgrade, "PluginSearchWidget", (line) => {
      const normalized = line.replace(/\s+/g, " ");
      if (!normalized.includes("SearchWidget.open()")) {
        return line;
      }
      return updateMarkdownCells(line, { 2: "`1.7.2`" });
    });
  });
  const result = validatePluginContracts(files);
  assertHasIssue(result, "PluginSearchWidget 的已确认状态必须由当前 Installed version 的真页测试支持");
});

test("Shiki 1.4.1 rejects a Halo runtime below 2.25.0 without raising the theme core floor", () => {
  assert.equal(satisfiesMinimum("2.25.4", ">=2.25.0"), true);
  assert.equal(satisfiesMinimum("2.24.0", ">=2.25.0"), false);
  assert.equal(satisfiesMinimum("2.24.0", ">=2.23.0"), true);

  const files = updateFile(loadFiles(), "docs/plugin-adaptation.md", (document) =>
    document.replace(/\| runtimeHaloVersion\s+\| `2\.25\.4`\s+\|/, "| runtimeHaloVersion | `2.24.0` |"),
  );
  const result = validatePluginContracts(files);
  assertHasIssue(result, "当前 Halo 运行版本不满足 plugin-shiki 1.4.1 的 >=2.25.0 条件");
});

test("native partial navigation script replay keeps the explicit module and data-pjax opt-in", () => {
  const files = updateFile(loadFiles(), "src/common/runtime.ts", (content) =>
    content.replace('script[type="module"][data-pjax]', 'script[type="module"]'),
  );
  const result = validatePluginContracts(files);
  assertHasIssue(result, "原生局部导航只允许重放显式 data-pjax 的 module script");
});

test("native partial navigation keeps CommentWidget inline module initialization", () => {
  const files = updateFile(loadFiles(), "src/common/runtime.ts", (content) =>
    content.replace("clone.textContent = script.textContent", "clone.textContent = ''"),
  );
  const result = validatePluginContracts(files);
  assertHasIssue(result, "必须重放 CommentWidget 显式 opt-in 的内联 module script");
});

test("native partial navigation waits for inline module execution without a timeout delay", () => {
  const files = updateFile(loadFiles(), "src/common/runtime.ts", (content) =>
    content.replace("window.dispatchEvent(new Event", "window.dispatchEvent_DISABLED(new Event"),
  );
  const result = validatePluginContracts(files);
  assertHasIssue(result, "内联 module script 必须在执行完成后发送信号");
});

test("native partial navigation preserves the Shiki extra-path compatibility event", () => {
  const files = updateFile(loadFiles(), "src/common/runtime.ts", (content) =>
    content.replace('PJAX_COMPAT_COMPLETE_EVENT = "pjax:complete"', 'PJAX_COMPAT_COMPLETE_EVENT = "removed"'),
  );
  const result = validatePluginContracts(files);
  assertHasIssue(result, "必须保留 Shiki extraPathPatterns 的局部导航兼容事件");
});

test("Shiki compatibility event targets the plugin window listener", () => {
  const files = updateFile(loadFiles(), "src/common/runtime.ts", (content) =>
    content.replace(
      "window.dispatchEvent(new CustomEvent(PJAX_COMPAT_COMPLETE_EVENT))",
      "document.dispatchEvent(new CustomEvent(PJAX_COMPAT_COMPLETE_EVENT))",
    ),
  );
  const result = validatePluginContracts(files);
  assertHasIssue(result, "必须在 window 上触发 Shiki 局部导航兼容事件");
});

test("head extension contract changes keep a full-navigation lifecycle boundary", () => {
  const files = updateFile(loadFiles(), "src/common/navigation.ts", (content) =>
    content.replace("headNavigationContractChanged(parsedDocument, finalTarget)", "false"),
  );
  const result = validatePluginContracts(files);
  assertHasIssue(result, "head 生命周期契约变化时必须切换为整页导航");
});

test("unmarked inline styles cannot disable otherwise safe partial navigation", () => {
  const files = updateFile(loadFiles(), "src/common/navigation.ts", (content) =>
    content.replaceAll("isInertInlineStyleElement", "isRuntimeStyleElement"),
  );
  const result = validatePluginContracts(files);
  assertHasIssue(result, "未标记内联样式不得误触发整页导航");
});

test("theme declarative style cannot lose its head lifecycle marker", () => {
  const files = updateFile(loadFiles(), "templates/modules/theme-style.html", (content) =>
    content.replace(" data-theme-navigation-style", ""),
  );
  const result = validatePluginContracts(files);
  assertHasIssue(result, "主题声明式样式必须带有 head 生命周期标记");
});

test("partial navigation cannot drop exact page metadata synchronization", () => {
  const files = updateFile(loadFiles(), "src/common/navigation.ts", (content) =>
    content.replace("syncPageMetadata(parsedDocument)", "syncPageMetadata_DISABLED(parsedDocument)"),
  );
  const result = validatePluginContracts(files);
  assertHasIssue(result, "局部导航必须同步 Halo 输出的页面元数据");
});

test("full-navigation intent invalidates stale plugin initialization fallbacks", () => {
  const files = updateFile(loadFiles(), "src/common/runtime.ts", (content) =>
    content.replace("document.addEventListener(NAVIGATION_FULL_RELOAD_EVENT", "document.addEventListener_DISABLED("),
  );
  const result = validatePluginContracts(files);
  assertHasIssue(result, "运行时必须同步锁定整页导航生命周期");
});

test("native partial navigation preserves CSP nonces", () => {
  const files = updateFile(loadFiles(), "src/common/runtime.ts", (content) => content.replace('"nonce", ', ""));
  const result = validatePluginContracts(files);
  assertHasIssue(result, "必须保留 nonce");
});

test("native partial navigation re-evaluates external modules per navigation", () => {
  const files = updateFile(loadFiles(), "src/common/runtime.ts", (content) =>
    content.replace('sourceUrl.searchParams.set("_theme_navigation"', 'sourceUrl.searchParams.get("unused"'),
  );
  const result = validatePluginContracts(files);
  assertHasIssue(result, "必须为外部 module script 生成逐次求值的唯一 URL");
});

test("native partial navigation waits for modules before Alpine initialization", () => {
  const files = updateFile(loadFiles(), "src/common/runtime.ts", (content) =>
    content.replace("await replayNavigationScripts(main)", "replayNavigationScripts(main)"),
  );
  const result = validatePluginContracts(files);
  assertHasIssue(result, "必须等待模块重放完成后再初始化 Alpine");
});

test("static evidence resolves the current theme version from theme.yaml", () => {
  const files = updateFile(loadFiles(), "theme.yaml", (content) =>
    content.replace(/^ {2}version:.*$/m, '  version: "9.9.9"'),
  );
  const result = validatePluginContracts(files);
  assert.equal(result.issues.length, 0, result.issues.join("\n"));
  assert.equal(result.context.resolvedThemeVersion, "9.9.9");
});

test("comment tags keep the Halo resource identity contract", () => {
  const files = updateFile(loadFiles(), "templates/post.html", (content) =>
    content.replace('group="content.halo.run" kind="Post"', 'kind="Post"'),
  );
  const result = validatePluginContracts(files);
  assertHasIssue(result, "Post 必须使用正确的 halo:comment group / kind / name");
});

test("comment pages keep the full-navigation cleanup boundary", () => {
  const files = updateFile(loadFiles(), "templates/post.html", (content) =>
    content.replace('data-navigation-exit="full"', ""),
  );
  const result = validatePluginContracts(files);
  assertHasIssue(result, "Post 评论页离开时必须使用整页导航释放 CommentWidget observer");
});

test("plugin CSS variables remain guarded as DOM-level compatibility surfaces", () => {
  const files = updateFile(loadFiles(), "src/styles/content.css", (content) =>
    content.replace("--halo-hyperlink-card-skeleton-color:", "--removed-hyperlink-card-skeleton-color:"),
  );
  const result = validatePluginContracts(files);
  assertHasIssue(result, "超链接卡片组件作用域缺少变量 --halo-hyperlink-card-skeleton-color");
});

test("comment emoji picker colors derive from current theme variables instead of hardcoded RGB", () => {
  const textColorFiles = updateFile(loadFiles(), "src/styles/base.css", (content) =>
    content.replace(
      "--halo-cw-emoji-picker-rgb-color: from var(--terminal-text) r g b;",
      "--halo-cw-emoji-picker-rgb-color: 0, 255, 0;",
    ),
  );
  assertHasIssue(
    validatePluginContracts(textColorFiles),
    "--halo-cw-emoji-picker-rgb-color 必须从当前终端主题变量派生，不能写死 RGB 色值",
  );

  const backgroundFiles = updateFile(loadFiles(), "src/styles/base.css", (content) =>
    content.replace(
      "--halo-cw-emoji-picker-rgb-background: from var(--terminal-bg) r g b;",
      "--halo-cw-emoji-picker-rgb-background: 13, 13, 13;",
    ),
  );
  assertHasIssue(
    validatePluginContracts(backgroundFiles),
    "--halo-cw-emoji-picker-rgb-background 必须从当前终端主题变量派生，不能写死 RGB 色值",
  );
});

test("search, comment, and hyperlink variables must remain inside their plugin scopes", () => {
  const searchFiles = updateFile(
    loadFiles(),
    "src/styles/base.css",
    (content) =>
      `${content.replace("--halo-search-widget-primary-color:", "--moved-search-widget-primary-color:")}\n:root { --halo-search-widget-primary-color: red; }`,
  );
  assertHasIssue(
    validatePluginContracts(searchFiles),
    "暗色主题作用域缺少搜索插件变量 --halo-search-widget-primary-color",
  );

  const commentFiles = updateFile(
    loadFiles(),
    "src/styles/base.css",
    (content) =>
      `${content.replace("--halo-cw-primary-1-color:", "--moved-halo-cw-primary-1-color:")}\n:root { --halo-cw-primary-1-color: red; }`,
  );
  assertHasIssue(validatePluginContracts(commentFiles), "暗色主题作用域缺少评论插件变量 --halo-cw-primary-1-color");

  const hyperlinkFiles = updateFile(
    loadFiles(),
    "src/styles/content.css",
    (content) =>
      `${content.replace("--halo-hyperlink-card-title-color:", "--moved-hyperlink-card-title-color:")}\n:root { --halo-hyperlink-card-title-color: red; }`,
  );
  assertHasIssue(
    validatePluginContracts(hyperlinkFiles),
    "超链接卡片组件作用域缺少变量 --halo-hyperlink-card-title-color",
  );

  const commentedDeclarationFiles = updateFile(loadFiles(), "src/styles/base.css", (content) =>
    content.replace(
      "--halo-search-widget-muted-color: color-mix",
      "/* --halo-search-widget-muted-color: color-mix */\n  --moved-search-widget-muted-color: color-mix",
    ),
  );
  assertHasIssue(
    validatePluginContracts(commentedDeclarationFiles),
    "暗色主题作用域缺少搜索插件变量 --halo-search-widget-muted-color",
  );
});
