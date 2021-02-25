const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env) => {
    const isProduction = env.production;

    const config = {
        mode: isProduction ? 'production' : 'development',
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "index_bundle.js"
        },
        resolve: {
            modules: ['node_modules'],
            extensions: ['.js', '.jsx']
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
            port: 9000
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    },
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
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
                    exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/],
                    use: {
                        loader: 'file-loader',
                    },
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: 'style.css',
            }),
            new HtmlWebpackPlugin({
                template: 'src/index.html',
            })
        ],
        optimization: {
            minimize: isProduction,
            minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],
        },
    }
    return config;
};
