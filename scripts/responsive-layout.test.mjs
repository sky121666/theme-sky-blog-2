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
  assertClassTokens(layout, /<div[\s\S]*?class="([^"]*mx-auto[^"]*)"/, [
    "flex",
    "h-full",
    "w-full",
    "max-w-4xl",
    "min-w-0",
    "flex-col",
  ]);
  assertClassTokens(layout, /<main[^>]*\sclass="([^"]*)"/, ["relative", "min-w-0", "flex-1", "overflow-auto"]);

  for (const path of ["templates/post.html", "templates/page.html"]) {
    const template = read(path);
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

test("public file lists use compact mobile rows and retain desktop grids", () => {
  for (const path of [
    "templates/category.html",
    "templates/tag.html",
    "templates/author.html",
    "templates/categories.html",
    "templates/tags.html",
  ]) {
    const template = read(path);
    assertSomeClassContains(
      template,
      ["grid-cols-[minmax(0,1fr)_auto]", "items-center", "min-h-10", "md:grid-cols-12", "md:min-h-0"],
      ["gap-y-1", "py-2"],
    );
    assertSomeClassContains(template, ["min-h-10", "break-words", "md:truncate"], ["truncate"]);
    assertSomeClassContains(template, ["row-start-1", "whitespace-nowrap"]);
    assertSomeClassContains(template, ["hidden", "whitespace-nowrap", "md:block"]);
    assertSomeClassContains(template, ["font-mono", "text-xs", "md:space-y-1", "md:text-sm"], ["space-y-1"]);
    assertSomeClassContains(template, ["mb-3", "min-w-0", "md:mb-6"]);
    assertSomeClassContains(template, ["typing-effect", "flex-shrink-0", "whitespace-nowrap"]);
    assert.match(template, /md:grid-cols-12/, `${path} must retain the 12-column desktop layout`);
  }

  for (const path of ["templates/category.html", "templates/tag.html", "templates/author.html"]) {
    const template = read(path);
    assertSomeClassContains(template, ["mb-2", "min-h-10", "flex-wrap", "md:mb-4", "md:p-3"]);
    assertSomeClassContains(template, ["mt-4", "md:mt-8"]);
  }

  const archives = read("templates/archives.html");
  assertSomeClassContains(
    archives,
    ["grid-cols-[minmax(0,1fr)_auto]", "items-center", "min-h-10", "md:grid-cols-[8rem_minmax(0,1fr)]", "md:min-h-0"],
    ["grid-cols-1", "gap-y-1", "py-2"],
  );
  assertSomeClassContains(archives, ["min-h-10", "break-words", "md:col-start-2", "md:truncate"], ["truncate"]);
  assertSomeClassContains(archives, ["col-start-2", "row-start-1", "whitespace-nowrap", "md:col-start-1"]);
  assertSomeClassContains(archives, ["font-mono", "text-xs", "md:space-y-1", "md:text-sm"], ["space-y-1"]);
  assertSomeClassContains(archives, ["mb-3", "min-w-0", "md:mb-6"]);
  assertSomeClassContains(archives, ["mb-4", "md:mb-8"]);
  assertSomeClassContains(archives, ["mb-3", "md:mb-5"]);
  assertSomeClassContains(archives, ["mt-4", "md:mt-8"]);
  assert.match(archives, /<time[\s\S]*?:class="\{ '!text-terminal-black': isSelected/);
});

test("home list keeps a compact single-row mobile rhythm without shrinking touch targets", () => {
  const index = read("templates/index.html");
  const layout = read("templates/modules/layout.html");

  assertSomeClassContains(
    index,
    ["grid-cols-[minmax(0,1fr)_auto]", "items-center", "min-h-10", "md:grid-cols-12", "md:min-h-0"],
    ["gap-y-1", "py-2"],
  );
  assertSomeClassContains(index, ["min-h-10", "break-words", "md:truncate"]);
  assertSomeClassContains(index, ["row-start-1", "whitespace-nowrap"]);
  assertSomeClassContains(index, ["hidden", "whitespace-nowrap", "md:block"]);
  assertSomeClassContains(index, ["font-mono", "text-xs", "md:space-y-1", "md:text-sm"], ["space-y-1"]);
  assertSomeClassContains(index, ["mb-3", "md:mb-6"]);
  assertClassTokens(layout, /<header[\s\S]*?class="([^"]*)"/, ["mb-2", "md:mb-4", "flex-shrink-0"]);
  assertSomeClassContains(layout, ["mt-1", "md:mt-4", "items-center"]);
  assert.doesNotMatch(index, /(?:min-)?h-(?:19|\[[^\]]+\])/);
  assert.match(index, /md:grid-cols-12/, "home list must retain the 12-column desktop layout");
});

test("post rows expose the minimal runtime dataset", () => {
  const expectedAttributes = [
    "data-post-record",
    "th:data-post-name",
    "th:data-post-created-at",
    "th:data-post-title",
    "th:data-post-slug",
    "th:data-post-owner",
    "th:data-post-published-at",
    "th:data-post-permalink",
  ];

  for (const path of [
    "templates/index.html",
    "templates/category.html",
    "templates/tag.html",
    "templates/author.html",
    "templates/archives.html",
  ]) {
    const template = read(path);
    const postRow = template.match(/<li[\s\S]*?th:each="post : \$\{[^"]+\}"[\s\S]*?>/)?.[0];
    assert.ok(postRow, `${path} must render a post row`);
    for (const attribute of expectedAttributes) {
      assert.match(postRow, new RegExp(`\\b${attribute}(?:=|\\s|>)`), `${path} is missing ${attribute}`);
    }
    assert.equal(template.match(/\bdata-post-record\b/g)?.length, 1, `${path} must only mark actual post rows`);
  }
});

test("post command prompt stacks on mobile and returns to one row on desktop", () => {
  const post = read("templates/post.html");
  assertSomeClassContains(post, ["flex", "flex-col", "items-start", "md:flex-row", "md:items-center"]);
  assertSomeClassContains(post, ["typing-effect", "min-w-0", "break-words"]);
});
