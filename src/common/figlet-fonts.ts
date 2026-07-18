import figlet from "figlet";
import figletFonts from "../../figlet-fonts.json";

export const SUPPORTED_FIGLET_FONTS = figletFonts;

export type SupportedFigletFont = (typeof SUPPORTED_FIGLET_FONTS)[number];

const supportedFontSet = new Set<string>(SUPPORTED_FIGLET_FONTS);
const fontLoads = new Map<SupportedFigletFont, Promise<void>>();

function getAssetScriptUrl() {
  const currentScript = document.currentScript instanceof HTMLScriptElement ? document.currentScript : null;
  const assetScript = currentScript?.src.includes("/assets/main.iife.js")
    ? currentScript
    : document.querySelector<HTMLScriptElement>('script[src*="/assets/main.iife.js"]');

  return assetScript?.src ? new URL(assetScript.src) : null;
}

function getFontUrl(font: SupportedFigletFont) {
  const assetScriptUrl = getAssetScriptUrl();
  const fontUrl = assetScriptUrl
    ? new URL(`fonts/${encodeURIComponent(font)}.flf`, assetScriptUrl)
    : new URL(`/assets/fonts/${encodeURIComponent(font)}.flf`, window.location.origin);

  // The main asset is versioned with the theme version. Reusing its complete
  // query string gives font files the same cache-busting contract.
  if (assetScriptUrl) {
    fontUrl.search = assetScriptUrl.search;
  }

  return fontUrl.toString();
}

export function normalizeFigletFont(font: string): SupportedFigletFont {
  return supportedFontSet.has(font) ? (font as SupportedFigletFont) : "Standard";
}

export function registerFigletFont(font: string): Promise<SupportedFigletFont> {
  const selectedFont = normalizeFigletFont(font);
  const existingLoad = fontLoads.get(selectedFont);
  if (existingLoad) {
    return existingLoad.then(() => selectedFont);
  }

  const load = (async () => {
    const response = await fetch(getFontUrl(selectedFont));
    if (!response.ok) {
      throw new Error(`Figlet font request returned HTTP ${response.status}.`);
    }

    figlet.parseFont(selectedFont, await response.text());
  })().catch((error: unknown) => {
    fontLoads.delete(selectedFont);
    throw error;
  });

  fontLoads.set(selectedFont, load);
  return load.then(() => selectedFont);
}
