# Kam Web UI — Vue 3 + Nuxt UI (Vite + Bun)

This repository contains a documentation UI (a wiki) for the `kam` CLI:
kam — a CLI toolkit for scaffolding, building, and distributing Android modules and templates.

This project is built with Vue 3 + Vite for fast local development and bundling. It optionally uses Nuxt UI (`@nuxt/ui`) components for consistent, themeable UI primitives, while still working without the library if it’s not installed.

Key highlights:
- Built with Vue 3 and Vite for fast dev / build cycles.
- Optional `@nuxt/ui` integration: the UI will gracefully fall back to the local component & CSS if `@nuxt/ui` is not available.
- File-based UI: `src/pages` contains the primary documentation pages and `src/data/kam.ts` contains the command docs/data.
- Service worker: a lightweight service worker caches static assets (see `public/sw.js`).

Getting started

Using Bun (recommended):
1. Install dependencies
   - bun: `bun install`
2. Start the dev server
   - `bun run dev`
3. Build & preview
   - `bun run build` (build)
   - `bun run preview` (preview)

Using npm:
1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Build and preview:
   - `npm run build`
   - `npm run preview`

Project Layout (important files)
- `index.html` — Vite entry HTML
- `src/main.ts` — App bootstrap (mounts the Vue app and registers the router)
- `src/App.vue` — Base layout (header, sidebar, main content, theme toggle)
- `src/pages/Home.vue` — Home / command list page
- `src/pages/Command.vue` — Command detail page
- `src/data/kam.ts` — The canonical command/data source for the wiki pages (update here to add/change command docs)
- `src/assets/main.css` — Global styles and theme tokens
- `public/sw.js` — Service worker (offline caching / fallback)
- `vite.config.ts` — Vite configuration and dependency handling (see `optimizeDeps.exclude` if you have native module issues)

Notes on Nuxt UI
- `@nuxt/ui` is used optionally. If present at runtime the app will attempt to register Nuxt UI components (via a safe dynamic import). If not present, the app continues to use local CSS & components.
- Because `@nuxt/ui` supports a large dependency set (including native tooling), the Vite config excludes heavy native modules from dev pre-bundling to avoid errors (see `vite.config.ts -> optimizeDeps.exclude`).
- If you want to enable full Nuxt UI integration, install `@nuxt/ui` and reload.

How to contribute
- Command docs live in `src/data/kam.ts`:
  - Add or update entries in the `KAM_COMMANDS` list to add/update a command's summary, usage, description and examples.
- Add pages under `src/pages/` (Vue Router is used for routing).
- Add UI components under `src/components/`.
- Keep UI components small and focused; prefer re-usable components for shared patterns.
- If you want to incorporate `@nuxt/ui` components: install `@nuxt/ui` and ensure your environment can handle its optional deps (or use `vite.config.ts` to exclude heavy NPM dependencies when necessary).

Troubleshooting & FAQ
- Pre-bundling / native dependency errors:
  - If you encounter issues during `vite` pre-bundling for dev (e.g., tailwind oxide, lightningcss native packages), make sure your `vite.config.ts` includes an `optimizeDeps.exclude` list for heavy native modules. This project already excludes heavy packages by default.
- Offline & Service Worker:
  - A basic `public/sw.js` is included; feel free to enhance it with runtime caching strategies for production.
- Running with different package managers:
  - Bun and npm are both supported; `bun install` is faster but `npm install` also works.

If you'd like, I can:
- Add a Markdown page importer to display `.md` docs,
- Provide a script to export JSON/Markdown for the docs,
- Add a small admin UI to edit command entries (persisting to an on-device JSON file),
- Or adapt the UI to strictly use Nuxt 3 and `@nuxt/ui` if you prefer a full Nuxt 3 setup.

Happy hacking!
