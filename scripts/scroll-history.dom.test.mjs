import assert from "node:assert/strict";
import test from "node:test";

import { installDom } from "./dom-test-helpers.mjs";

const html = '<main id="main"></main>';
const url = "https://blog.example.com/categories/default/page/2";
const initial = installDom(html, url);
const { bindEntryScrollHistory, rememberEntryScroll } = await import("../src/common/scroll-history.ts");
initial.restore();

function page(state, options = {}) {
  const env = installDom(html, url);
  history.replaceState(state, "");
  if (options.tab !== undefined) window.sessionStorage.setItem("sky-blog-2:main-scroll", options.tab);
  return { main: document.getElementById("main"), positions: new Map(), close: env.restore };
}
function hide() {
  window.dispatchEvent(new PageTransitionEvent("pagehide", { persisted: false }));
}
function visit(type, key, historyVisit = false) {
  document.dispatchEvent(new CustomEvent(type, { detail: { targetEntryKey: key, history: historyVisit } }));
}
function record(key, top, time = 1) {
  return { key, top, time };
}

test("the source visit records the outgoing list, preserving swup fields and other entries at the same URL", () => {
  const state = { themePartialNavigationKey: "list", index: 3, themePreviousUrl: "/first", plugin: { value: 1 } };
  const source = page(state);
  let saved;
  try {
    bindEntryScrollHistory(source.positions);
    source.main.scrollTop = 99;
    rememberEntryScroll("list", source.main);
    saved = history.state;
    assert.deepEqual({ ...saved, themeMainScroll: undefined }, { ...state, themeMainScroll: undefined });
    assert.equal(saved.themeMainScroll.top, 99);
    assert.equal(window.sessionStorage.length, 0);
  } finally {
    source.close();
  }
  for (const [key, expected] of [
    ["other", 0],
    ["list", 99],
  ]) {
    const cold = page({ ...saved, themePartialNavigationKey: key });
    try {
      bindEntryScrollHistory(cold.positions);
      assert.equal(cold.main.scrollTop, expected);
      assert.equal(cold.positions.get(key), key === "list" ? 99 : undefined);
    } finally {
      cold.close();
    }
  }
});

test("native pagehide saves the article without visit:start, including reload with Web Storage disabled", () => {
  const cold = page({ themePartialNavigationKey: "article" });
  try {
    Object.defineProperty(window, "sessionStorage", {
      get() {
        throw new Error("denied");
      },
    });
    bindEntryScrollHistory(cold.positions);
    cold.main.scrollTop = 614;
    hide();
    assert.equal(history.state.themeMainScroll.top, 614);
    cold.main.scrollTop = 0;
    hide();
    assert.equal(history.state.themeMainScroll.top, 0);
  } finally {
    cold.close();
  }
});

test("pagehide after native traversal targets the displayed article even after the neighbor was selected", () => {
  const articleState = { themePartialNavigationKey: "article", themeMainScroll: record("article", 12) };
  const selectedList = { themePartialNavigationKey: "list", themeMainScroll: record("list", 99) };
  const outgoing = page(articleState);
  let tab;
  try {
    bindEntryScrollHistory(outgoing.positions);
    outgoing.main.scrollTop = 614;
    history.replaceState(selectedList, "", "/list");
    hide();
    assert.deepEqual(history.state, selectedList);
    tab = window.sessionStorage.getItem("sky-blog-2:main-scroll");
    assert.equal(JSON.parse(tab)[0].key, "article");
  } finally {
    outgoing.close();
  }
  const forward = page(articleState, { tab });
  let newer;
  try {
    bindEntryScrollHistory(forward.positions);
    assert.equal(forward.main.scrollTop, 614);
    forward.main.scrollTop = 777;
    hide();
    assert.equal(history.state.themeMainScroll.top, 777);
    newer = history.state;
  } finally {
    forward.close();
  }
  const next = page(newer, { tab });
  try {
    bindEntryScrollHistory(next.positions);
    assert.equal(next.main.scrollTop, 777);
  } finally {
    next.close();
  }
});

test("a replaced pane adopts its own key and hydrates an older entry before partial history restoration", () => {
  const env = page({ themePartialNavigationKey: "source" });
  try {
    bindEntryScrollHistory(env.positions);
    bindEntryScrollHistory(env.positions);
    history.replaceState({ themePartialNavigationKey: "target", themeMainScroll: record("target", 42) }, "");
    visit("theme:navigation-start", "target", true);
    assert.equal(env.positions.get("target"), 42);
    const next = env.main.cloneNode();
    env.main.replaceWith(next);
    visit("theme:navigation-success", "target");
    next.scrollTop = 26;
    next.dispatchEvent(new Event("scrollend"));
    assert.equal(history.state.themeMainScroll.top, 26);
    rememberEntryScroll("source", env.main);
    assert.equal(window.sessionStorage.length, 0);
  } finally {
    env.close();
  }
});

test("unavailable history and tab storage leave the pane and in-memory fallback usable", () => {
  const env = page({ themePartialNavigationKey: "denied" }, { tab: "malformed" });
  try {
    bindEntryScrollHistory(env.positions);
    Object.defineProperty(window, "sessionStorage", {
      get() {
        throw new Error("disabled");
      },
    });
    history.replaceState = () => {
      throw new Error("denied");
    };
    env.main.scrollTop = 31;
    rememberEntryScroll("denied", env.main);
    hide();
    assert.equal(env.main.scrollTop, 31);
    assert.equal(history.state.themeMainScroll, undefined);
  } finally {
    env.close();
  }
  const missing = page(null);
  try {
    Object.defineProperty(history, "state", {
      get() {
        throw new Error("inaccessible");
      },
    });
    bindEntryScrollHistory(missing.positions);
    hide();
    assert.equal(missing.positions.size, 0);
  } finally {
    missing.close();
  }
});

