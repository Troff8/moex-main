const path = require('path')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    devtool: 'inline-source-map',
    output: {
        filename: 'reactapp.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.jsx', '.js', '.css']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/react'],
                            plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime']
                        }
                    }
                ]
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]-[hash:base64:5]',
                                exportLocalsConvention: 'camelCase'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                }
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9000
    }
}
