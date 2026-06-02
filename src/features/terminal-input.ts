import Alpine from "alpinejs";

import { navigateToUrl } from "../common/navigation";
import { syncPathWithUrl } from "../common/virtual-fs";
import { getSuggestions } from "./autocomplete";
import { type CommandResult, dispatchCommand, LIST_HELP, POST_HELP } from "./commands";

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

      const [command, ...rawArgs] = rawCommand.split(/\s+/);
      const args = rawArgs.join(" ");

      this.showHelp = false;
      this.output = "";

      // Show loading for ls
      if (command.toLowerCase() === "ls" || command.toLowerCase() === "ll") {
        this.output = "Loading...";
        await new Promise((resolve) => window.setTimeout(resolve, 50));
      }

      const result: CommandResult = await dispatchCommand(command, args, String(this.currentPath));

      this.applyResult(result);
      this.command = "";
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

    // ── Init ─────────────────────────────────────────────────────

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
