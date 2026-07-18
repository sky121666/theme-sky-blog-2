export function findStaleThemePackages({ entries, expectedPackageName, themeName }) {
  const themePackagePrefix = `${themeName}-`;

  return entries.filter(
    (entry) => entry !== expectedPackageName && entry.startsWith(themePackagePrefix) && entry.endsWith(".zip"),
  );
}
