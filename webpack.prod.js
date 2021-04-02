const merge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const prodConfig = {
    mode: "production",
    // devtool: "cheap-module-source-map",
    plugins: [new MiniCssExtractPlugin({})],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
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
        ],
    },
};

module.exports = merge(commonConfig, prodConfig);
