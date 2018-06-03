const webpack = require("webpack");
const path = require("path");
// HtmlWebpackPlugin not use,just for test,will delete
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 入口
  entry: "./renderer.js",
  // 输出
  output: {
    //path: './dist',
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist",
    filename: "renderer.js"
  },
  module: {
    rules: []
  },
  plugins: [new HtmlWebpackPlugin()],
  devtool: "eval-source-map",
  mode: "production"
};
