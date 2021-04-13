const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
    const isProduction = env.production;

    const config = {
        mode: isProduction ? 'production' : 'development',
        entry: path.resolve(__dirname, './src/index.tsx'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
            filename: 'index_bundle.js'
        },
        resolve: {
            modules: ['node_modules'],
            extensions: ['.js', '.jsx', '.tsx', '.ts']
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'public'),
            historyApiFallback: true,
            port: 9000
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: 'ts-loader'
                },
                {
                    oneOf: [{
                        enforce: 'pre',
                        test: /\.js$/,
                        loader: 'source-map-loader',
                    },
                        {
                            test: /\.s[ac]ss$/i,
                            use: ['style-loader', 'css-loader', {
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


    if (isProduction) {
        config.plugins.push(
            new CopyPlugin({
                patterns: [{ from: 'public', to: path.resolve(__dirname, 'dist') }],
            })
        );
    }
    return config;
};
