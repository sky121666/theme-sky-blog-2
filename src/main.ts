import "./styles/tailwind.css";
import "./styles/main.css";
import Alpine from "alpinejs";
import Pjax from "pjax";

import lozad from "lozad";
import figlet from "figlet";

// @ts-ignore - figlet font imports
import Standard from "figlet/importable-fonts/Standard";
// @ts-ignore
import Banner from "figlet/importable-fonts/Banner";
// @ts-ignore
import Big from "figlet/importable-fonts/Big";
// @ts-ignore
import Block from "figlet/importable-fonts/Block";
// @ts-ignore
import Doom from "figlet/importable-fonts/Doom";
// @ts-ignore
import Lean from "figlet/importable-fonts/Lean";
// @ts-ignore
import Mini from "figlet/importable-fonts/Mini";
// @ts-ignore
import Script from "figlet/importable-fonts/Script";
// @ts-ignore
import Shadow from "figlet/importable-fonts/Shadow";
// @ts-ignore
import Slant from "figlet/importable-fonts/Slant";
// @ts-ignore
import Small from "figlet/importable-fonts/Small";
// @ts-ignore
import Speed from "figlet/importable-fonts/Speed";

// Load all figlet fonts
figlet.parseFont("Standard", Standard);
figlet.parseFont("Banner", Banner);
figlet.parseFont("Big", Big);
figlet.parseFont("Block", Block);
figlet.parseFont("Doom", Doom);
figlet.parseFont("Lean", Lean);
figlet.parseFont("Mini", Mini);
figlet.parseFont("Script", Script);
figlet.parseFont("Shadow", Shadow);
figlet.parseFont("Slant", Slant);
figlet.parseFont("Small", Small);
figlet.parseFont("Speed", Speed);

// Extend Window interface for Alpine and Halo data
declare global {
  interface Window {
    Alpine: typeof Alpine;
    haloData: {
      categories: any[];
      tags: any[];
      currentPosts: any[];
      urls: {
        categories: string;
        tags: string;
        archives: string;
        home: string;
      };
      user: string;
    };
  }
}

// ASCII Title Generator Component
Alpine.data("asciiTitle", (title: string = "", font: string = "Standard") => ({
  title: title,
  font: font,
  asciiArt: "",
  init() {
    if (this.title) {
      figlet.text(
        this.title,
        {
          // @ts-ignore - font type
          font: this.font || "Standard",
          horizontalLayout: "default",
          verticalLayout: "default",
        },
        (err: Error | null, result?: string) => {
          if (!err && result) {
            (this as { asciiArt: string }).asciiArt = result;
          }
        }
      );
    }
  },
}));

