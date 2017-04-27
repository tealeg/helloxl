var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public/js');
var APP_DIR = path.resolve(__dirname, 'jsx');

var config = {
    entry: {
        app: APP_DIR + '/app.jsx',
        xl: APP_DIR + '/xl.jsx',
        upload: APP_DIR + '/upload.jsx'
    },
    output: {
        path: BUILD_DIR,
        filename: '[name]-bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel-loader'
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
	extensions: [".js", ".jsx"]
    }
};

module.exports = config;
