const INTERACTIVE_SELECTOR = [
  "a[href]",
  "audio[controls]",
  "button",
  "input",
  "label[for]",
  "select",
  "summary",
  "textarea",
  "video[controls]",
  "[contenteditable]:not([contenteditable='false'])",
  "[tabindex]:not([tabindex='-1'])",
  "[role='button']",
  "[role='checkbox']",
  "[role='combobox']",
  "[role='link']",
  "[role='listbox']",
  "[role='menuitem']",
  "[role='radio']",
  "[role='slider']",
  "[role='switch']",
  "[role='textbox']",
].join(",");

export function isInteractiveEventTarget(event: Event) {
  return event.composedPath().some((target) => target instanceof Element && target.matches(INTERACTIVE_SELECTOR));
}

export function shouldIgnoreGlobalKeyboardEvent(event: KeyboardEvent) {
  return (
    event.defaultPrevented ||
    event.isComposing ||
    event.repeat ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    isInteractiveEventTarget(event)
  );
}
