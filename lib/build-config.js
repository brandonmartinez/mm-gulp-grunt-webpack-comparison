var path = require('path');

module.exports = function (platformName) {
    // Root paths
    var appBasePath = path.resolve(__dirname, '../app') + '/',
        distBasePath = path.resolve(__dirname, '../.dist/' + platformName) + '/',
        tempBasePath = path.resolve(__dirname, '../.temp/' + platformName) + '/',
        nodeModulesBasePath = path.resolve(__dirname, '../node_modules') + '/';

    // Config
    var buildConfig = {
        'dependencies': {
            'jquery': {
                'scripts': {
                    'cwd': nodeModulesBasePath + 'jquery/dist/',
                    'files': [
                        'jquery.min.js'
                    ]
                }
            },
            'bootstrap': {
                'scripts': {
                    'cwd': nodeModulesBasePath + 'bootstrap-sass/assets/javascripts/',
                    'files':
                    [
                        'bootstrap.min.js'
                    ]
                },
                'fonts': {
                    'cwd': nodeModulesBasePath + 'bootstrap-sass/assets/fonts/bootstrap/',
                    'files':
                    [
                        '**.*'
                    ]
                }
            }
        },
        'app': {
            'basePath': appBasePath,
            'fonts': {
                'cwd': appBasePath + 'fonts/',
                'files': [
                    '**.{eot,svg,tff,woff,woff2}'
                ]
            },
            'images': {
                'cwd': appBasePath + 'images/',
                'files': [
                    '**/*.{jpg,gif,png}'
                ]
            },
            'scripts': {
                'cwd': appBasePath + 'scripts/',
                'files': [
                    '**/*.js'
                ]
            },
            'styles': {
                'cwd': appBasePath + 'styles/',
                'watch': '**/*.{css,sass,scss}',
                'files': appBasePath + 'styles/app.scss'
            },
            'html': {
                'cwd': appBasePath,
                'files': [
                    '**/*.{html,htm}'
                ]
            }
        },
        'temp': {
            'basePath': tempBasePath,
            'fonts': tempBasePath + 'fonts/',
            'images': tempBasePath + 'images/',
            'scripts': tempBasePath + 'scripts/',
            'styles': tempBasePath + 'styles/',
            'html': tempBasePath + 'html/'
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