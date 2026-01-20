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
    haloData?: {
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
      pagination?: {
        hasPrev: boolean;
        hasNext: boolean;
        prevUrl: string | null;
        nextUrl: string | null;
      };
      nextPost?: string | null;
      prevPost?: string | null;
      currentPost?: {
        title: string | null;
        slug: string | null;
        permalink: string | null;
      };
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

  // Dynamic help text based on page type
  get helpText(): string {
    if (this.isPostPage()) {
      return `
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
    }
    return `
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
  },

  isPostPage(): boolean {
    const currentPost = window.haloData?.currentPost;
    if (!currentPost || !currentPost.permalink) return false;

    const pathname = window.location.pathname;
    const postPermalink = currentPost.permalink;

    // Handle both full URLs and relative paths
    try {
      const postUrl = new URL(postPermalink, window.location.origin);
      return pathname === postUrl.pathname;
    } catch {
      // Fallback: direct comparison
      return pathname === postPermalink || pathname === '/' + postPermalink;
    }
  },

  output: "",

  init() {
    console.log("[VFS] Terminal context awareness initialization");

    // Initial sync
    this.syncPathWithUrl();

    // Listen for Pjax navigation updates to keep terminal path in sync
    document.addEventListener("pjax:complete", () => {
      console.log("[VFS] Pjax complete, syncing path...");
      this.syncPathWithUrl();
    });

    // Listen for History navigation (Back/Forward buttons, history.back())
    window.addEventListener("popstate", () => {
      console.log("[VFS] Popstate detected, syncing path...");
      // Small delay to ensure URL is updated? Usually immediate.
      this.syncPathWithUrl();
    });

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
      // Blur the input to enable keyboard scrolling
      (this.$refs.cmdInput as HTMLInputElement)?.blur();
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

    // 1. Top-level commands - filtered by page type
    if (!input.includes(" ")) {
      const isPost = this.isPostPage();
      const postCommands = ["cd", "next", "prev", "back", "help", "clear"];
      const listCommands = ["cd", "ls", "ll", "pd", "pu", "npage", "ppage", "back", "help", "clear"];
      const commands = isPost ? postCommands : listCommands;
      const noArgCommands = ["help", "clear", "back", "next", "prev", "pd", "pu", "npage", "ppage", "ls", "ll"];
      return commands
        .filter(c => c.startsWith(inputLower))
        .map(c => c + (noArgCommands.includes(c) ? "" : " "));
    }

    // 2. Argument completion
    // Simple split by space - assumes no spaces in paths for now
    const firstSpace = input.indexOf(" ");
    const cmd = input.substring(0, firstSpace).toLowerCase();
    const arg = input.substring(firstSpace + 1); // Keep original case for path matching logic
    const argLower = arg.toLowerCase();

    if (cmd === "cd" || cmd === "ls" || cmd === "ll") {
      const candidates: string[] = [];

      // Determine directory to search in and the partial filename to match
      let dirPart = "";
      let filePart = arg;
      let filePartLower = argLower;

      const lastSlash = arg.lastIndexOf('/');
      if (lastSlash !== -1) {
        dirPart = arg.substring(0, lastSlash + 1);
        filePart = arg.substring(lastSlash + 1);
        filePartLower = filePart.toLowerCase();
      }

      // Resolve the target directory relative to current path
      // If dirPart is empty, we are looking in current directory (".")
      const targetDir = this.resolvePath(dirPart || ".");
      const content = this.getDirectoryContent(targetDir);

      if (content) {
        content.forEach((item: any) => {
          // Case-insensitive match on start
          if (item.name.toLowerCase().startsWith(filePartLower)) {
            const suffix = item.type === 'dir' ? '/' : '';
            candidates.push(`${cmd} ${dirPart}${item.name}${suffix}`);
          }
        });
      }

      // Special handling for ".." if at start and no dirPart
      if (!dirPart && "..".startsWith(filePartLower)) {
        candidates.push(`${cmd} ../`);
      }

      // Special handling for "~" if at start
      if (!dirPart && "~".startsWith(filePartLower)) {
        candidates.push(`${cmd} ~/`);
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
      case "back":
        window.history.back();
        break;
      case "next":
        this.handleNext();
        break;
      case "prev":
        this.handlePrev();
        break;
      case "search":
        if (args) {
          window.location.href = `/search?keyword=${encodeURIComponent(args)}`;
        } else {
          this.output = "Usage: search <keyword>";
        }
        break;
      case "pd":
      case "npage":
        this.handlePage(true);
        break;
      case "pu":
      case "ppage":
        this.handlePage(false);
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

    // Handle cd .. - go back
    if (path === ".." || path === "../") {
      window.history.back();
      return;
    }

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
      // Match by name (display name) or slug
      const file = parentContent.find((f: any) =>
        (f.name === fileName || f.slug === fileName) && f.type === 'file'
      );
      if (file && file.permalink) {
        console.log("[VFS] handleCd file found, navigating to:", file.permalink);
        window.location.href = file.permalink;
        return;
      }
      // Also check for directory match by name or slug
      const dir = parentContent.find((f: any) =>
        (f.name === fileName || f.slug === fileName) && f.type === 'dir'
      );
      if (dir && dir.permalink) {
        console.log("[VFS] handleCd dir found, navigating to:", dir.permalink);
        window.location.href = dir.permalink;
        return;
      }
    }

    console.log("[VFS] handleCd failed - no such file or directory");
    this.output = `bash: cd: ${path}: No such file or directory`;
  },

  handleNext() {
    const nextPost = window.haloData?.nextPost;
    if (nextPost) {
      window.location.href = nextPost;
    } else {
      this.output = "No next article available.";
    }
  },

  handlePrev() {
    const prevPost = window.haloData?.prevPost;
    if (prevPost) {
      window.location.href = prevPost;
    } else {
      this.output = "No previous article available.";
    }
  },

  handlePage(next: boolean) {
    const pagination = window.haloData?.pagination;
    if (!pagination) {
      this.output = "Pagination not available on this page.";
      return;
    }
    const targetUrl = next ? pagination.nextUrl : pagination.prevUrl;
    if (targetUrl) {
      window.location.href = targetUrl;
    } else {
      this.output = next ? "Already at the last page." : "Already at the first page.";
    }
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

  syncPathWithUrl() {
    const pathname = window.location.pathname;
    const haloUrls = window.haloData?.urls;

    if (!haloUrls) return;

    // Check for Categories List Page (exact match)
    if (haloUrls.categories && pathname === haloUrls.categories) {
      this.currentPath = "~/blog/categories";
      return;
    }

    // Check for Tags List Page (exact match)
    if (haloUrls.tags && pathname === haloUrls.tags) {
      this.currentPath = "~/blog/tags";
      return;
    }

    // Check for Specific Category (subdirectory)
    if (haloUrls.categories && pathname.startsWith(haloUrls.categories + "/")) {
      const slug = pathname.substring(haloUrls.categories.length + 1);
      this.currentPath = "~/blog/categories/" + slug;
      return;
    }

    // Check for Specific Tag (subdirectory)
    if (haloUrls.tags && pathname.startsWith(haloUrls.tags + "/")) {
      const slug = pathname.substring(haloUrls.tags.length + 1);
      this.currentPath = "~/blog/tags/" + slug;
      return;
    }

    // Check for Post Page (using injected currentPost data)
    const currentPost = window.haloData?.currentPost;
    if (currentPost && currentPost.permalink && pathname === currentPost.permalink) {
      // Display the post title in the path
      this.currentPath = "~/blog/posts/" + (currentPost.title || currentPost.slug);
      return;
    }

    // Check for Home Page
    if (pathname === haloUrls.home || pathname === "/") {
      this.currentPath = "~/blog";
      return;
    }
    this.currentPath = "~/blog";
  },

  getDirectoryContent(path: string): any[] | null {
    console.log("[VFS] getDirectoryContent called with:", path);
    // 1. Root
    if (path === "~/blog") {
      return [
        { name: "categories", type: "dir", count: (window.haloData?.categories || []).length },
        { name: "tags", type: "dir", count: (window.haloData?.tags || []).length }
      ];
    }

    // 2. Categories Root
    if (path === "~/blog/categories") {
      const cats = window.haloData?.categories || [];
      return cats.map((cat: any) => ({
        name: cat.spec?.displayName || cat.spec?.slug || cat.metadata?.name,
        slug: cat.spec?.slug || cat.metadata?.name,
        type: "dir",
        count: 0,
        permalink: cat.status?.permalink,
        date: cat.metadata?.creationTimestamp
      }));
    }

    // 3. Tags Root
    if (path === "~/blog/tags") {
      const tags = window.haloData?.tags || [];
      return tags.map((tag: any) => ({
        name: tag.spec?.displayName || tag.spec?.slug || tag.metadata?.name,
        slug: tag.spec?.slug || tag.metadata?.name,
        type: "dir",
        count: 0,
        permalink: tag.status?.permalink,
        date: tag.metadata?.creationTimestamp
      }));
    }

    // 4. Specific Category Subdirectory
    if (path.startsWith("~/blog/categories/")) {
      const slug = path.substring("~/blog/categories/".length);
      const pathname = window.location.pathname;
      const targetUrl = this.virtualPathToUrl(path);

      // Only show posts if we are actually on that page (data is in haloData.currentPosts)
      if (pathname === targetUrl && (window.haloData?.currentPosts || []).length > 0) {
        return (window.haloData?.currentPosts || []).map((p: any) => ({
          name: p.spec?.title || p.spec?.slug || p.metadata?.name,
          slug: p.spec?.slug || p.metadata?.name,
          type: "file",
          permalink: p.status?.permalink,
          date: p.spec?.publishTime || p.metadata?.creationTimestamp
        }));
      }

      const cats = window.haloData?.categories || [];
      const cat = cats.find((c: any) => (c.spec?.slug || c.metadata?.name) === slug);
      if (cat) {
        return [];
      }
    }

    // 5. Specific Tag Subdirectory
    if (path.startsWith("~/blog/tags/")) {
      const slug = path.substring("~/blog/tags/".length);
      const pathname = window.location.pathname;
      const targetUrl = this.virtualPathToUrl(path);

      if (pathname === targetUrl && (window.haloData?.currentPosts || []).length > 0) {
        return (window.haloData?.currentPosts || []).map((p: any) => ({
          name: p.spec?.title || p.spec?.slug || p.metadata?.name,
          slug: p.spec?.slug || p.metadata?.name,
          type: "file",
          permalink: p.status?.permalink,
          date: p.spec?.publishTime || p.metadata?.creationTimestamp
        }));
      }

      const tags = window.haloData?.tags || [];
      const tag = tags.find((t: any) => (t.spec?.slug || t.metadata?.name) === slug);
      if (tag) {
        return [];
      }
    }

    console.log("[VFS] getDirectoryContent - path not supported");
    return null;
  },

  virtualPathToUrl(path: string): string | null {
    console.log("[VFS] virtualPathToUrl called with:", path);

    if (path === "~/blog") return window.haloData?.urls?.home || "/";

    if (path === "~/blog/categories") {
      return window.haloData?.urls?.categories || "/categories";
    }

    if (path.startsWith("~/blog/categories/")) {
      const slug = path.substring("~/blog/categories/".length);
      const cats = window.haloData?.categories || [];
      const cat = cats.find((c: any) => (c.spec?.slug || c.metadata?.name) === slug);
      if (cat && cat.status?.permalink) return cat.status.permalink;
    }

    if (path === "~/blog/tags") {
      return window.haloData?.urls?.tags || "/tags";
    }

    if (path.startsWith("~/blog/tags/")) {
      const slug = path.substring("~/blog/tags/".length);
      const tags = window.haloData?.tags || [];
      const tag = tags.find((t: any) => (t.spec?.slug || t.metadata?.name) === slug);
      if (tag && tag.status?.permalink) return tag.status.permalink;
    }

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
    // Deselect list when input is focused
    window.addEventListener('focusin', this.handleFocusIn.bind(this));
  },
  destroy() {
    window.removeEventListener('keydown', this.handleKeydown.bind(this));
    window.removeEventListener('focusin', this.handleFocusIn.bind(this));
  },
  handleFocusIn(e: FocusEvent) {
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      this.selectedIndex = -1;
    }
  },
  handleKeydown(e: KeyboardEvent) {
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

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
          // Special handling for categories/tags folders to ensure dynamic routing
          const catLink = item.querySelector("#link-categories") as HTMLAnchorElement;
          if (catLink) {
            const url = window.haloData?.urls?.categories;
            if (url) {
              window.location.href = url;
              return;
            }
          }

          const tagLink = item.querySelector("#link-tags") as HTMLAnchorElement;
          if (tagLink) {
            const url = window.haloData?.urls?.tags;
            if (url) {
              window.location.href = url;
              return;
            }
          }

          // Fallback: It's a file list item, find the link inside
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

// Post Viewer Component for keyboard scrolling
Alpine.data("postViewer", () => ({
  scrollAmount: 100, // pixels per keypress

  init() {
    console.log("[PostViewer] Initialized");
  },

  handleKeydown(e: KeyboardEvent) {
    console.log("[PostViewer] Key pressed:", e.key, "Target:", (e.target as HTMLElement).tagName);

    // Skip if focus is in an input element
    if ((e.target as HTMLElement).tagName === 'INPUT' ||
      (e.target as HTMLElement).tagName === 'TEXTAREA') {
      console.log("[PostViewer] Skipping - focus in input");
      return;
    }

    const main = document.getElementById('main');
    if (!main) return;

    switch (e.key) {
      case 'ArrowUp':
      case 'k': // Vim-style
        e.preventDefault();
        console.log("[PostViewer] Scrolling up");
        main.scrollBy({ top: -this.scrollAmount, behavior: 'smooth' });
        break;
      case 'ArrowDown':
      case 'j': // Vim-style
        e.preventDefault();
        console.log("[PostViewer] Scrolling down");
        main.scrollBy({ top: this.scrollAmount, behavior: 'smooth' });
        break;
      case 'PageUp':
        e.preventDefault();
        console.log("[PostViewer] Page up");
        main.scrollBy({ top: -main.clientHeight * 0.8, behavior: 'smooth' });
        break;
      case 'PageDown':
      case ' ': // Spacebar
        e.preventDefault();
        console.log("[PostViewer] Page down");
        main.scrollBy({ top: main.clientHeight * 0.8, behavior: 'smooth' });
        break;
      case 'Home':
        e.preventDefault();
        console.log("[PostViewer] Scroll to top");
        main.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'End':
        e.preventDefault();
        console.log("[PostViewer] Scroll to bottom");
        main.scrollTo({ top: main.scrollHeight, behavior: 'smooth' });
        break;
      default:
        console.log("[PostViewer] Unhandled key:", e.key);
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

// Task List Checkbox Interaction
function initTaskListInteraction() {
  document.querySelectorAll('ul[data-type="taskList"] li[data-type="taskItem"]').forEach((item) => {
    const label = item.querySelector('label');
    if (label) {
      label.addEventListener('click', (e) => {
        e.preventDefault();
        const li = label.closest('li[data-type="taskItem"]');
        if (li) {
          const isChecked = li.getAttribute('data-checked') === 'true';
          li.setAttribute('data-checked', isChecked ? 'false' : 'true');
          // Also update the hidden checkbox
          const checkbox = li.querySelector('input[type="checkbox"]') as HTMLInputElement;
          if (checkbox) {
            checkbox.checked = !isChecked;
          }
        }
      });
    }
  });
}

// Initialize on page load
initTaskListInteraction();

// Re-initialize on Pjax navigation
document.addEventListener("pjax:complete", () => {
  initTaskListInteraction();
});
