const package = require('./package.json');
const buildConfig = require('./lib/build-config.js')(process.env.PLATFORM || 'webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: {
        app: buildConfig.app.scripts.cwd + 'app.jsx'
    },
    output: {
        filename: '[name].min.js',
        path: buildConfig.dist.basePath
    },
    module: {
        loaders: [{
                test: /\.jsx?/,
                include: buildConfig.app.basePath,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                include: buildConfig.app.basePath,
                loader: 'uglify-loader'
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            }
        })
    ]
};