import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const environment = installDom(`<!doctype html><html><head><title>Categories</title></head><body>
  <p id="navigation-announcer" role="status"></p>
  <main id="main" tabindex="-1">
    <script id="halo-page-data" type="application/json">
      {"categories":[],"currentPosts":[],"pageType":"categories","tags":[],"urls":{"archives":"/archives","categories":"/categories","home":"/","tags":"/tags"},"user":"guest"}
    </script>
  </main>
</body></html>`);
const Alpine = (await import("../src/common/alpine.ts")).default;
const { NAVIGATION_SAME_DOCUMENT_EVENT, NAVIGATION_START_EVENT, navigateToUrl } =
  await import("../src/common/navigation.ts");
const { bootstrapRuntime } = await import("../src/common/runtime.ts");

bootstrapRuntime();

test.after(async () => {
  Alpine.destroyTree(document.body);
  Alpine.stopObservingMutations();
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  environment.restore();
});

function navigationDetail(path) {
  return {
    focus: false,
    fromEntryKey: `from-${path}`,
    history: false,
    targetEntryKey: `to-${path}`,
    targetUrl: `https://blog.example.com/${path}`,
  };
}

test("same-document history navigation restores the remembered scroll position", async () => {
  const main = document.getElementById("main");
  let restored;
  Object.defineProperty(main, "scrollTop", { configurable: true, value: 345, writable: true });
  main.scrollTo = (options) => {
    restored = options;
  };
  const startDetail = navigationDetail("current");
  document.dispatchEvent(new CustomEvent(NAVIGATION_START_EVENT, { detail: startDetail }));

  const historyDetail = {
    ...navigationDetail("history"),
    history: true,
    targetEntryKey: startDetail.fromEntryKey,
  };
  document.dispatchEvent(new CustomEvent(NAVIGATION_SAME_DOCUMENT_EVENT, { detail: historyDetail }));
  await new Promise((resolve) => window.requestAnimationFrame(resolve));

  assert.deepEqual(restored, { behavior: "auto", top: 345 });
  assert.equal(main.classList.contains("loading"), false);
  assert.equal(main.hasAttribute("aria-busy"), false);
});

test("comment anchors leave scrolling to the widget before and after its lazy mount", async () => {
  const main = document.getElementById("main");

  for (const content of [
    '<section class="terminal-comments"><div id="comment-content-halo-run-Post-post-1"></div></section>',
    '<section class="terminal-comments"><comment-widget group="content.halo.run" kind="Post" name="post-1"></comment-widget></section>',
  ]) {
    for (const hash of ["#halo-comment", "#halo-comment=comment-1", "#halo-comment=comment-1&reply=reply-1"]) {
      window.history.replaceState({}, "", "/article");
      main.innerHTML = content;
      const restored = [];
      main.scrollTo = (options) => restored.push(options);

      navigateToUrl(`/article${hash}`);
      await new Promise((resolve) => window.requestAnimationFrame(resolve));

      assert.deepEqual(restored, [], `${hash}: ${content}`);

      window.dispatchEvent(new Event("popstate"));
      await new Promise((resolve) => window.requestAnimationFrame(resolve));
      assert.deepEqual(restored, [], `history ${hash}: ${content}`);
    }
  }
});

test("repeated comment anchors return to the public container without replacing first-load or history positioning", async () => {
  const main = document.getElementById("main");

  for (const hash of ["#halo-comment", "#halo-comment=comment-1&reply=reply-1"]) {
    window.history.replaceState({}, "", "/article");
    main.innerHTML =
      '<section class="terminal-comments"><div id="comment-content-halo-run-Post-post-1"></div></section>';
    const container = main.querySelector(".terminal-comments > div");
    const scrolled = [];
    const hashChanges = [];
    const onHashChange = (event) => hashChanges.push(event);
    container.scrollIntoView = (options) => scrolled.push(options);
    main.scrollTo = () => assert.fail("A comment anchor must not reset the main scroll position.");
    window.addEventListener("hashchange", onHashChange);

    try {
      navigateToUrl(`/article${hash}`);
      await new Promise((resolve) => window.requestAnimationFrame(resolve));
      assert.deepEqual(scrolled, [], `First activation belongs to the plugin: ${hash}`);

      main.scrollTop = 0;
      navigateToUrl(`/article${hash}`);
      await new Promise((resolve) => window.requestAnimationFrame(resolve));
      assert.deepEqual(scrolled, [{ behavior: "auto", block: "start" }], hash);
      assert.equal(document.activeElement, container);
      assert.equal(hashChanges.length, 1, "Repeating an unchanged hash does not create another hashchange.");

      window.dispatchEvent(new Event("popstate"));
      await new Promise((resolve) => window.requestAnimationFrame(resolve));
      assert.equal(scrolled.length, 1, "History positioning still belongs to the plugin.");
    } finally {
      window.removeEventListener("hashchange", onHashChange);
    }
  }
});

