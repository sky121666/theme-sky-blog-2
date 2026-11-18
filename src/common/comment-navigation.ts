import { NAVIGATION_FULL_RELOAD_EVENT, NAVIGATION_SAME_DOCUMENT_EVENT, NAVIGATION_START_EVENT } from "./navigation";

const INITIAL_REPLY_LAYOUT_TIMEOUT_MS = 5000;
const INITIAL_REPLY_LAYOUT_INTERVAL_MS = 100;

export function findCommentHashContainer() {
  const rawHash = window.location.hash.slice(1);
  if (rawHash !== "halo-comment") {
    try {
      decodeURIComponent(rawHash);
      if (!new URLSearchParams(rawHash).get("halo-comment")?.trim()) {
        return null;
      }
    } catch {
      return null;
    }
  }

  // The official tag renders a container before its widget is lazily mounted.
  return document.querySelector<HTMLElement>('#main comment-widget, #main .terminal-comments > div[id^="comment-"]');
}

export function findRenderedCommentHashTarget(container: HTMLElement) {
  const params = new URLSearchParams(window.location.hash.slice(1));
  const commentName = params.get("halo-comment");
  const replyName = params.get("reply") || undefined;
  if (!commentName) {
    return null;
  }

  // CommentWidget 3.4–3.5 has no repeat-location API. Read its open shadow roots only,
  // verify each target name, and fall back to the container if its structure changes.
  // Never reload the detail or remount the widget: either could discard an open draft.
  const widget = container.matches("comment-widget") ? container : container.querySelector("comment-widget");
  const detail = widget?.shadowRoot?.querySelector<
    HTMLElement & { target?: { commentName?: string; replyName?: string } }
  >("comment-detail");
  if (detail?.target?.commentName !== commentName || detail.target.replyName !== replyName) {
    return null;
  }

  type CommentItem = HTMLElement & {
    comment?: { metadata?: { name?: string } };
    reply?: { metadata?: { name?: string } };
  };
  const item = detail.shadowRoot?.querySelector<CommentItem>("comment-item");
  if (item?.comment?.metadata?.name !== commentName) {
    return null;
  }
  if (!replyName) {
    return item;
  }

  const replies = item.shadowRoot?.querySelector<HTMLElement>("comment-replies");
  if (!replies?.shadowRoot || replies.hidden) {
    return null;
  }
  return (
    Array.from(replies.shadowRoot.querySelectorAll<CommentItem>("reply-item")).find(
      (reply) => reply.comment?.metadata?.name === commentName && reply.reply?.metadata?.name === replyName,
    ) ?? null
  );
}

export function keepInitialReplyVisible() {
  const hash = window.location.hash;
  if (!new URLSearchParams(hash.slice(1)).get("reply")?.trim()) return;
  const container = findCommentHashContainer();
  const main = document.getElementById("main");
  if (!container || !main) return;

  const listeners = new window.AbortController();
  const deadline = window.performance.now() + INITIAL_REPLY_LAYOUT_TIMEOUT_MS;
  const timer = window.setInterval(() => {
    if (window.location.hash !== hash || !container.isConnected || window.performance.now() >= deadline) {
      stop();
      return;
    }

    // The widget can scroll before earlier content (for example Shiki blocks) finishes laying out.
    const reply = findRenderedCommentHashTarget(container);
    if (!reply?.getClientRects().length) return;
    const view = main.getBoundingClientRect();
    const target = reply.getBoundingClientRect();
    if (target.top >= view.bottom || target.bottom <= view.top) {
      reply.scrollIntoView({ behavior: "instant", block: "center" });
    }
  }, INITIAL_REPLY_LAYOUT_INTERVAL_MS);

  function stop() {
    window.clearInterval(timer);
    listeners.abort();
  }

  for (const type of [
    "pointerdown",
    "touchstart",
    "wheel",
    "keydown",
    "pagehide",
    NAVIGATION_START_EVENT,
    NAVIGATION_FULL_RELOAD_EVENT,
    NAVIGATION_SAME_DOCUMENT_EVENT,
  ]) {
    window.addEventListener(type, stop, { signal: listeners.signal, capture: true, passive: true });
  }
}
