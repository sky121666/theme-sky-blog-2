import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { once } from "node:events";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import test from "node:test";

import { discoverChromeExecutables } from "./live-smoke.mjs";
import { readThemeMetadata } from "./theme-metadata.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const run = promisify(execFile);
const categories = "/categories?sort=name";

function fixturePage({ name, version }, pageType, lateEffect) {
  const asset = `/themes/${name}/assets/`;
  const data = JSON.stringify({ pageType, urls: { categories } });
  // Simulate a transport that completes despite cancellation. The actual navigation bundle still handles the clicks.
  const lateResponse =
    lateEffect === null
      ? ""
      : `<script>
    const originalFetch = window.fetch;
    let first = true;
    window.fetch = async (input, init) => {
      const url = new URL(input instanceof Request ? input.url : input, location.href);
      if (!first || url.pathname !== "/categories") return originalFetch(input, init);
      first = false;
      const response = await originalFetch(input, { ...init, signal: null });
      setTimeout(() => { ${lateEffect} }, 100);
      return response;
    };
  </script>`;
  return `<!doctype html><html lang="en" class="terminal-theme"><head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${pageType}</title><link rel="icon" href="data:,">
    <link rel="stylesheet" href="${asset}main.css?v=${version}">${lateResponse}
    <script defer src="${asset}main.iife.js?v=${version}"></script></head><body>
    <header><a href="/login" data-navigation="full">Login</a></header>
    <p id="navigation-announcer" role="status" aria-live="polite"></p>
    <main id="main" style="min-height:150px"><h1>${pageType}</h1><a href="${categories}">Categories</a>
    <script type="application/json" id="halo-page-data">${data}</script></main>
    <input aria-label="Command" id="terminal-command-input"></body></html>`;
}

test("live smoke distinguishes a cancelled visit from a late overwrite in Chromium", async (t) => {
  try {
    discoverChromeExecutables();
  } catch (error) {
    if (!error.message.includes("was not found; set CHROME_PATH")) throw error;
    t.skip("Chrome/Chromium is unavailable for the loopback browser fixture");
    return;
  }
  const theme = readThemeMetadata(fileURLToPath(new URL("../theme.yaml", import.meta.url)));
  const assets = new Map();
  for (const [name, mimeType] of [
    ["main.css", "text/css"],
    ["main.iife.js", "application/javascript"],
  ]) {
    assets.set(`/themes/${theme.name}/assets/${name}`, {
      body: await readFile(new URL(`../templates/assets/${name}`, import.meta.url)),
      mimeType,
    });
  }
  let lateEffect = null;
  const server = createServer((request, response) => {
    const path = new URL(request.url, "http://localhost").pathname;
    const asset = assets.get(path);
    if (asset) {
      response.writeHead(200, { "content-type": asset.mimeType }).end(asset.body);
    } else if (path === "/" || path === "/categories") {
      response
        .writeHead(200, { "content-type": "text/html" })
        .end(fixturePage(theme, path === "/" ? "index" : "categories", lateEffect));
    } else if (path === "/login") {
      response
        .writeHead(200, { "content-type": "text/html" })
        .end('<title>Login</title><form id="login-form"><input aria-label="Username"></form>');
    } else if (path === "/favicon.ico") {
      response.writeHead(204).end();
    } else {
      response.writeHead(404).end();
    }
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const runSmoke = () =>
    run(process.execPath, ["scripts/live-smoke.mjs"], {
      cwd: root,
      env: { ...process.env, HALO_BASE_URL: `http://127.0.0.1:${server.address().port}` },
    });

  await t.test("the candidate keeps the chosen anchor and the same input", async () => {
    const { stdout } = await runSmoke();
    assert.match(
      stdout,
      /Cancelled navigation passed: [^\n]+#main, request=(?:aborted|finished), Document=0, same command input/,
    );
    assert.match(stdout, /Partial navigation passed:/);
    assert.match(stdout, /Full navigation passed:/);
  });
  await t.test("the old response can finish after the anchor without changing the page", async () => {
    lateEffect = "";
    const { stdout } = await runSmoke();
    assert.match(stdout, /Cancelled navigation passed: [^\n]+#main, request=finished, Document=0, same command input/);
  });
  for (const [name, effect, expected] of [
    ["Document fallback", "location.assign(url.href)", /Cancelled navigation started a top-level Document request/],
    ["URL overwrite", "history.replaceState(null, '', url.href)", /Cancelled navigation changed the chosen URL/],
    [
      "command input replacement",
      "const input = document.getElementById('terminal-command-input'); input.replaceWith(input.cloneNode(true))",
      /Cancelled navigation replaced the command input/,
    ],
  ]) {
    await t.test(`rejects a late ${name}`, async () => {
      lateEffect = effect;
      await assert.rejects(runSmoke(), (error) => {
        assert.equal(error.code, 1);
        assert.match(error.stderr, expected);
        return true;
      });
    });
  }
});
