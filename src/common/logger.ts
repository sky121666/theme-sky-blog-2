const PREFIX = "[Theme]";

function isDebug(): boolean {
  return document.documentElement.hasAttribute("data-debug");
}

export function logError(message: string, ...args: unknown[]) {
  if (isDebug()) {
    console.error(PREFIX, message, ...args);
  }
}

export function logWarn(message: string, ...args: unknown[]) {
  if (isDebug()) {
    console.warn(PREFIX, message, ...args);
  }
}

export function logInfo(message: string, ...args: unknown[]) {
  if (isDebug()) {
    console.log(PREFIX, message, ...args);
  }
}
