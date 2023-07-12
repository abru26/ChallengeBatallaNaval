const path = require("path");

module.exports = {
  webpackFinal: async (baseConfig, options) => {
    const { module = {} } = baseConfig;

    const newConfig = {
      ...baseConfig,
      module: {
        ...module,
        rules: [...(module.rules || [])],
      },
    };

    // TypeScript with Next.js
    newConfig.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: [path.resolve(__dirname, "../components")],
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: ["next/babel", require.resolve("babel-preset-react-app")],
            plugins: ["react-docgen"],
          },
        },
      ],
    });
    newConfig.resolve.extensions.push(".ts", ".tsx");

    // SCSS preset for Storybook
    newConfig.module.rules.push({
      test: /\.(s*)css$/,
      loaders: ["style-loader", "css-loader", "sass-loader"],
      include: [
        path.resolve(__dirname, "../styles/global.scss"), 
        path.resolve(__dirname, "../styles/storybook.scss"), 
        path.resolve(__dirname, "../node_modules/bootstrap/dist/css/bootstrap.min.css"),
        path.resolve(__dirname, "../node_modules/@glidejs/glide/src/assets/sass/glide.core.scss"),
        path.resolve(__dirname, "../node_modules/@glidejs/glide/src/assets/sass/glide.theme.scss"),
        path.resolve(__dirname, "../node_modules/mapbox-gl/dist/mapbox-gl.css")
      ],
    });

    return newConfig;
  },
};
