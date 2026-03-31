import Alpine from "alpinejs";

import { navigateToUrl } from "../common/navigation";
import {
  getCurrentUser,
  getDirectoryContent,
  getParentPath,
  resolvePath,
  syncPathWithUrl,
  virtualPathToUrl,
} from "../common/virtual-fs";

// ── Help text ──────────────────────────────────────────────────────

const LIST_HELP = `
List Page Commands:
  ls            - List directory contents
  cd <path>     - Navigate to path
  pd / npage    - Next page
  pu / ppage    - Previous page
  back          - Browser back
  help          - Show this help
  clear         - Clear output

Navigation:
  ↑/↓           - Command history
  Tab           - Auto-complete
  Enter         - Execute
`.trim();

const POST_HELP = `
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

// ── Command handlers ───────────────────────────────────────────────

function handleCd(path: string, currentPath: string): { navigate?: string; newPath?: string; output?: string } {
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

  if (content !== null) {
    const url = virtualPathToUrl(targetPath);
    return url ? { navigate: url } : { newPath: targetPath };
  }

  // Try to resolve as a file in the parent directory
  const parentPath = getParentPath(targetPath);
  const fileName = targetPath.slice(targetPath.lastIndexOf("/") + 1);
  const parentContent = getDirectoryContent(parentPath);

  const targetEntry = parentContent?.find(
    (entry) => (entry.name === fileName || entry.slug === fileName) && entry.permalink,
  );

  if (targetEntry?.permalink) {
    return { navigate: targetEntry.permalink };
  }

  return { output: `bash: cd: ${path}: No such file or directory` };
}

function handleLs(args: string, currentPath: string): string {
  const targetPath = args ? resolvePath(args, currentPath) : currentPath;
  const content = getDirectoryContent(targetPath);

  if (content === null) {
    return `ls: ${args}: No such file or directory`;
  }

  if (content.length === 0) {
    return args && targetPath !== currentPath ? "Directory is empty." : "Total 0";
  }

  const lines = content.map((item) => {
    const date = item.date || new Date().toISOString().slice(0, 10);
    const permissions = item.type === "dir" ? "drwxr-xr-x" : "-rw-r--r--";
    const size = item.count ? String(item.count).padStart(3) : "  1";
    const suffix = item.type === "dir" ? "/" : "";

    return `${permissions}  ${size} ${getCurrentUser()}  staff  ${date}  ${item.name}${suffix}`;
  });

  return `Total ${content.length}\n${lines.join("\n")}`;
}

function handleNavPost(direction: "next" | "prev"): string | null {
  const url = direction === "next" ? window.haloData?.nextPost : window.haloData?.prevPost;

  if (!url) {
    return direction === "next" ? "No next article available." : "No previous article available.";
  }

  navigateToUrl(url);
  return null;
}

function handlePage(next: boolean): string | null {
  const pagination = window.haloData?.pagination;

  if (!pagination) {
    return "Pagination not available on this page.";
  }

  const targetUrl = next ? pagination.nextUrl : pagination.prevUrl;

  if (!targetUrl) {
    return next ? "Already at the last page." : "Already at the first page.";
  }

  navigateToUrl(targetUrl);
  return null;
}

// ── Auto-complete ──────────────────────────────────────────────────

function getSuggestions(input: string, currentPath: string, isPost: boolean): string[] {
  const inputLower = input.toLowerCase();

  if (!input.includes(" ")) {
    const commands = isPost
      ? ["cd", "next", "prev", "back", "help", "clear"]
      : ["cd", "ls", "ll", "pd", "pu", "npage", "ppage", "back", "help", "clear"];
    const noArgCommands = ["help", "clear", "back", "next", "prev", "pd", "pu", "npage", "ppage", "ls", "ll"];

    return commands
      .filter((candidate) => candidate.startsWith(inputLower))
      .map((candidate) => (noArgCommands.includes(candidate) ? candidate : `${candidate} `));
  }

  const firstSpace = input.indexOf(" ");
  const command = input.slice(0, firstSpace).toLowerCase();
  const rawArgument = input.slice(firstSpace + 1);
  const rawArgumentLower = rawArgument.toLowerCase();

  if (!["cd", "ls", "ll"].includes(command)) {
    return [];
  }

  const candidates: string[] = [];
  let directoryPart = "";
  let filePartLower = rawArgumentLower;

  const lastSlash = rawArgument.lastIndexOf("/");
  if (lastSlash !== -1) {
    directoryPart = rawArgument.slice(0, lastSlash + 1);
    filePartLower = rawArgument.slice(lastSlash + 1).toLowerCase();
  }

  const targetDirectory = resolvePath(directoryPart || ".", currentPath);
  const content = getDirectoryContent(targetDirectory);

  content?.forEach((item) => {
    if (!item.name.toLowerCase().startsWith(filePartLower)) {
      return;
    }

    const suffix = item.type === "dir" ? "/" : "";
    candidates.push(`${command} ${directoryPart}${item.name}${suffix}`);
  });

  if (!directoryPart && "..".startsWith(filePartLower)) {
    candidates.push(`${command} ../`);
  }

  if (!directoryPart && "~".startsWith(filePartLower)) {
    candidates.push(`${command} ~/`);
  }

  return candidates;
}

// ── Alpine component ───────────────────────────────────────────────

export function registerTerminalInputComponent() {
  Alpine.data("terminalInput", (currentPath = "~/blog") => ({
    command: "",
    completionState: {
      candidates: [] as string[],
      index: 0,
    },
    currentPath,
    history: [] as string[],
    historyIndex: -1,
    output: "",
    showHelp: false,

    autoComplete() {
      const currentInput = this.command;
      const lastSuggestion = this.completionState.candidates[this.completionState.index];
      const isCycling = this.completionState.candidates.length > 0 && currentInput === lastSuggestion;

      if (!isCycling) {
        this.completionState.candidates = getSuggestions(currentInput, String(this.currentPath), this.isPostPage());
        this.completionState.index = 0;
      } else {
        this.completionState.index = (this.completionState.index + 1) % this.completionState.candidates.length;
      }

      if (this.completionState.candidates.length > 0) {
        this.command = this.completionState.candidates[this.completionState.index];
      }
    },

    async executeCommand() {
      const rawCommand = this.command.trim();
      if (!rawCommand) {
        return;
      }

      if (this.history[this.history.length - 1] !== rawCommand) {
        this.history.push(rawCommand);
      }
      this.historyIndex = this.history.length;

      const [command, ...rawArgs] = rawCommand.split(/\s+/);
      const args = rawArgs.join(" ");

      this.showHelp = false;
      this.output = "";

      switch (command.toLowerCase()) {
        case "back":
          window.history.back();
          break;
        case "cd":
          this.applyCdResult(handleCd(args, String(this.currentPath)));
          break;
        case "clear":
          break;
        case "help":
          this.showHelp = true;
          break;
        case "ll":
        case "ls":
          this.output = "Loading...";
          await new Promise((resolve) => window.setTimeout(resolve, 50));
          this.output = handleLs(args, String(this.currentPath));
          break;
        case "next":
          this.output = handleNavPost("next") || "";
          break;
        case "npage":
        case "pd":
          this.output = handlePage(true) || "";
          break;
        case "ppage":
        case "pu":
          this.output = handlePage(false) || "";
          break;
        case "prev":
          this.output = handleNavPost("prev") || "";
          break;
        case "search":
          if (!args) {
            this.output = "Usage: search <keyword>";
            break;
          }
          navigateToUrl(`/search?keyword=${encodeURIComponent(args)}`);
          break;
        default:
          this.output = `bash: ${command}: command not found. Type 'help' for available commands.`;
      }

      this.command = "";
    },

    applyCdResult(result: { navigate?: string; newPath?: string; output?: string }) {
      if (result.navigate) {
        navigateToUrl(result.navigate);
      } else if (result.newPath) {
        this.currentPath = result.newPath;
        this.output = "";
      } else if (result.output) {
        this.output = result.output;
      }
    },

    get helpText() {
      return this.isPostPage() ? POST_HELP : LIST_HELP;
    },

    handleKeydown(event: KeyboardEvent) {
      if (event.isComposing) {
        return;
      }

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          this.navigateHistory(1);
          break;
        case "ArrowUp":
          event.preventDefault();
          this.navigateHistory(-1);
          break;
        case "Enter":
          event.preventDefault();
          this.executeCommand();
          break;
        case "Escape":
          event.preventDefault();
          this.command = "";
          this.output = "";
          this.showHelp = false;
          (this.$refs.cmdInput as HTMLInputElement | undefined)?.blur();
          break;
        case "Tab":
          event.preventDefault();
          this.autoComplete();
          break;
        default:
          break;
      }
    },

    init() {
      this.currentPath = syncPathWithUrl();

      document.addEventListener("pjax:complete", () => {
        this.currentPath = syncPathWithUrl();
      });

      window.addEventListener("popstate", () => {
        this.currentPath = syncPathWithUrl();
      });

      this.$nextTick(() => {
        (this.$refs.cmdInput as HTMLInputElement | undefined)?.focus();
      });
    },

    isPostPage() {
      return window.haloData?.pageType === "post";
    },

    navigateHistory(direction: number) {
      if (this.history.length === 0) {
        return;
      }

      this.historyIndex += direction;

      if (this.historyIndex < 0) {
        this.historyIndex = 0;
      }

      if (this.historyIndex >= this.history.length) {
        this.historyIndex = this.history.length;
        this.command = "";
        return;
      }

      this.command = this.history[this.historyIndex];
    },
  }));
}