function mountedCommentDetail({ wrapped = true, replyName = "reply-1" } = {}) {
  const main = document.getElementById("main");
  main.innerHTML = wrapped
    ? '<section class="terminal-comments"><div id="comment-content-halo-run-Post-post-1"><comment-widget></comment-widget></div></section>'
    : '<section class="terminal-comments"><comment-widget></comment-widget></section>';
  const widget = main.querySelector("comment-widget");
  const container = wrapped ? widget.parentElement : widget;
  const widgetRoot = widget.attachShadow({ mode: "open" });
  widgetRoot.innerHTML = "<comment-form></comment-form><comment-detail></comment-detail>";
  const draft = document.createElement("textarea");
  draft.value = "Keep my unsent comment";
  widgetRoot.querySelector("comment-form").append(draft);
  const detail = widgetRoot.querySelector("comment-detail");
  detail.target = { commentName: "comment-1", ...(replyName ? { replyName } : {}) };
  const detailRoot = detail.attachShadow({ mode: "open" });
  detailRoot.innerHTML = "<comment-item></comment-item>";
  const item = detailRoot.querySelector("comment-item");
  item.comment = { metadata: { name: "comment-1" } };
  const itemRoot = item.attachShadow({ mode: "open" });
  itemRoot.innerHTML = '<div slot="footer"><comment-replies></comment-replies></div>';
  const replies = itemRoot.querySelector("comment-replies");
  const repliesRoot = replies.attachShadow({ mode: "open" });
  repliesRoot.innerHTML = "<div><reply-item></reply-item><reply-item></reply-item></div>";
  const [otherReply, reply] = repliesRoot.querySelectorAll("reply-item");
  otherReply.reply = { metadata: { name: "reply-other" } };
  otherReply.comment = item.comment;
  reply.reply = { metadata: { name: "reply-1" } };
  reply.comment = item.comment;
  const replyDraft = document.createElement("textarea");
  replyDraft.value = "Keep my unsent reply";
  reply.attachShadow({ mode: "open" }).append(replyDraft);
  const scrolled = [];
  for (const target of [container, widget, detail, item, otherReply, reply]) {
    target.scrollIntoView = (options) => scrolled.push({ target, options });
  }
  main.scrollTo = () => assert.fail("A comment permalink must not reset the main scroll position.");
  return { main, container, widget, detail, item, replies, reply, draft, replyDraft, scrolled };
}

test("repeated mounted comment permalinks scroll and focus the exact item while preserving both drafts", async (t) => {
  const requests = [];
  const rejectFetch = (...args) => {
    requests.push(args);
    return Promise.reject(new Error("Repeated comment positioning must not fetch."));
  };
  t.mock.method(globalThis, "fetch", rejectFetch);
  const priorWindowFetch = window.fetch;
  window.fetch = rejectFetch;
  t.after(() => {
    window.fetch = priorWindowFetch;
  });

  for (const wrapped of [false, true]) {
    for (const replyName of ["reply-1", undefined]) {
      const hash = replyName ? "#halo-comment=comment-1&reply=reply-1" : "#halo-comment=comment-1";
      window.history.replaceState({}, "", "/article");
      const fixture = mountedCommentDetail({ wrapped, replyName: replyName ?? "" });
      const { widget, detail, item, replies, reply, draft, replyDraft, scrolled } = fixture;
      const target = replyName ? reply : item;
      let hashChanges = 0;
      const onHashChange = () => hashChanges++;
      window.addEventListener("hashchange", onHashChange);

      try {
        navigateToUrl(`/article${hash}`);
        await new Promise((resolve) => window.requestAnimationFrame(resolve));
        assert.equal(scrolled.length, 0, "First positioning still belongs to the widget.");

        navigateToUrl(`/article${hash}`);
        await new Promise((resolve) => window.requestAnimationFrame(resolve));
        assert.deepEqual(scrolled, [{ target, options: { behavior: "auto", block: "start" } }]);
        assert.equal(document.activeElement, widget);
        assert.equal(widget.shadowRoot.activeElement, detail);
        assert.equal(detail.shadowRoot.activeElement, item);
        if (replyName) {
          assert.equal(item.shadowRoot.activeElement, replies);
          assert.equal(replies.shadowRoot.activeElement, reply);
        }
        assert.equal(draft.isConnected, true);
        assert.equal(replyDraft.isConnected, true);
        assert.equal(draft.value, "Keep my unsent comment");
        assert.equal(replyDraft.value, "Keep my unsent reply");
        assert.equal(widget.shadowRoot.querySelector("comment-detail"), detail);
        assert.equal(replies.shadowRoot.querySelectorAll("reply-item")[1], reply);
        assert.equal(hashChanges, 1, "Repeated positioning must not dispatch another hashchange.");

        window.dispatchEvent(new Event("popstate"));
        await new Promise((resolve) => window.requestAnimationFrame(resolve));
        assert.equal(scrolled.length, 1, "History positioning still belongs to the widget.");
      } finally {
        window.removeEventListener("hashchange", onHashChange);
      }
    }
  }
  assert.deepEqual(requests, []);
});

