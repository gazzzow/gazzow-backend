import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import security from "eslint-plugin-security";
import prettier from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.ts"],
    ignores: ["node_modules/**", "dist/**", "build/**"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly", // ✅ Add this
      },
    },
    plugins: {
      "@typescript-eslint": ts,
      security,
      prettier
    },
    rules: {
      ...js.configs.recommended.rules,
      ...ts.configs.recommended.rules,
      ...security.configs.recommended.rules,
      "prettier/prettier": "warn",
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" }
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "security/detect-object-injection": "off"
    }
  }
];
