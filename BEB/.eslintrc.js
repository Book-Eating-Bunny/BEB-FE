// .eslintrc.js

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
    "standard-with-typescript",
  ],
  parserOptions: {
    project: "./tsconfig.js",
  },
  ignorePatterns: [".eslintrc.js"],
};
