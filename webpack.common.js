const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    entry: "./src/js/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/html/index.html",
        }),
        new CleanWebpackPlugin(["dist"]),
        new webpack.ProvidePlugin({
            $: "jquery",
            // _: "lodash",
        }),
    ],
    // 开发环境下加入此项配置启用treeshaking
    // 在package.json中还需要加入
    // "sideEffects": ["@babel/polyfill","*.css","*.scss","*.less"]
    // 这项配置(数组里面的内容不是固定的)
    // production模式下不用配置此项，webpack会自动配置好
    // 但是package.json中仍然需要配置sideEffects
    // sideEffects:false代表对所有模块采用treeshaking
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: "all",
            minSize: 20000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: "~",
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                    // filename: "vendors.js",
                },
                default: {
                    // minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                    {
                        loader: "imports-loader?this=>window",
                    },
                ],
                options: {
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                useBuiltIns: "usage",
                                /* targets: {
                                    edge: "17",
                                    firefox: "60",
                                    chrome: "67",
                                    safari: "11.1",
                                    ie: "11",
                                }, */
                                targets: "> 0.25%, not dead",
                            },
                        ],
                    ],
                    // 配置动态引入的代码分割
                    plugins: ["@babel/plugin-syntax-dynamic-import"],
                },
            },
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
                test: /\.(eot|ttf|svg|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                },
            },
        ],
    },
};
