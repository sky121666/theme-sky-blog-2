export function normalizeBaseUrl(value) {
  return String(value || "http://127.0.0.1:8090").replace(/\/+$/, "");
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function collectAssetVersions(html, themeName) {
  const safeThemeName = escapeRegExp(themeName);
  const pattern = new RegExp(`/themes/${safeThemeName}/assets/main\\.(?:css|iife\\.js)\\?v=([^"']+)`, "g");
  return [...html.matchAll(pattern)].map((match) => match[1]);
}

export async function fetchHomeHtml(baseUrl, checkParamName) {
  const url = new URL("/", `${baseUrl}/`);
  url.searchParams.set(checkParamName, String(Date.now()));

  const response = await fetch(url, {
    headers: {
      Accept: "text/html,application/xhtml+xml",
      "Cache-Control": "no-cache",
    },
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Runtime page returned ${response.status}`);
  }

  return response.text();
}
