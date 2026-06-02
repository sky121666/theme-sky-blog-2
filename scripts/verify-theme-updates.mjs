import { readFileSync } from "node:fs";

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
  const content = readFileSync(check.file, "utf8");
  if (!check.test(content)) {
    failed = true;
    console.error(`FAIL ${check.file}: ${check.message}`);
  }
}

if (failed) {
  process.exit(1);
}

console.log("Theme update checks passed.");
