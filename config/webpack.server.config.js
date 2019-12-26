const fs = require('fs');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const MDMapPlugin = require('md-map-plugin');
// const MDMapPlugin = require('../../MDMap/src/main');
// const CopyPlugin = require('copy-webpack-plugin');
const prod = process.env.NODE_ENV === 'production';

const rootPath = path.join(__dirname, '../');
const targetMDPath = rootPath + 'dist/docs/随笔/'
if (!fs.existsSync(targetMDPath)) {
    fs.mkdirSync(targetMDPath, {recursive: true});
}
console.log('targetMDPath', targetMDPath)

module.exports = {
    target: 'node',
    entry: [ rootPath + 'src/webapp/entry-server.js' ],
    output: {
        path: rootPath + 'dist/assets/',
        publicPath: prod ? '/blog/' : '/',
        // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
        libraryTarget: 'commonjs2',
    },
    externals: nodeExternals({
        // 不要外置化 webpack 需要处理的依赖模块。
        // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
        // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
        whitelist: /\.css$/
     }),
    plugins: [
        // new CopyPlugin([
        //     {
        //         from: 'docs/随笔/**/*.md',
        //         to: 'dist/docs/随笔/'
        //     }
        // ]),
        new MDMapPlugin({
            input: targetMDPath,
            output: rootPath + 'dist/assets',
            // targetStaticPath: rootPath + '../nginx/app/blog/随笔/',
            mdFileDepth: 3
        }),
        new VueSSRServerPlugin(),
        // new HtmlWebpackPlugin({
        //     filename: 'index.template.html',
        //     template: 'src/webapp/index.html'
        // })
    ]
};