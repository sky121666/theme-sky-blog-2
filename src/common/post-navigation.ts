import { logWarn } from "./logger";
import { resolveNavigationUrl } from "./navigation-policy";

export const HALO_TRACKER_SELECTOR = 'script[src*="/halo-tracker.js"][data-plural][data-name]';
export const POST_COMMENT_SECTION_SELECTOR = '.terminal-comments[data-navigation-exit="full"]';

const POST_GROUP = "content.halo.run";
const COMMENT_MODULE_PATH = "/plugins/PluginCommentWidget/assets/static/comment-widget.js";
const COMMENT_INIT =
  /^\s*import\s+\{\s*init\s*\}\s+from\s+"([^"]+)";\s*init\(\s*"#([^"]+)",\s*\{\s*group:\s*"content\.halo\.run",\s*kind:\s*"Post",\s*name:\s*"([^"]+)",?\s*\}\s*\);\s*$/;

export interface PostVisit {
  endpoint: string;
  name: string;
}

export interface PostComments {
  moduleUrl: string;
  containerId: string;
  name: string;
}

export function findPostTracker(head: HTMLHeadElement, pageUrl: URL, postName: string) {
  const candidates = head.querySelectorAll<HTMLScriptElement>(HALO_TRACKER_SELECTOR);
  if (candidates.length !== 1) return null;
  const [script] = candidates;
  const source = resolveNavigationUrl(script.getAttribute("src")!, pageUrl);
  const { group, plural, name } = script.dataset;
  // Only replace Halo's standard per-resource tracker. Custom tracking options
  // stay on the native document path, as do all other page-scoped scripts.
  if (
    source?.origin !== pageUrl.origin ||
    !source.pathname.endsWith("/halo-tracker.js") ||
    source.search ||
    source.hash ||
    group !== POST_GROUP ||
    plural !== "posts" ||
    name !== postName ||
    script
      .getAttributeNames()
      .some(
        (attribute) =>
          !["async", "defer", "src", "data-group", "data-plural", "data-name", "nonce"].includes(attribute),
      )
  ) {
    return null;
  }
  return {
    script,
    visit: {
      endpoint: new URL("apis/api.halo.run/v1alpha1/trackers/counter", source).href,
      name,
    },
  };
}

export async function recordPostVisit({ endpoint, name }: PostVisit) {
  try {
    if (window.localStorage.getItem("haloTracker.disabled")) return;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ group: POST_GROUP, plural: "posts", name }),
      keepalive: true,
    });
    if (!response.ok) logWarn("Unable to record the article visit.", response.status);
  } catch (error) {
    logWarn("Unable to record the article visit.", error);
  }
}

export function findPostComments(section: Element, pageUrl: URL, postName: string) {
  const script = section.querySelector<HTMLScriptElement>(':scope > script[type="module"][data-pjax]:not([src])');
  const container = section.querySelector<HTMLElement>(':scope > div[id^="comment-"]');
  const match = script?.textContent?.match(COMMENT_INIT);
  if (!script || !container || !match || section.children.length !== 3) return null;

  const [, source, containerId, name] = match;
  const moduleUrl = resolveNavigationUrl(source, pageUrl);
  if (
    containerId !== container.id ||
    name !== postName ||
    moduleUrl?.origin !== pageUrl.origin ||
    moduleUrl.pathname !== COMMENT_MODULE_PATH
  ) {
    return null;
  }
  return { script, options: { moduleUrl: moduleUrl.href, containerId, name } };
}

export async function loadPostCommentWidget({ moduleUrl }: PostComments, timeoutMs: number) {
  let timer: number | undefined;
  try {
    const timeout = new Promise<never>((_, reject) => {
      timer = window.setTimeout(() => reject(new Error("Timed out loading the official comment widget.")), timeoutMs);
    });
    const { CommentWidget } = await Promise.race([import(/* @vite-ignore */ moduleUrl), timeout]);
    if (typeof CommentWidget !== "function" || !window.customElements.get("comment-widget")) {
      throw new Error("The official comment widget is unavailable.");
    }
  } finally {
    window.clearTimeout(timer);
  }
}

export function observePostComments(main: HTMLElement, { containerId, name }: PostComments) {
  const container = document.getElementById(containerId);
  if (!container || !main.contains(container)) throw new Error("The article comment container was not found.");
  const listeners = new AbortController();
  let observer: IntersectionObserver | undefined;

  function mount() {
    observer?.disconnect();
    if (!container?.isConnected || container.childElementCount) return;
    const widget = document.createElement("comment-widget") as HTMLElement & {
      group: string;
      kind: string;
      version: string;
      name: string;
    };
    widget.group = POST_GROUP;
    widget.kind = "Post";
    widget.version = "v1alpha1";
    widget.name = name;
    container.append(widget);
  }

  function showForHash() {
    const hash = window.location.hash.slice(1);
    if (hash !== "halo-comment" && !new URLSearchParams(hash).get("halo-comment")) return false;
    mount();
    if (hash === "halo-comment") {
      window.requestAnimationFrame(() => {
        if (container?.isConnected && window.location.hash === "#halo-comment") {
          container.scrollIntoView({ behavior: "instant", block: "start" });
        }
      });
    }
    return true;
  }

  if (!window.IntersectionObserver) {
    mount();
  } else if (!showForHash()) {
    observer = new window.IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) mount();
    });
    observer.observe(container);
  }

  window.addEventListener("hashchange", showForHash, { signal: listeners.signal });
  return () => {
    observer?.disconnect();
    listeners.abort();
  };
}
