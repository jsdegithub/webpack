const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");

module.exports = {
    mode: "development",
    devtool: "cheap-module-eval-source-map", //生产环境下我们不生成sourcemap
    entry: "./src/js/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        contentBase: "./dist",
        open: true,
        port: 8080,
        hot: true,
        hotOnly: true, //热更新不生效也不让浏览器自动刷新
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/html/index.html",
        }),
        new CleanWebpackPlugin(["dist"]),
        new HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "[name]-[hash].[ext]",
                        outputPath: "imgs",
                        limit: 1024 * 5,
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                        },
                    },
                    "postcss-loader",
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                        },
                    },
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(eot|ttf|svg|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                },
            },
        ],
    },
};
