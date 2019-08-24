const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCss = require("mini-css-extract-plugin");
// const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCss.loader, "css-loader"]
      },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCss({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  devServer: {
    historyApiFallback: true
  }
};