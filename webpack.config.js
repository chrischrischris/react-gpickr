const webpack = require('webpack');
const path = require('path');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

console.log(isProduction ? 'Production Build' : 'Dev Build');

const plugins = [
    new CleanWebpackPlugin(),
    new CopyPlugin([
        { from: 'node_modules/@simonwep/pickr/dist/themes', to: 'themes' },
    ]),
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
        filename: '[name].min.css'
    }),
];

if (!isProduction) {
    plugins.push(new webpack.SourceMapDevToolPlugin({}));
}

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    entry: {
        '../local/reactInit': './src/local/reactInit.js',
        '../local/styles': './src/local/styles.scss',
        'GradientPicker': './src/js/GradientPicker.jsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].min.js',
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

    plugins,
};
