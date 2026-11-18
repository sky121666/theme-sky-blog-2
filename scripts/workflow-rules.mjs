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
