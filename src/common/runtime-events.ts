export const PAGE_READY_EVENT = "theme:page-ready";
export const RUNTIME_STATUS_EVENT = "theme:runtime-status";

export interface PageReadyDetail {
  pageType: string;
}

export interface RuntimeStatusDetail {
  level: "error" | "info" | "warning";
  message: string;
  targetUrl?: string;
}

declare global {
  interface DocumentEventMap {
    "theme:page-ready": CustomEvent<PageReadyDetail>;
    "theme:runtime-status": CustomEvent<RuntimeStatusDetail>;
  }
}

export function dispatchPageReady(detail: PageReadyDetail) {
  document.dispatchEvent(new CustomEvent<PageReadyDetail>(PAGE_READY_EVENT, { detail }));
}

export function dispatchRuntimeStatus(detail: RuntimeStatusDetail) {
  document.dispatchEvent(new CustomEvent<RuntimeStatusDetail>(RUNTIME_STATUS_EVENT, { detail }));
}
