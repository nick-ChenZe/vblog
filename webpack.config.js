var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// path
var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

// banner info
var pkg = require('./package.json');
var banner = pkg.name + " " + pkg.version +
    "\n" + new Date().toLocaleDateString() + " " + pkg.author +
    "\n" + pkg.homepage;

module.exports = {
    entry: {
        app: path.resolve(SRC_PATH, 'main.js'),
        vendors: ['vue', 'es6-promise']
    },
    output: {
        path: BUILD_PATH,
        publicPath: '/dist',
        filename: '[name].js',
        chunkFilename: '[chunkhash:8].js'
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.less$/,
            exclude: /node_modules/,
            loader: 'less'
        }, {
            test: /\.html$/,
            loader: 'html'
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.(png|jpg|jpeg)$/,
            loader: 'url?limit=5120'
        }, {
            test: /\.(gif|svg|woff|woff2|ttf|eot|otf)$/,
            loader: 'file'
        }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'UnKnown Me',
            template: path.resolve(SRC_PATH, 'index.html'),
            filename: '../index.html'
        })
    ],
    vue: {
        autoprefixer: {
            browsers: ['> 1%']
        },
        loaders: {
            css: 'vue-style!css',
            less: 'vue-style!css!less'
        }
    },
    babel: {
        presets: ["es2015", "stage-2"],
        plugins: ["transform-runtime"],
        comments: false
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        stats: { colors: true },
        host: '0.0.0.0'
    },
    devtool: 'eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    delete module.exports.devtool;

    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new webpack.BannerPlugin(banner)
    ])
}
