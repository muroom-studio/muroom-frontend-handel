/** @type {import("prettier").Config} */
module.exports = {
  singleQuote: true,
  jsxSingleQuote: true,
  semi: true,
  tabWidth: 2,
  useTabs: false,
  trailingComma: "all",
  printWidth: 80,
  endOfLine: "auto",
  bracketSpacing: true,
  plugins: ["prettier-plugin-tailwindcss"],
};