test("repeated comment permalinks safely fall back when the rendered target cannot be verified", async () => {
  for (const alter of [
    ({ detail }) => (detail.target.commentName = "comment-other"),
    ({ detail }) => (detail.target.replyName = "reply-other"),
    ({ item }) => (item.comment = { metadata: { name: "comment-other" } }),
    ({ reply }) => (reply.reply = { metadata: { name: "reply-missing" } }),
    ({ reply }) => (reply.comment = { metadata: { name: "comment-other" } }),
    ({ replies }) => (replies.hidden = true),
    ({ detail }) => detail.shadowRoot.replaceChildren(),
    ({ widget }) => widget.shadowRoot.replaceChildren(),
  ]) {
    window.history.replaceState({}, "", "/article");
    const fixture = mountedCommentDetail();
    alter(fixture);
    const url = "/article#halo-comment=comment-1&reply=reply-1";
    navigateToUrl(url);
    await new Promise((resolve) => window.requestAnimationFrame(resolve));
    navigateToUrl(url);
    await new Promise((resolve) => window.requestAnimationFrame(resolve));

    assert.deepEqual(fixture.scrolled, [{ target: fixture.container, options: { behavior: "auto", block: "start" } }]);
    assert.equal(document.activeElement, fixture.container);
  }
});

test("ordinary, invalid and unavailable comment anchors retain normal scroll restoration", async () => {
  const main = document.getElementById("main");
  const commentContainer =
    '<section class="terminal-comments"><div id="comment-content-halo-run-Post-post-1"></div></section>';

  for (const [hash, content] of [
    ["#halo-comment", ""],
    ["#halo-comment=comment-1", '<section class="terminal-comments"></section>'],
    ["#halo-comment=comment-1&reply=reply-1", '<div id="comment-unrelated"></div>'],
    ["#halo-comment=", commentContainer],
    ["#halo-comment=%20", commentContainer],
    ["#halo-comment=%E0%A4%A", commentContainer],
    ["#reply=reply-1", commentContainer],
    ["#missing-heading", commentContainer],
  ]) {
    window.history.replaceState({}, "", "/article");
    main.innerHTML = content;
    const restored = [];
    main.scrollTo = (options) => restored.push(options);

    navigateToUrl(`/article${hash}`);
    await new Promise((resolve) => window.requestAnimationFrame(resolve));

    assert.deepEqual(restored, [{ behavior: "auto", top: 0 }], `${hash}: ${content}`);
  }

  window.history.replaceState({}, "", "/article");
  main.innerHTML = `${commentContainer}<h2 id="details">Details</h2>`;
  const heading = document.getElementById("details");
  const scrolled = [];
  heading.scrollIntoView = (options) => scrolled.push(options);
  main.scrollTo = () => assert.fail("A normal heading must not reset the main scroll position.");

  navigateToUrl("/article#details", { focus: true });
  await new Promise((resolve) => window.requestAnimationFrame(resolve));

  assert.deepEqual(scrolled, [{ behavior: "auto", block: "start" }]);
  assert.equal(document.activeElement, heading);
});
