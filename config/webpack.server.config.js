const path = require('path');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const rootPath = path.join(__dirname, '../');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    target: 'node',
    entry: [ rootPath + 'src/webapp/entry-server.js' ],
    output: {
        libraryTarget: 'commonjs2'
    },
    plugins: [
        new VueSSRServerPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.template.html',
            template: 'src/webapp/index.html'
        })
    ]
};