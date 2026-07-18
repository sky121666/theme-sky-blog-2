import {
  copyArticleLink,
  formatArticleToc,
  scrollMainToBottom,
  scrollMainToTop,
  scrollToArticleHeading,
} from "./article-tools";
import {
  getCurrentUser,
  getDirectoryContent,
  getParentPath,
  resolvePath,
  virtualPathToUrl,
} from "../common/virtual-fs";
import { ensureHomePostsLoaded } from "../common/page-data";
import { openSearchWidget } from "../common/ui-actions";

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
  top           - Scroll to top
  bottom        - Scroll to bottom
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
  toc           - Show article table of contents
  jump <n>      - Jump to TOC item number
  top           - Scroll to top
  bottom        - Scroll to bottom
  copy          - Copy article link
  search        - Open search
  help          - Show this help
  clear         - Clear output

Navigation:
  ↑/↓           - Command history
  Tab           - Auto-complete
  Enter         - Execute
`.trim();

// ── Command implementations ────────────────────────────────────────

async function handleCd(path: string, currentPath: string): Promise<CommandResult> {
  if (!path || path === ".") {
    return {};
  }

  if (path === ".." || path === "../") {
    const parentPath = getParentPath(currentPath);
    const url = virtualPathToUrl(parentPath);
    return url ? { navigate: url } : { newPath: parentPath };
  }

  const targetPath = resolvePath(path, currentPath);
  let url = virtualPathToUrl(targetPath);

  const directRootEntry = targetPath.startsWith("~/blog/") && !targetPath.slice("~/blog/".length).includes("/");
  const builtInDirectory = ["~/blog/archives", "~/blog/categories", "~/blog/tags"].includes(targetPath);
  if (!url && directRootEntry && !builtInDirectory && window.haloData?.pageType !== "index") {
    await ensureHomePostsLoaded();
    url = virtualPathToUrl(targetPath);
  }

  if (url) {
    return { navigate: url };
  }

  const content = getDirectoryContent(targetPath);

  if (content === undefined) {
    return { output: `cd: '${targetPath}' is not loaded on this page` };
  }

  if (!content) {
    return { output: `cd: no such file or directory: ${path}` };
  }

  return { newPath: targetPath };
}

async function handleLs(args: string, currentPath: string): Promise<string> {
  const targetPath = args ? resolvePath(args, currentPath) : currentPath;

  if (targetPath === "~/blog" && window.haloData?.pageType !== "index") {
    await ensureHomePostsLoaded();
  }

  const content = getDirectoryContent(targetPath);

  if (content === undefined) {
    return `ls: '${targetPath}' is not loaded on this page; use 'cd ${targetPath}' to open it`;
  }

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
  const url = direction === "next" ? window.haloData?.nextPost : window.haloData?.prevPost;

  if (!url) {
    return {
      output: direction === "next" ? "No next article available." : "No previous article available.",
    };
  }

  return { navigate: url };
}

function handlePage(next: boolean): CommandResult {
  const pagination = window.haloData?.pagination;

  if (!pagination) {
    return { output: "Pagination not available on this page." };
  }

  const targetUrl = next ? pagination.nextUrl : pagination.prevUrl;

  if (!targetUrl) {
    return {
      output: next ? "Already at the last page." : "Already at the first page.",
    };
  }

  return { navigate: targetUrl };
}

function handleSearch(args: string): CommandResult {
  if (openSearchWidget()) {
    return args ? { output: `Search widget opened. Type keyword in the search box: ${args}` } : {};
  }

  return {
    output: "SearchWidget is not loaded. Please install and enable the official Halo search widget plugin.",
  };
}

function handleJump(args: string): CommandResult {
  const index = Number.parseInt(args, 10);
  if (!Number.isFinite(index) || index < 1) {
    return { output: "jump: usage: jump <number>" };
  }

  const output = scrollToArticleHeading(index);
  return output ? { output } : {};
}

// ── Command registry (Map pattern) ─────────────────────────────────

type CommandHandler = (args: string, currentPath: string) => CommandResult | Promise<CommandResult>;

const commandRegistry = new Map<string, CommandHandler>([
  [
    "back",
    () => {
      window.history.back();
      return {};
    },
  ],
  ["cd", (args, path) => handleCd(args, path)],
  ["clear", () => ({})],
  [
    "bottom",
    () => {
      scrollMainToBottom();
      return {};
    },
  ],
  ["copy", async () => ({ output: await copyArticleLink() })],
  ["help", () => ({ showHelp: true })],
  ["jump", (args) => handleJump(args)],
  ["ll", async (args, path) => ({ output: await handleLs(args, path) })],
  ["ls", async (args, path) => ({ output: await handleLs(args, path) })],
  ["next", () => handleNavPost("next")],
  ["npage", () => handlePage(true)],
  ["pd", () => handlePage(true)],
  ["ppage", () => handlePage(false)],
  ["prev", () => handleNavPost("prev")],
  ["pu", () => handlePage(false)],
  ["search", (args) => handleSearch(args)],
  ["toc", () => ({ output: formatArticleToc() })],
  [
    "top",
    () => {
      scrollMainToTop();
      return {};
    },
  ],
]);

// ── Command dispatcher ─────────────────────────────────────────────

export async function dispatchCommand(command: string, args: string, currentPath: string): Promise<CommandResult> {
  const handler = commandRegistry.get(command.toLowerCase());

  if (handler) {
    return handler(args, currentPath);
  }

  return {
    output: `bash: ${command}: command not found. Type 'help' for available commands.`,
  };
}
