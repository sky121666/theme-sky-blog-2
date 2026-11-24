import { resolveNavigationUrl } from "./navigation-policy";
import type { HaloPageType } from "./types";

const CARD_ASSET_PATH = "/plugins/plugin-ncm/assets/static/card.";
const CARD_ENDPOINT = "/music/card/";

export function findMusicCardAssets(head: HTMLHeadElement, pageUrl: URL) {
  const styles = head.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"][data-ncm-card-css]');
  const scripts = head.querySelectorAll<HTMLScriptElement>("script[defer][data-ncm-card-js]");
  if (styles.length !== 1 || scripts.length !== 1) return null;

  const [stylesheet] = styles;
  const [script] = scripts;
  const cssUrl = resolveNavigationUrl(stylesheet.getAttribute("href") ?? "", pageUrl);
  const scriptUrl = resolveNavigationUrl(script.getAttribute("src") ?? "", pageUrl);
  // The plugin's card runtime scans inserted content and is safe to keep for
  // the lifetime of this document. Other injected resources keep the usual guard.
  if (
    cssUrl?.origin !== pageUrl.origin ||
    scriptUrl?.origin !== pageUrl.origin ||
    cssUrl.pathname !== CARD_ASSET_PATH + "css" ||
    scriptUrl.pathname !== CARD_ASSET_PATH + "js" ||
    !cssUrl.searchParams.get("v") ||
    cssUrl.search !== scriptUrl.search ||
    cssUrl.hash ||
    scriptUrl.hash ||
    script.dataset.endpoint !== CARD_ENDPOINT ||
    stylesheet.getAttributeNames().some((name) => !["rel", "href", "data-ncm-card-css"].includes(name)) ||
    script.getAttributeNames().some((name) => !["defer", "src", "data-ncm-card-js", "data-endpoint"].includes(name))
  ) {
    return null;
  }
  return { stylesheet, script, cssUrl: cssUrl.href, scriptUrl: scriptUrl.href };
}

export function loadMusicCardAssets({ cssUrl, scriptUrl }: NonNullable<ReturnType<typeof findMusicCardAssets>>) {
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = cssUrl;
  stylesheet.dataset.ncmCardCss = "";
  const script = document.createElement("script");
  script.src = scriptUrl;
  script.defer = true;
  script.dataset.ncmCardJs = "";
  script.dataset.endpoint = CARD_ENDPOINT;
  document.head.append(stylesheet, script);
}

export function planMusicCardNavigation(
  nextHead: HTMLHeadElement,
  currentUrl: URL,
  nextUrl: URL,
  pageType: HaloPageType,
) {
  const current = findMusicCardAssets(document.head, currentUrl);
  const next = findMusicCardAssets(nextHead, nextUrl);
  const lists = ["index", "archives", "categories", "category", "tags", "tag", "author"];
  const canReuse = current && next && current.cssUrl === next.cssUrl && current.scriptUrl === next.scriptUrl;
  const canKeepOnList = current && !next && lists.includes(pageType);
  const toLoad = !current && next && pageType === "post" ? next : null;
  return {
    ignoreCurrent: current && (canReuse || canKeepOnList) ? [current.stylesheet, current.script] : [],
    ignoreNext: next && (canReuse || toLoad) ? [next.stylesheet, next.script] : [],
    toLoad,
  };
}
