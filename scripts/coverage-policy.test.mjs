import assert from "node:assert/strict";
import test from "node:test";

import { parseCoverageReport, validateCoveragePolicy } from "./coverage-policy.mjs";

test("coverage report parser keeps critical TypeScript metrics", () => {
  const rows = parseCoverageReport(`
outside.ts               |   1.00 |     1.00 |    1.00 |
ℹ start of coverage report
ℹ file                   | line % | branch % | funcs % | uncovered lines
ℹ src                    |        |          |         |
ℹ  common                |        |          |         |
ℹ   alpine.ts            | 100.00 |   100.00 |  100.00 |
\u001b[32mℹ   navigation.ts        |  96.25 |    95.10 |   97.00 |\u001b[0m
ℹ   runtime.ts           |  95.00 |    98.25 |   95.50 |
ℹ all files              |  98.00 |    97.00 |   99.00 |
ℹ end of coverage report
src/common/runtime.ts    |   1.00 |     1.00 |    1.00 |
`);

  assert.deepEqual(rows.get("src/common/alpine.ts"), { branches: 100, functions: 100, lines: 100 });
  assert.deepEqual(rows.get("src/common/navigation.ts"), { branches: 95.1, functions: 97, lines: 96.25 });
  assert.deepEqual(rows.get("src/common/runtime.ts"), { branches: 98.25, functions: 95.5, lines: 95 });
  assert.equal(rows.has("files"), false);
});

test("coverage report parser accepts Node 22 TAP comment prefixes", () => {
  const rows = parseCoverageReport(`
# start of coverage report
# file                   | line % | branch % | funcs % | uncovered lines
# src                    |        |          |         |
#  common                |        |          |         |
#   alpine.ts            | 100.00 |   100.00 |  100.00 |
#   navigation.ts        |  98.78 |    96.15 |  100.00 |
#   runtime.ts           | 100.00 |    98.10 |  100.00 |
# end of coverage report
`);

  assert.deepEqual(rows.get("src/common/alpine.ts"), { branches: 100, functions: 100, lines: 100 });
  assert.deepEqual(rows.get("src/common/navigation.ts"), { branches: 96.15, functions: 100, lines: 98.78 });
  assert.deepEqual(rows.get("src/common/runtime.ts"), { branches: 98.1, functions: 100, lines: 100 });
  assert.deepEqual(validateCoveragePolicy(rows), []);
});

test("coverage report parser rejects duplicate full source paths", () => {
  assert.throws(
    () =>
      parseCoverageReport(`
ℹ start of coverage report
ℹ src                    |        |          |         |
ℹ  common                |        |          |         |
ℹ   runtime.ts           |  95.00 |    95.00 |   95.00 |
ℹ   runtime.ts           | 100.00 |   100.00 |  100.00 |
ℹ end of coverage report
`),
    /Duplicate coverage row: src\/common\/runtime\.ts/,
  );
});

test("critical coverage policy rejects missing rows and each low metric", () => {
  const rows = new Map([
    ["src/common/navigation.ts", { branches: 94.99, functions: 95, lines: 95 }],
    ["src/common/runtime.ts", { branches: 95, functions: 94.99, lines: 94.99 }],
  ]);

  assert.deepEqual(validateCoveragePolicy(rows), [
    "src/common/alpine.ts: coverage row is missing",
    "src/common/navigation.ts: branches 94.99% is below 95%",
    "src/common/runtime.ts: lines 94.99% is below 95%",
    "src/common/runtime.ts: functions 94.99% is below 95%",
  ]);
});

test("critical coverage policy accepts every metric at its floor", () => {
  const rows = new Map(
    ["src/common/alpine.ts", "src/common/navigation.ts", "src/common/runtime.ts"].map((fileName) => [
      fileName,
      { branches: 95, functions: 95, lines: 95 },
    ]),
  );

  assert.deepEqual(validateCoveragePolicy(rows), []);
});
