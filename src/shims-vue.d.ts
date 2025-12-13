/// <reference types="vite/client" />

/**
 * shims-vue.d.ts
 * Minimal shims to help TypeScript/tsserver recognize Vue SFC imports (*.vue),
 * and to provide a permissive fallback for `vue-i18n` when language server/type
 * resolution is not picking up package-provided types.
 *
 * If your tooling or language server (e.g., tsserver/VSCode) still reports `Cannot
 * find module '*.vue'` or `Cannot find module 'vue-i18n'`, this file helps ensure
 * quick feedback and avoids blocking the TypeScript checks in the editor.
 *
 * NOTE: This file is intentionally permissive (uses `any`) to reduce friction.
 * Replace with more precise types if you want stricter type safety.
 */

import type { DefineComponent } from "vue";

/* Vue Single File Components (SFC) */
declare module "*.vue" {
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>;
  export default component;
}

/* Markdown files imported as Vue components (if using md imports) */
declare module "*.md" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>;
  export default component;
}

/* Common static asset imports */
declare module "*.svg" {
  import type { DefineComponent } from "vue";
  const svgComponent: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>;
  export default svgComponent;
}
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.webp";
declare module "*.avif";
declare module "*.gif";

/* A permissive shim for `vue-i18n` to avoid editor/type-resolution issues.
 * If `vue-i18n` includes its own types in node_modules, those will generally
 * take precedence during normal builds. This shim primarily helps the editor
 * (tsserver) if it struggles to locate or load the package's types.
 */
declare module "vue-i18n" {
  // runtime APIs used in this repo
  export function createI18n(options?: any): any;
  export function useI18n(...args: any[]): any;
  export function markRaw<T>(value: T): T;

  // Expose a permissive default for import default syntax
  const _default: any;
  export default _default;
}

/* Allow virtual modules, if any Vite or plugin virtual imports are used */
declare module "virtual:*" {
  const anything: any;
  export default anything;
}

/* Keep this file as a module, avoiding global augmentation pitfalls */
export {}
