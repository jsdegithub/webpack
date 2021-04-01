const webpack = require("webpack");
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

const devConfig = {
    mode: "development",
    // 开发环境下配置source-map的最佳实践
    // devtool: "cheap-module-eval-source-map",
    // cheap的作用是只映射我们的src里面的源码
    // 生产环境下我们不生成sourcemap
    // 如果想生成，最佳实践是
    // devtool: "cheap-module-source-map",
    // 最完整的source-map配置，但体积最大
    // devtool: "source-map",
    // devtool: "cheap-source-map",
    devtool: "cheap-module-eval-source-map",
    devServer: {
        contentBase: "./dist",
        open: true,
        port: 8080,
        hot: true,
        hotOnly: true, //热更新不生效也不让浏览器自动刷新
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
};

module.exports = merge(commonConfig, devConfig);
