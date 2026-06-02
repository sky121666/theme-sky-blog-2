import { readFileSync } from "node:fs";
import { readdirSync } from "node:fs";
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
    message: "search control should be a semantic button, not javascript:void link",
    test: (content) => content.includes('type="button"') && !content.includes('href="javascript:void(0)"'),
  },
  {
    file: "templates/post.html",
    message: "post template should not use javascript hrefs",
    test: (content) => !content.includes('href="javascript:'),
  },
  {
    file: "templates",
    readFile: false,
    message: "templates should not use javascript hrefs",
    test: () => listHtmlFiles("templates").every((file) => !readFileSync(file, "utf8").includes('href="javascript:')),
  },
  {
    file: "templates/post.html",
    message: "post template should include terminal TOC and reading progress",
    test: (content) => content.includes("[TOC]") && content.includes("READ_PROGRESS") && content.includes("tocItems"),
  },
  {
    file: "src/features/commands.ts",
    message: "terminal commands should expose article navigation helpers",
    test: (content) =>
      ["toc", "jump", "top", "bottom", "copy"].every((command) => new RegExp(`\\[\\s*"${command}"\\s*,`).test(content)),
  },
  {
    file: "settings.yaml",
    message: "custom code field should describe footer injection accurately",
    test: (content) =>
      content.includes("label: 自定义底部代码") &&
      content.includes("将直接注入到 body 底部") &&
      content.includes("可信管理员代码"),
  },
  {
    file: "templates/modules/layout.html",
    message: 'external target="_blank" links should include rel="noopener noreferrer"',
    test: (content) =>
      [...content.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)].every((match) =>
        /rel="[^"]*\bnoopener\b[^"]*\bnoreferrer\b[^"]*"/.test(match[0]),
      ),
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
