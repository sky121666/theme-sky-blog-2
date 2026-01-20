import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import path from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "src/images/*",
          dest: "images",
        },
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
