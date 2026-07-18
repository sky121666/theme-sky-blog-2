import assert from "node:assert/strict";
import test from "node:test";

import figlet from "figlet";

import { installDom } from "./dom-test-helpers.mjs";

const environment = installDom(`<!doctype html><html><head>
  <script src="https://cdn.example.com/themes/sky/assets/main.iife.js?v=1.2.11"></script>
</head><body></body></html>`);
const originals = {
  fetch: globalThis.fetch,
  parseFont: figlet.parseFont,
  text: figlet.text,
};
let desktopMatches = true;
let fontRequests = [];
let parsedFonts = [];
window.matchMedia = () => ({
  addEventListener() {},
  addListener() {},
  dispatchEvent: () => false,
  get matches() {
    return desktopMatches;
  },
  media: "(min-width: 768px)",
  onchange: null,
  removeEventListener() {},
  removeListener() {},
});
globalThis.fetch = async (url) => {
  fontRequests.push(String(url));
  return new Response("font-data", { status: 200 });
};
figlet.parseFont = (font, data) => {
  parsedFonts.push([font, data]);
};
figlet.text = (text, options, callback) => callback(null, `ASCII:${text}:${options.font}`);

const Alpine = (await import("../src/common/alpine.ts")).default;
const { normalizeFigletFont, registerFigletFont } = await import("../src/common/figlet-fonts.ts");
const { canLoadAsciiTitle, registerAsciiTitleComponent } = await import("../src/features/ascii-title.ts");

test.after(async () => {
  Alpine.destroyTree(document.body);
  Alpine.stopObservingMutations();
  globalThis.fetch = originals.fetch;
  figlet.parseFont = originals.parseFont;
  figlet.text = originals.text;
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  environment.restore();
});

test("Figlet runtime normalizes unsupported fonts and deduplicates concurrent loads", async () => {
  assert.equal(normalizeFigletFont("Doom"), "Doom");
  assert.equal(normalizeFigletFont("Unknown Font"), "Standard");

  const fonts = await Promise.all([registerFigletFont("Standard"), registerFigletFont("Unknown Font")]);
  assert.deepEqual(fonts, ["Standard", "Standard"]);
  assert.deepEqual(fontRequests, ["https://cdn.example.com/themes/sky/assets/fonts/Standard.flf?v=1.2.11"]);
  assert.deepEqual(parsedFonts, [["Standard", "font-data"]]);
});

test("a failed font load is evicted so a later request can retry", async () => {
  let attempts = 0;
  globalThis.fetch = async (url) => {
    fontRequests.push(String(url));
    attempts += 1;
    return new Response(attempts === 1 ? "temporary" : "font-data", { status: attempts === 1 ? 503 : 200 });
  };

  await assert.rejects(registerFigletFont("Banner"), /HTTP 503/);
  assert.equal(await registerFigletFont("Banner"), "Banner");
  assert.equal(attempts, 2);
});

test("ASCII title renders loaded fonts and falls back to source text on load failure", async () => {
  registerAsciiTitleComponent();
  globalThis.fetch = async (url) => {
    fontRequests.push(String(url));
    return new Response(String(url).includes("/Big.flf") ? "missing" : "font-data", {
      status: String(url).includes("/Big.flf") ? 404 : 200,
    });
  };

  document.body.innerHTML = `
    <pre id="success" x-data="asciiTitle('Sky', 'Standard')" x-text="asciiArt"></pre>
    <pre id="fallback" x-data="asciiTitle('Fallback', 'Big')" x-text="asciiArt"></pre>
  `;
  Alpine.start();
  await new Promise((resolve) => window.setTimeout(resolve, 0));

  assert.equal(document.getElementById("success").textContent, "ASCII:Sky:Standard");
  assert.equal(document.getElementById("fallback").textContent, "Fallback");
});

test("ASCII title falls back when Figlet rendering itself fails", async () => {
  figlet.text = (_text, _options, callback) => callback(new Error("render failed"));
  const node = document.createElement("pre");
  node.setAttribute("x-data", "asciiTitle('Readable title', 'Standard')");
  node.setAttribute("x-text", "asciiArt");
  document.body.append(node);
  Alpine.initTree(node);
  await new Promise((resolve) => window.setTimeout(resolve, 0));

  assert.equal(node.textContent, "Readable title");
});

test("ASCII title loading stays idle on mobile and for hidden header elements", async () => {
  Alpine.destroyTree(document.body);
  const requestsBefore = fontRequests.length;

  desktopMatches = false;
  document.body.innerHTML = `
    <pre id="mobile" x-data="asciiTitle('Mobile', 'Doom')" x-text="asciiArt"></pre>
  `;
  Alpine.initTree(document.body);
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  assert.equal(canLoadAsciiTitle(document.getElementById("mobile")), false);
  assert.equal(fontRequests.length, requestsBefore);

  Alpine.destroyTree(document.body);
  desktopMatches = true;
  document.body.innerHTML = `
    <pre id="hidden" hidden x-data="asciiTitle('Hidden', 'Lean')" x-text="asciiArt"></pre>
  `;
  Alpine.initTree(document.body);
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  assert.equal(canLoadAsciiTitle(document.getElementById("hidden")), false);
  assert.equal(fontRequests.length, requestsBefore);

  Alpine.destroyTree(document.body);
  document.body.innerHTML = `
    <header style="display: none">
      <pre id="hidden-by-parent" x-data="asciiTitle('Hidden parent', 'Mini')" x-text="asciiArt"></pre>
    </header>
  `;
  Alpine.initTree(document.body);
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  assert.equal(canLoadAsciiTitle(document.getElementById("hidden-by-parent")), false);
  assert.equal(fontRequests.length, requestsBefore);
});

test("ASCII title loads once when partial navigation returns from a reader page", async () => {
  Alpine.destroyTree(document.body);
  desktopMatches = true;
  figlet.text = (text, options, callback) => callback(null, `ASCII:${text}:${options.font}`);
  const requestsBefore = fontRequests.length;

  document.body.innerHTML = `
    <div
      x-data
      @theme:page-ready.document="$refs.header.style.display = ['post', 'page'].includes($event.detail.pageType) ? 'none' : ''"
    >
      <header id="reader-header" x-ref="header" style="display: none">
        <pre id="returned-title" x-data="asciiTitle('Returned', 'Doom')" x-text="asciiArt"></pre>
      </header>
    </div>
  `;
  Alpine.initTree(document.body);
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  assert.equal(fontRequests.length, requestsBefore);

  document.dispatchEvent(new CustomEvent("theme:page-ready", { detail: { pageType: "index" } }));
  await Alpine.nextTick();
  await new Promise((resolve) => window.setTimeout(resolve, 0));

  assert.notEqual(document.getElementById("reader-header").style.display, "none");
  assert.equal(fontRequests.length, requestsBefore + 1);
  assert.match(fontRequests.at(-1), /\/Doom\.flf\?v=1\.2\.11$/);
  assert.equal(document.getElementById("returned-title").textContent, "ASCII:Returned:Doom");
});
