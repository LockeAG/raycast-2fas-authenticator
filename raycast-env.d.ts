/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `search-otp` command */
  export type SearchOtp = ExtensionPreferences & {}
  /** Preferences accessible in the `recent-otp` command */
  export type RecentOtp = ExtensionPreferences & {}
  /** Preferences accessible in the `import-vault` command */
  export type ImportVault = ExtensionPreferences & {}
  /** Preferences accessible in the `setup` command */
  export type Setup = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `search-otp` command */
  export type SearchOtp = {}
  /** Arguments passed to the `recent-otp` command */
  export type RecentOtp = {}
  /** Arguments passed to the `import-vault` command */
  export type ImportVault = {}
  /** Arguments passed to the `setup` command */
  export type Setup = {}
}

