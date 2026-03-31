import Pjax from "pjax";

let pjaxInstance: Pjax | null = null;

const PJAX_EXCLUDED_PATHS = ["/login", "/logout", "/password-reset", "/signup"];

export function setPjaxInstance(instance: Pjax) {
  pjaxInstance = instance;
}

export function shouldBypassPjax(url: URL) {
  if (url.origin !== window.location.origin) {
    return true;
  }

  if (url.protocol !== window.location.protocol) {
    return true;
  }

  return PJAX_EXCLUDED_PATHS.some((prefix) => url.pathname === prefix || url.pathname.startsWith(`${prefix}/`));
}

export function navigateToUrl(url: string) {
  const target = new URL(url, window.location.origin);

  if (shouldBypassPjax(target) || !pjaxInstance) {
    window.location.assign(target.toString());
    return;
  }

  pjaxInstance.loadUrl(`${target.pathname}${target.search}${target.hash}`);
}
