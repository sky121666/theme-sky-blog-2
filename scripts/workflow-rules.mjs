export const PINNED_ACTIONS = Object.freeze({
  checkout: "actions/checkout@9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0",
  downloadArtifact: "actions/download-artifact@3e5f45b2cfb9172054b4087a40e8e0b5a5461e7c",
  haloAppStoreRelease: "halo-sigs/app-store-release-action@0b0b351312114a42a544471c1ee0b78d3f635e51",
  pnpmSetup: "pnpm/action-setup@0ebf47130e4866e96fce0953f49152a61190b271",
  setupNode: "actions/setup-node@820762786026740c76f36085b0efc47a31fe5020",
  uploadArtifact: "actions/upload-artifact@043fb46d1a93c77aae656e7c1c64a875d1fc6a0a",
});

function stripYamlComment(line) {
  let quote = "";

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (quote) {
      if (character === quote && line[index - 1] !== "\\") {
        quote = "";
      }
      continue;
    }

    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }

    if (character === "#" && (index === 0 || /\s/.test(line[index - 1]))) {
      return line.slice(0, index).trimEnd();
    }
  }

  return line.trimEnd();
}

function unquote(value) {
  const scalar = value.trim();
  if (
    scalar.length >= 2 &&
    ((scalar.startsWith('"') && scalar.endsWith('"')) || (scalar.startsWith("'") && scalar.endsWith("'")))
  ) {
    return scalar.slice(1, -1);
  }
  return scalar;
}

function splitYamlMappingEntry(text) {
  let quote = "";

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quote) {
      if (character === quote && text[index - 1] !== "\\") {
        quote = "";
      }
      continue;
    }

    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }

    if (character === ":") {
      const key = unquote(text.slice(0, index).trim());
      if (!key || key.startsWith("- ")) {
        return null;
      }
      return {
        key,
        value: text.slice(index + 1).trim(),
      };
    }
  }

  return null;
}

export function activeYamlLines(content) {
  return String(content)
    .split(/\r?\n/)
    .map((rawLine) => {
      const line = stripYamlComment(rawLine);
      return {
        indentation: line.match(/^\s*/)[0].length,
        text: line.trim(),
      };
    })
    .filter((line) => line.text);
}

export function yamlScalarAtPath(content, path) {
  const parents = [];

  for (const line of activeYamlLines(content)) {
    const entry = splitYamlMappingEntry(line.text);
    if (!entry) {
      continue;
    }

    while (parents.at(-1)?.indentation >= line.indentation) {
      parents.pop();
    }

    const currentPath = [...parents.map((parent) => parent.key), entry.key];
    if (currentPath.length === path.length && currentPath.every((key, index) => key === path[index])) {
      return entry.value ? unquote(entry.value) : "";
    }

    if (!entry.value) {
      parents.push({ indentation: line.indentation, key: entry.key });
    }
  }

  return "";
}

export function parseFormKitFields(content) {
  const fields = [];
  let current = null;

  for (const rawLine of String(content).split(/\r?\n/)) {
    const line = stripYamlComment(rawLine);
    const formkitMatch = line.match(/^(\s*)-\s+\$formkit:\s*(\S+)/);
    if (formkitMatch) {
      if (current) {
        fields.push(current);
      }
      current = {
        component: unquote(formkitMatch[2]),
        id: "",
        ifExpression: "",
        key: "",
        name: "",
      };
      continue;
    }

    if (!current) {
      continue;
    }

    for (const property of ["id", "key", "name", "if"]) {
      const match = line.match(new RegExp(`^\\s+${property}:\\s*(.+?)\\s*$`));
      if (!match) {
        continue;
      }
      if (property === "if") {
        current.ifExpression = match[1];
      } else {
        current[property] = unquote(match[1]);
      }
      break;
    }
  }

  if (current) {
    fields.push(current);
  }

  return fields;
}

export function validateFormKitSchema(content) {
  const fields = parseFormKitFields(content);
  const issues = [];
  if (fields.length === 0) {
    return ["至少需要一个 FormKit 字段"];
  }

  for (const property of ["id", "name"]) {
    const values = fields.map((field) => field[property]);
    if (values.some((value) => !value)) {
      issues.push(`每个 FormKit 字段都必须声明 ${property}`);
    }
    if (new Set(values.filter(Boolean)).size !== values.filter(Boolean).length) {
      issues.push(`FormKit 字段 ${property} 不得重复`);
    }
  }

  const explicitKeys = fields.map((field) => field.key).filter(Boolean);
  if (new Set(explicitKeys).size !== explicitKeys.length) {
    issues.push("FormKit 字段 key 不得重复");
  }

  const ids = new Set(fields.map((field) => field.id).filter(Boolean));
  for (const field of fields) {
    for (const match of field.ifExpression.matchAll(/\$get\(([^)]+)\)/g)) {
      const referencedId = unquote(match[1].trim());
      if (!ids.has(referencedId)) {
        issues.push(`条件引用了不存在的 FormKit id：${referencedId || "空"}`);
      }
    }
  }

  return issues;
}

