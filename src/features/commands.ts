import { navigateToUrl } from "../common/navigation";
import {
  getCurrentUser,
  getDirectoryContent,
  getParentPath,
  resolvePath,
  virtualPathToUrl,
} from "../common/virtual-fs";

// ── Types ──────────────────────────────────────────────────────────

export interface CommandResult {
  navigate?: string;
  newPath?: string;
  output?: string;
  showHelp?: boolean;
}

// ── Help text ──────────────────────────────────────────────────────

export const LIST_HELP = `
List Page Commands:
  ls            - List directory contents
  cd <path>     - Navigate to path
  pd / npage    - Next page
  pu / ppage    - Previous page
  back          - Browser back
  help          - Show this help
  clear         - Clear output
  search        - Open search

Navigation:
  ↑/↓           - Command history
  Tab           - Auto-complete
  Enter         - Execute
`.trim();

export const POST_HELP = `
Post Page Commands:
  cd ..         - Go back to list
  next          - Next article
  prev          - Previous article
  back          - Browser back
  help          - Show this help
  clear         - Clear output

Navigation:
  ↑/↓           - Command history
  Tab           - Auto-complete
  Enter         - Execute
`.trim();

// ── Command implementations ────────────────────────────────────────

function handleCd(
  path: string,
  currentPath: string,
): CommandResult {
  if (!path || path === ".") {
    return {};
  }

  if (path === ".." || path === "../") {
    const parentPath = getParentPath(currentPath);
    const url = virtualPathToUrl(parentPath);
    return url ? { navigate: url } : { newPath: parentPath };
  }

  const targetPath = resolvePath(path, currentPath);
  const content = getDirectoryContent(targetPath);

  if (!content) {
    const url = virtualPathToUrl(targetPath);
    if (url) {
      return { navigate: url };
    }
    return { output: `cd: no such file or directory: ${path}` };
  }

  const fileEntry = content.find(
    (item) => item.type === "file" && item.name === path.split("/").pop(),
  );
  if (fileEntry?.permalink) {
    return { navigate: fileEntry.permalink };
  }

  // content is already verified non-null from L70 check
  const url = virtualPathToUrl(targetPath);
  return url ? { navigate: url } : { newPath: targetPath };
}

function handleLs(args: string, currentPath: string): string {
  const targetPath = args ? resolvePath(args, currentPath) : currentPath;
  const content = getDirectoryContent(targetPath);

  if (!content) {
    return `ls: cannot access '${targetPath}': No such file or directory`;
  }

  if (content.length === 0) {
    return "(empty directory)";
  }

  const lines = content.map((item) => {
    const permissions = item.type === "dir" ? "drwxr-xr-x" : "-rw-r--r--";
    const size = item.type === "dir" ? "-" : "4.0K";
    const date = item.date ?? "Mar 30 12:00";
    const suffix = item.type === "dir" ? "/" : "";
    return `${permissions}  ${size} ${getCurrentUser()}  staff  ${date}  ${item.name}${suffix}`;
  });

  return `Total ${content.length}\n${lines.join("\n")}`;
}

function handleNavPost(direction: "next" | "prev"): CommandResult {
  const url =
    direction === "next" ? window.haloData?.nextPost : window.haloData?.prevPost;

  if (!url) {
    return {
      output:
        direction === "next"
          ? "No next article available."
          : "No previous article available.",
    };
  }

  navigateToUrl(url);
  return {};
}

function handlePage(next: boolean): CommandResult {
  const pagination = window.haloData?.pagination;

  if (!pagination) {
    return { output: "Pagination not available on this page." };
  }

  const targetUrl = next ? pagination.nextUrl : pagination.prevUrl;

  if (!targetUrl) {
    return {
      output: next
        ? "Already at the last page."
        : "Already at the first page.",
    };
  }

  navigateToUrl(targetUrl);
  return {};
}

function handleSearch(args: string): CommandResult {
  if (!args) {
    const sw = (window as unknown as Record<string, unknown>).SearchWidget;
    if (typeof sw !== "undefined" && sw && typeof (sw as { open?: unknown }).open === "function") {
      (sw as { open: () => void }).open();
    } else {
      navigateToUrl("/search");
    }
    return {};
  }
  navigateToUrl(`/search?keyword=${encodeURIComponent(args)}`);
  return {};
}

// ── Command registry (Map pattern) ─────────────────────────────────

type CommandHandler = (args: string, currentPath: string) => CommandResult | Promise<CommandResult>;

const commandRegistry = new Map<string, CommandHandler>([
  ["back", () => { window.history.back(); return {}; }],
  ["cd", (args, path) => handleCd(args, path)],
  ["clear", () => ({})],
  ["help", () => ({ showHelp: true })],
  ["ll", (args, path) => ({ output: handleLs(args, path) })],
  ["ls", (args, path) => ({ output: handleLs(args, path) })],
  ["next", () => handleNavPost("next")],
  ["npage", () => handlePage(true)],
  ["pd", () => handlePage(true)],
  ["ppage", () => handlePage(false)],
  ["prev", () => handleNavPost("prev")],
  ["pu", () => handlePage(false)],
  ["search", (args) => handleSearch(args)],
]);

// ── Command dispatcher ─────────────────────────────────────────────

export async function dispatchCommand(
  command: string,
  args: string,
  currentPath: string,
): Promise<CommandResult> {
  const handler = commandRegistry.get(command.toLowerCase());

  if (handler) {
    return handler(args, currentPath);
  }

  return {
    output: `bash: ${command}: command not found. Type 'help' for available commands.`,
  };
}
