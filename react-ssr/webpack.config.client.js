const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/client/index.tsx',
  },
  module: {
    rules: [
      {
        use: ['babel-loader', 'ts-loader'],
        test: /\.tsx?$/,
        exclude: [/node_modules/],
      },
      {
        oneOf: [{
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
        },
          {
            test: /\.s[ac]ss$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader', {
              loader: "sass-loader",
              options: {
                implementation: require("sass"),
              },
            }],
          },
          {
            test: /\.(png|jpg)$/i,
            use: [
              {
                loader: 'url-loader',
                options: { limit: 8192 },
              },
            ],
          },
          {
            exclude: [/\.(js|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            use: {
              loader: 'file-loader',
            },
          },
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new CopyWebpackPlugin({patterns: [{from: 'src/static/images', to: 'images'}]}),
    new LoadablePlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[file].map',
    path: path.resolve(__dirname, 'dist/public'),
  },
};
