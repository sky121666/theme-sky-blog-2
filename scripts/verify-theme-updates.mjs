import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

function listHtmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      return listHtmlFiles(path);
    }
    return entry.isFile() && entry.name.endsWith(".html") ? [path] : [];
  });
}

function parseFormKitFields(content) {
  const lines = content.split(/\r?\n/);
  const fields = [];
  let current = null;

  for (const line of lines) {
    const formkitMatch = line.match(/^(\s*)-\s+\$formkit:\s*(\S+)/);
    if (formkitMatch) {
      if (current) {
        fields.push(current);
      }
      current = {
        component: formkitMatch[2],
        id: "",
        ifExpression: "",
        line: fields.length + 1,
        name: "",
      };
      continue;
    }

    if (!current) {
      continue;
    }

    const idMatch = line.match(/^\s+id:\s*(.+?)\s*$/);
    if (idMatch) {
      current.id = idMatch[1].replace(/^["']|["']$/g, "");
      continue;
    }

    const nameMatch = line.match(/^\s+name:\s*(.+?)\s*$/);
    if (nameMatch) {
      current.name = nameMatch[1].replace(/^["']|["']$/g, "");
      continue;
    }

    const ifMatch = line.match(/^\s+if:\s*(.+?)\s*$/);
    if (ifMatch) {
      current.ifExpression = ifMatch[1];
    }
  }

  if (current) {
    fields.push(current);
  }

  return fields;
}

function hasStableFormKitSchema(content) {
  const fields = parseFormKitFields(content);
  const ids = fields.map((field) => field.id).filter(Boolean);
  const idSet = new Set(ids);

  if (fields.length === 0 || ids.length !== fields.length || fields.some((field) => !field.name)) {
    return false;
  }

  if (idSet.size !== ids.length) {
    return false;
  }

  return fields.every((field) =>
    [...field.ifExpression.matchAll(/\$get\(([^)]+)\)/g)].every((match) =>
      idSet.has(match[1].trim().replace(/^["']|["']$/g, "")),
    ),
  );
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
    message: "README should document the official comment widget dependency",
    test: (content) =>
      content.includes("PluginCommentWidget") &&
      content.includes("PluginCommentWidget v3.1.2") &&
      content.includes("Halo `>=2.23.0`"),
  },
  {
    file: "README.md",
    message: "README should document the actual Node.js and pnpm requirements",
    test: (content) =>
      content.includes("Node.js 20.19+ 或 22.12+") &&
      content.includes("Vite 7 要求 `^20.19.0 || >=22.12.0`") &&
      content.includes("pnpm 10.6.5"),
  },
  {
    file: "README.md",
    message: "README should document the Halo installed-theme cache refresh boundary",
    test: (content) =>
      content.includes("dist/theme-sky-blog-2-<version>.zip") &&
      content.includes("重新上传/重载新主题包") &&
      content.includes("仅重启容器不会刷新已安装主题版本") &&
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
    test: (content) =>
      content.includes('"node": "^20.19.0 || >=22.12.0"') &&
      content.includes('"pnpm": ">=10.6.5 <11"') &&
      content.includes('"packageManager": "pnpm@10.6.5+') &&
      content.includes('"@types/node": "^22.19.19"'),
  },
  {
    file: "theme.yaml",
    message: "theme and package versions should stay in sync for asset cache busting",
    test: (content) =>
      content.includes('version: "1.2.1"') && readFileSync("package.json", "utf8").includes('"version": "1.2.1"'),
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
    message: "package scripts should expose the runtime asset version check",
    test: (content) =>
      content.includes('"check:runtime-version": "node scripts/check-runtime-version.mjs"') &&
      content.includes('"reload:theme": "node scripts/reload-theme.mjs"') &&
      content.includes('"verify:package": "node scripts/verify-theme-package.mjs"'),
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
      content.includes("HALO_BASE_URL") &&
      !content.includes("new URL("),
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
      !content.includes("console.log(token"),
  },
  {
    file: ".github/workflows/ci.yaml",
    message: "CI should use Node 22, frozen pnpm installs, and strict theme package content checks",
    test: (content) =>
      content.includes("node-version: 22") &&
      content.includes("pnpm install --frozen-lockfile") &&
      content.includes("pnpm verify:package") &&
      !content.includes("ls dist/theme-sky-blog-2-*.zip") &&
      !content.includes("zipinfo -1"),
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
    message: "theme package verifier should use centralized forbidden rules and theme metadata",
    test: (content) =>
      content.includes('import { PACKAGE_FORBIDDEN_PATTERNS } from "./package-rules.mjs"') &&
      content.includes('import { readThemePackageName } from "./theme-metadata.mjs"') &&
      content.includes("zipinfo") &&
      content.includes("Forbidden entries"),
  },
  {
    file: "settings.yaml",
    message: "comment setting should name the official comment widget plugin",
    test: (content) => content.includes("官方评论组件 PluginCommentWidget"),
  },
  {
    file: "settings.yaml",
    message: "theme settings FormKit fields should have stable ids, names, and valid conditional references",
    test: (content) => hasStableFormKitSchema(content),
  },
  {
    file: "src/common/runtime.ts",
    message: "Pjax runtime should replay comment widget data-pjax scripts",
    test: (content) => content.includes("script[data-pjax]") && content.includes("replayPjaxScripts(main)"),
  },
  {
    file: "src/common/ui-actions.ts",
    message: "UI actions should call the official Halo SearchWidget without inline handlers",
    test: (content) =>
      content.includes("SearchWidget") &&
      content.includes("searchWidget.open()") &&
      content.includes('action === "search"') &&
      content.includes('action === "back"') &&
      content.includes("logWarn"),
  },
  {
    file: "src/common/runtime.ts",
    message: "runtime should bind UI actions on first load and after Pjax updates",
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
      content.includes('import { readThemePackageName } from "./theme-metadata.mjs"') &&
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
