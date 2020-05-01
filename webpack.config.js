const webpack = require('webpack');
const path = require('path');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    entry:  {
        reactInit: './src/reactInit.js',
        GradientPicker:  './src/js/GradientPicker.jsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'react-gpickr',
        libraryTarget: 'umd',
        publicPath: '/dist/',
        umdNamedDefine: true
    },
    externals: {
        // Don't bundle react or react-dom
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'React',
            root: 'React'
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'ReactDOM',
            root: 'ReactDOM'
        }
    },

    devServer: {
        contentBase: `${__dirname}/`,
        host: '0.0.0.0',
        port: 3007
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader'
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },

    plugins: [
        new FixStyleOnlyEntriesPlugin(),
        new MiniCssExtractPlugin({
            filename: 'gpickr.min.css'
        }),
        new webpack.SourceMapDevToolPlugin({})
    ],
    // devtool: 'eval-cheap-module-source-map',
};
