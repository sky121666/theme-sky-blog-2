import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const post = readFileSync(new URL("../templates/post.html", import.meta.url), "utf8");
const toc = post.match(/<details\b[\s\S]*?<\/details>/)[0];
const url = "https://blog.example.com/article?preview-theme=sky";
const id = "章节 #2%";
const environment = installDom(
  `<main id="main" tabindex="0">
  <div x-data="postViewer">${toc}<article class="terminal-content"><h2 id="${id}">Heading</h2></article></div>
  <script id="halo-page-data" type="application/json">{"pageType":"post"}</script>
</main>`,
  url,
);
const { registerPostViewerComponent } = await import("../src/features/post-viewer.ts");
const { dispatchCommand } = await import("../src/features/commands.ts");
const Alpine = (await import("../src/common/alpine.ts")).default;
const { bootstrapRuntime } = await import("../src/common/runtime.ts");
const { navigateToUrl, NAVIGATION_COMPLETE_EVENT, NAVIGATION_ERROR_EVENT, NAVIGATION_FULL_RELOAD_EVENT } =
  await import("../src/common/navigation.ts");

registerPostViewerComponent();
bootstrapRuntime();

test.after(() => {
  Alpine.destroyTree(document.body);
  Alpine.stopObservingMutations();
  environment.restore();
});

test("choosing the rendered TOC cancels an in-flight visit and focuses the encoded preview heading", async (t) => {
  let rejectRequest;
  let signal;
  const fetch = t.mock.method(globalThis, "fetch", (_url, options) => {
    signal = options.signal;
    return new Promise((_resolve, reject) => {
      rejectRequest = reject;
    });
  });
  const reloads = [];
  document.addEventListener(NAVIGATION_FULL_RELOAD_EVENT, (event) => reloads.push(event.detail.targetUrl));
  const heading = document.getElementById(id);
  const scrolled = t.mock.method(heading, "scrollIntoView");
  navigateToUrl("/slow");
  await t.waitFor(() => assert.equal(fetch.mock.callCount(), 1));
  const item = document.querySelector("nav li :is(a, button)");
  item.click();
  rejectRequest(new Error("late failure"));
  await new Promise((resolve) => window.requestAnimationFrame(resolve));
  assert.equal(signal.aborted, true);
  assert.equal(location.href, url + "#" + encodeURIComponent(id));
  assert.equal(document.activeElement, heading);
  assert.equal(scrolled.mock.callCount(), 1);
  assert.deepEqual(reloads, []);
  assert.equal(fetch.mock.callCount(), 1);

  const failed = new Promise((resolve) => document.addEventListener(NAVIGATION_ERROR_EVENT, resolve, { once: true }));
  navigateToUrl("/unavailable");
  await t.waitFor(() => assert.equal(fetch.mock.callCount(), 2));
  rejectRequest(new Error("already failed"));
  await failed;
  item.focus();
  item.dispatchEvent(new MouseEvent("click", { detail: 1, bubbles: true, cancelable: true }));
  await new Promise((resolve) => window.requestAnimationFrame(resolve));
  assert.equal(location.href, url + "#" + encodeURIComponent(id));
  assert.equal(document.activeElement, item);
  assert.equal(scrolled.mock.callCount(), 2);
  assert.deepEqual(reloads, []);
  assert.equal(fetch.mock.callCount(), 2);
});

