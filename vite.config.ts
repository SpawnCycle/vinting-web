import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type CommonServerOptions } from "vite";

import { existsSync } from "fs";

const outDir = existsSync("../Cargo.toml") ? "../web/" : undefined;
const backendUrl = existsSync("../Cargo.toml")
  ? "http://localhost:8000" // default rocket url (TODO: maybe change later?)
  : undefined;

const proxySettings =
  backendUrl &&
  ({
    "/api": backendUrl,
    "/image": backendUrl, // planned feature
  } as CommonServerOptions["proxy"]);

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir,
    emptyOutDir: true,
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: proxySettings,
  },
});
