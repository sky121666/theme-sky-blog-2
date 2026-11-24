import { resolveNavigationUrl } from "./navigation-policy";

const ASSET_ROOT = "/plugins/PluginLightGallery/assets/static/";
const RESOURCES = [
  {
    selector: 'link[rel="stylesheet"][href]',
    attribute: "href",
    path: "css/lightgallery.min.css",
    attributes: ["href", "rel"],
  },
  {
    selector: "script[defer][src]",
    attribute: "src",
    path: "js/lightgallery.min.js",
    attributes: ["src", "defer", "nonce"],
  },
  {
    selector: "script[defer][src]",
    attribute: "src",
    path: "js/plugins/zoom/lg-zoom.min.js",
    attributes: ["src", "defer", "nonce"],
  },
];

// PluginLightGallery 1.2.1 wraps its configurable initializer in DOMContentLoaded.
// Recognize the observed initializer as data. Custom scripts stay in the head contract.
const ARTICLE_INIT = `
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(\`#article-content img\`)?.forEach(function (node) {
      if (node) {
        node.dataset.src = node.src;
      }
      const galleries = document.querySelectorAll(\`#article-content\`);
      if (galleries.length > 0) {
        galleries.forEach(function (node) {
          lightGallery(node, { selector: "img", });
        });
      }
    });
  });
`.replace(/\s+/g, "");

export function findUnusedLightGalleryResources(nextDocument: Document, pageUrl: URL) {
  if (nextDocument.getElementById("article-content") || document.getElementById("article-content")) return [];

  const { head } = nextDocument;
  const initializer = Array.from(head.querySelectorAll('script[type="text/javascript"]:not([src])')).find(
    (script) =>
      script.getAttributeNames().every((name) => name === "type" || name === "nonce") &&
      script.textContent?.replace(/\s+/g, "") === ARTICLE_INIT,
  );
  if (!initializer) return [];

  const resources = [initializer];
  for (const { selector, attribute, path, attributes } of RESOURCES) {
    const expected = new URL(ASSET_ROOT + path, pageUrl).href;
    const element = Array.from(head.querySelectorAll(selector)).find(
      (node) =>
        node.getAttributeNames().every((name) => attributes.includes(name)) &&
        resolveNavigationUrl(node.getAttribute(attribute)!, pageUrl)?.href === expected,
    );
    if (!element) return [];
    resources.push(element);
  }
  return resources;
}
