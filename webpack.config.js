const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';


const config = {
    entry: {
        proicons: './src/proicons.ts',
    },
    output: {
        chunkFilename: '[name].js',
        filename: '[name].js',
        clean: true,
        library: {
            name: 'proicons',
            type: 'umd',
            export: 'default',
        }
    },
    plugins: [
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
    devtool: 'source-map',
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';

        config.devServer = {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            compress: true,
        };
        config.plugins.push(
            new HtmlWebpackPlugin({
                title: 'ProIcons Test',
                template: './src/test.html'
            })
        );
    }
    return config;
};
