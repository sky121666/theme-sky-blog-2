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
import { type CommandResult, dispatchCommand, getCommandHelp, isListingCommand } from "./commands";

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
    toolsOpen: false,
    viewportResizeHandler: null as (() => void) | null,

    closeReaderTools(event: KeyboardEvent) {
      if (
        this.toolsOpen &&
        !event.isComposing &&
        event.keyCode !== 229 &&
        window.matchMedia("(width < 48rem)").matches
      ) {
        event.preventDefault();
        this.toolsOpen = false;
        (this.$refs.toolsToggle as HTMLButtonElement).focus({ preventScroll: true });
      }
    },

    syncKeyboardHeight() {
      const viewport = window.visualViewport;
      if (
        viewport &&
        viewport.scale === 1 &&
        document.activeElement === this.$refs.cmdInput &&
        window.matchMedia("(width < 48rem)").matches
      ) {
        document.body.style.setProperty("--terminal-keyboard-height", `${viewport.height}px`);
      } else {
        this.clearKeyboardHeight();
      }
    },

    clearKeyboardHeight() {
      document.body.style.removeProperty("--terminal-keyboard-height");
    },

    // ── Tab completion ───────────────────────────────────────────

    autoComplete() {
      const currentInput = this.command;
      if (!currentInput.trim()) {
        return false;
      }

      if (currentInput !== this.completionState.candidates[this.completionState.index]) {
        const candidates = [...new Set(getSuggestions(currentInput, String(this.currentPath)))];
        const exactIndex = candidates.indexOf(currentInput);
        if (exactIndex !== -1) {
          candidates.splice(exactIndex, 1);
          if (candidates.length > 0) {
            candidates.push(currentInput);
          }
        }
        this.completionState.candidates = candidates;
        this.completionState.index = -1;
      }

      const index = this.completionState.index + 1;
      const next = this.completionState.candidates[index];
      if (next === undefined) {
        return false;
      }

      this.completionState.index = index;
      this.command = next;
      return true;
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
        if (isListingCommand(command)) {
          this.output = "Loading...";
          await new Promise((resolve) => window.setTimeout(resolve, 50));
          if (executionId !== this.executionId) {
            return;
          }
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
      return this.showHelp ? getCommandHelp() : "";
    },

    // ── Keyboard handler ─────────────────────────────────────────

    handleKeydown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.isComposing || event.keyCode === 229) {
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
          this.executionId += 1;
          this.historyIndex = this.history.length;
          this.completionState.candidates = [];
          this.command = "";
          this.output = "";
          this.showHelp = false;
          (this.$refs.cmdInput as HTMLInputElement | undefined)?.blur();
          break;
        case "Tab":
          if (!event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey && this.autoComplete()) {
            event.preventDefault();
          }
          break;
        default:
          break;
      }
    },

    // ── Init ─────────────────────────────────────────────────────

    destroy() {
      this.executionId += 1;

      if (this.viewportResizeHandler) {
        window.visualViewport?.removeEventListener("resize", this.viewportResizeHandler);
        this.viewportResizeHandler = null;
        this.clearKeyboardHeight();
      }
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

      this.viewportResizeHandler = () => this.syncKeyboardHeight();
      window.visualViewport?.addEventListener("resize", this.viewportResizeHandler);

      this.pageReadyHandler = (event) => {
        this.toolsOpen = false;
        this.currentPath = syncPathWithUrl();
        this.completionState.candidates = [];
        this.showHelp = false;

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