test("a delayed cold restore respects new navigation, changed DOM and reader input", () => {
  for (const action of ["ready", "new key", "new pane", "scroll", "keydown", "visit"]) {
    const env = page({ themePartialNavigationKey: "source", themeMainScroll: record("source", 99) });
    try {
      let top = 0,
        maximum = 10;
      Object.defineProperty(env.main, "scrollTop", {
        get: () => top,
        set: (y) => {
          top = Math.min(y, maximum);
        },
      });
      bindEntryScrollHistory(env.positions);
      assert.equal(top, 10);
      maximum = 200;
      if (action === "new key") history.replaceState({ themePartialNavigationKey: "neighbor" }, "");
      if (action === "new pane") env.main.replaceWith(env.main.cloneNode());
      if (action === "scroll") env.main.scrollTop = 7;
      if (action === "keydown") window.dispatchEvent(new KeyboardEvent("keydown"));
      if (action === "visit") visit("theme:navigation-start", "next");
      window.dispatchEvent(new PageTransitionEvent("pageshow"));
      assert.equal(top, action === "ready" ? 99 : action === "scroll" ? 7 : 10, action);
      if (action === "new pane") assert.equal(document.getElementById("main").scrollTop, 0);
    } finally {
      env.close();
    }
  }
});

test("a restored deep link holds its exact position through pageshow and yields to reader input", () => {
  const env = page({ themePartialNavigationKey: "deep", themeMainScroll: record("deep", 2290) });
  try {
    history.replaceState(history.state, "", "#section-4");
    env.main.style.overflowAnchor = "auto";
    bindEntryScrollHistory(env.positions);
    window.dispatchEvent(new PageTransitionEvent("pageshow", { persisted: false }));
    assert.equal(env.main.scrollTop, 2290);
    assert.equal(env.main.style.overflowAnchor, "none");
    env.main.dispatchEvent(new Event("wheel", { bubbles: true }));
    assert.equal(env.main.style.overflowAnchor, "auto");
  } finally {
    env.close();
  }
});

test("a closed-source return retains 82 through the initial 69px limit and observes later content growth", () => {
  for (const action of ["grow", "leave", "wheel", "replace"]) {
    const env = page({ themePartialNavigationKey: "closed", themeMainScroll: record("closed", 82) });
    try {
      let top = 0,
        max = 69,
        retry,
        disconnected = false;
      const observed = [];
      const content = env.main.appendChild(document.createElement("article"));
      window.ResizeObserver = class {
        constructor(callback) {
          retry = callback;
        }
        observe(node) {
          observed.push(node);
        }
        disconnect() {
          disconnected = true;
        }
      };
      Object.defineProperty(env.main, "scrollTop", {
        get: () => top,
        set: (value) => {
          top = Math.min(value, max);
        },
      });
      bindEntryScrollHistory(env.positions);
      window.dispatchEvent(new PageTransitionEvent("pageshow", { persisted: false }));
      env.main.dispatchEvent(new Event("scrollend"));
      assert.equal(top, 69);
      assert.equal(history.state.themeMainScroll.top, 82);
      assert.deepEqual(observed, [env.main, content]);
      if (action === "leave") {
        hide();
        assert.equal(history.state.themeMainScroll.top, 82);
      }
      if (action === "wheel") window.dispatchEvent(new Event("wheel"));
      if (action === "replace") env.main.replaceWith(env.main.cloneNode());
      max = 89;
      retry();
      assert.equal(top, action === "grow" ? 82 : 69, action);
      assert.equal(disconnected, true);
      if (action === "replace") assert.equal(document.getElementById("main").scrollTop, 0);
    } finally {
      env.close();
    }
  }
});

test("an anchor visit records the requested position before releasing a range-limited restore", () => {
  const source = page({ themePartialNavigationKey: "article", themeMainScroll: record("article", 82) });
  try {
    let top = 0;
    Object.defineProperty(source.main, "scrollTop", {
      get: () => top,
      set: (value) => {
        top = Math.min(value, 69);
      },
    });
    let saved;
    document.addEventListener(
      "theme:navigation-same-document",
      () => {
        saved = rememberEntryScroll("article", source.main);
      },
      { once: true },
    );
    bindEntryScrollHistory(source.positions);
    history.pushState({ themePartialNavigationKey: "heading" }, "", "#section");
    visit("theme:navigation-same-document", "heading");
    assert.equal(JSON.parse(window.sessionStorage.getItem("sky-blog-2:main-scroll"))[0].top, 82);
    assert.equal(saved, 82);
  } finally {
    source.close();
  }
});

test("scrolling the old page while a new URL is pending updates the position used by Back", () => {
  const source = page({ themePartialNavigationKey: "source" });
  try {
    bindEntryScrollHistory(source.positions);
    source.positions.set("source", 250);
    history.pushState({ themePartialNavigationKey: "pending" }, "", "/next");
    source.main.scrollTop = 710;
    source.main.dispatchEvent(new Event("scroll"));
    assert.equal(source.positions.get("source"), 710);
    assert.equal(source.positions.has("pending"), false);
    source.main.dispatchEvent(new Event("scrollend"));
    assert.equal(JSON.parse(window.sessionStorage.getItem("sky-blog-2:main-scroll"))[0].top, 710);
    assert.equal(history.state.themeMainScroll, undefined);
  } finally {
    source.close();
  }
});
