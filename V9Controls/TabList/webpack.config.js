// webpack.config.js
const {
    default: FluentUIReactIconsFontSubsettingPlugin,
  } = require('@fluentui/react-icons-font-subsetting-webpack-plugin');
  
  module.exports = {
    module: {
      rules: [
        // Treat the font files as webpack assets
        {
          test: /\.(ttf|woff2?)$/,
          type: 'asset',
        },
      ],
    },
    resolve: {
      // Include 'fluentIcontFont' to use the font implementation of the Fluent icons
      conditionNames: ['fluentIcontFont', 'import'],
    },
    plugins: [
      // Include this plugin
      new FluentUIReactIconsFontSubsettingPlugin(),
    ],
  };