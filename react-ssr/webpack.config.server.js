const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    server: './src/server/index.tsx',
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
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
  plugins: [new MiniCssExtractPlugin({ filename: '[name].css' }), new LoadablePlugin()],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
