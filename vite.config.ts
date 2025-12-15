import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

/**
 * Compute a safe `base` for the build output so assets are referenced
 * correctly when deployed to GitHub Pages (repo sites are served from
 * https://<user>.github.io/<repo>/). CI/GitHub Actions exposes
 * GITHUB_REPOSITORY which we can use to infer the repo name automatically.
 *
 * You can override this value locally with `VITE_BASE` env var if needed.
 */
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const autoBase = repoName ? `/${repoName}/` : "/";
const base = process.env.VITE_BASE || autoBase;

export default defineConfig({
  // Base (computed above). Ensures built assets and service worker (if used)
  // are referenced relative to the repository path on GitHub Pages.
  base,
  plugins: [vue()],
  resolve: {
    alias: {
      // Short import to the src directory
      "@": resolve(__dirname, "src"),
      // Common Nuxt style aliases (optional / helpful in case components or imports use them)
      "~": resolve(__dirname, "src"),
      "~~": resolve(__dirname),
      "@@": resolve(__dirname),
    },
  },
  server: {
    // sensible default for local dev; open the browser automatically
    port: 5173,
    open: true,
  },
  optimizeDeps: {
    // Only pre-bundle lightweight dependencies for dev.
    // Exclude heavy native libraries/useful-but-problematic Nuxt UI deps that break Vite pre-bundling.
    include: ["@vueuse/core", "vue"],
    exclude: [
      "@nuxt/ui",
      "@nuxt/icon",
      "@tailwindcss/oxide",
      "@tailwindcss/oxide-linux-x64-gnu",
      "@tailwindcss/oxide-linux-x64-musl",
      "lightningcss",
      "lightningcss/node",
    ],
  },
  build: {
    // modern browsers, keep source maps for easier debugging
    target: "es2022",
    sourcemap: true,
    // Vite uses Rollup under the hood; tweak this if needed for large builds
    // Externalize native and binary-heavy packages to avoid platform-specific
    // native bindings being resolved/required at build time. This keeps these
    // modules external and prevents bundlers from trying to locate native
    // binaries that may not be available in all environments (e.g., CI).
    rollupOptions: {
      external: [
        "@tailwindcss/oxide",
        "@tailwindcss/oxide-linux-x64-gnu",
        "@tailwindcss/oxide-linux-x64-musl",
        "lightningcss",
        "lightningcss/node",
        "lightningcss/pkg",
      ],
    },
  },
});