export function parseWorkflowJobs(content) {
  const jobs = new Map();
  let inJobs = false;
  let currentJob = null;

  for (const line of activeYamlLines(content)) {
    if (line.indentation === 0) {
      inJobs = line.text === "jobs:";
      currentJob = null;
      continue;
    }

    if (!inJobs) {
      continue;
    }

    const jobMatch = line.indentation === 2 ? line.text.match(/^([A-Za-z0-9_-]+):\s*$/) : null;
    if (jobMatch) {
      currentJob = { id: jobMatch[1], lines: [] };
      jobs.set(currentJob.id, currentJob);
      continue;
    }

    if (currentJob) {
      currentJob.lines.push(line);
    }
  }

  return jobs;
}

export function jobHasKeyValue(job, key, expectedValue) {
  if (!job) {
    return false;
  }

  const pattern = new RegExp(`^(?:-\\s+)?${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}:\\s*(.+)$`);
  return job.lines.some((line) => {
    const match = line.text.match(pattern);
    return match && unquote(match[1]) === expectedValue;
  });
}

export function jobHasRun(job, command) {
  return jobHasKeyValue(job, "run", command);
}

export function jobHasLine(job, expectedText) {
  return Boolean(job?.lines.some((line) => line.text === expectedText));
}

export function jobHasLinesInOrder(job, expectedTexts) {
  if (!job) {
    return false;
  }

  let previousIndex = -1;
  return expectedTexts.every((expectedText) => {
    const nextIndex = job.lines.findIndex((line, index) => index > previousIndex && line.text === expectedText);
    if (nextIndex < 0) {
      return false;
    }
    previousIndex = nextIndex;
    return true;
  });
}

export function jobRunCount(job, command) {
  if (!job) {
    return 0;
  }

  const pattern = /^run:\s*(.+)$/;
  return job.lines.filter((line) => {
    const match = line.text.match(pattern);
    return match && unquote(match[1]) === command;
  }).length;
}

export function jobUses(job, action) {
  return jobHasKeyValue(job, "uses", action);
}

export function jobActionHasInput(job, action, key, expectedValue) {
  if (!job) {
    return false;
  }

  for (let index = 0; index < job.lines.length; index += 1) {
    const usesLine = job.lines[index];
    if (!/^(?:-\s+)?uses:\s*/.test(usesLine.text) || !jobHasKeyValue({ lines: [usesLine] }, "uses", action)) {
      continue;
    }

    const actionPropertyIndentation = usesLine.text.startsWith("- ") ? usesLine.indentation + 2 : usesLine.indentation;
    let stepIndentation = usesLine.indentation;
    for (let parentIndex = index - 1; parentIndex >= 0; parentIndex -= 1) {
      const parent = job.lines[parentIndex];
      if (parent.indentation < usesLine.indentation && parent.text.startsWith("- ")) {
        stepIndentation = parent.indentation;
        break;
      }
    }

    let withIndentation = -1;
    for (let childIndex = index + 1; childIndex < job.lines.length; childIndex += 1) {
      const child = job.lines[childIndex];
      if (child.indentation <= stepIndentation) {
        break;
      }
      if (child.text === "with:" && child.indentation === actionPropertyIndentation) {
        withIndentation = child.indentation;
        continue;
      }
      if (withIndentation >= 0 && child.indentation <= withIndentation) {
        break;
      }
      if (withIndentation >= 0 && jobHasKeyValue({ lines: [child] }, key, expectedValue)) {
        return true;
      }
    }
  }

  return false;
}

export function workflowHasActiveKey(content, key) {
  const pattern = new RegExp(`^(?:-\\s+)?${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}:`);
  return activeYamlLines(content).some((line) => pattern.test(line.text));
}

export function workflowHasTopLevelKeyValue(content, key, expectedValue) {
  const pattern = new RegExp(`^${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}:\\s*(.+)$`);
  return activeYamlLines(content).some((line) => {
    if (line.indentation !== 0) {
      return false;
    }
    const match = line.text.match(pattern);
    return match && unquote(match[1]) === expectedValue;
  });
}

export function jobHasNestedKeyValue(job, parentKey, key, expectedValue) {
  if (!job) {
    return false;
  }

  const parentPattern = new RegExp(`^${parentKey.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}:\\s*$`);
  const keyPattern = new RegExp(`^${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}:\\s*(.+)$`);

  for (let index = 0; index < job.lines.length; index += 1) {
    const parent = job.lines[index];
    if (!parentPattern.test(parent.text)) {
      continue;
    }

    for (let childIndex = index + 1; childIndex < job.lines.length; childIndex += 1) {
      const child = job.lines[childIndex];
      if (child.indentation <= parent.indentation) {
        break;
      }
      const match = child.text.match(keyPattern);
      if (match && unquote(match[1]) === expectedValue) {
        return true;
      }
    }
  }

  return false;
}

export function jobHasPermission(job, permission, expectedValue) {
  return jobHasNestedKeyValue(job, "permissions", permission, expectedValue);
}

export function collectActionReferences(content) {
  const references = [];
  for (const line of activeYamlLines(content)) {
    const match = line.text.match(/^(?:-\s+)?uses:\s*(.+)$/);
    if (match) {
      references.push(unquote(match[1]));
    }
  }
  return references;
}

export function isPinnedActionReference(reference) {
  if (reference.startsWith("./")) {
    return true;
  }
  return /^[^@\s]+@[0-9a-f]{40}$/.test(reference);
}

export function workflowActionsArePinned(content) {
  const references = collectActionReferences(content);
  return references.length > 0 && references.every(isPinnedActionReference);
}
