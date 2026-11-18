import { getCurrentIndexPageContent, getDirectoryContent, resolvePath } from "../common/virtual-fs";
import { getCommandNameSuggestions, supportsPathCompletion } from "./commands";

// ── Auto-complete engine ───────────────────────────────────────────

export function getSuggestions(input: string, currentPath: string, isPost?: boolean): string[] {
  // Phase 1: complete command name
  if (!input.includes(" ")) {
    return getCommandNameSuggestions(input.toLowerCase(), isPost);
  }

  // Phase 2: complete path argument
  const firstSpace = input.indexOf(" ");
  const command = input.slice(0, firstSpace).toLowerCase();
  const rawArgument = input.slice(firstSpace + 1);

  if (!supportsPathCompletion(command)) {
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
