const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");

module.exports = {
    mode: "development",
    // 开发环境下配置source-map的最佳实践
    // devtool: "cheap-module-eval-source-map",
    // cheap的作用是只映射我们的src里面的源码
    // 生产环境下我们不生成sourcemap
    // 如果想生成，最佳实践是
    // devtool: "cheap-module-source-map",
    // 最完整的source-map配置，但体积最大
    // devtool: "source-map",
    devtool: "cheap-source-map",
    entry: "./src/js/index.js",
    output: {
        filename: "[name].js",
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
            cacheGroups: {
                vendors: false,
                default: false,
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
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
