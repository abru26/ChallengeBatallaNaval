const path = require("path");

module.exports = {
  stories: ["../stories/**/*.stories.tsx"],
  // Add nextjs preset
  presets: [path.resolve(__dirname, "./next-preset.js")],
  addons: ['@storybook/addon-docs', '@storybook/addon-controls', 'storybook-addon-next-router'],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-transform-modules-commonjs",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-private-methods"
  ],
};
