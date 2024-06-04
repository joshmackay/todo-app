const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: "development",
    watch: true,
    plugins: [
        new HtmlWebpackPlugin({
            title: "Get It Done",
            template: "./src/index.html",
            filename: "index.html"
        }),

    ],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ],
    }
};