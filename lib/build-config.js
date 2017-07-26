var path = require('path');

module.exports = function (platformName) {
    // Root paths
    var appBasePath = path.resolve(__dirname, '../app') + '/',
        distBasePath = path.resolve(__dirname, '../dist/' + platformName) + '/',
        nodeModulesBasePath = path.resolve(__dirname, '../node_modules') + '/';

    // Dependencies
    var bootstrapStyles = nodeModulesBasePath + 'bootstrap-sass/stylesheets/bootstrap.scss';
    var bootstrapScripts = nodeModulesBasePath + 'bootstrap-sass/javascripts/bootstrap.min.js';
    var bootstrapFonts = nodeModulesBasePath + 'bootstrap-sass/fonts/bootstrap/**.*';
    var jquery = nodeModulesBasePath + 'jquery/dist/jquery.min.js';

    // Config
    var buildConfig = {
        'app': {
            'basePath': appBasePath,
            'fonts': [
                // Dependencies (order matters)
                bootstrapFonts,
                // App-Specific
                appBasePath + 'fonts/**.{eot,svg,tff,woff,woff2}'
            ],
            'images': [
                // Dependencies (order matters)
                
                // App-Specific
                appBasePath + 'images/**/*.{jpg,gif,png}'
            ],
            'scripts': [
                // Dependencies (order matters)
                jquery,
                bootstrapScripts,
                // App-Specific
                appBasePath + 'scripts/**/*.js'
            ],
            'styles': [
                // Dependencies (order matters)
                bootstrapStyles,
                // App-Specific
                appBasePath + 'styles/**/*.{scss,css}',
            ],
            'html': appBasePath + 'index.html'
        },
        'dist': {
            'basePath': distBasePath,
            'fonts': distBasePath + 'fonts/',
            'script': distBasePath + 'app.js',
            'minifiedScripts': distBasePath + 'app.min.js',
            'styles': distBasePath + 'app.css',
            'minifiedStyles': distBasePath + 'app.min.css',
            'html': distBasePath + 'index.html'
        }
    };

    return buildConfig;
};