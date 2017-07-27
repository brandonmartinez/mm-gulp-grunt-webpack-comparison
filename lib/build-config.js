var path = require('path');

module.exports = function (platformName) {
    // Root paths
    var appBasePath = path.resolve(__dirname, '../app') + '/',
        distBasePath = path.resolve(__dirname, '../dist/' + platformName) + '/',
        nodeModulesBasePath = path.resolve(__dirname, '../node_modules') + '/';

    // Dependencies
    var bootstrapScripts = nodeModulesBasePath + 'bootstrap-sass/assets/javascripts/bootstrap.min.js';
    var bootstrapFonts = nodeModulesBasePath + 'bootstrap-sass/assets/fonts/bootstrap/**.*';
    var jquery = nodeModulesBasePath + 'jquery/dist/jquery.min.js';

    // Config
    var buildConfig = {
        'app': {
            'basePath': appBasePath,
            'cwd': appBasePath,
            'fonts': [
                // Dependencies (order matters)
                bootstrapFonts,
                // App-Specific
                'fonts/**.{eot,svg,tff,woff,woff2}'
            ],
            'images': [
                // Dependencies (order matters)

                // App-Specific
                'images/**/*.{jpg,gif,png}'
            ],
            'scripts': [
                // Dependencies (order matters)
                jquery,
                bootstrapScripts,
                // App-Specific
                'scripts/**/*.js'
            ],
            'styles': [
                // Dependencies (order matters)
                
                // App-Specific
                appBasePath + 'styles/**/*.{scss,css}',
            ],
            'html': ['**/*.{html,htm}']
        },
        'dist': {
            'basePath': distBasePath,
            'fonts': distBasePath + 'fonts/',
            'images': distBasePath + 'images/',
            'scripts': distBasePath + 'app.min.js',
            'styles': distBasePath + 'app.min.css',
            'html': distBasePath
        }
    };

    return buildConfig;
};