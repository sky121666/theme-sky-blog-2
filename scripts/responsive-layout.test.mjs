import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function read(path) {
  return readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
}

function assertClassTokens(markup, elementPattern, expectedTokens) {
  const className = markup.match(elementPattern)?.[1];
  assert.ok(className, `missing class contract for ${elementPattern}`);
  const tokens = new Set(className.split(/\s+/));
  for (const token of expectedTokens) {
    assert.ok(tokens.has(token), `missing responsive class ${token}`);
  }
}

function classTokenSets(markup) {
  return [...markup.matchAll(/class="([^"]+)"/g)].map((match) => new Set(match[1].split(/\s+/)));
}

function assertSomeClassContains(markup, expectedTokens, rejectedTokens = []) {
  const matchingClass = classTokenSets(markup).find((tokens) => expectedTokens.every((token) => tokens.has(token)));
  assert.ok(matchingClass, `missing class contract: ${expectedTokens.join(" ")}`);
  for (const token of rejectedTokens) {
    assert.ok(!matchingClass.has(token), `unexpected mobile class ${token}`);
  }
}

test("flex shells and rich content keep mobile intrinsic widths contained", () => {
  const layout = read("templates/modules/layout.html");
  assertClassTokens(layout, /<body[\s\S]*?class="([^"]*)"/, ["terminal-viewport", "overflow-hidden"]);
  assert.doesNotMatch(layout, /class="[^"]*\bh-screen\b/);
  assertClassTokens(layout, /<div[\s\S]*?class="([^"]*terminal-shell[^"]*)"/, [
    "terminal-frame",
    "flex",
    "h-full",
    "flex-col",
  ]);
  assertClassTokens(layout, /<main[^>]*\sclass="([^"]*)"/, ["relative", "min-w-0", "flex-1", "overflow-auto"]);

  for (const path of ["templates/post.html", "templates/page.html"]) {
    const template = read(path);
    assertSomeClassContains(template, ["terminal-reader"]);
    assertClassTokens(template, /<article class="([^"]*)"/, ["prose", "prose-invert", "min-w-0", "max-w-none"]);
    assertClassTokens(template, /<div class="([^"]*terminal-content[^"]*)"/, [
      "terminal-content",
      "min-w-0",
      "max-w-full",
    ]);
  }

  const baseStyles = read("src/styles/base.css");
  assert.match(baseStyles, /\.terminal-viewport\s*{[\s\S]*height:\s*100vh;[\s\S]*height:\s*100dvh;/);

  const contentStyles = read("src/styles/content.css");
  assert.match(contentStyles, /\.terminal-content\s*{[\s\S]*overflow-wrap:\s*anywhere;/);
  assert.match(contentStyles, /\.terminal-content table\s*{[\s\S]*display:\s*block;/);
  assert.match(contentStyles, /\.terminal-content table\s*{[\s\S]*max-width:\s*100%;/);
  assert.match(contentStyles, /\.terminal-content table\s*{[\s\S]*overflow-x:\s*auto;/);
  assert.match(contentStyles, /\.terminal-content shiki-code[\s\S]*width: 100%/);
  assert.match(contentStyles, /\.terminal-content shiki-code[\s\S]*max-width: 100%/);
  assert.match(contentStyles, /\.terminal-content shiki-code[\s\S]*overflow-x: auto/);
});

test("content, plugins, and error pages use the same frame width and gutter", () => {
  const styles = read("src/styles/layout.css");
  assert.equal((styles.match(/--terminal-page-width:/g) ?? []).length, 1);
  assert.match(styles, /\.terminal-frame\s*\{[^}]*max-inline-size:\s*var\(--terminal-page-width\)/);
  assert.match(styles, /\.terminal-frame\s*\{[^}]*padding:\s*var\(--terminal-page-gutter\)/);
  for (const path of ["templates/modules/layout.html", "templates/layout.html", "templates/error/error.html"]) {
    const template = read(path);
    assertSomeClassContains(template, ["terminal-frame"]);
    assert.match(template, /modules\/theme-style :: themeStyle/, path);
    assert.doesNotMatch(template, /\bmax-w-(?:md|[2-5]xl)\b/, path);
  }
});

test("reader and error panels fill the same usable lane as file rows", () => {
  const styles = read("src/styles/layout.css");
  assert.match(styles, /:is\(\.terminal-reader, \.terminal-panel\)\s*\{[^}]*inline-size:\s*100%/);
  assert.doesNotMatch(styles, /--terminal-(?:reading|form|notice|panel)-width/);
  assert.doesNotMatch(read("src/styles/file-list.css"), /\.terminal-file-list\s*\{[^}]*padding-inline:/);
});

test("the gateway uses the selected palette with its own width and visible heading", () => {
  const layout = read("templates/gateway_fragments/layout.html");
  const styles = read("src/styles/auth.css");
  assertSomeClassContains(layout, ["terminal-gateway-theme"]);
  assertSomeClassContains(layout, ["terminal-gateway-panel"]);
  assert.match(layout, /<main class="terminal-gateway-content auth-form-terminal">/);
  assert.match(layout, /<h1 th:text="\$\{actionTitle\}">/);
  assert.match(layout, /modules\/theme-style :: palette/);
  assert.doesNotMatch(layout, /\bterminal-frame\b|modules\/theme-style :: themeStyle/);
  assert.match(styles, /\.terminal-gateway-theme\s*\{[^}]*--gateway-width:/);
  assert.doesNotMatch(styles, /--terminal-(?:bg|text)\s*:/);
  assert.match(styles, /\.terminal-gateway-panel\s*\{[^}]*inline-size: min\(100%, var\(--gateway-width\)\)/);
  assert.doesNotMatch(styles, /--terminal-page-(?:width|gutter)/);
});

test("blog and gateway use one palette fragment and only the blog declares layout markers", () => {
  const appearance = read("templates/modules/theme-style.html");
  assert.match(appearance, /th:fragment="themeStyle"[\s\S]*?modules\/theme-style :: palette/);
  const palette = appearance.split('th:fragment="palette"')[1];
  assert.ok(palette);
  assert.match(palette, /data-theme-navigation-style/);
  assert.match(palette, /--theme-color-primary:.*--theme-color-bg:/);
  assert.doesNotMatch(palette, /data-terminal-layout|data-terminal-compact|animation:\s*none/);
});

test("shared file lists retain their grid, wrapping titles, and mobile touch targets", () => {
  const list = read("templates/modules/file-list.html");
  const listStyles = read("src/styles/file-list.css");

  assertSomeClassContains(list, ["home-file-grid", "home-file-row", "items-center", "min-h-10"]);
  assertSomeClassContains(list, ["home-file-meta", "whitespace-nowrap"]);
  assertSomeClassContains(list, ["home-file-meta", "hidden", "md:block"]);
  assertSomeClassContains(list, ["font-mono", "text-xs", "md:space-y-1", "md:text-sm"], ["space-y-1"]);
  assertSomeClassContains(list, ["terminal-list-prompt"]);
  assertSomeClassContains(list, ["typing-effect", "shrink-0", "whitespace-nowrap"]);

  const titleLinks = [...list.matchAll(/<a\b[^>]*\sclass="[^"]*\bhome-file-title\b[^"]*"[^>]*>/g)];
  assert.equal(titleLinks.length, 2);
  for (const [link] of titleLinks) {
    assertSomeClassContains(link, ["min-h-10", "min-w-0"], ["truncate", "md:truncate", "whitespace-nowrap"]);
  }

  assert.match(listStyles, /\.home-file-grid\s*{[^}]*grid-template-columns: var\(--terminal-file-columns\);/);
  assert.match(listStyles, /--terminal-file-columns: minmax\(0, 1fr\) auto;/);
  assert.match(listStyles, /\.home-file-title\s*{[^}]*overflow-wrap:\s*anywhere;/);
});

test("individual list pages retain compact headers and archive groups", () => {
  for (const path of ["templates/category.html", "templates/tag.html", "templates/author.html"]) {
    const template = read(path);
    assertSomeClassContains(template, ["terminal-file-list"]);
    assert.match(template, /modules\/file-list :: context\(/, path);
    assert.match(template, /modules\/file-list :: postList\(/, path);
  }

  const archives = read("templates/archives.html");
  assertSomeClassContains(archives, ["mb-4", "md:mb-8"]);
  assertSomeClassContains(archives, ["mb-3", "md:mb-5"]);
  assertSomeClassContains(archives, ["terminal-file-list", "terminal-file-list--lean"]);

  const index = read("templates/index.html");
  const layout = read("templates/modules/layout.html");
  assertSomeClassContains(index, ["font-mono", "text-xs", "md:space-y-1", "md:text-sm"], ["space-y-1"]);
  assertClassTokens(layout, /<header[\s\S]*?class="([^"]*)"/, ["mb-2", "md:mb-4", "flex-shrink-0"]);
  assertSomeClassContains(layout, ["mt-1", "md:mt-4", "items-center"]);
  assert.doesNotMatch(index, /(?:min-)?h-(?:19|\[[^\]]+\])/);
});

test("the shared post row exposes the runtime dataset and real article link", () => {
  const template = read("templates/modules/file-list.html");
  const postRow = template.match(/<li\b[^>]*th:each="post : \$\{entries\}"[^>]*>/)?.[0];
  assert.ok(postRow);
  for (const attribute of [
    "data-nav-item",
    "data-post-record",
    "th:data-post-name",
    "th:data-post-created-at",
    "th:data-post-title",
    "th:data-post-slug",
    "th:data-post-owner",
    "th:data-post-published-at",
    "th:data-post-permalink",
  ]) {
    assert.match(postRow, new RegExp("\\s" + attribute + "(?:=|\\s|>)"), attribute);
  }
  assert.equal((template.match(/\bdata-post-record\b/g) ?? []).length, 1);
  assert.match(template, /<a\s+th:href="@\{\$\{post\.status\.permalink\}\}"\s+data-navigation="full"/);
  assert.match(template, /<time\b[^>]*th:datetime="\$\{post\.spec\.publishTime\}"/);
  assert.equal((template.match(/\bdata-navigation="full"/g) ?? []).length, 1);
});

test("post command keeps cat visible and reserves the full user prompt for desktop", () => {
  const post = read("templates/post.html");
  assertSomeClassContains(post, ["text-terminal-dim", "hidden", "md:inline"]);
  assertSomeClassContains(post, ["typing-effect", "min-w-0", "break-words"]);
});

test("the mobile reader menu is collapsed in server markup before Alpine starts", () => {
  const layout = read("templates/modules/layout.html");
  const panel = layout.match(/<div\s+x-data="terminalInput[^"]+"[^>]*>/)?.[0];
  const toggle = layout.match(/<button\b[^>]*aria-controls="terminal-tools"[^>]*>/)?.[0];
  assert.ok(panel);
  assert.ok(toggle);
  assert.ok(panel.includes("th:attr=\"data-reader-tools=${readerMode ? 'collapsed' : null}\""));
  assert.match(toggle, /\saria-expanded="false"\s+:aria-expanded="toolsOpen"/);
});

test("post metadata identifies the file once in the cat prompt and retains author and date", () => {
  const post = read("templates/post.html");
  assert.doesNotMatch(post, />File:<\/span>/);
  assert.match(post, /data-filename=/);
  assert.match(post, /contributorFinder\.getContributor/);
  assert.match(post, /Published:/);
  assert.match(post, /datetime="\$\{post\.spec\.publishTime\}"/);
  assert.doesNotMatch(post, /#strings\.length\(post\.content\.content\)/);
});
