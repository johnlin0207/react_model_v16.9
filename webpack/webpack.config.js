/**
 * Created by mianh on 2018/4/9 0009.
 */
/*eslint-disable*/
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
    // externals: {
    //     'react': 'React',
    //     'react-dom': 'ReactDOM',
    //     'react-router': 'ReactRouter',
    //     'redux': 'Redux',
    //     'history': 'History',
    //     'antd':'antd'
    // },
    entry: {
        app:[
            //'babel-polyfill',
            path.resolve(__dirname, '../src/index.js')
        ],
        //vendor: ['react', 'react-dom', 'react-router', 'jquery','braft-editor'],//打包时将自己的代码与react分离
    },
    resolve: { // 指定第三方库目录，减少webpack寻找时间
        modules: [path.resolve(__dirname, '../node_modules')],
    },
    output: {
        path: path.resolve(__dirname, '../dist'), // 输出的路径
        filename: 'app/[name]_[hash:8].js'  // 打包后文件
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?modules,localIdentName="[name]-[local]-[hash:base64:6]"'
                }),
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    publicPath: '../',//在这里的publicPath是css代码中引用的资源文件的公共路径
                    use: ['css-loader?sourceMap','less-loader?sourceMap']
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
                exclude: /favicon\.png$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8196,
                            name: 'images/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg|svgz|ico)(\?.+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new ExtractTextPlugin('css/[name]_[md5:contenthash:hex:20].bundle.css'),
        // new TransferWebpackPlugin([
        //     {from: 'static',to:'static'},
        //     {from:'server'}
        // ], path.resolve(__dirname,"../src"))
    ]
}