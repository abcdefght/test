// webpack公共配置
const path = require('path');

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src', 'index.tsx'),
    },
    output: {
        filename: "[name].[hash].bundle.js",
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(jpg|png|jpeg|gif|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            esModule: false,
                            limit: 10 * 1024,
                            name: 'static/img/[name].[hash].[ext]'
                        }
                    }
                ]
            },
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@assets': path.resolve(__dirname, 'src', 'assets'),
            '@com': path.resolve(__dirname, 'src', 'components')
        },
        extensions: ['.js', '.jsx','.ts','.tsx']
    },
}


