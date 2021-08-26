// prod配置
const path=require('path');
const {merge} =require('webpack-merge')
const common=require('./webpack.common');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const {CleanWebpackPlugin} =require('clean-webpack-plugin');
const OptimizeCSSAssertsPlugin=require('optimize-css-assets-webpack-plugin');
const MiniCSSExtractPlugin=require('mini-css-extract-plugin');
const ProgressBarPlugin=require('progress-bar-webpack-plugin');

module.exports=merge(common,{
    output: {
      filename: "static/js/[name].[chunkhash].js",
      path:path.resolve(__dirname,'dist')
    },
    module:{
        rules: [
            {
                test:/\.less$/,
                use:[
                    {
                        loader:MiniCSSExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules:{
                                localIdentName:'[local]-[hash:base64:5]',
                                exportGlobals:true
                            }
                        }
                    },
                    {loader: "postcss-loader"},
                    {loader: "less-loader"}
                ]
            },
            {
                test:/\.scss$/,
                use:[
                    {
                        loader:MiniCSSExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules:{
                                localIdentName:'[local]-[hash:base64:5]',
                                exportGlobals:true
                            }
                        }
                    },
                    {loader: "postcss-loader"},
                    {loader: "sass-loader"}
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
                use:[
                    {
                        loader:'file-loader',
                        options: {
                            name:'[name].[hash].[ext]',   // 打包后的文件名
                            outputPath:'static/font', // 输出的文件路径
                            publicPath:'../../static/font'   // 引用的文件路径
                        }
                    }
                ],
            }
        ]
    },
    devtool:'source-map',
    plugins:[
        new CleanWebpackPlugin(),
        new ProgressBarPlugin(),
        new OptimizeCSSAssertsPlugin(),
        new MiniCSSExtractPlugin({
           filename:'static/css/[name].[chunkhash].css'
        }),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:path.resolve(__dirname,'index.html'),
            inject:true,
            minify:{
                removeComments:true,
                collapseWhitespace:true,
                minifyCSS:true
            }
        })
    ],
    mode:'production',
    optimization:{
        splitChunks:{
            chunks:'all'
        },
        runtimeChunk:{name:"manifest"}
    }
})
