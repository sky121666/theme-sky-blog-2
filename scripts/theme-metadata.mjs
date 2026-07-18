import { readFileSync } from "node:fs";

const DEFAULT_THEME_YAML = "theme.yaml";

function stripYamlComment(value) {
  let quote = "";

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    if (quote) {
      if (character === quote && value[index - 1] !== "\\") {
        quote = "";
      }
      continue;
    }

    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }

    if (character === "#" && (index === 0 || /\s/.test(value[index - 1]))) {
      return value.slice(0, index).trimEnd();
    }
  }

  return value.trimEnd();
}

function parseYamlScalar(value) {
  const scalar = stripYamlComment(value).trim();
  if (
    scalar.length >= 2 &&
    ((scalar.startsWith('"') && scalar.endsWith('"')) || (scalar.startsWith("'") && scalar.endsWith("'")))
  ) {
    return scalar.slice(1, -1);
  }
  return scalar;
}

export function parseThemeMetadata(themeYaml, source = DEFAULT_THEME_YAML) {
  let section = "";
  let name = "";
  let version = "";

  for (const rawLine of String(themeYaml).split(/\r?\n/)) {
    const line = stripYamlComment(rawLine);
    if (!line.trim()) {
      continue;
    }

    const indentation = line.match(/^\s*/)[0].length;
    const content = line.trim();
    if (indentation === 0) {
      const sectionMatch = content.match(/^([A-Za-z0-9_-]+):\s*$/);
      section = sectionMatch?.[1] || "";
      continue;
    }

    if (indentation !== 2) {
      continue;
    }

    if (section === "metadata") {
      const nameMatch = content.match(/^name:\s*(.+)$/);
      if (nameMatch) {
        name = parseYamlScalar(nameMatch[1]);
      }
    }

    if (section === "spec") {
      const versionMatch = content.match(/^version:\s*(.+)$/);
      if (versionMatch) {
        version = parseYamlScalar(versionMatch[1]);
      }
    }
  }

  if (!name || !version) {
    throw new Error(`Unable to read metadata.name or spec.version from ${source}`);
  }

  return { name, version };
}

export function readThemeMetadata(themeYamlPath = DEFAULT_THEME_YAML) {
  const themeYaml = readFileSync(themeYamlPath, "utf8");
  return parseThemeMetadata(themeYaml, themeYamlPath);
}

export function readThemePackageName(themeYamlPath = DEFAULT_THEME_YAML) {
  const { name, version } = readThemeMetadata(themeYamlPath);
  return `${name}-${version}.zip`;
}
