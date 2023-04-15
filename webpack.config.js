const path = require('path');

const babelLoaderConfig = {
    test: /\.(js|jsx|ts|tsx|mjs)$/,
    use: {
      loader: "babel-loader",
      options: {
        sourceType: "unambiguous",
        cacheDirectory: true,
        presets: [
          "@babel/react",
          [
            "@babel/preset-env",
            {
              modules: false,
            },
          ],
        ],
        plugins: [
          "@babel/plugin-proposal-object-rest-spread",
          "@babel/plugin-proposal-class-properties",
          "@babel/plugin-transform-runtime",
        ],
      },
    },
};

const stylesLoaderConfig = {
    test: /\.(scss|css)$/,
    use: [
      "css-loader",
    ],
  };

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
        babelLoaderConfig,
        stylesLoaderConfig
    ],
  },
  plugins:[
    
  ]
};