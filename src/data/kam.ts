/**
 * Simple Kam CLI commands datastore
 *
 * This file holds the canonical set of `kam` commands and a small helper API
 * used by the frontend to render the command list, perform searches, and
 * fetch details for individual commands.
 *
 * The content is derived from the prompt (the list of commands and short
 * descriptions). If you want to expand each command's documentation (usage,
 * examples, flags, and subcommands), update the `commands` array below.
 */

export type KamFlag = {
  flag: string;
  description?: string;
};

export type KamCommand = {
  /**
   * The command name (e.g. 'build', 'init').
   */
  name: string;

  /**
   * One-line summary describing the command's purpose.
   */
  summary: string;

  /**
   * Optional long-form description with details, constraints or caveats.
   */
  description?: string;

  /**
   * Short usage string or common invocation (e.g. 'kam build [OPTIONS]').
   * This is intentionally minimal to avoid inventing details beyond the prompt.
   */
  usage?: string;

  /**
   * Flags/options that are commonly used for the command.
   */
  flags?: KamFlag[];

  /**
   * Example invocations for the command (not exhaustive).
   */
  examples?: string[];
};

/**
 * Global flags that apply to `kam` itself (not command-specific)
 */
export const KAM_GLOBAL_FLAGS: KamFlag[] = [
  { flag: "-h, --help", description: "Print help (see a summary with -h)" },
  { flag: "-V, --version", description: "Print version" },
];

/**
 * The authoritative list of supported `kam` commands and short docs.
 *
 * The project README and UI will pull documentation from here. This file
 * intentionally keeps the details conservative and derived from the prompt.
 */
export const KAM_COMMANDS: KamCommand[] = [
  {
    name: "init",
    summary:
      "Initialize a new Kam project from templates (supports meta and kernel templates)",
    usage: "kam init [-i|--interactive] [TEMPLATE] [OPTIONS]",
    description:
      "Create a new Kam module or project from predefined templates. Templates may include meta templates and kernel templates that bootstrap a module with opinionated configuration and layout.",
    flags: [
      {
        flag: "-i, --interactive",
        description: "Run the init interactively; ask for required values",
      },
    ],
    examples: ["kam init kernel/basic", "kam init meta/sample-template"],
  },

  {
    name: "build",
    summary: "Build and package a module into a deployable ZIP artifact",
    usage: "kam build [OPTIONS]",
    description:
      "Compiles and packages a module into a ZIP artifact suitable for distribution and deployment. The exact build process depends on the module configuration and included build scripts.",
  },

  {
    name: "version",
    summary: "Manage module versions and bump policies",
    usage: "kam version [bump|list|set|get] [OPTIONS]",
    description:
      "Tools for managing semantic versions and bumping policies for the module. Useful commands often include bumping a version, listing the history, or configuring automatic bump rules.",
  },

  {
    name: "cache",
    summary: "Manage local template and artifact cache",
    usage: "kam cache [clear|list|info] [OPTIONS]",
    description:
      "Controls the local cache used by Kam for templates and artifacts. You can clean up disk usage, examine cached items, or refresh cached templates/artifacts.",
  },

  {
    name: "tmpl",
    summary: "Manage templates: import, export, package, and list",
    usage: "kam tmpl [import|export|package|list] [OPTIONS]",
    description:
      "Template management utilities. This includes importing templates into your local cache, exporting or packaging templates as distributable artifacts, or listing available templates.",
  },

  {
    name: "validate",
    summary: "Validate `kam.toml` configuration and templates",
    usage: "kam validate [FILES] [OPTIONS]",
    description:
      "Checks your project configuration (kam.toml) and templates for syntax, required fields, and other consistency validations.",
  },

  {
    name: "completions",
    summary: "Generate shell completion scripts for common shells",
    usage: "kam completions [bash|zsh|fish|powershell]",
    description:
      "Generate shell completion scripts that help with tab-completion for `kam` commands on supported shells.",
  },

  {
    name: "secret",
    summary: "Secret keyring management (used by sign/verify tasks)",
    usage: "kam secret [add|list|remove|info] [OPTIONS]",
    description:
      "Manage secrets (keys) stored locally for signing and cryptographic operations. These keys are used by the `sign` and `verify` commands in signing and verification workflows.",
  },

  {
    name: "sign",
    summary: "Sign an artifact using a key from the keyring or a PEM file",
    usage: "kam sign [ARTIFACT] [OPTIONS]",
    description:
      "Creates a cryptographic signature for an artifact (e.g., the packaged ZIP) using a key from your secret keyring or a provided PEM/Key file.",
  },

  {
    name: "verify",
    summary: "Verify an artifact signature (.sig) or a sigstore bundle (DSSE)",
    usage: "kam verify [ARTIFACT] [SIGNATURE] [OPTIONS]",
    description:
      "Verify that an artifact’s signature is valid and matches a trusted identity or key. It supports .sig signatures and sigstore DSSE bundles.",
  },

  {
    name: "check",
    summary: "Check project JSON/YAML/Markdown files (lint/format/parse)",
    usage: "kam check [FILES] [OPTIONS]",
    description:
      "Static checking utilities for files in the project, including linting, formatting, and parsing validations. Helps catch errors early in CI or local development.",
  },

  {
    name: "export",
    summary:
      "Export `kam.toml` to `module.prop`, `module.json`, `repo.json`, `track.json`, `config.json`, `update.json`",
    usage: "kam export [OUTPUT-TARGET] [OPTIONS]",
    description:
      "Export module metadata defined in kam.toml to one of the supported artifact formats. Useful when producing artifacts for different distribution systems or tooling.",
  },

  {
    name: "toml",
    summary:
      "Inspect and edit `kam.toml` using dot-path keys (get/set/unset/list)",
    usage: "kam toml [get|set|unset|list] <dot-path> [VALUE]",
    description:
      "Utility to inspect and edit the kam.toml configuration file programmatically. Accepts dot-path keys to read or modify nested values.",
  },

  {
    name: "config",
    summary:
      "Manage per-project or global kam configuration (similar to git config)",
    usage: "kam config [get|set|unset] [--global|--local] <key> [value]",
    description:
      "Manage configuration values for Kam either per-project (local) or globally. Works similar to `git config` in semantics.",
  },

  {
    name: "help",
    summary: "Print this message or the help of the given subcommand(s)",
    usage: "kam help [COMMAND]",
    description:
      "Show help text for the general `kam` tool or for a specific subcommand. This is the canonical way to learn more about usage when working with the CLI.",
  },
];

/**
 * Helper: return all commands
 */
export function getAllCommands(): KamCommand[] {
  return [...KAM_COMMANDS];
}

/**
 * Helper: find command details by name (case-insensitive)
 */
export function getCommandByName(name: string): KamCommand | undefined {
  const key = (name || "").trim().toLowerCase();
  return KAM_COMMANDS.find((c) => c.name.toLowerCase() === key);
}

/**
 * Helper: search commands by name/summary/description (case-insensitive)
 */
export function searchCommands(query: string): KamCommand[] {
  const q = (query || "").trim().toLowerCase();
  if (!q) return getAllCommands();
  return KAM_COMMANDS.filter((c) => {
    return (
      c.name.toLowerCase().includes(q) ||
      c.summary.toLowerCase().includes(q) ||
      (c.description || "").toLowerCase().includes(q)
    );
  });
}

/**
 * Fallback helper to fetch command names (useful for suggestions)
 */
export function getCommandNames(): string[] {
  return KAM_COMMANDS.map((c) => c.name);
}

export default KAM_COMMANDS;
