// dev配置
const path=require('path')
const {merge}=require('webpack-merge');
const common=require('./webpack.common');
const HtmlWebpackPlugin=require('html-webpack-plugin');

// 读取package.json设置的环境变量
// console.log(process.env.NODE_ENV);


module.exports=merge(common,{
    module:{
        rules: [
            {
                test:/\.css$/,
                use:[
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: 'css-loader',
                    }
                ]
            },
            {
                test:/\.less$/,
                use:[
                    {
                        loader: "style-loader",
                    },
                    {
                        loader:"css-loader",
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
                        loader: "style-loader",
                    },
                    {
                        loader:"css-loader",
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
                            name:'[name].[hash].[ext]',
                        }
                    }
                ],
            }
        ]
    },
    devtool:'inline-source-map',
    stats:'errors-only',
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'127.0.0.1',
        port:9001,
        hot:true,
        quiet:false,
        open:false,
        compress:true,
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'index.html',
            inject:true
        })
    ],
    mode:'development'
})
