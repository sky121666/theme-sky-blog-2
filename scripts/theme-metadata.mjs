import { readFileSync } from "node:fs";

const DEFAULT_THEME_YAML = "theme.yaml";

export function readThemeMetadata(themeYamlPath = DEFAULT_THEME_YAML) {
  const themeYaml = readFileSync(themeYamlPath, "utf8");
  const nameMatch = themeYaml.match(/metadata:\s*\n(?:[ \t]+[^\n]*\n)*?[ \t]+name:\s*["']?([^"'\n]+)["']?/);
  const versionMatch = themeYaml.match(/\nspec:\s*\n(?:[ \t]+[^\n]*\n)*?[ \t]+version:\s*["']?([^"'\n]+)["']?/);

  if (!nameMatch || !versionMatch) {
    throw new Error(`Unable to read metadata.name or spec.version from ${themeYamlPath}`);
  }

  return {
    name: nameMatch[1].trim(),
    version: versionMatch[1].trim(),
  };
}

export function readThemePackageName(themeYamlPath = DEFAULT_THEME_YAML) {
  const { name, version } = readThemeMetadata(themeYamlPath);
  return `${name}-${version}.zip`;
}
