import assert from "node:assert/strict";
import test from "node:test";

import {
  assertNavigationEvidence,
  accessibilitySnapshotIssues,
  isExecutableFile,
  isManagedChromeExecutablePath,
  isRetryableChromeStartupError,
  mergePluginSurfaceObservations,
  orderChromeExecutableCandidates,
  pluginSurfaceObservationIssues,
  resourceMetricIssues,
  runChromeCandidateFallback,
  selectManagedChromeCandidates,
  smokeCompletionIssues,
  visualSnapshotIssues,
} from "./live-smoke.mjs";

test("CHROME_PATH stays first while duplicate browser candidates are removed", () => {
  const candidates = orderChromeExecutableCandidates({
    configuredPath: "/tmp/custom-chrome",
    managedCandidates: ["/tmp/chrome-for-testing", "/tmp/system-chrome"],
    systemCandidates: ["/tmp/system-chrome", "/tmp/custom-chrome"],
  });

  assert.deepEqual(candidates, ["/tmp/custom-chrome", "/tmp/system-chrome", "/tmp/chrome-for-testing"]);
});

test("managed browser discovery recognizes Chrome for Testing and headless shell executables", () => {
  assert.equal(
    isManagedChromeExecutablePath(
      "/cache/chromium-1223/chrome-mac/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
    ),
    true,
  );
  assert.equal(isManagedChromeExecutablePath("/cache/chromium_headless_shell-1223/chrome-headless-shell"), true);
  assert.equal(isManagedChromeExecutablePath("/cache/chromium-1223/resources.pak"), false);

  const selected = selectManagedChromeCandidates([
    "/cache/chromium-1200/chrome-mac/Google Chrome for Testing",
    "/cache/chromium_headless_shell-1300/chrome-headless-shell",
    "/cache/chromium-1223/chrome-mac/Google Chrome for Testing",
  ]);
  assert.deepEqual(selected, [
    "/cache/chromium-1223/chrome-mac/Google Chrome for Testing",
    "/cache/chromium-1200/chrome-mac/Google Chrome for Testing",
    "/cache/chromium_headless_shell-1300/chrome-headless-shell",
  ]);
});

test("candidate discovery accepts executable files and rejects directories or missing paths", () => {
  assert.equal(isExecutableFile(process.execPath), true);
  assert.equal(isExecutableFile(process.cwd()), false);
  assert.equal(isExecutableFile("/path/that/does/not/exist/chrome"), false);
});

test("only browser startup failures are eligible for executable fallback", () => {
  assert.equal(
    isRetryableChromeStartupError(new Error("Chrome exited before DevTools was ready (signal=SIGKILL)")),
    true,
  );
  assert.equal(isRetryableChromeStartupError(new Error("Unable to connect to Chrome DevTools")), true);
  assert.equal(isRetryableChromeStartupError(new Error("Desktop main.css came from the disk cache")), false);
});

test("startup failure falls through to the next discovered browser without hiding runtime failures", async () => {
  const attempts = [];
  const retries = [];
  const result = await runChromeCandidateFallback(
    ["/system/chrome", "/managed/chrome-for-testing"],
    async (chromePath) => {
      attempts.push(chromePath);
      if (chromePath === "/system/chrome") {
        throw new Error("Chrome exited before DevTools was ready (signal=SIGKILL)");
      }
      return chromePath;
    },
    ({ nextChromePath }) => retries.push(nextChromePath),
  );
  assert.equal(result, "/managed/chrome-for-testing");
  assert.deepEqual(attempts, ["/system/chrome", "/managed/chrome-for-testing"]);
  assert.deepEqual(retries, ["/managed/chrome-for-testing"]);

  await assert.rejects(
    runChromeCandidateFallback(["/system/chrome", "/managed/chrome"], async () => {
      throw new Error("Browser console errors: application regression");
    }),
    /application regression/,
  );
});

test("resource observations accept large and zero readings and flag missing or invalid data", () => {
  const names = ["domNodes", "resourceCount", "resourceTransferBytes"];
  assert.deepEqual(
    resourceMetricIssues({ domNodes: 10000, resourceCount: 500, resourceTransferBytes: 2 ** 28 }, names),
    [],
  );
  assert.deepEqual(resourceMetricIssues({ domNodes: 1, resourceCount: 0, resourceTransferBytes: 0 }, names), []);
  assert.deepEqual(
    resourceMetricIssues({ domNodes: NaN, resourceTransferBytes: -1 }, names),
    names.map((name) => `${name} is missing or invalid`),
  );
});

