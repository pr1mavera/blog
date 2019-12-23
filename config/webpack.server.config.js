const path = require('path');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const rootPath = path.join(__dirname, '../');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MDMapPlugin = require('md-map-plugin');
const MDMapPlugin = require('../../MDMap/src/main');

module.exports = {
    target: 'node',
    entry: [ rootPath + 'src/webapp/entry-server.js' ],
    output: {
        libraryTarget: 'commonjs2'
    },
    plugins: [
        new MDMapPlugin({
            input: path.join(__dirname, '../', 'docs/FE-Foundation/浏览器原理及性能优化/'),
            output: path.join(__dirname, '../', 'dist/assets'),
            mdFileDepth: 3
        }),
        new VueSSRServerPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.template.html',
            template: 'src/webapp/index.html'
        })
    ]
};