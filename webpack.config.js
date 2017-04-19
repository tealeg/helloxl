var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'views/js');
var APP_DIR = path.resolve(__dirname, 'jsx');

var config = {
    entry: {
        index: APP_DIR + '/index.jsx',
    }
    output: {
        path: BUILD_DIR,
        filename: '[name]-bundle.js'
  }
};

module.exports = config;