test("partial and full navigation need matching top-level network, response and DOM evidence", () => {
  for (const mode of ["partial", "full"]) {
    const partial = mode === "partial";
    const targetUrl = partial ? "https://theme.test/categories" : "https://theme.test/login";
    const request = { frameId: "top", requestId: "visit", type: partial ? "Fetch" : "Document", url: targetUrl };
    const response = {
      ...request,
      status: 200,
      mimeType: "text/html",
      fromDiskCache: false,
      fromPrefetchCache: false,
      fromServiceWorker: false,
    };
    const evidence = {
      mode,
      targetUrl,
      frameId: "top",
      requests: [request, { ...request, frameId: "iframe", type: "Document" }],
      responses: [response],
      sameDocument: partial,
      sameInput: partial,
      cacheRequestIds: new Set(),
    };
    assert.deepEqual(assertNavigationEvidence(evidence), {
      targetUrl,
      documents: partial ? 0 : 1,
      fetches: partial ? 1 : 0,
    });
    for (const change of [
      { sameDocument: !partial },
      { sameInput: !partial },
      { requests: [{ ...request, frameId: "iframe" }] },
      { requests: [request, { ...request, requestId: "duplicate" }] },
      { requests: [request, { ...request, type: partial ? "Document" : "XHR" }] },
      { requests: [{ ...request, url: targetUrl + "?wrong-query" }] },
      { responses: [{ ...response, requestId: "another-request" }] },
      { responses: [{ ...response, status: 404 }] },
      { responses: [{ ...response, mimeType: "application/json" }] },
      { cacheRequestIds: new Set(["visit"]) },
    ]) {
      assert.throws(() => assertNavigationEvidence({ ...evidence, ...change }), assert.AssertionError);
    }
  }
});

test("basic accessibility checks stay narrow and deterministic", () => {
  const valid = {
    announcerLive: "polite",
    announcerRole: "status",
    duplicateIds: [],
    h1Count: 1,
    lang: "zh-CN",
    mainCount: 1,
    mainTagName: "MAIN",
    terminalInputNamed: true,
  };
  assert.deepEqual(accessibilitySnapshotIssues(valid), []);
  assert.deepEqual(accessibilitySnapshotIssues({ ...valid, duplicateIds: ["main"], terminalInputNamed: false }), [
    "terminal input has no accessible name",
    "duplicate ids: main",
  ]);
});

test("stable visual checks require core boxes without prescribing pixel-perfect styling", () => {
  const valid = {
    header: { bottom: 80, height: 60, left: 0, right: 390, top: 20, width: 390 },
    main: { bottom: 740, height: 650, left: 0, right: 390, top: 90, width: 390 },
    terminalInput: { bottom: 800, height: 30, left: 10, right: 380, top: 770, width: 370 },
    viewportHeight: 844,
    viewportWidth: 390,
  };
  assert.deepEqual(visualSnapshotIssues(valid), []);
  assert.deepEqual(visualSnapshotIssues({ ...valid, main: { ...valid.main, height: 0, right: 410, width: 410 } }), [
    "main has no stable layout box",
    "main exceeds the viewport",
    "main content area is unexpectedly short",
  ]);
});

test("plugin samples are reported as observed or explicitly skipped without manufacturing pass states", () => {
  const merged = mergePluginSurfaceObservations([
    {
      comment: { reason: "no visible sample", status: "skipped" },
      hyperlink: { reason: "no visible sample", status: "skipped" },
      search: { reason: "not visible", status: "skipped" },
      shiki: { reason: "no visible sample", status: "skipped" },
    },
    { search: { detail: "visible entry", status: "observed", valid: true } },
  ]);
  assert.deepEqual(pluginSurfaceObservationIssues(merged), []);
  assert.equal(merged.search.status, "observed");
  assert.equal(merged.comment.status, "skipped");
  assert.deepEqual(pluginSurfaceObservationIssues({ ...merged, shiki: { status: "observed", valid: false } }), [
    "shiki is visible but its rendered contract is incomplete",
  ]);
});

test("HTTP-only evidence can never satisfy complete smoke verification", () => {
  assert.deepEqual(smokeCompletionIssues({ httpVerified: true }), ["browser runtime verification is incomplete"]);
  assert.deepEqual(smokeCompletionIssues({ browserVerified: true, httpVerified: true }), []);
});
