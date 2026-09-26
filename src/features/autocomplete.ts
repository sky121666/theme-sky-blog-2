import { getCurrentIndexPageContent, getDirectoryContent, resolvePath } from "../common/virtual-fs";

// ── Auto-complete engine ───────────────────────────────────────────

const LIST_COMMANDS = [
  "cd",
  "ls",
  "ll",
  "pd",
  "pu",
  "npage",
  "ppage",
  "back",
  "help",
  "clear",
  "top",
  "bottom",
  "search",
];
const POST_COMMANDS = ["cd", "next", "prev", "back", "toc", "jump", "top", "bottom", "copy", "help", "clear", "search"];
const NO_ARG_COMMANDS = new Set([
  "help",
  "clear",
  "back",
  "next",
  "prev",
  "pd",
  "pu",
  "npage",
  "ppage",
  "ls",
  "ll",
  "top",
  "bottom",
  "toc",
  "copy",
]);
const PATH_COMMANDS = new Set(["cd", "ls", "ll"]);

export function getSuggestions(input: string, currentPath: string, isPost: boolean): string[] {
  const inputLower = input.toLowerCase();

  // Phase 1: complete command name
  if (!input.includes(" ")) {
    const commands = isPost ? POST_COMMANDS : LIST_COMMANDS;
    return commands
      .filter((cmd) => cmd.startsWith(inputLower))
      .map((cmd) => (NO_ARG_COMMANDS.has(cmd) ? cmd : `${cmd} `));
  }

  // Phase 2: complete path argument
  const firstSpace = input.indexOf(" ");
  const command = input.slice(0, firstSpace).toLowerCase();
  const rawArgument = input.slice(firstSpace + 1);

  if (!PATH_COMMANDS.has(command)) {
    return [];
  }

  const lastSlash = rawArgument.lastIndexOf("/");
  const directoryPart = lastSlash >= 0 ? rawArgument.slice(0, lastSlash + 1) : "";
  const filePart = lastSlash >= 0 ? rawArgument.slice(lastSlash + 1) : rawArgument;
  const filePartLower = filePart.toLowerCase();

  const lookupPath = directoryPart ? resolvePath(directoryPart, currentPath) : currentPath;

  const directoryContent = getDirectoryContent(lookupPath);
  if (!directoryContent) {
    return [];
  }

  // An implicit root path refers to the rendered index page. Keep built-in
  // directory completion available, but suggest this page's posts instead of
  // unrelated entries from the recent-post cache.
  const currentIndexRoot = !directoryPart && lookupPath === "~/blog" && window.haloData?.pageType === "index";
  const dirContent = currentIndexRoot
    ? [
        ...directoryContent.filter((item) => item.type === "dir"),
        ...getCurrentIndexPageContent().filter((item) => item.type === "file"),
      ]
    : directoryContent;

  const candidates: string[] = [];

  dirContent.forEach((item) => {
    const pathSegment = item.slug || item.name;
    if (!pathSegment.toLowerCase().startsWith(filePartLower)) {
      return;
    }
    const suffix = item.type === "dir" ? "/" : "";
    candidates.push(`${command} ${directoryPart}${pathSegment}${suffix}`);
  });

  // Special completions
  if (!directoryPart && "..".startsWith(filePartLower)) {
    candidates.push(`${command} ../`);
  }
  if (!directoryPart && "~".startsWith(filePartLower)) {
    candidates.push(`${command} ~/`);
  }

  return candidates;
}
