import { execFileSync } from "node:child_process";
import {
  chmodSync,
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  renameSync,
  rmSync,
  utimesSync,
} from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const FIXED_ARCHIVE_TIME = new Date("2000-01-01T00:00:00.000Z");

function compareArchiveNames(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function collectArchiveNodes(rootDirectory, directory = rootDirectory) {
  const directories = [];
  const files = [];

  for (const name of readdirSync(directory).sort(compareArchiveNames)) {
    const absolutePath = join(directory, name);
    const archivePath = relative(rootDirectory, absolutePath).split("\\").join("/");
    const stat = lstatSync(absolutePath);
    if (stat.isDirectory()) {
      directories.push({ absolutePath, archivePath });
      const nested = collectArchiveNodes(rootDirectory, absolutePath);
      directories.push(...nested.directories);
      files.push(...nested.files);
      continue;
    }
    if (!stat.isFile()) {
      throw new Error(`Unsupported non-file package entry: ${archivePath}`);
    }
    files.push({ absolutePath, archivePath });
  }

  return { directories, files };
}

function runArchiveCommand(command, arguments_, options = {}) {
  try {
    execFileSync(command, arguments_, { stdio: "pipe", ...options });
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`Missing ${command} command required for deterministic theme packaging.`, { cause: error });
    }
    throw error;
  }
}

export function rewriteZipDeterministically(archivePath) {
  const absoluteArchivePath = resolve(archivePath);
  if (!existsSync(absoluteArchivePath)) {
    throw new Error(`Theme package not found: ${archivePath}`);
  }

  const temporaryRoot = mkdtempSync(join(dirname(absoluteArchivePath), ".theme-package-normalize-"));
  const extractedDirectory = join(temporaryRoot, "contents");
  const normalizedArchivePath = join(temporaryRoot, "normalized.zip");

  try {
    mkdirSync(extractedDirectory);
    runArchiveCommand("unzip", ["-qq", absoluteArchivePath, "-d", extractedDirectory]);

    const { directories, files } = collectArchiveNodes(extractedDirectory);
    files.sort((left, right) => compareArchiveNames(left.archivePath, right.archivePath));
    if (files.length === 0) {
      throw new Error("Theme package cannot be normalized because it contains no files.");
    }

    for (const entry of directories) {
      chmodSync(entry.absolutePath, 0o755);
      utimesSync(entry.absolutePath, FIXED_ARCHIVE_TIME, FIXED_ARCHIVE_TIME);
    }
    for (const entry of files) {
      chmodSync(entry.absolutePath, 0o644);
      utimesSync(entry.absolutePath, FIXED_ARCHIVE_TIME, FIXED_ARCHIVE_TIME);
    }

    runArchiveCommand("zip", ["-X", "-q", "-9", normalizedArchivePath, ...files.map((entry) => entry.archivePath)], {
      cwd: extractedDirectory,
      env: { ...process.env, TZ: "UTC" },
    });
    renameSync(normalizedArchivePath, absoluteArchivePath);
  } finally {
    rmSync(temporaryRoot, { force: true, recursive: true });
  }
}
