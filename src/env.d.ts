/// <reference types="vite/client" />

/**
 * Basic TypeScript declarations for Vue Single File Components (*.vue), markdown imports (*.md),
 * and a minimal declaration for the @nuxt/ui package so it can be imported in a plain Vue 3 + Vite
 * project (as done in this repository).
 *
 * This file provides permissive `any`-based declarations for convenience during development,
 * and avoids TypeScript complaining about the usage of components / modules that are Nuxt-native.
 *
 * If your project later adds stricter type information (e.g., official types for @nuxt/ui or
 * custom component declarations), replace these `any`-based entries with more accurate types.
 */

import type { DefineComponent } from "vue";

/* Vue SFCs */
declare module "*.vue" {
  const component: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    any
  >;
  export default component;
}

/* Markdown files imported as Vue components (if you use an md plugin) */
declare module "*.md" {
  const component: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    any
  >;
  export default component;
}

/* Static assets commonly imported in Vite */
declare module "*.svg" {
  import type { DefineComponent } from "vue";
  const svgComponent: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    any
  >;
  export default svgComponent;
}
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.webp";
declare module "*.avif";
declare module "*.gif";

/* Minimal @nuxt/ui module definition:
 * - The official library is designed for Nuxt (server-side injection and module-based setup),
 *   so a plain Vue 3 + Vite environment won't get full typing out-of-the-box.
 * - To keep development friction low, we declare a permissive `any` shape for the main package
 *   and common named exports (UButton, UInput, UCard, UFormField, etc).
 * - Replace these with proper types if you add `@nuxt/ui` typings or move to Nuxt 3.
 */
declare module "@nuxt/ui" {
  // Default export might be a plugin on Nuxt, or a set of helpers. We keep a flexible `any`.
  const NuxtUI: any;
  export default NuxtUI;

  // Typical named exports used in components — keep them permissive
  export const UButton: any;
  export const UInput: any;
  export const UFormField: any;
  export const UPageCard: any;
  export const UCard: any;
  export const UHeader: any;
  export const UFooter: any;
  export const UMain: any;
  export const UApp: any;
  export const useNuxtUI: any;
  export const useTheme: any;
}

/* Named import paths that may exist (helpful for some direct imports in code) */
declare module "@nuxt/ui/components/*" {
  const component: any;
  export default component;
}

/* Some packages that might be imported implicitly by @nuxt/ui or Nuxt:
 * - This reduces TS errors when we attempt to import them directly during development.
 */
declare module "@nuxt/icon" {
  const NuxtIcon: any;
  export default NuxtIcon;
}
declare module "@nuxt/icon/components/*" {
  const component: any;
  export default component;
}

/* Allow wildcard virtual modules (common in plugin ecosystems) */
declare module "virtual:*" {
  const anything: any;
  export default anything;
}

/* Global window augmentations (helpful if you rely on Nuxt or SSR markers) */
declare global {
  interface Window {
    __NUXT__?: any;
    __DEVTOOLS__: any;
  }

  // Allow arbitrary package JSON fields from import.meta.env if needed
  // (Vite exposes types via `vite/client`, but this is a helpful fallback)
  interface ImportMetaEnv {
    readonly VITE_API_URL?: string;
    readonly VITE_APP_TITLE?: string;
    readonly VITE_APP_DESCRIPTION?: string;
    // Add custom env keys as needed
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
