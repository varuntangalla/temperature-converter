import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,  // Includes browser globals
        ...globals.node,     // Includes Node.js globals (require, process, module)
        ...globals.jest,     // Includes Jest globals like describe, test, expect
      },
    },
  },
  pluginJs.configs.recommended, // Include the recommended JS linting rules
];
