const PARTIAL_NAVIGATION_EXCLUDED_PATHS = ["/login", "/logout", "/password-reset", "/signup"];
const SAFE_NAVIGATION_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);
const PARTIAL_NAVIGATION_PROTOCOLS = new Set(["http:", "https:"]);

export function withoutHash(url: URL) {
  return `${url.origin}${url.pathname}${url.search}`;
}

export function isSameDocumentUrl(left: URL, right: URL) {
  return withoutHash(left) === withoutHash(right);
}

export function isPartialNavigationCandidate(url: URL, currentUrl: URL) {
  if (!PARTIAL_NAVIGATION_PROTOCOLS.has(url.protocol)) {
    return false;
  }

  if (url.origin !== currentUrl.origin || url.protocol !== currentUrl.protocol) {
    return false;
  }

  return !PARTIAL_NAVIGATION_EXCLUDED_PATHS.some(
    (prefix) => url.pathname === prefix || url.pathname.startsWith(`${prefix}/`),
  );
}

export function resolveNavigationUrl(value: string, baseUrl: string | URL) {
  try {
    const target = new URL(value, baseUrl);
    return SAFE_NAVIGATION_PROTOCOLS.has(target.protocol) ? target : null;
  } catch {
    return null;
  }
}
