import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import { readFileSync } from "node:fs";
import path from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const figletFonts = JSON.parse(readFileSync(new URL("./figlet-fonts.json", import.meta.url), "utf8")) as string[];

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "src/images/*",
          dest: "images",
          rename: { stripBase: true },
        },
        ...figletFonts.map((font) => ({
          src: `node_modules/figlet/fonts/${font}.flf`,
          dest: "fonts",
          rename: { stripBase: true },
        })),
      ],
    }),
  ],
  build: {
    outDir: fileURLToPath(new URL("./templates/assets", import.meta.url)),
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "main",
      fileName: "main",
      formats: ["iife"],
    },
  },
});
