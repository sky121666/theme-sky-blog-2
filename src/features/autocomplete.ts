import { getDirectoryContent, resolvePath } from "../common/virtual-fs";

// ── Auto-complete engine ───────────────────────────────────────────

const LIST_COMMANDS = ["cd", "ls", "ll", "pd", "pu", "npage", "ppage", "back", "help", "clear", "search"];
const POST_COMMANDS = ["cd", "next", "prev", "back", "help", "clear"];
const NO_ARG_COMMANDS = new Set([
  "help", "clear", "back", "next", "prev", "pd", "pu", "npage", "ppage", "ls", "ll",
]);
const PATH_COMMANDS = new Set(["cd", "ls", "ll"]);

export function getSuggestions(
  input: string,
  currentPath: string,
  isPost: boolean,
): string[] {
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

  const lookupPath = directoryPart
    ? resolvePath(directoryPart, currentPath)
    : currentPath;

  const dirContent = getDirectoryContent(lookupPath);
  if (!dirContent) {
    return [];
  }

  const candidates: string[] = [];

  dirContent.forEach((item) => {
    if (!item.name.toLowerCase().startsWith(filePartLower)) {
      return;
    }
    const suffix = item.type === "dir" ? "/" : "";
    candidates.push(`${command} ${directoryPart}${item.name}${suffix}`);
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
