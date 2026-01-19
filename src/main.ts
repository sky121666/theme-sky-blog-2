import "./styles/tailwind.css";
import "./styles/main.css";
import Alpine from "alpinejs";
import Pjax from "pjax";
import NProgress from "nprogress";
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
  cd <path>     - Navigate to a path
                  Examples:
                    cd categories     - Go to categories
                    cd categories/ai  - Go to AI category
                    cd tags           - Go to tags
                    cd tags/tech      - Go to tech tag
                    cd ..             - Go back
                    cd /              - Go to home
  
  ls            - List directory contents (try 'ls categories' or 'ls tags')
  
  search <key>  - Search posts by keyword (e.g. 'search halo')
  
  help          - Show this help message
  
  clear         - Clear command output
  
Navigation shortcuts:
  ↑/↓           - Browse command history
  Tab           - Auto-complete path
  Enter         - Execute command
  Esc           - Clear input
`.trim(),
  output: "",

  init() {
    // Determine current path from URL
    const updatePath = () => {
      const path = window.location.pathname;
      if (path === "/" || path === "") {
        this.currentPath = "~/blog";
      } else if (path === "/categories") {
        this.currentPath = "~/blog/categories";
      } else if (path === "/tags") {
        this.currentPath = "~/blog/tags";
      } else if (path.startsWith("/categories/")) {
        const category = path.replace("/categories/", "");
        this.currentPath = `~/blog/categories/${category}`;
      } else if (path.startsWith("/tags/")) {
        const tag = path.replace("/tags/", "");
        this.currentPath = `~/blog/tags/${tag}`;
      } else if (path.startsWith("/archives/")) {
        const post = path.replace("/archives/", "");
        this.currentPath = `~/blog/posts/${post}`;
      } else {
        this.currentPath = `~/blog${path}`;
      }
    };

    updatePath();

    // Re-calculate on Pjax complete
    document.addEventListener("pjax:complete", () => {
      updatePath();
    });

    // Focus input on page load
    this.$nextTick(() => {
      const input = this.$refs.cmdInput as HTMLInputElement;
      if (input) input.focus();
    });
  },

  handleKeydown(e: KeyboardEvent) {
    if (e.isComposing) return; // Ignore IME composition events

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

  autoComplete() {
    const cmd = this.command.trim().toLowerCase();
    const completions = [
      "cd categories",
      "cd tags",
      "cd ..",
      "cd /",
      "ls",
      "help",
      "clear",
      "search "
    ];

    // Find matching completion
    const match = completions.find(c => c.startsWith(cmd) && c !== cmd);
    if (match) {
      this.command = match;
    }
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

    // Simulate slight delay for realism
    await new Promise(resolve => setTimeout(resolve, 100)); // 100ms

    try {
      if (args.includes("categories") || this.currentPath.includes("categories")) {
        const items = window.haloData?.categories || [];

        if (items.length === 0) {
          this.output = "No categories found.";
          return;
        }

        const lines = items.map((c: any) => {
          const count = c.postCount || c.status?.postCount || 0;
          const name = c.spec?.displayName || c.metadata?.name || "Unknown";
          return `drwxr-xr-x  ${String(count).padStart(3)} posts  ${name}/`;
        });
        this.output = `Total ${items.length}\n` + lines.join("\n");
        return;
      }

      if (args.includes("tags") || this.currentPath.includes("tags")) {
        const items = window.haloData?.tags || [];

        if (items.length === 0) {
          this.output = "No tags found.";
          return;
        }

        const lines = items.map((t: any) => {
          const count = t.postCount || t.status?.postCount || 0;
          const name = t.spec?.displayName || t.metadata?.name || "Unknown";
          return `drwxr-xr-x  ${String(count).padStart(3)} posts  #${name}/`;
        });
        this.output = `Total ${items.length}\n` + lines.join("\n");
        return;
      }

      // Default root listing
      this.output = `
drwxr-xr-x  root  root  categories/
drwxr-xr-x  root  root  tags/
-rw-r--r--  root  root  README.md
`.trim();
    } catch (e) {
      console.error(e);
      this.output = "Error reading data.";
    }
  },

  handleCd(path: string) {
    if (!path || path === ".") {
      this.output = ""; // Stay on current page
      return;
    }

    const normalizedPath = path.toLowerCase().trim();

    // Handle different paths
    if (normalizedPath === "..") {
      // Go back
      window.history.back();
    } else if (normalizedPath === "/" || normalizedPath === "~" || normalizedPath === "~/blog") {
      // Go to home
      window.location.href = "/";
    } else if (normalizedPath === "categories" || normalizedPath === "./categories") {
      window.location.href = "/categories";
    } else if (normalizedPath === "tags" || normalizedPath === "./tags") {
      window.location.href = "/tags";
    } else if (normalizedPath.startsWith("categories/")) {
      const category = normalizedPath.replace("categories/", "");
      window.location.href = `/categories/${category}`;
    } else if (normalizedPath.startsWith("tags/")) {
      const tag = normalizedPath.replace("tags/", "");
      window.location.href = `/tags/${tag}`;
    } else if (normalizedPath.startsWith("posts/") || normalizedPath.startsWith("./posts/")) {
      const post = normalizedPath.replace(/\.?\/?(posts\/)?/, "");
      window.location.href = `/archives/${post}`;
    } else {
      this.output = `bash: cd: ${path}: No such file or directory`;
    }
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

// Initialize NProgress
NProgress.configure({ showSpinner: false, minimum: 0.1 });

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
  NProgress.start();
  const main = document.getElementById("main");
  if (main) {
    main.classList.add("loading");
  }
});

document.addEventListener("pjax:complete", () => {
  NProgress.done();
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
  NProgress.done();
  console.error("Pjax error");
});
