import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { existsSync } from "fs";

const outDir = existsSync("../Cargo.toml") ? "../web/" : "build/";

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir,
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
