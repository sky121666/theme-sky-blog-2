import Alpine from "../common/alpine";

import { logError } from "../common/logger";
import { navigateToUrl } from "../common/navigation";
import {
  PAGE_READY_EVENT,
  RUNTIME_STATUS_EVENT,
  type PageReadyDetail,
  type RuntimeStatusDetail,
} from "../common/runtime-events";
import { syncPathWithUrl } from "../common/virtual-fs";
import { getSuggestions } from "./autocomplete";
import { type CommandResult, dispatchCommand, LIST_HELP, POST_HELP } from "./commands";

// ── Alpine component ───────────────────────────────────────────────

const READER_PAGE_TYPES = new Set(["page", "post"]);

export function shouldAutoFocusTerminal(pageType = window.haloData?.pageType) {
  if (pageType && READER_PAGE_TYPES.has(pageType)) {
    return false;
  }

  return typeof window.matchMedia !== "function" || window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;
}

export function registerTerminalInputComponent() {
  Alpine.data("terminalInput", (currentPath = "~/blog") => ({
    command: "",
    completionState: {
      candidates: [] as string[],
      index: 0,
    },
    currentPath,
    executionId: 0,
    history: [] as string[],
    historyIndex: -1,
    output: "",
    pageReadyHandler: null as ((event: CustomEvent<PageReadyDetail>) => void) | null,
    runtimeStatusHandler: null as ((event: CustomEvent<RuntimeStatusDetail>) => void) | null,
    showHelp: false,

    // ── Tab completion ───────────────────────────────────────────

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

    // ── Command execution ────────────────────────────────────────

    async executeCommand() {
      const rawCommand = this.command.trim();
      if (!rawCommand) {
        return;
      }

      if (this.history[this.history.length - 1] !== rawCommand) {
        this.history.push(rawCommand);
      }
      this.historyIndex = this.history.length;
      const executionId = ++this.executionId;

      const [command, ...rawArgs] = rawCommand.split(/\s+/);
      const args = rawArgs.join(" ");

      this.command = "";
      this.completionState.candidates = [];
      this.completionState.index = 0;
      this.showHelp = false;
      this.output = "";

      try {
        // Show loading for ls
        if (command.toLowerCase() === "ls" || command.toLowerCase() === "ll") {
          this.output = "Loading...";
          await new Promise((resolve) => window.setTimeout(resolve, 50));
        }

        const result: CommandResult = await dispatchCommand(command, args, String(this.currentPath));
        if (executionId !== this.executionId) {
          return;
        }

        this.applyResult(result);
      } catch (error) {
        if (executionId !== this.executionId) {
          return;
        }

        logError("Terminal command failed.", error);
        this.output = "Command failed unexpectedly. Please try again.";
      }
    },

    // ── Apply command result ─────────────────────────────────────

    applyResult(result: CommandResult) {
      if (result.navigate) {
        navigateToUrl(result.navigate);
      } else if (result.newPath) {
        this.currentPath = result.newPath;
        this.output = "";
      } else if (result.showHelp) {
        this.showHelp = true;
      } else if (result.output) {
        this.output = result.output;
      }
    },

    // ── Getters ──────────────────────────────────────────────────

    get helpText() {
      return this.isPostPage() ? POST_HELP : LIST_HELP;
    },

    // ── Keyboard handler ─────────────────────────────────────────

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
          void this.executeCommand();
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

    // ── Init ─────────────────────────────────────────────────────

    destroy() {
      this.executionId += 1;

      if (this.pageReadyHandler) {
        document.removeEventListener(PAGE_READY_EVENT, this.pageReadyHandler);
        this.pageReadyHandler = null;
      }

      if (this.runtimeStatusHandler) {
        document.removeEventListener(RUNTIME_STATUS_EVENT, this.runtimeStatusHandler);
        this.runtimeStatusHandler = null;
      }
    },

    init() {
      this.currentPath = syncPathWithUrl();

      this.pageReadyHandler = (event) => {
        this.currentPath = syncPathWithUrl();

        if (READER_PAGE_TYPES.has(event.detail.pageType)) {
          (this.$refs.cmdInput as HTMLInputElement | undefined)?.blur();
        }
      };
      document.addEventListener(PAGE_READY_EVENT, this.pageReadyHandler);

      this.runtimeStatusHandler = (event) => {
        this.showHelp = false;
        this.output = `[${event.detail.level.toUpperCase()}] ${event.detail.message}`;
      };
      document.addEventListener(RUNTIME_STATUS_EVENT, this.runtimeStatusHandler);

      this.$nextTick(() => {
        if (shouldAutoFocusTerminal()) {
          (this.$refs.cmdInput as HTMLInputElement | undefined)?.focus();
        }
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
