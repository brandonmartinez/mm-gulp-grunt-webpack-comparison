var package = require('./package.json');
var buildConfig = require('./lib/build-config.js')('webpack');

module.exports = {
    entry: {
        jquery: './app/scripts/jquery.js'
    },
    output: {
        filename: '[name].js',
        path: buildConfig.dist.basePath
    }
};