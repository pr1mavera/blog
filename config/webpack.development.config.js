const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const rootPath = path.join(__dirname, '../');

module.exports = {
    entry: [ rootPath + 'src/webapp/entry-client.js' ],
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
                loader: 'file-loader?name=images/[name].[ext]'
            }
        ]
    },
    plugins: [
        new VueSSRClientPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.template.html',
            template: 'src/webapp/index.html',
        }),
        new FriendlyErrorsPlugin()
    ]
};