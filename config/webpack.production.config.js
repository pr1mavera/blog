const path = require('path');
// const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const rootPath = path.join(__dirname, '../');

module.exports = {
    entry: [rootPath + 'src/webapp/entry-client.js'],
    output: {
        path: rootPath + '/dist/assets/',
        publicPath: '/blog/',
        filename: 'script/[name].[chunkhash:5].bundle.js'
    },
    externals: {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter'
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    warnings: false,
                    compress: {
                        drop_debugger: true,
                        drop_console: false
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
                loader: 'file-loader?name=images/[name].[ext]'
            }
        ]
    },
    plugins: [
        // new uglifyJsPlugin({
        //     // 最紧凑的输出
        //     beautify: false,
        //     output: {
        //         comments: false
        //     },
        //     compress: {
        //         // 在UglifyJs删除没有用到的代码时不输出警告  
        //         warnings: true,
        //         // 删除所有的 `console` 语句
        //         // 还可以兼容ie浏览器
        //         drop_console: true,
        //         //内嵌定义了但是只用到一次的变量
        //         collapse_vars: true,
        //         // 提取出出现多次但是没有定义成变量去引用的静态值
        //         reduce_vars: true
        //     },
        //     sourceMap: false
        // }),
        new VueSSRClientPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.template.html',
            template: 'src/webapp/index.html',
            minify: {
                // removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        })
    ]
}