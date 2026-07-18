import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { accessSync, constants as fsConstants, existsSync, readdirSync, statSync } from "node:fs";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { homedir, tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { normalizeBaseUrl } from "./runtime-assets.mjs";
import { ASSET_SIZE_BUDGETS } from "./package-verification.mjs";
import { readThemeMetadata } from "./theme-metadata.mjs";

const ROOT_DIRECTORY = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const REQUEST_TIMEOUT_MS = 15_000;
const BROWSER_TIMEOUT_MS = 20_000;
const MAX_MANAGED_CHROME_CANDIDATES = 6;
export const HTTP_RESOURCE_BUDGETS = Object.freeze({
  coreCssBytes: ASSET_SIZE_BUDGETS["templates/assets/main.css"],
  coreScriptBytes: ASSET_SIZE_BUDGETS["templates/assets/main.iife.js"],
  htmlBytes: 256 * 1024,
});
export const BROWSER_RESOURCE_BUDGETS = Object.freeze({
  domNodes: 1500,
  resourceCount: 100,
  resourceTransferBytes: 3 * 1024 * 1024,
});
const REQUEST_HEADERS = Object.freeze({
  "Cache-Control": "no-cache, no-store, max-age=0",
  Pragma: "no-cache",
});

function log(message) {
  console.log(`[live-smoke] ${message}`);
}

function delay(milliseconds) {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function cacheBustedUrl(value, parameter, runId) {
  const url = new URL(value);
  url.searchParams.set(parameter, runId);
  return url;
}

async function fetchNoCache(url, accept) {
  return fetch(url, {
    headers: {
      ...REQUEST_HEADERS,
      Accept: accept,
    },
    redirect: "follow",
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
}

function findThemeAssetUrl(html, baseUrl, themeName, fileName) {
  const pattern = new RegExp(
    `(?:href|src)=["']([^"']*/themes/${escapeRegExp(themeName)}/assets/${escapeRegExp(fileName)}\\?[^"']*)["']`,
    "i",
  );
  const match = html.match(pattern);
  assert.ok(match, `Runtime page does not reference ${themeName}/${fileName}`);
  return new URL(match[1].replaceAll("&amp;", "&"), `${baseUrl}/`);
}

async function verifyHttpRuntime(baseUrl, themeName, expectedVersion, runId) {
  const homeUrl = cacheBustedUrl(`${baseUrl}/`, "_theme_live_smoke_http", runId);
  const homeResponse = await fetchNoCache(homeUrl, "text/html,application/xhtml+xml");
  const homeContentType = homeResponse.headers.get("content-type") ?? "";

  assert.equal(homeResponse.status, 200, `Runtime page returned ${homeResponse.status}`);
  assert.match(homeContentType, /text\/html/i, `Runtime page returned ${homeContentType || "no content type"}`);

  const html = await homeResponse.text();
  assert.match(html, /<main\b[^>]*\bid=["']main["']/i, "Runtime page is missing #main");
  assert.match(html, /id=["']halo-page-data["']/i, "Runtime page is missing #halo-page-data");

  const assets = [
    { fileName: "main.css", contentType: /text\/css/i },
    { fileName: "main.iife.js", contentType: /(?:java|ecma)script/i },
  ];
  const verifiedAssets = [];

  for (const asset of assets) {
    const publicUrl = findThemeAssetUrl(html, baseUrl, themeName, asset.fileName);
    assert.equal(
      publicUrl.searchParams.get("v"),
      expectedVersion,
      `${asset.fileName} runtime version does not match theme.yaml`,
    );

    const requestUrl = cacheBustedUrl(publicUrl, "_theme_live_smoke_asset", runId);
    const response = await fetchNoCache(requestUrl, "*/*");
    const contentType = response.headers.get("content-type") ?? "";
    assert.equal(response.status, 200, `${asset.fileName} returned ${response.status}`);
    assert.match(contentType, asset.contentType, `${asset.fileName} returned ${contentType || "no content type"}`);

    const remoteBytes = Buffer.from(await response.arrayBuffer());
    const localBytes = await readFile(join(ROOT_DIRECTORY, "templates", "assets", asset.fileName));
    const remoteHash = sha256(remoteBytes);
    const localHash = sha256(localBytes);
    assert.equal(remoteHash, localHash, `${asset.fileName} served bytes do not match templates/assets`);

    verifiedAssets.push({
      bytes: remoteBytes.byteLength,
      fileName: asset.fileName,
      hash: localHash,
      publicUrl: publicUrl.toString(),
    });
  }

  const resourceMetrics = {
    coreCssBytes: verifiedAssets.find((asset) => asset.fileName === "main.css")?.bytes,
    coreScriptBytes: verifiedAssets.find((asset) => asset.fileName === "main.iife.js")?.bytes,
    htmlBytes: Buffer.byteLength(html),
  };
  assert.deepEqual(resourceBudgetIssues(resourceMetrics, HTTP_RESOURCE_BUDGETS), [], "HTTP resource budget exceeded");

  return {
    assets: verifiedAssets,
    haloCacheAt: homeResponse.headers.get("x-halo-cache-at"),
    resourceMetrics,
  };
}

export function orderChromeExecutableCandidates({
  configuredPath = "",
  managedCandidates = [],
  systemCandidates = [],
}) {
  const ordered = [configuredPath, ...systemCandidates, ...managedCandidates]
    .filter(Boolean)
    .map((path) => resolve(path));
  return [...new Set(ordered)];
}

export function isManagedChromeExecutablePath(path) {
  const executableName = basename(path).toLowerCase();
  return ["google chrome for testing", "chrome-headless-shell", "headless_shell", "chrome", "chrome.exe"].includes(
    executableName,
  );
}

export function isExecutableFile(path) {
  try {
    if (!statSync(path).isFile()) {
      return false;
    }
    accessSync(path, fsConstants.X_OK);
    return true;
  } catch {
    return false;
  }
}

function collectManagedChromeExecutables(rootDirectory, remainingDepth = 7) {
  if (!existsSync(rootDirectory) || remainingDepth < 0) {
    return [];
  }

  let entries;
  try {
    entries = readdirSync(rootDirectory, { withFileTypes: true });
  } catch {
    return [];
  }

  return entries.flatMap((entry) => {
    const path = join(rootDirectory, entry.name);
    if (entry.isFile()) {
      return isManagedChromeExecutablePath(path) && isExecutableFile(path) ? [path] : [];
    }
    return entry.isDirectory() ? collectManagedChromeExecutables(path, remainingDepth - 1) : [];
  });
}

function managedCandidateScore(path) {
  const normalized = path.toLowerCase();
  const browserKindScore = normalized.includes("google chrome for testing")
    ? 3
    : normalized.includes("chrome-headless-shell") || normalized.includes("headless_shell")
      ? 2
      : 1;
  const version = [...normalized.matchAll(/(?:chromium-|mac(?:_arm)?-|linux-)(\d+(?:\.\d+)*)/g)].at(-1)?.[1] ?? "0";
  const versionParts = version.split(".").map(Number);
  const versionScore = versionParts.reduce((score, part, index) => score + part / 1000 ** index, 0);
  return browserKindScore * 1_000_000 + versionScore;
}

export function selectManagedChromeCandidates(paths, limit = MAX_MANAGED_CHROME_CANDIDATES) {
  return [...new Set(paths.map((path) => resolve(path)))]
    .sort((left, right) => managedCandidateScore(right) - managedCandidateScore(left) || right.localeCompare(left))
    .slice(0, limit);
}

export function discoverChromeExecutables({
  configuredPath = process.env.CHROME_PATH?.trim() ?? "",
  homeDirectory = homedir(),
  rootDirectory = ROOT_DIRECTORY,
} = {}) {
  const expandedConfiguredPath = configuredPath
    ? configuredPath.startsWith("~/")
      ? join(homeDirectory, configuredPath.slice(2))
      : configuredPath
    : "";
  const systemCandidates = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    join(homeDirectory, "Applications/Google Chrome.app/Contents/MacOS/Google Chrome"),
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/snap/bin/chromium",
    process.env.PROGRAMFILES ? join(process.env.PROGRAMFILES, "Google/Chrome/Application/chrome.exe") : "",
    process.env["PROGRAMFILES(X86)"]
      ? join(process.env["PROGRAMFILES(X86)"], "Google/Chrome/Application/chrome.exe")
      : "",
    process.env.LOCALAPPDATA ? join(process.env.LOCALAPPDATA, "Google/Chrome/Application/chrome.exe") : "",
  ].filter((candidate) => candidate && isExecutableFile(candidate));
  const managedRoots = [
    join(homeDirectory, "Library/Caches/ms-playwright"),
    join(homeDirectory, "Library/Caches/puppeteer"),
    join(homeDirectory, ".cache/ms-playwright"),
    join(homeDirectory, ".cache/puppeteer"),
    join(rootDirectory, "node_modules/.cache/ms-playwright"),
    join(rootDirectory, "node_modules/playwright-core/.local-browsers"),
    join(rootDirectory, "node_modules/puppeteer/.local-chromium"),
    join(rootDirectory, "node_modules/puppeteer-core/.local-chromium"),
  ];
  const managedCandidates = selectManagedChromeCandidates(
    managedRoots.flatMap((root) => collectManagedChromeExecutables(root)),
  );
  const candidates = orderChromeExecutableCandidates({
    configuredPath: expandedConfiguredPath && isExecutableFile(expandedConfiguredPath) ? expandedConfiguredPath : "",
    managedCandidates,
    systemCandidates,
  });

  assert.ok(candidates.length > 0, "Google Chrome, Chrome for Testing, or Chromium was not found; set CHROME_PATH");
  return candidates;
}

export function isRetryableChromeStartupError(error) {
  return (
    error instanceof Error &&
    /Chrome exited before DevTools was ready|Timed out waiting for Chrome DevTools|Unable to find a Chrome page target|Unable to connect to Chrome DevTools|spawn .* (?:ENOENT|EACCES)/.test(
      error.message,
    )
  );
}

export function resourceBudgetIssues(metrics, budgets) {
  return Object.entries(budgets).flatMap(([metric, maximum]) => {
    const value = metrics[metric];
    if (!Number.isFinite(value) || value < 0) {
      return [`${metric} is missing or invalid`];
    }
    return value > maximum ? [`${metric}=${value} exceeds ${maximum}`] : [];
  });
}

export function accessibilitySnapshotIssues(snapshot) {
  const issues = [];
  if (!snapshot.lang?.trim()) issues.push("document language is missing");
  if (snapshot.mainCount !== 1 || snapshot.mainTagName !== "MAIN") issues.push("page must expose one main landmark");
  if (snapshot.h1Count < 1) issues.push("page heading is missing");
  if (!snapshot.terminalInputNamed) issues.push("terminal input has no accessible name");
  if (snapshot.announcerRole !== "status" || snapshot.announcerLive !== "polite") {
    issues.push("navigation announcer is not a polite status region");
  }
  if (snapshot.duplicateIds?.length > 0) issues.push(`duplicate ids: ${snapshot.duplicateIds.join(", ")}`);
  return issues;
}

export function visualSnapshotIssues(snapshot) {
  const issues = [];
  for (const [name, rect] of Object.entries({
    header: snapshot.header,
    main: snapshot.main,
    terminalInput: snapshot.terminalInput,
  })) {
    if (!rect || rect.width <= 0 || rect.height <= 0) issues.push(`${name} has no stable layout box`);
    if (rect && (rect.left < -1 || rect.right > snapshot.viewportWidth + 1))
      issues.push(`${name} exceeds the viewport`);
  }
  if (snapshot.main && snapshot.main.height < 80) issues.push("main content area is unexpectedly short");
  if (snapshot.header && snapshot.main && snapshot.header.bottom > snapshot.main.bottom + 1) {
    issues.push("header and main visual order is invalid");
  }
  if (snapshot.main && snapshot.terminalInput && snapshot.terminalInput.top < snapshot.main.top - 1) {
    issues.push("terminal input appears before the main content area");
  }
  return issues;
}

export function mergePluginSurfaceObservations(observationSets) {
  const pluginNames = ["search", "comment", "shiki", "hyperlink"];
  return Object.fromEntries(
    pluginNames.map((plugin) => {
      const observations = observationSets.map((set) => set[plugin]).filter(Boolean);
      const observed = observations.find((entry) => entry.status === "observed");
      return [plugin, observed ?? observations[0] ?? { status: "skipped", reason: "not sampled" }];
    }),
  );
}

export function pluginSurfaceObservationIssues(observations) {
  return Object.entries(observations).flatMap(([plugin, observation]) => {
    if (observation.status === "observed") {
      return observation.valid === true ? [] : [`${plugin} is visible but its rendered contract is incomplete`];
    }
    return observation.status === "skipped" && observation.reason
      ? []
      : [`${plugin} must be reported as observed or skipped with a reason`];
  });
}

export function smokeCompletionIssues({ browserVerified = false, httpVerified = false } = {}) {
  return [
    ...(httpVerified ? [] : ["HTTP runtime verification is incomplete"]),
    ...(browserVerified ? [] : ["browser runtime verification is incomplete"]),
  ];
}

export async function runChromeCandidateFallback(candidates, attempt, onRetry = () => {}) {
  const failures = [];
  for (const [index, chromePath] of candidates.entries()) {
    try {
      return await attempt(chromePath, index);
    } catch (error) {
      if (!isRetryableChromeStartupError(error)) {
        throw error;
      }
      failures.push(`${chromePath}: ${error.message}`);
      if (index + 1 < candidates.length) {
        onRetry({ chromePath, error, nextChromePath: candidates[index + 1] });
      }
    }
  }

  throw new Error(`All discovered Chrome executables failed before DevTools was ready:\n${failures.join("\n")}`);
}

class CdpClient {
  constructor(socket) {
    this.socket = socket;
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();

    socket.addEventListener("message", (event) => this.handleMessage(event.data));
    socket.addEventListener("close", () => this.rejectPending(new Error("Chrome DevTools connection closed")));
    socket.addEventListener("error", () => this.rejectPending(new Error("Chrome DevTools connection failed")));
  }

  static async connect(url) {
    const socket = new WebSocket(url);
    await new Promise((resolveConnection, rejectConnection) => {
      const timeoutId = setTimeout(
        () => rejectConnection(new Error("Timed out connecting to Chrome DevTools")),
        REQUEST_TIMEOUT_MS,
      );
      const finish = (callback) => {
        clearTimeout(timeoutId);
        callback();
      };
      socket.addEventListener("open", () => finish(resolveConnection), { once: true });
      socket.addEventListener(
        "error",
        () => finish(() => rejectConnection(new Error("Unable to connect to Chrome DevTools"))),
        { once: true },
      );
    });
    return new CdpClient(socket);
  }

  handleMessage(rawMessage) {
    const message = JSON.parse(typeof rawMessage === "string" ? rawMessage : String(rawMessage));
    if (message.id) {
      const pending = this.pending.get(message.id);
      if (!pending) {
        return;
      }
      this.pending.delete(message.id);
      clearTimeout(pending.timeoutId);
      if (message.error) {
        pending.reject(new Error(`${pending.method}: ${message.error.message}`));
      } else {
        pending.resolve(message.result ?? {});
      }
      return;
    }

    const handlers = this.listeners.get(message.method);
    handlers?.forEach((handler) => handler(message.params ?? {}));
  }

  rejectPending(error) {
    this.pending.forEach((pending) => {
      clearTimeout(pending.timeoutId);
      pending.reject(error);
    });
    this.pending.clear();
  }

  on(method, handler) {
    const handlers = this.listeners.get(method) ?? new Set();
    handlers.add(handler);
    this.listeners.set(method, handlers);
    return () => handlers.delete(handler);
  }

  send(method, params = {}, timeoutMs = REQUEST_TIMEOUT_MS) {
    const id = this.nextId;
    this.nextId += 1;

    return new Promise((resolveCommand, rejectCommand) => {
      const timeoutId = setTimeout(() => {
        this.pending.delete(id);
        rejectCommand(new Error(`${method} timed out after ${timeoutMs} ms`));
      }, timeoutMs);
      this.pending.set(id, { method, reject: rejectCommand, resolve: resolveCommand, timeoutId });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.rejectPending(new Error("Chrome DevTools client closed"));
    this.socket.close();
  }
}

async function waitForDevToolsPort(profileDirectory, chromeState) {
  const portFile = join(profileDirectory, "DevToolsActivePort");
  const deadline = Date.now() + REQUEST_TIMEOUT_MS;

  while (Date.now() < deadline) {
    if (chromeState.launchError) {
      throw chromeState.launchError;
    }
    if (chromeState.child.exitCode !== null || chromeState.child.signalCode !== null) {
      throw new Error(
        `Chrome exited before DevTools was ready (exit=${chromeState.child.exitCode ?? "none"}, signal=${chromeState.child.signalCode ?? "none"}): ${chromeState.stderr().slice(-1000)}`,
      );
    }

    try {
      const [portLine] = (await readFile(portFile, "utf8")).split(/\r?\n/);
      const port = Number(portLine);
      if (Number.isInteger(port) && port > 0 && port <= 65_535) {
        return port;
      }
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }

    await delay(50);
  }

  throw new Error(`Timed out waiting for Chrome DevTools: ${chromeState.stderr().slice(-1000)}`);
}

async function findPageTarget(port) {
  const deadline = Date.now() + REQUEST_TIMEOUT_MS;
  let lastError;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/list`, {
        signal: AbortSignal.timeout(1000),
      });
      assert.equal(response.status, 200, `Chrome target list returned ${response.status}`);
      const targets = await response.json();
      const target = targets.find((candidate) => candidate.type === "page" && candidate.webSocketDebuggerUrl);
      if (target) {
        return target;
      }
    } catch (error) {
      lastError = error;
    }
    await delay(50);
  }

  throw new Error(`Unable to find a Chrome page target: ${lastError?.message ?? "unknown error"}`);
}

function createBrowserState(client) {
  const state = {
    cacheRequestIds: new Set(),
    consoleErrors: [],
    exceptions: [],
    loadingFailures: [],
    logErrors: [],
    requests: new Map(),
    responses: [],
  };

  client.on("Network.requestWillBeSent", ({ request, requestId, type }) => {
    state.requests.set(requestId, { type, url: request.url });
  });
  client.on("Network.requestServedFromCache", ({ requestId }) => state.cacheRequestIds.add(requestId));
  client.on("Network.responseReceived", ({ requestId, response, type }) => {
    state.responses.push({
      fromDiskCache: Boolean(response.fromDiskCache),
      fromPrefetchCache: Boolean(response.fromPrefetchCache),
      fromServiceWorker: Boolean(response.fromServiceWorker),
      mimeType: response.mimeType,
      requestId,
      status: response.status,
      type,
      url: response.url,
    });
  });
  client.on("Network.loadingFailed", ({ canceled, errorText, requestId, type }) => {
    const request = state.requests.get(requestId);
    state.loadingFailures.push({ canceled, errorText, requestId, type, url: request?.url ?? "" });
  });
  client.on("Runtime.exceptionThrown", ({ exceptionDetails }) => {
    state.exceptions.push(exceptionDetails.exception?.description ?? exceptionDetails.text ?? "Unknown exception");
  });
  client.on("Runtime.consoleAPICalled", ({ args, type }) => {
    if (type !== "error" && type !== "assert") {
      return;
    }
    state.consoleErrors.push(
      args.map((argument) => argument.value ?? argument.unserializableValue ?? argument.description ?? "").join(" "),
    );
  });
  client.on("Log.entryAdded", ({ entry }) => {
    if (entry.level === "error") {
      state.logErrors.push(entry.text);
    }
  });

  return state;
}

function waitForEvent(client, method, timeoutMs = BROWSER_TIMEOUT_MS) {
  return new Promise((resolveEvent, rejectEvent) => {
    let removeListener = () => {};
    const timeoutId = setTimeout(() => {
      removeListener();
      rejectEvent(new Error(`${method} timed out after ${timeoutMs} ms`));
    }, timeoutMs);
    removeListener = client.on(method, (params) => {
      clearTimeout(timeoutId);
      removeListener();
      resolveEvent(params);
    });
  });
}

async function evaluate(client, expression) {
  const result = await client.send("Runtime.evaluate", {
    awaitPromise: true,
    expression,
    returnByValue: true,
    userGesture: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description ?? result.exceptionDetails.text);
  }
  return result.result?.value;
}

async function waitForCondition(client, expression, description, timeoutMs = BROWSER_TIMEOUT_MS) {
  const deadline = Date.now() + timeoutMs;
  let lastError;

  while (Date.now() < deadline) {
    try {
      if (await evaluate(client, expression)) {
        return;
      }
    } catch (error) {
      lastError = error;
    }
    await delay(100);
  }

  throw new Error(`Timed out waiting for ${description}${lastError ? `: ${lastError.message}` : ""}`);
}

async function navigateAndWait(client, url) {
  const loaded = waitForEvent(client, "Page.loadEventFired");
  const navigation = await client.send("Page.navigate", { url: url.toString() });
  assert.ok(!navigation.errorText, `Chrome navigation failed: ${navigation.errorText}`);
  await loaded;
  await waitForCondition(
    client,
    `document.readyState === "complete" && Boolean(document.getElementById("main")) && typeof window.Alpine === "object"`,
    "the theme runtime to initialize",
  );
  await evaluate(client, "document.fonts ? document.fonts.ready.then(() => true) : true");
}

function parsedUrl(value) {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

function responseForDocument(responses, markerName, runId) {
  return responses.find((response) => {
    const url = parsedUrl(response.url);
    return response.type === "Document" && url?.searchParams.get(markerName) === runId;
  });
}

function responseForAsset(responses, themeName, fileName) {
  const expectedPath = `/themes/${themeName}/assets/${fileName}`;
  return responses.find((response) => parsedUrl(response.url)?.pathname === expectedPath);
}

function assertFreshResponse(response, state, label) {
  assert.ok(response, `${label} did not produce a browser response`);
  assert.equal(response.status, 200, `${label} returned ${response.status}`);
  assert.equal(response.fromDiskCache, false, `${label} came from the disk cache`);
  assert.equal(response.fromServiceWorker, false, `${label} came from a service worker`);
  assert.equal(response.fromPrefetchCache, false, `${label} came from the prefetch cache`);
  assert.equal(state.cacheRequestIds.has(response.requestId), false, `${label} was served from browser cache`);
}

function assertFreshCoreBatch(responses, state, markerName, runId, themeName, label) {
  const documentResponse = responseForDocument(responses, markerName, runId);
  const cssResponse = responseForAsset(responses, themeName, "main.css");
  const scriptResponse = responseForAsset(responses, themeName, "main.iife.js");
  assertFreshResponse(documentResponse, state, `${label} Document`);
  assertFreshResponse(cssResponse, state, `${label} main.css`);
  assertFreshResponse(scriptResponse, state, `${label} main.iife.js`);
}

async function waitForVisiblePluginSurfaces(client) {
  await waitForCondition(
    client,
    `(() => {
      const isVisible = (element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
      };
      const shadowSurfacesReady = Array.from(document.querySelectorAll("comment-widget, shiki-code"))
        .filter(isVisible)
        .every((element) => Boolean(element.shadowRoot?.childElementCount));
      const searchButton = document.querySelector('[data-terminal-action="search"]');
      const searchReady = !searchButton || !isVisible(searchButton) || typeof window.SearchWidget?.open === "function";
      return shadowSurfacesReady && searchReady;
    })()`,
    "visible plugin surfaces to settle",
    3000,
  );
}

async function collectPageQualitySnapshot(client) {
  return evaluate(
    client,
    `(() => {
      const isVisible = (element) => {
        if (!(element instanceof Element)) return false;
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
      };
      const rectFor = (element) => {
        if (!(element instanceof Element)) return null;
        const rect = element.getBoundingClientRect();
        return { bottom: rect.bottom, height: rect.height, left: rect.left, right: rect.right, top: rect.top, width: rect.width };
      };
      const observeCustomElements = (selector, requireShadowRoot = false) => {
        const elements = Array.from(document.querySelectorAll(selector));
        const visible = elements.filter(isVisible);
        if (visible.length === 0) {
          return {
            reason: elements.length > 0 ? "present but not visible on sampled page" : "no visible sample on tested page",
            status: "skipped",
          };
        }
        const rendered = visible.filter((element) => !requireShadowRoot || Boolean(element.shadowRoot?.childElementCount)).length;
        return {
          detail: visible.length + " visible of " + elements.length + " present",
          status: "observed",
          valid: rendered === visible.length,
        };
      };

      const ids = new Map();
      document.querySelectorAll("[id]").forEach((element) => ids.set(element.id, (ids.get(element.id) || 0) + 1));
      const terminalInput = document.getElementById("terminal-command-input");
      const announcer = document.getElementById("navigation-announcer");
      const searchButton = document.querySelector('[data-terminal-action="search"]');
      const searchVisible = isVisible(searchButton);
      const searchApiAvailable = typeof window.SearchWidget?.open === "function";
      const searchName = searchButton?.getAttribute("aria-label") || searchButton?.textContent?.trim() || "";
      const resources = performance.getEntriesByType("resource");

      return {
        accessibility: {
          announcerLive: announcer?.getAttribute("aria-live") || "",
          announcerRole: announcer?.getAttribute("role") || "",
          duplicateIds: Array.from(ids.entries()).filter(([, count]) => count > 1).map(([id]) => id),
          h1Count: document.querySelectorAll("h1").length,
          lang: document.documentElement.lang,
          mainCount: document.querySelectorAll("main, [role=main]").length,
          mainTagName: document.getElementById("main")?.tagName || "",
          terminalInputNamed: Boolean(terminalInput && (terminalInput.labels?.length || terminalInput.getAttribute("aria-label") || terminalInput.getAttribute("aria-labelledby"))),
        },
        plugins: {
          comment: observeCustomElements("comment-widget", true),
          hyperlink: observeCustomElements("hyperlink-card, hyperlink-inline-card"),
          search: searchVisible
            ? {
                detail: "visible semantic entry with SearchWidget.open API",
                status: "observed",
                valid: searchButton?.tagName === "BUTTON" && Boolean(searchName) && searchApiAvailable,
              }
            : {
                reason: searchButton ? "entry present but not visible on sampled page" : "no visible sample on tested page",
                status: "skipped",
              },
          shiki: observeCustomElements("shiki-code", true),
        },
        resources: {
          domNodes: document.getElementsByTagName("*").length,
          resourceCount: resources.length,
          resourceTransferBytes: resources.reduce((total, entry) => total + (entry.transferSize || 0), 0),
        },
        visual: {
          header: rectFor(document.querySelector("header")),
          main: rectFor(document.getElementById("main")),
          terminalInput: rectFor(terminalInput),
          viewportHeight: window.innerHeight,
          viewportWidth: window.innerWidth,
        },
      };
    })()`,
  );
}

function assertPageQuality(snapshot, label, { checkResources = false } = {}) {
  assert.deepEqual(
    accessibilitySnapshotIssues(snapshot.accessibility),
    [],
    `${label} basic accessibility assertions failed`,
  );
  assert.deepEqual(visualSnapshotIssues(snapshot.visual), [], `${label} stable visual structure assertions failed`);
  assert.deepEqual(
    pluginSurfaceObservationIssues(snapshot.plugins),
    [],
    `${label} visible plugin surface is incomplete`,
  );
  if (checkResources) {
    assert.deepEqual(
      resourceBudgetIssues(snapshot.resources, BROWSER_RESOURCE_BUDGETS),
      [],
      `${label} browser resource budget exceeded`,
    );
  }
}

async function waitForChildExit(child, timeoutMs) {
  if (child.exitCode !== null || child.signalCode !== null) {
    return true;
  }

  return new Promise((resolveExit) => {
    const onExit = () => {
      clearTimeout(timeoutId);
      resolveExit(true);
    };
    const timeoutId = setTimeout(() => {
      child.removeListener("exit", onExit);
      resolveExit(false);
    }, timeoutMs);
    child.once("exit", onExit);
  });
}

async function verifyBrowserRuntime(baseUrl, themeName, expectedVersion, runId, setActiveCleanup, chromePath) {
  const profileDirectory = await mkdtemp(join(tmpdir(), `${themeName}-live-smoke-`));
  const chromeArguments = [
    basename(chromePath).toLowerCase().includes("headless") ? "--headless" : "--headless=new",
    "--remote-debugging-port=0",
    `--user-data-dir=${profileDirectory}`,
    "--disable-background-networking",
    "--disable-component-update",
    "--disable-default-apps",
    "--disable-extensions",
    "--disable-sync",
    "--metrics-recording-only",
    "--no-default-browser-check",
    "--no-first-run",
    "--window-size=1280,900",
    "about:blank",
  ];
  if (typeof process.getuid === "function" && process.getuid() === 0) {
    chromeArguments.unshift("--no-sandbox");
  }

  let stderr = "";
  let launchError = null;
  let client = null;
  const child = spawn(chromePath, chromeArguments, { stdio: ["ignore", "ignore", "pipe"] });
  child.stderr.on("data", (chunk) => {
    stderr = `${stderr}${chunk}`.slice(-8000);
  });
  child.once("error", (error) => {
    launchError = error;
  });

  let cleaned = false;
  const cleanup = async () => {
    if (cleaned) {
      return;
    }
    cleaned = true;
    client?.close();

    if (child.exitCode === null && child.signalCode === null) {
      child.kill("SIGTERM");
      if (!(await waitForChildExit(child, 3000))) {
        child.kill("SIGKILL");
        await waitForChildExit(child, 2000);
      }
    }

    await rm(profileDirectory, { force: true, maxRetries: 5, recursive: true, retryDelay: 100 });
  };
  setActiveCleanup(cleanup);

  try {
    const chromeState = { child, launchError, stderr: () => stderr };
    Object.defineProperty(chromeState, "launchError", { get: () => launchError });
    const port = await waitForDevToolsPort(profileDirectory, chromeState);
    const target = await findPageTarget(port);
    client = await CdpClient.connect(target.webSocketDebuggerUrl);
    const state = createBrowserState(client);

    await Promise.all([
      client.send("Page.enable"),
      client.send("Network.enable"),
      client.send("Runtime.enable"),
      client.send("Log.enable"),
    ]);
    await client.send("Network.setCacheDisabled", { cacheDisabled: true });
    await client.send("Network.setBypassServiceWorker", { bypass: true });
    await client.send("Network.setExtraHTTPHeaders", { headers: REQUEST_HEADERS });
    await client.send("Emulation.setDeviceMetricsOverride", {
      deviceScaleFactor: 1,
      height: 900,
      mobile: false,
      width: 1280,
    });

    const initialMarker = "_theme_live_smoke_browser";
    const initialUrl = cacheBustedUrl(`${baseUrl}/`, initialMarker, runId);
    const initialResponseIndex = state.responses.length;
    await navigateAndWait(client, initialUrl);
    const initialResponses = state.responses.slice(initialResponseIndex);
    assertFreshCoreBatch(initialResponses, state, initialMarker, runId, themeName, "Desktop");

    const initialDom = await evaluate(
      client,
      `(() => {
        const pageDataElement = document.getElementById("halo-page-data");
        let pageData = null;
        try { pageData = JSON.parse(pageDataElement?.textContent || ""); } catch {}
        const assets = Array.from(document.querySelectorAll("link[href], script[src]"))
          .map((element) => element.href || element.src)
          .filter((url) => url.includes("/themes/${themeName}/assets/main."));
        return {
          alpine: typeof window.Alpine === "object",
          assets,
          htmlClass: document.documentElement.className,
          input: Boolean(document.getElementById("terminal-command-input")),
          main: Boolean(document.getElementById("main")),
          pageData: Boolean(pageData),
          pageType: pageData?.pageType,
          readyState: document.readyState,
          title: document.title,
        };
      })()`,
    );
    assert.equal(initialDom.readyState, "complete", "Desktop document is not complete");
    assert.ok(initialDom.title, "Desktop document title is empty");
    assert.match(initialDom.htmlClass, /(?:^|\s)terminal-theme(?:\s|$)/, "Desktop theme class is missing");
    assert.equal(initialDom.main, true, "Desktop #main is missing");
    assert.equal(initialDom.input, true, "Desktop terminal input is missing");
    assert.equal(initialDom.pageData, true, "Desktop page data is invalid");
    assert.equal(initialDom.pageType, "index", `Expected index page, got ${initialDom.pageType}`);
    assert.equal(initialDom.alpine, true, "Alpine did not initialize");
    assert.equal(initialDom.assets.length >= 2, true, "Browser DOM is missing theme main assets");
    initialDom.assets.forEach((assetUrl) => {
      assert.equal(
        new URL(assetUrl).searchParams.get("v"),
        expectedVersion,
        `Browser asset version is stale: ${assetUrl}`,
      );
    });
    await waitForVisiblePluginSurfaces(client);
    const initialQuality = await collectPageQualitySnapshot(client);
    assertPageQuality(initialQuality, "Desktop home", { checkResources: true });

    await evaluate(
      client,
      `(() => {
        window.__themeLiveSmokeNavigationEvents = [];
        for (const type of ["theme:navigation-start", "theme:navigation-success", "theme:navigation-error", "theme:navigation-complete"]) {
          document.addEventListener(type, () => window.__themeLiveSmokeNavigationEvents.push(type));
        }
        return true;
      })()`,
    );
    const partialResponseIndex = state.responses.length;
    const navigationTarget = await evaluate(
      client,
      `(() => {
        const pageData = JSON.parse(document.getElementById("halo-page-data")?.textContent || "{}");
        const target = new URL(pageData.urls?.categories || "/categories", location.href);
        const link = document.getElementById("link-categories") ||
          Array.from(document.querySelectorAll("a[href]")).find((anchor) => new URL(anchor.href).pathname === target.pathname);
        if (!link) return null;
        link.click();
        return { pathname: target.pathname };
      })()`,
    );
    assert.ok(navigationTarget, "Categories navigation link was not found");
    await waitForCondition(
      client,
      `(() => {
        if (location.pathname !== ${JSON.stringify(navigationTarget.pathname)}) return false;
        const main = document.getElementById("main");
        const data = JSON.parse(document.getElementById("halo-page-data")?.textContent || "{}");
        return data.pageType === "categories" && main && !main.hasAttribute("aria-busy") && !main.classList.contains("loading");
      })()`,
      "the categories partial navigation to finish",
    );
    const partialState = await evaluate(
      client,
      `(() => ({
        announcer: document.getElementById("navigation-announcer")?.textContent || "",
        events: window.__themeLiveSmokeNavigationEvents || [],
        pageType: JSON.parse(document.getElementById("halo-page-data")?.textContent || "{}").pageType,
      }))()`,
    );
    assert.equal(partialState.pageType, "categories", "Partial navigation page type is incorrect");
    assert.ok(partialState.events.includes("theme:navigation-success"), "Partial navigation did not emit success");
    assert.match(partialState.announcer, /^Loaded\s+/, "Partial navigation was not announced");
    await waitForVisiblePluginSurfaces(client);
    const partialQuality = await collectPageQualitySnapshot(client);
    assertPageQuality(partialQuality, "Desktop categories");

    const partialResponses = state.responses.slice(partialResponseIndex);
    const categoryFetch = partialResponses.find((response) => {
      const url = parsedUrl(response.url);
      return url?.pathname === navigationTarget.pathname && (response.type === "Fetch" || response.type === "XHR");
    });
    assert.ok(categoryFetch, "Categories navigation did not use a partial Fetch/XHR request");
    assert.equal(categoryFetch.status, 200, `Categories partial request returned ${categoryFetch.status}`);
    assert.equal(
      partialResponses.some((response) => {
        const url = parsedUrl(response.url);
        return response.type === "Document" && url?.pathname === navigationTarget.pathname;
      }),
      false,
      "Categories navigation unexpectedly performed a full Document load",
    );

    await client.send("Emulation.setDeviceMetricsOverride", {
      deviceScaleFactor: 1,
      height: 844,
      mobile: true,
      screenHeight: 844,
      screenWidth: 390,
      width: 390,
    });
    const mobileMarker = "_theme_live_smoke_mobile";
    const mobileUrl = cacheBustedUrl(`${baseUrl}/`, mobileMarker, runId);
    const mobileResponseIndex = state.responses.length;
    await navigateAndWait(client, mobileUrl);
    const mobileResponses = state.responses.slice(mobileResponseIndex);
    assertFreshCoreBatch(mobileResponses, state, mobileMarker, runId, themeName, "Mobile");

    const mobileLayout = await evaluate(
      client,
      `(() => {
        const html = document.documentElement;
        const body = document.body;
        const main = document.getElementById("main");
        const mainRect = main.getBoundingClientRect();
        return {
          bodyOverflow: body.scrollWidth - window.innerWidth,
          htmlOverflow: html.scrollWidth - window.innerWidth,
          innerWidth: window.innerWidth,
          mainOverflow: main.scrollWidth - main.clientWidth,
          mainRight: mainRect.right,
        };
      })()`,
    );
    assert.ok(Math.abs(mobileLayout.innerWidth - 390) <= 1, `Mobile viewport is ${mobileLayout.innerWidth}px`);
    assert.ok(mobileLayout.htmlOverflow <= 1, `Mobile html overflows by ${mobileLayout.htmlOverflow}px`);
    assert.ok(mobileLayout.bodyOverflow <= 1, `Mobile body overflows by ${mobileLayout.bodyOverflow}px`);
    assert.ok(mobileLayout.mainOverflow <= 1, `Mobile main overflows by ${mobileLayout.mainOverflow}px`);
    assert.ok(mobileLayout.mainRight <= mobileLayout.innerWidth + 1, "Mobile main exceeds the viewport");
    await waitForVisiblePluginSurfaces(client);
    const mobileQuality = await collectPageQualitySnapshot(client);
    assertPageQuality(mobileQuality, "Mobile home");

    const coreFailure = state.loadingFailures.find((failure) => {
      const url = parsedUrl(failure.url);
      return (
        !failure.canceled && (failure.type === "Document" || url?.pathname.startsWith(`/themes/${themeName}/assets/`))
      );
    });
    assert.ok(!coreFailure, `Core browser request failed: ${coreFailure?.url} ${coreFailure?.errorText}`);
    assert.deepEqual(state.exceptions, [], `Browser exceptions: ${state.exceptions.join(" | ")}`);
    assert.deepEqual(state.consoleErrors, [], `Browser console errors: ${state.consoleErrors.join(" | ")}`);
    assert.deepEqual(state.logErrors, [], `Browser log errors: ${state.logErrors.join(" | ")}`);

    return {
      chromePath,
      mobileLayout,
      partialNavigation: navigationTarget.pathname,
      pluginObservations: mergePluginSurfaceObservations([
        initialQuality.plugins,
        partialQuality.plugins,
        mobileQuality.plugins,
      ]),
      resourceMetrics: initialQuality.resources,
    };
  } finally {
    await cleanup();
    setActiveCleanup(() => Promise.resolve());
  }
}

async function verifyBrowserRuntimeWithFallback(baseUrl, themeName, expectedVersion, runId, setActiveCleanup) {
  const configuredPath = process.env.CHROME_PATH?.trim();
  if (configuredPath) {
    const expandedConfiguredPath = configuredPath.startsWith("~/")
      ? join(homedir(), configuredPath.slice(2))
      : configuredPath;
    if (!isExecutableFile(expandedConfiguredPath)) {
      log(`CHROME_PATH is missing or not executable; trying discovered browsers instead: ${expandedConfiguredPath}`);
    }
  }

  const candidates = discoverChromeExecutables();
  return runChromeCandidateFallback(
    candidates,
    (chromePath, index) => {
      log(`Trying browser ${index + 1}/${candidates.length}: ${chromePath}`);
      return verifyBrowserRuntime(baseUrl, themeName, expectedVersion, runId, setActiveCleanup, chromePath);
    },
    () => log("Browser startup failed; trying the next discovered executable with a fresh profile"),
  );
}

async function main() {
  const baseUrl = normalizeBaseUrl(process.env.HALO_BASE_URL || process.env.SMOKE_BASE_URL);
  const { name: themeName, version: expectedVersion } = readThemeMetadata(join(ROOT_DIRECTORY, "theme.yaml"));
  const runId = `${Date.now()}-${process.pid}`;

  let activeCleanup = () => Promise.resolve();
  let interrupted = false;
  const setActiveCleanup = (cleanup) => {
    activeCleanup = cleanup;
  };
  const handleSignal = (signal) => {
    if (interrupted) {
      return;
    }
    interrupted = true;
    void activeCleanup().finally(() => process.exit(signal === "SIGINT" ? 130 : 143));
  };
  const handleInterrupt = () => handleSignal("SIGINT");
  const handleTermination = () => handleSignal("SIGTERM");
  process.once("SIGINT", handleInterrupt);
  process.once("SIGTERM", handleTermination);

  try {
    log(`Checking ${themeName} ${expectedVersion} at ${baseUrl}`);
    const httpResult = await verifyHttpRuntime(baseUrl, themeName, expectedVersion, runId);
    log(
      `HTTP assets match local SHA-256: ${httpResult.assets.map((asset) => `${asset.fileName}=${asset.hash.slice(0, 12)}`).join(", ")}`,
    );
    log(
      `HTTP resource budget observed: html=${httpResult.resourceMetrics.htmlBytes}B, css=${httpResult.resourceMetrics.coreCssBytes}B, js=${httpResult.resourceMetrics.coreScriptBytes}B`,
    );
    const browserResult = await verifyBrowserRuntimeWithFallback(
      baseUrl,
      themeName,
      expectedVersion,
      runId,
      setActiveCleanup,
    );
    assert.deepEqual(
      smokeCompletionIssues({ browserVerified: Boolean(browserResult), httpVerified: true }),
      [],
      "Complete smoke verification requires both HTTP and browser evidence",
    );
    log(`Partial navigation passed: ${browserResult.partialNavigation}`);
    log(
      `390px layout passed: html=${browserResult.mobileLayout.htmlOverflow}px, body=${browserResult.mobileLayout.bodyOverflow}px, main=${browserResult.mobileLayout.mainOverflow}px`,
    );
    log(
      `Basic accessibility, stable shell, and browser resource budgets passed with ${browserResult.resourceMetrics.domNodes} DOM nodes and ${browserResult.resourceMetrics.resourceCount} resources`,
    );
    for (const [plugin, observation] of Object.entries(browserResult.pluginObservations)) {
      log(`Plugin ${plugin}: ${observation.status} — ${observation.detail ?? observation.reason}`);
    }
    log(
      `PASS core runtime ${themeName} ${expectedVersion}; plugin surfaces are reported separately as observed/skipped`,
    );
  } finally {
    process.removeListener("SIGINT", handleInterrupt);
    process.removeListener("SIGTERM", handleTermination);
  }
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : "";
if (invokedPath === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(`[live-smoke] FAIL ${error.stack || error.message}`);
    process.exitCode = 1;
  });
}
