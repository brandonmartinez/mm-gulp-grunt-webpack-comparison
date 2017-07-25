var path = require('path');

module.exports = function (platformName) {
    var appBasePath = path.resolve(__dirname, '../app') + '/',
        distBasePath = path.resolve(__dirname, '../dist/' + platformName) + '/',
        buildConfig = {
            'app': {
                'basePath': appBasePath,
                'fonts': appBasePath + '**.{eot,svg,tff,woff,woff2}',
                'images': appBasePath + 'images/**/*.{jpg,gif,png}',
                'scripts': appBasePath + 'scripts/**/*.js',
                'appScript': './app/scripts/app.js',
                'styles': appBasePath + 'styles/**/*.{scss,css}',
                'html': appBasePath + 'index.html'
            },
            'dist': {
                'basePath': distBasePath,
                'fonts': distBasePath + 'fonts/',
                'script': distBasePath + 'app.js',
                'minifiedScript': distBasePath + 'app.min.js',
                'styles': distBasePath + 'app.css',
                'minifiedStyles': distBasePath + 'app.min.css',
                'html': distBasePath + 'index.html'
            }
        };
    
    return buildConfig;
};