const argv = require('yargs-parser')(process.argv.slice(2));
const merge = require('webpack-merge');
const { resolve, join } = require('path');
let _mode = '';
if (argv.env == 'server') {
    _mode = 'server';
} else {
    _mode = argv.mode || 'development';
}
const _modeFlag = _mode == 'development' ? true : false;
const _mergeConfig = require(`./config/webpack.${_mode}.config.js`);
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const webpackConfig = {
    watch: _modeFlag,
    output: {
        path: join(__dirname, './dist/assets'),
        publicPath: '/',
        filename: 'script/[name].bundle.js'
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@components': resolve(__dirname, './src/web/components'),
        },
        modules: [
            resolve(__dirname, 'node_modules')
        ],
        extensions: [ '.js', '.css', '.vue' ]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    optimization: {
        
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};

module.exports = merge(webpackConfig, _mergeConfig);