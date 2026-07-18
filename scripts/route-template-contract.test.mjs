import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function read(path) {
  return readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
}

const CONTENT_ROUTES = [
  "templates/index.html",
  "templates/categories.html",
  "templates/category.html",
  "templates/tags.html",
  "templates/tag.html",
  "templates/archives.html",
  "templates/author.html",
  "templates/post.html",
  "templates/page.html",
];

test("every content route delegates to the shared layout with one content fragment", () => {
  for (const path of CONTENT_ROUTES) {
    const template = read(path);
    assert.match(template, /th:replace="~\{modules\/layout :: html\(content = ~\{::content\}\)\}"/, path);
    assert.equal((template.match(/th:fragment="content"/g) ?? []).length, 1, path);
  }
});

test("list and article routes retain their keyboard-navigation component contracts", () => {
  for (const path of [
    "templates/index.html",
    "templates/categories.html",
    "templates/category.html",
    "templates/tags.html",
    "templates/tag.html",
    "templates/archives.html",
    "templates/author.html",
  ]) {
    assert.match(read(path), /x-data="fileListNav"/, path);
  }

  const post = read("templates/post.html");
  assert.match(post, /x-data="postViewer"/);
  assert.match(post, /aria-label="Article table of contents"/);
  assert.match(post, /class="[^"]*terminal-content[^"]*"/);
  assert.match(read("templates/page.html"), /class="[^"]*terminal-content[^"]*"/);
});

test("every paginated route exposes a named navigation landmark", () => {
  const expectedLabels = new Map([
    ["templates/index.html", "Posts pagination"],
    ["templates/category.html", "Category posts pagination"],
    ["templates/tag.html", "Tag posts pagination"],
    ["templates/archives.html", "Archives pagination"],
    ["templates/author.html", "Author posts pagination"],
  ]);

  for (const [path, label] of expectedLabels) {
    const template = read(path);
    assert.match(template, new RegExp(`<nav[\\s\\S]*?aria-label="${label}"`), path);
  }
});

test("layout page-data payload contains every runtime field exactly once", () => {
  const layout = read("templates/modules/layout.html");
  const payload = layout.match(/<script id="halo-page-data"[\s\S]*?<\/script>/)?.[0];
  assert.ok(payload, "missing #halo-page-data payload");
  const topLevelKeyLines = payload
    .split("\n")
    .map((line) => ({ indent: line.match(/^\s*/)?.[0].length ?? 0, line }))
    .filter(({ line }) => /^\s+"[^"]+"\s*:/.test(line));
  const topLevelIndent = Math.min(...topLevelKeyLines.map(({ indent }) => indent));

  for (const key of [
    "categories",
    "currentAuthor",
    "currentCategory",
    "currentPage",
    "currentPost",
    "currentPosts",
    "currentTag",
    "nextPost",
    "pageType",
    "pagination",
    "prevPost",
    "tags",
    "urls",
    "user",
  ]) {
    assert.equal(
      topLevelKeyLines.filter(({ indent, line }) => indent === topLevelIndent && new RegExp(`"${key}"\\s*:`).test(line))
        .length,
      1,
      key,
    );
  }

  assert.match(layout, /id="navigation-announcer"[\s\S]*role="status"[\s\S]*aria-live="polite"/);
  assert.match(layout, /<label for="terminal-command-input" class="sr-only">/);
  assert.match(layout, /id="terminal-command-input"[\s\S]*aria-describedby="terminal-command-help"/);
});

test("reader routes expose a visible and keyboard-focusable reading region", () => {
  const layout = read("templates/modules/layout.html");
  const post = read("templates/post.html");

  assert.match(layout, /readerMode=\$\{post != null or singlePage != null\}/);
  assert.match(
    layout,
    /@theme:page-ready\.document="readerMode = \['post', 'page'\]\.includes\(\$event\.detail\.pageType\)"/,
  );
  assert.match(layout, /:tabindex="readerMode \? 0 : -1"/);
  assert.match(layout, /'scrollbar-terminal': readerMode/);
  assert.match(layout, /Last login:[\s\S]*#dates\.format\(#dates\.createNow\(\)/);
  assert.doesNotMatch(layout, /new Date\(\)\.toDateString\(\)/);

  assert.match(post, /<h1[\s\S]*?READ_PROGRESS/);
  assert.match(post, /<details[\s\S]*?window\.matchMedia\('\(min-width: 768px\)'\)\.matches/);
  assert.match(post, /<time[\s\S]*?th:datetime="\$\{post\.spec\.publishTime\}"/);
  assert.match(post, /Article table of contents/);
});

test("public mobile controls retain practical touch targets", () => {
  const layout = read("templates/modules/layout.html");
  const post = read("templates/post.html");

  for (const label of ["[INDEX]", "[CATEGORY]", "[TAG]", "[ARCHIVES]", "[SEARCH]"]) {
    const escapedLabel = label.replaceAll("[", "\\[").replaceAll("]", "\\]");
    assert.match(layout, new RegExp(`class="[^"]*min-h-10[^"]*"[\\s\\S]*?${escapedLabel}`), label);
  }

  assert.match(post, /class="[^"]*min-h-10[^"]*"[\s\S]*?@click="jumpToHeading/);
});

test("comment routes retain the opt-in guard and full-navigation cleanup boundary", () => {
  for (const [path, kind, nameExpression] of [
    ["templates/post.html", "Post", "post.metadata.name"],
    ["templates/page.html", "SinglePage", "singlePage.metadata.name"],
  ]) {
    const template = read(path);
    const comments = template.match(/<section[\s\S]*?class="[^"]*terminal-comments[^"]*"[\s\S]*?<\/section>/)?.[0];
    assert.ok(comments, path);
    assert.match(comments, /show_comments == true and haloCommentEnabled/, path);
    assert.match(comments, /data-navigation-exit="full"/, path);
    assert.match(comments, /group="content\.halo\.run"/, path);
    assert.match(comments, new RegExp(`kind="${kind}"`), path);
    assert.match(comments, new RegExp(`name=\\$\\{${nameExpression.replaceAll(".", "\\.")}\\}`), path);
  }
});

test("error route remains independent, responsive, and screen-reader safe", () => {
  const template = read("templates/error/error.html");
  assert.doesNotMatch(template, /modules\/layout/);
  assert.match(template, /<title th:text="\$\{error\.status\}/);
  assert.match(template, /aria-hidden="true"/);
  assert.match(template, /th:href="@\{\/\}"/);
  assert.match(template, /overflow-x-auto/);
});
