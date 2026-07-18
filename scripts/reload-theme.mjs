import { collectAssetVersions, fetchHomeHtml, normalizeBaseUrl } from "./runtime-assets.mjs";
import { readThemeMetadata } from "./theme-metadata.mjs";

async function waitForRuntimeVersion(baseUrl, themeName, expectedVersion, timeoutMs = 30_000) {
  const startedAt = Date.now();
  let lastVersions = [];

  while (Date.now() - startedAt < timeoutMs) {
    const html = await fetchHomeHtml(baseUrl, "_theme_reload_check");
    const versions = collectAssetVersions(html, themeName);
    lastVersions = versions;

    if (versions.length >= 2 && versions.every((version) => version === expectedVersion)) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));
  }

  throw new Error(
    `Runtime asset version mismatch after reload: expected ${expectedVersion}, got ${[...new Set(lastVersions)].join(", ") || "none"}. Confirm the live-mounted ${themeName} directory and trigger the Reload API again.`,
  );
}

async function main() {
  const token = process.env.HALO_PAT || process.env.FIVEEE_PAT || process.env.HALO_TOKEN;
  if (!token) {
    throw new Error("Missing HALO_PAT, FIVEEE_PAT, or HALO_TOKEN environment variable");
  }

  const baseUrl = normalizeBaseUrl(process.env.HALO_BASE_URL || process.env.SMOKE_BASE_URL);
  const { name, version } = readThemeMetadata();
  const reloadUrl = `${baseUrl}/apis/api.console.halo.run/v1alpha1/themes/${encodeURIComponent(name)}/reload`;

  console.log(`Reloading theme: ${name}`);
  console.log(`Base URL: ${baseUrl}`);

  const response = await fetch(reloadUrl, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Reload API failed: ${response.status} ${body.slice(0, 200)}`.trim());
  }

  await waitForRuntimeVersion(baseUrl, name, version);
  console.log(`Theme runtime asset version is current: ${version}`);
}

main().catch((error) => {
  console.error(`theme reload failed: ${error.message}`);
  process.exit(1);
});