test("dynamic headings update the rendered TOC and commands in the same order", async (t) => {
  const content = document.querySelector(".terminal-content");
  const details = document.querySelector("details.reader-toc");
  const links = () => Array.from(details.querySelectorAll("ol > li > a"));
  const nextFrame = () => new Promise((resolve) => window.requestAnimationFrame(resolve));
  const [existingLink] = links();
  const heading = document.createElement("h2");
  heading.innerHTML = "<span>新章节</span>";
  const scrolled = t.mock.method(heading, "scrollIntoView");

  details.open = true;
  existingLink.focus();
  content.prepend(heading);
  await nextFrame();

  assert.deepEqual(
    links().map((link) => link.textContent.trim()),
    ["新章节", "Heading"],
  );
  assert.equal(heading.id, "toc-新章节-1");
  assert.ok(links()[1] === existingLink && document.activeElement === existingLink);
  assert.equal(existingLink.getAttribute("href"), "#" + encodeURIComponent(id));
  assert.deepEqual(await dispatchCommand("toc", "", "~"), { output: "01. 新章节\n02. Heading" });

  heading.firstChild.firstChild.data = "Renamed";
  assert.deepEqual(await dispatchCommand("jump", "1", "~"), {});
  assert.deepEqual(await dispatchCommand("toc", "", "~"), { output: "01. Renamed\n02. Heading" });
  await nextFrame();
  assert.equal(heading.id, "toc-新章节-1");
  assert.equal(links()[0].textContent.trim(), "Renamed");
  assert.equal(scrolled.mock.callCount(), 1);

  content.append(heading);
  await nextFrame();
  assert.deepEqual(
    links().map((link) => link.textContent.trim()),
    ["Heading", "Renamed"],
  );
  assert.ok(links()[0] === existingLink);
  await t.waitFor(() => assert.ok(document.activeElement === existingLink, "the moved link kept focus"));
  assert.deepEqual(await dispatchCommand("toc", "", "~"), { output: "01. Heading\n02. Renamed" });

  heading.id = "新 #ID%";
  const jump = dispatchCommand("jump", "2", "~");
  assert.equal(scrolled.mock.callCount(), 2);
  assert.deepEqual(await jump, {});
  await nextFrame();
  const [, newLink] = links();
  assert.equal(newLink.getAttribute("href"), "#" + encodeURIComponent(heading.id));
  newLink.click();
  await nextFrame();
  assert.equal(location.href, url + "#" + encodeURIComponent(heading.id));
  assert.ok(document.activeElement === heading);
  assert.equal(scrolled.mock.callCount(), 3);

  heading.remove();
  await nextFrame();
  assert.deepEqual(
    links().map((link) => link.getAttribute("href")),
    ["#" + encodeURIComponent(id)],
  );
  assert.deepEqual(await dispatchCommand("toc", "", "~"), { output: "01. Heading" });
});

test("replacing a post stops indexing its old body and tracks the new body", { timeout: 3000 }, async (t) => {
  const oldContent = document.querySelector(".terminal-content");
  t.mock.method(globalThis, "fetch", async (requestUrl) => {
    const response = new Response(
      `<!doctype html><html><head><title>Next post</title></head><body>
        <main id="main" tabindex="0">
          <div x-data="postViewer">${toc}<article class="terminal-content"><h2>Next heading</h2></article></div>
          <script id="halo-page-data" type="application/json">{"pageType":"post"}</script>
        </main>
      </body></html>`,
      { headers: { "content-type": "text/html" } },
    );
    Object.defineProperty(response, "url", { value: requestUrl });
    return response;
  });

  const complete = new Promise((resolve) =>
    document.addEventListener(NAVIGATION_COMPLETE_EVENT, resolve, { once: true }),
  );
  assert.equal(navigateToUrl("/next-post"), true);
  await complete;
  assert.equal(oldContent.isConnected, false);

  const oldHeading = document.createElement("h2");
  oldHeading.textContent = "Discarded heading";
  oldContent.prepend(oldHeading);
  const content = document.querySelector(".terminal-content");
  content.insertAdjacentHTML("beforeend", "<section><h3>Details</h3></section>");
  await new Promise((resolve) => window.requestAnimationFrame(resolve));

  assert.equal(oldHeading.id, "");
  assert.deepEqual(
    Array.from(document.querySelectorAll("nav li a"), (link) => link.textContent.trim()),
    ["Next heading", "Details"],
  );
  assert.deepEqual(await dispatchCommand("toc", "", "~"), { output: "01. Next heading\n02.   Details" });
});
