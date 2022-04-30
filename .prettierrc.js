// there are two issues currently with prettier plugins in combination with pnpm:
// * The prettier auto plugin resolution does not work with pnpm: https://github.com/prettier/prettier/pull/11248, therefore the plugin needs to be specified here in the config file
// * The VS Code extension does not pick up the plugin if the config is a JSON file: https://github.com/prettier/prettier-vscode/issues/1878

module.exports = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  proseWrap: "always",
};