// Typewriter Effect Component
Alpine.data("typewriter", (text: string = "", speed: number = 50) => ({
  text: text,
  display: "",
  init() {
    let i = 0;
    this.display = "";
    const timer = setInterval(() => {
      if (i < (this as { text: string }).text.length) {
        (this as { display: string }).display += (this as { text: string }).text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  },
}));

// Terminal Command Input Component
Alpine.data("terminalInput", (currentPath: string = "~/blog") => ({
  command: "",
  currentPath: currentPath,
  history: [] as string[],
  historyIndex: -1,
  suggestions: [] as string[],
  showHelp: false,
  helpText: `
Available commands:
  cd <path>     - Navigate to a path (e.g. 'cd categories/ai')
  ls            - List directory contents
  search <key>  - Search posts by keyword
  help          - Show this help message
  clear         - Clear command output

Navigation:
  ↑/↓           - History
  Tab           - Auto-complete
  Enter         - Execute
`.trim(),
  output: "",

  init() {
    console.log("[VFS] Terminal initialized at ~/blog (fixed path)");

    // Path stays fixed at ~/blog regardless of page
    this.currentPath = "~/blog";

    this.$nextTick(() => {
      const input = this.$refs.cmdInput as HTMLInputElement;
      if (input) input.focus();
    });
  },

  handleKeydown(e: KeyboardEvent) {
    if (e.isComposing) return;

    if (e.key === "Enter") {
      e.preventDefault();
      this.executeCommand();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this.navigateHistory(-1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      this.navigateHistory(1);
    } else if (e.key === "Tab") {
      e.preventDefault();
      this.autoComplete();
    } else if (e.key === "Escape") {
      e.preventDefault();
      this.command = "";
      this.showHelp = false;
      this.output = "";
    }
  },

  navigateHistory(direction: number) {
    if (this.history.length === 0) return;

    this.historyIndex += direction;
    if (this.historyIndex < 0) this.historyIndex = 0;
    if (this.historyIndex >= this.history.length) {
      this.historyIndex = this.history.length;
      this.command = "";
      return;
    }
    this.command = this.history[this.historyIndex];
  },

  // State for tab completion cycling
  completionState: {
    candidates: [] as string[],
    index: 0,
    original: ""
  },

  autoComplete() {
    const currentInput = this.command;

    // Check if we are continuing a completion cycle
    const lastSuggestion = this.completionState.candidates[this.completionState.index];
    const isCycling = this.completionState.candidates.length > 0 && currentInput === lastSuggestion;

    if (!isCycling) {
      // New completion request
      this.completionState.original = currentInput;
      this.completionState.candidates = this.getSuggestions(currentInput);
      this.completionState.index = 0;
    } else {
      // Cycle to next
      this.completionState.index = (this.completionState.index + 1) % this.completionState.candidates.length;
    }

    if (this.completionState.candidates.length > 0) {
      this.command = this.completionState.candidates[this.completionState.index];
    }
  },

  getSuggestions(input: string): string[] {
    const inputLower = input.toLowerCase();

    // 1. Top-level commands
    if (!input.includes(" ")) {
      const commands = ["cd", "ls", "search", "help", "clear"];
      return commands
        .filter(c => c.startsWith(inputLower))
        .map(c => c + (c === "help" || c === "clear" ? "" : " "));
    }

    // 2. Argument completion
    const parts = input.split(" ");
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ");
    const argLower = arg.toLowerCase();

    if (cmd === "cd" || cmd === "ls" || cmd === "ll") {
      const candidates: string[] = [];
      const baseDirs = ["categories/", "tags/", "../", "/", "~"];

      if (!arg || !arg.includes("/")) {
        baseDirs.filter(d => d.startsWith(argLower)).forEach(m => candidates.push(`${cmd} ${m}`));
      }

      if (argLower.startsWith("categories/")) {
        const prefix = arg.substring("categories/".length);
        const categories = window.haloData?.categories || [];
        categories.forEach((c: any) => {
          const slug = c.spec?.slug || "";
          const name = c.spec?.displayName || "";
          if (slug.toLowerCase().startsWith(prefix.toLowerCase())) {
            candidates.push(`${cmd} categories/${slug}`);
          } else if (name.toLowerCase().startsWith(prefix.toLowerCase())) {
            candidates.push(`${cmd} categories/${name}`);
          }
        });
      }

      if (argLower.startsWith("tags/")) {
        const prefix = arg.substring("tags/".length);
        const tags = window.haloData?.tags || [];
        tags.forEach((t: any) => {
          const slug = t.spec?.slug || "";
          if (slug.toLowerCase().startsWith(prefix.toLowerCase())) {
            candidates.push(`${cmd} tags/${slug}`);
          }
        });
      }

      return candidates;
    }

    return [];
  },

  async executeCommand() {
    const cmd = this.command.trim();
    if (!cmd) return;

    // Add to history
    if (this.history[this.history.length - 1] !== cmd) {
      this.history.push(cmd);
    }
    this.historyIndex = this.history.length;

    // Parse command
    const parts = cmd.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");

    this.showHelp = false;
    this.output = "";

    switch (command) {
      case "cd":
        this.handleCd(args);
        break;
      case "ls":
      case "ll":
        await this.handleLs(args);
        break;
      case "search":
        if (args) {
          window.location.href = `/search?keyword=${encodeURIComponent(args)}`;
        } else {
          this.output = "Usage: search <keyword>";
        }
        break;
      case "help":
        this.showHelp = true;
        break;
      case "clear":
        this.output = "";
        this.showHelp = false;
        break;
      default:
        this.output = `bash: ${command}: command not found. Type 'help' for available commands.`;
    }

    this.command = "";
  },

  async handleLs(args: string) {
    this.output = "Loading...";
    await new Promise(r => setTimeout(r, 50));

    const target = args ? this.resolvePath(args) : this.currentPath;
    const content = this.getDirectoryContent(target);

    if (content === null) {
      this.output = `ls: ${args}: No such file or directory`;
      return;
    }
    if (content.length === 0) {
      if (args && target !== this.currentPath) {
        this.output = "Directory is empty or content not accessible remotely.";
      } else {
        this.output = "Total 0";
      }
      return;
    }

    const lines = content.map((item: any) => {
      const date = item.date || new Date().toISOString().slice(0, 10);
      const perms = item.type === 'dir' ? 'drwxr-xr-x' : '-rw-r--r--';
      const size = item.count ? String(item.count).padStart(3) : "  1";
      const user = window.haloData?.user || "user";
      const group = "staff";
      const suffix = item.type === 'dir' ? '/' : '';
      return `${perms}  ${size} ${user}  ${group}  ${date}  ${item.name}${suffix}`;
    });
    this.output = `Total ${content.length}\n` + lines.join("\n");
  },

  handleCd(path: string) {
    console.log("[VFS] handleCd called with:", path);
    if (!path || path === ".") return;

    const target = this.resolvePath(path);
    console.log("[VFS] handleCd target:", target);

    // Check if directory exists
    const content = this.getDirectoryContent(target);
    console.log("[VFS] handleCd content:", content);

    if (content !== null) {
      // It's a directory, map to URL
      const url = this.virtualPathToUrl(target);
      console.log("[VFS] handleCd url:", url);
      if (url) {
        console.log("[VFS] handleCd navigating to:", url);
        window.location.href = url;
        return;
      } else {
        this.currentPath = target;
        this.output = "";
        return;
      }
    }

    // Check if it's a file (Post) in the parent dir
    const parentPath = target.substring(0, target.lastIndexOf("/"));
    const fileName = target.substring(target.lastIndexOf("/") + 1);
    console.log("[VFS] handleCd checking file:", fileName, "in parent:", parentPath);

    // Get parent content to verify file
    const parentContent = this.getDirectoryContent(parentPath);
    if (parentContent) {
      const file = parentContent.find((f: any) => f.name === fileName && f.type === 'file');
      if (file && file.permalink) {
        console.log("[VFS] handleCd file found, navigating to:", file.permalink);
        window.location.href = file.permalink;
        return;
      }
    }

    console.log("[VFS] handleCd failed - no such file or directory");
    this.output = `bash: cd: ${path}: No such file or directory`;
  },

  // --- VFS Helpers ---

  resolvePath(target: string): string {
    console.log("[VFS] resolvePath input:", target, "currentPath:", this.currentPath);
    let result: string;
    if (target.startsWith("/") || target.startsWith("~")) {
      result = this.normalize(target);
    } else {
      const base = this.currentPath.endsWith("/") ? this.currentPath : this.currentPath + "/";
      result = this.normalize(base + target);
    }
    console.log("[VFS] resolvePath result:", result);
    return result;
  },

  normalize(path: string): string {
    console.log("[VFS] normalize input:", path);
    let p = path;

    // Handle ~ prefix properly
    if (p === "~") {
      p = "~/blog";
    } else if (p.startsWith("~/") && !p.startsWith("~/blog")) {
      // ~/foo -> ~/blog/foo (shouldn't normally happen)
      p = "~/blog" + p.substring(1);
    }
    // If path doesn't start with ~/blog, prepend it
    if (!p.startsWith("~/blog")) {
      if (p.startsWith("/")) {
        p = "~/blog" + p;
      } else {
        p = "~/blog/" + p;
      }
    }

    const parts = p.split("/");
    const stack = [] as string[];
    for (const part of parts) {
      if (part === "" || part === ".") continue;
      if (part === "..") {
        if (stack.length > 2) stack.pop();
      } else {
        stack.push(part);
      }
    }
    const result = stack.length < 2 ? "~/blog" : stack.join("/");
    console.log("[VFS] normalize result:", result);
    return result;
  },

  getDirectoryContent(path: string): any[] | null {
    console.log("[VFS] getDirectoryContent called with:", path);
    console.log("[VFS] haloData:", window.haloData);

    // 1. Root
    if (path === "~/blog") {
      console.log("[VFS] getDirectoryContent matched: ~/blog (root)");
      return [
        { name: "categories", type: "dir", count: (window.haloData?.categories || []).length },
        { name: "tags", type: "dir", count: (window.haloData?.tags || []).length }
      ];
    }

    console.log("[VFS] getDirectoryContent - path not supported (root-only mode)");
    return null;
  },

  virtualPathToUrl(path: string): string | null {
    console.log("[VFS] virtualPathToUrl called with:", path);

    if (path === "~/blog") return window.haloData?.urls?.home || "/";

    if (path === "~/blog/categories") {
      const url = window.haloData?.urls?.categories || "/categories";
      console.log("[VFS] virtualPathToUrl -> categories URL:", url);
      return url;
    }

    if (path === "~/blog/tags") {
      const url = window.haloData?.urls?.tags || "/tags";
      console.log("[VFS] virtualPathToUrl -> tags URL:", url);
      return url;
    }

    console.log("[VFS] virtualPathToUrl - no URL mapping found");
    return null;
  }
}));

// Keyboard Navigation Component
Alpine.data("fileListNav", () => ({
  selectedIndex: -1,
  items: [] as HTMLElement[],
  init() {
    this.items = Array.from(this.$el.querySelectorAll("[data-nav-item]")) as HTMLElement[];
    if (this.items.length > 0) {
      this.selectedIndex = 0; // Default select first item
    }

    // Watch for arrow keys
    window.addEventListener('keydown', this.handleKeydown.bind(this));
  },
  destroy() {
    window.removeEventListener('keydown', this.handleKeydown.bind(this));
  },
  handleKeydown(e: KeyboardEvent) {
    // Only navigate if we have items
    if (this.items.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
      this.scrollToSelected();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex - 1 + this.items.length) % this.items.length;
      this.scrollToSelected();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (this.selectedIndex >= 0 && this.selectedIndex < this.items.length) {
        const item = this.items[this.selectedIndex];
        // Check if it's a pagination button (anchor tag)
        if (item.tagName === "A") {
          (item as HTMLAnchorElement).click();
        } else {
          // It's a file list item, find the link inside
          const link = item.querySelector("a");
          if (link) {
            link.click();
          }
        }
      }
    }
  },
  scrollToSelected() {
    if (this.selectedIndex >= 0 && this.items[this.selectedIndex]) {
      this.items[this.selectedIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }
}));

// Initialize Alpine
window.Alpine = Alpine;
Alpine.start();

// Initialize Lozad (Lazy Loading)
const observer = lozad(".lozad", {
  loaded: (el) => {
    el.classList.add("loaded");
  },
});
observer.observe();

// Initialize Pjax (using _pjax to silence unused variable warning - Pjax works by side effects)
new Pjax({
  elements: 'a[href]:not([target="_blank"])',
  selectors: ["title", "#main"],
  cacheBust: false,
  analytics: false,
  scrollRestoration: false,
});

// Sound Effects (Simulated)
const playKeystroke = () => {
  // Ideally, use Web Audio API here.
  // For now, we keep it silent as requested resources are limited.
};

document.addEventListener("click", (e) => {
  if ((e.target as HTMLElement).tagName === "A" || (e.target as HTMLElement).tagName === "BUTTON") {
    playKeystroke();
  }
});

// Pjax events
document.addEventListener("pjax:send", () => {
  const main = document.getElementById("main");
  if (main) {
    main.classList.add("loading");
  }
});

document.addEventListener("pjax:complete", () => {
  const main = document.getElementById("main");
  if (main) {
    main.classList.remove("loading");

    // Re-initialize Alpine.js
    // @ts-ignore
    Alpine.initTree(main);

    // Re-initialize Lozad
    observer.observe();

    // Scroll to top with "smooth" behavior (Terminal style jump)
    window.scrollTo(0, 0);
  }
});

document.addEventListener("pjax:error", () => {
  console.error("Pjax error");
});
