import {
  copyArticleLink,
  formatArticleToc,
  scrollMainToBottom,
  scrollMainToTop,
  scrollToArticleHeading,
} from "./article-tools";
import {
  getCurrentIndexPageContent,
  getCurrentUser,
  getDirectoryContent,
  getParentPath,
  resolvePath,
  virtualPathToUrl,
} from "../common/virtual-fs";
import { ensureHomePostsLoaded } from "../common/page-data";
import type { DirectoryEntry } from "../common/types";
import { openSearchWidget } from "../common/ui-actions";

// ── Types ──────────────────────────────────────────────────────────

export interface CommandResult {
  navigate?: string;
  newPath?: string;
  output?: string;
  showHelp?: boolean;
}

// ── Command implementations ────────────────────────────────────────

function shouldLoadHomePostsForLookup(path: string) {
  return path.startsWith("/") || path.startsWith("~/") || window.haloData?.pageType !== "index";
}

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

  const directRootEntry = targetPath.startsWith("~/blog/") && getParentPath(targetPath) === "~/blog";
  if (!url && directRootEntry && shouldLoadHomePostsForLookup(path)) {
    await ensureHomePostsLoaded({ waitForRefresh: true });
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

function formatDirectoryDate(value: string | null | undefined): string {
  if (!value) {
    return "—";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  const parts = new Intl.DateTimeFormat(document.documentElement.lang || "zh-CN", {
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
    minute: "2-digit",
    month: "short",
  }).formatToParts(date);
  const part = (type: string) => parts.find((item) => item.type === type)?.value || "";
  const monthIndex = parts.findIndex((item) => item.type === "month");
  const monthSuffix = parts[monthIndex + 1]?.type === "literal" ? parts[monthIndex + 1].value.trim() : "";
  return `${part("month")}${monthSuffix} ${part("day")} ${part("hour")}:${part("minute")}`;
}

async function handleLs(args: string, currentPath: string): Promise<string> {
  const targetPath = args ? resolvePath(args, currentPath) : currentPath;
  const currentIndexPage = !args && targetPath === "~/blog" && window.haloData?.pageType === "index";

  if (targetPath === "~/blog" && !currentIndexPage) {
    await ensureHomePostsLoaded({ waitForRefresh: true });
  }

  let content = currentIndexPage ? getCurrentIndexPageContent() : getDirectoryContent(targetPath);

  if (content === null && args) {
    const parentPath = getParentPath(targetPath);
    const segment = targetPath.slice(parentPath.length + 1);
    const matchesSegment = (item: DirectoryEntry) => (item.slug || item.name) === segment;
    const currentPageFiles =
      parentPath === "~/blog" && window.haloData?.pageType === "index"
        ? getCurrentIndexPageContent().filter((entry) => entry.type === "file")
        : [];
    let entry = currentPageFiles.find(matchesSegment) ?? getDirectoryContent(parentPath)?.find(matchesSegment);
    if (!entry && parentPath === "~/blog" && targetPath.startsWith("~/blog/") && shouldLoadHomePostsForLookup(args)) {
      await ensureHomePostsLoaded({ waitForRefresh: true });
      entry = getDirectoryContent(parentPath)?.find(matchesSegment);
    }

    if (entry?.type === "file") {
      content = [entry];
    } else if (entry?.type === "dir") {
      return `ls: '${targetPath}' is not loaded on this page; use 'cd ${targetPath}' to open it`;
    }
  }

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
    const date = formatDirectoryDate(item.date);
    const suffix = item.type === "dir" ? "/" : "";
    return `${permissions}  ${size} ${getCurrentUser()}  staff  ${date}  ${item.name}${suffix}`;
  });

  return `Showing ${content.length} ${content.length === 1 ? "entry" : "entries"} ${args ? `in ${targetPath}` : "on this page"}\n${lines.join("\n")}`;
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
  if (document.querySelector("[data-empty-page]")) {
    return { output: "No items on this page. Use the first-page link to return." };
  }

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

// ── Command definitions ───────────────────────────────────────────

type CommandHandler = (args: string, currentPath: string) => CommandResult | Promise<CommandResult>;

interface CommandDefinition {
  names: string[];
  handler: CommandHandler;
  description: string;
  page?: "list" | "post";
  argument?: "path" | "optional-path" | "value";
  usage?: string;
  postHelp?: { usage: string; description: string };
}

const listDirectory: CommandHandler = async (args, path) => ({ output: await handleLs(args, path) });

const commands: CommandDefinition[] = [
  {
    names: ["cd"],
    handler: handleCd,
    description: "Navigate to path",
    argument: "path",
    usage: "cd <path>",
    postHelp: { usage: "cd ..", description: "Go back to list" },
  },
  {
    names: ["ls", "ll"],
    handler: listDirectory,
    description: "List directory contents",
    page: "list",
    argument: "optional-path",
    usage: "ls",
  },
  { names: ["pd", "npage"], handler: () => handlePage(true), description: "Next page", page: "list" },
  { names: ["pu", "ppage"], handler: () => handlePage(false), description: "Previous page", page: "list" },
  { names: ["next"], handler: () => handleNavPost("next"), description: "Next article", page: "post" },
  { names: ["prev"], handler: () => handleNavPost("prev"), description: "Previous article", page: "post" },
  {
    names: ["back"],
    handler: () => {
      window.history.back();
      return {};
    },
    description: "Browser back",
  },
  {
    names: ["toc"],
    handler: () => ({ output: formatArticleToc() }),
    description: "Show article table of contents",
    page: "post",
  },
  {
    names: ["jump"],
    handler: handleJump,
    description: "Jump to TOC item number",
    page: "post",
    argument: "value",
    usage: "jump <n>",
  },
  {
    names: ["top"],
    handler: () => {
      scrollMainToTop();
      return {};
    },
    description: "Scroll to top",
  },
  {
    names: ["bottom"],
    handler: () => {
      scrollMainToBottom();
      return {};
    },
    description: "Scroll to bottom",
  },
  {
    names: ["copy"],
    handler: async () => ({ output: await copyArticleLink() }),
    description: "Copy article link",
    page: "post",
  },
  { names: ["help"], handler: () => ({ showHelp: true }), description: "Show this help" },
  { names: ["clear"], handler: () => ({}), description: "Clear output" },
  { names: ["search"], handler: handleSearch, description: "Open search", argument: "value" },
];

const commandRegistry = new Map(commands.flatMap((command) => command.names.map((name) => [name, command] as const)));
const listCommands = commands.filter((command) => command.page !== "post");
const postCommands = commands.filter((command) => command.page !== "list");
const standaloneCommands = commands.filter((command) => !command.page);

const navigationHelp = `

Navigation:
  ↑/↓           - Command history
  Tab           - Auto-complete
  Enter         - Execute`;

function formatHelp(title: string, availableCommands: CommandDefinition[], isPost = false) {
  const lines = availableCommands.map((command) => {
    const postHelp = isPost ? command.postHelp : undefined;
    const usage = postHelp?.usage ?? command.usage ?? command.names.join(" / ");
    return `  ${usage.padEnd(13)} - ${postHelp?.description ?? command.description}`;
  });
  return `${title}\n${lines.join("\n")}${navigationHelp}`;
}

export const LIST_HELP = formatHelp("List Page Commands:", listCommands);
export const POST_HELP = formatHelp("Post Page Commands:", postCommands, true);
const commandContexts = {
  list: { commands: listCommands, help: LIST_HELP },
  post: { commands: postCommands, help: POST_HELP },
  standalone: {
    commands: standaloneCommands,
    help: formatHelp("Standalone Page Commands:", standaloneCommands),
  },
};

function getCommandContext(isPost = window.haloData?.pageType === "post") {
  if (isPost) {
    return commandContexts.post;
  }
  return window.haloData?.pageType === "page" ? commandContexts.standalone : commandContexts.list;
}

export function getCommandHelp(): string {
  return getCommandContext().help;
}

export function getCommandNameSuggestions(prefix: string, isPost?: boolean): string[] {
  return getCommandContext(isPost).commands.flatMap(({ names, argument }) => {
    const suffix = argument === "path" || argument === "value" ? " " : "";
    return names.filter((name) => name.startsWith(prefix)).map((name) => name + suffix);
  });
}

export function supportsPathCompletion(command: string): boolean {
  const argument = commandRegistry.get(command)?.argument;
  return argument === "path" || argument === "optional-path";
}

export function isListingCommand(command: string): boolean {
  return commandRegistry.get(command.toLowerCase())?.handler === listDirectory;
}

// ── Command dispatcher ─────────────────────────────────────────────

export async function dispatchCommand(command: string, args: string, currentPath: string): Promise<CommandResult> {
  const handler = commandRegistry.get(command.toLowerCase())?.handler;

  if (handler) {
    return handler(args, currentPath);
  }

  return {
    output: `bash: ${command}: command not found. Type 'help' for available commands.`,
  };
}
