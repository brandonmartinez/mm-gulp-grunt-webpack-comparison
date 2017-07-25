var package = require('./package.json');
var buildConfig = require('./lib/build-config.js')('webpack');

module.exports = {
    entry: buildConfig.app.appScript,
    output: {
        filename: 'app.js',
        path: buildConfig.dist.basePath
    }
};