/**
 * Created by mianh on 2018/4/9 0009.
 */
/*eslint-disable*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const webpackConfig = require('./webpack.config');
const config = require('../config.json');

var mode = process.env.NODE_ENV = 'development';

var url = `http://${config.host}:${config.port}`;

module.exports = merge(webpackConfig, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'), //默认会以根文件夹提供本地服务器，这里指定文件夹
        //historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        publicPath: '/',
        port: config.port, // 端口号
        host: config.host, // 主机地址
        inline: true, // 控制台是否显示构建信息
        clientLogLevel: 'error', // 控制台显示什么log信息
        open: false, // 开始构建时是否打开浏览器，使用OpenBrowserPlugin在构建完成时打开浏览器
        hot: true, // 是否启用热替换
        // 开启服务器的模块热替换(HMR)
        headers: {
            'Access-Control-Allow-Origin': '*', // 5
        },
        lazy: false, // 是否请求时才编译包
        historyApiFallback: {
            // 404时的页面
            rewrites: {from: /./, to: '/404.html'}
        },
        // overlay: {
        //     // 报错时浏览器是否显示错误信息
        //     warnings: true,
        //     errors: true
        // },
        stats: 'errors-only', // 开启报错提示
        proxy: {
            '/dev/*': {
                target: config.proxyDev //	//"proxyDev": "http://10.16.1.11:3000/mock/18/",
            },
            '/': {
                target: config.proxyProd
            }
        }
    },
    entry: [
        // 'babel-polyfill',
        // 'react-hot-loader/patch',
        // 'webpack-dev-server/client?' + url,
        // 'webpack/hot/only-dev-server',
        path.resolve(__dirname, '../src/index.js'),
    ],
    plugins: [
        // 开启服务器的模块热替换(HMR)
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // 当开启 HMR 的时候使用该插件会显示模块的相对路径
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            inject: true,
            title: "",
            favicon: './public/favicon.ico'
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new OpenBrowserPlugin({url: `http://${config.host}:${config.port}`}) // 构建完成打开浏览器插件
    ],
});