const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    mode: "development",
    watch: true,
    plugins: [new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }
    )],
    entry: {
        'main': './src/js/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: 'js/[name].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false // Do not resolve url() in css or scss
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
}