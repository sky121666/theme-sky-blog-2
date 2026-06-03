import { collectAssetVersions, fetchHomeHtml, normalizeBaseUrl } from "./runtime-assets.mjs";
import { readThemeMetadata } from "./theme-metadata.mjs";

async function main() {
  const { name, version: expectedVersion } = readThemeMetadata();
  const baseUrl = normalizeBaseUrl(process.env.HALO_BASE_URL || process.env.SMOKE_BASE_URL);
  const html = await fetchHomeHtml(baseUrl, "_runtime_version_check");
  const versions = collectAssetVersions(html, name);

  if (versions.length < 2) {
    throw new Error(`Runtime page does not reference ${name} main assets`);
  }

  const staleVersions = versions.filter((version) => version !== expectedVersion);
  if (staleVersions.length > 0) {
    throw new Error(
      `Runtime asset version mismatch: expected ${expectedVersion}, got ${[...new Set(staleVersions)].join(", ")}. Re-upload or reload dist/${name}-${expectedVersion}.zip in Halo.`,
    );
  }

  console.log(`Runtime asset version is current: ${expectedVersion}`);
}

main().catch((error) => {
  console.error(`runtime version check failed: ${error.message}`);
  process.exit(1);
});
