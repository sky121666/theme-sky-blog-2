export const CRITICAL_COVERAGE_POLICY = Object.freeze({
  "src/common/alpine.ts": Object.freeze({ branches: 95, functions: 95, lines: 95 }),
  "src/common/navigation.ts": Object.freeze({ branches: 95, functions: 95, lines: 95 }),
  "src/common/runtime.ts": Object.freeze({ branches: 95, functions: 95, lines: 95 }),
});

const ANSI_ESCAPE_PATTERN = new RegExp(`${String.fromCharCode(27)}\\[[0-?]*[ -/]*[@-~]`, "g");
const COVERAGE_START_MARKER = "start of coverage report";
const COVERAGE_END_MARKER = "end of coverage report";

export function parseCoverageReport(output) {
  const rows = new Map();
  const directoryStack = [];
  let insideCoverageReport = false;

  for (const rawLine of String(output).split(/\r?\n/)) {
    const line = rawLine.replace(ANSI_ESCAPE_PATTERN, "");
    if (line.includes(COVERAGE_START_MARKER)) {
      insideCoverageReport = true;
      continue;
    }
    if (line.includes(COVERAGE_END_MARKER)) {
      break;
    }
    if (!insideCoverageReport) {
      continue;
    }

    const tableLine = line.replace(/^\s*(?:ℹ|#)\s?/, "");
    const columns = tableLine.split("|");
    if (columns.length < 4) {
      continue;
    }

    const label = columns[0];
    const indentation = label.match(/^\s*/)?.[0].length ?? 0;
    const name = label.trim();
    const metricCells = columns.slice(1, 4).map((value) => value.trim());
    const hasMetrics = metricCells.every((value) => value.length > 0 && Number.isFinite(Number(value)));

    if (!hasMetrics) {
      if (name && name !== "file") {
        directoryStack[indentation] = name;
        directoryStack.length = indentation + 1;
      }
      continue;
    }
    if (!name.endsWith(".ts")) {
      continue;
    }

    const metrics = metricCells.map(Number);
    const filePath = [...directoryStack.slice(0, indentation), name].join("/");
    if (rows.has(filePath)) {
      throw new Error(`Duplicate coverage row: ${filePath}`);
    }

    rows.set(filePath, {
      branches: metrics[1],
      functions: metrics[2],
      lines: metrics[0],
    });
  }

  return rows;
}

export function validateCoveragePolicy(rows, policy = CRITICAL_COVERAGE_POLICY) {
  const issues = [];

  for (const [fileName, thresholds] of Object.entries(policy)) {
    const coverage = rows.get(fileName);
    if (!coverage) {
      issues.push(`${fileName}: coverage row is missing`);
      continue;
    }

    for (const metric of ["lines", "branches", "functions"]) {
      if (coverage[metric] < thresholds[metric]) {
        issues.push(`${fileName}: ${metric} ${coverage[metric].toFixed(2)}% is below ${thresholds[metric]}%`);
      }
    }
  }

  return issues;
}
