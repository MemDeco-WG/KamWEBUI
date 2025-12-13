import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
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
    rollupOptions: {},
  },
});
