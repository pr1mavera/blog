const argv = require('yargs-parser')(process.argv.slice(2));
const merge = require('webpack-merge');
const { resolve, join } = require('path');
const _mode = argv.env == 'server' ? 'server' : (argv.mode || 'development');
const _isProd = _mode == 'production';
const _modeFlag = _mode == 'development' ? true : false;
const _mergeConfig = require(`./config/webpack.${_mode}.config.js`);
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const vueLoaderConfig = [
    {
        loader: 'postcss-loader',
        options: {
            sourceMap: !_isProd,
            plugins: () => [
                require('autoprefixer')({
                    browsers: require('./package.json').browserslist
                }),
                require('postcss-pxtorem')({
                    rootValue: '16',
                    propList: ['*'],
                    minPixelValue: 2
                })
            ]
        }
    }, {
        loader: 'css-loader',
        options: {
            minimize: _isProd,
            sourceMap: !_isProd
        }
    }, {
        loader: 'less-loader',
        options: {
            sourceMap: !_isProd
        }
    }
];

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
        extensions: ['.js', '.css', '.vue', '.css']
    },
    optimization: {
        runtimeChunk: {
            name: 'runtime'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        less: ['vue-style-loader'].concat(vueLoaderConfig),
                        extractCSS: _isProd ? true : false
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: ['vue-style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                        },
                    },
                    'css-loader',
                ]
            }
        ]
    },
    optimization: {

    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: _isProd ? 'style/[name].[hash:6].css' : 'style/[name].css',
            chunkFilename: _isProd ? 'style/[id].[hash:6].css' : 'style/[id].css',
        }),
        new VueLoaderPlugin()
    ]
};

module.exports = merge(webpackConfig, _mergeConfig);
