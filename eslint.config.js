import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import mochaPlugin from "eslint-plugin-mocha";

export default defineConfig([
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.mocha,
      },
    },
    plugins: {
      js,
      mocha: mochaPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...mochaPlugin.configs.flat.recommended.rules,

      // Optional overrides:
      "mocha/no-mocha-arrows": "off",
      "no-unused-vars": "warn",
    },
  },
]);
