# mm-gulp-grunt-webpack-comparison
Source and presentation for my talk, Gulp, Grunt, WebPack: What’s a Dev to Choose?

## Actions To Achieve Using Each Platform
- Minimal configuration and setup of platform
- Compile SASS and Minify
- Combine JavaScript Into Single File and Minify
- Minify HTML
- Allow for local development and testing, ideally with a watch and local web server (express)
- Publish all files into distribution folder that is deployment ready

# Prerequisites

The following packages are required for all of the platforms:

* Yarn: https://yarnpkg.com/en/docs/install
* Express.js: `yarn add express --dev`
* Connect Middleware (for Live Reload): `yarn add connect-livereload --dev`
* Bootstrap (SASS): `yarn add bootstrap --dev`
* jQuery: `yarn add jquery --dev`

_You can just run `yarn install` to get all of the packages required here; the step-by-step is meant to be instructional if you are starting a new project from scratch._

# Grunt

## init and Configure

Install the Grunt command line interface globally:

`yarn global add grunt-cli`

Install the Grunt and grunt-task-loader NPM packages into our local project:

`yarn add grunt grunt-task-loader --dev`

Setup the basic Gruntfile.js used to configure Grunt tasks:

`touch Gruntfile.js`

Add this content to get started:

    var package = require('./package.json');
    var buildConfig = require('./lib/build-config.js')('grunt');
    
    module.exports = function (grunt) {
        // Automatically register grunt tasks
        require('grunt-task-loader')(grunt);

        grunt.initConfig({
            pkg: package,
            buildConfig: buildConfig
        });
    
        grunt.registerTask('default', []);
    };

## Add SASS

Install the grunt-sass NPM package that we'll configure to compile our SASS and CSS files:

`yarn add grunt-sass --dev`

Then add the following to the task section of the Gruntfile.js:

    sass: {
        dist: {
            options: {
                style: 'compressed'
            },
            files: {
                '<%=buildConfig.dist.minifiedStyles%>': buildConfig.app.styles
            }
        }
    }

## Add JavaScript

Install the grunt-contrib-uglify NPM package that we'll configure to combine and minify our script files:

`yarn add grunt-contrib-uglify --dev`

Then add the following to the task section of the Gruntfile.js:

    uglify: {
        dist: {
            files: {
                '<%=buildConfig.dist.minifiedScripts%>': buildConfig.app.scripts
            }
        }
    }

## Add HTML Minify

Install the grunt-contrib-htmlmin NPM package that we'll configure to minify our HTML files:

`yarn add grunt-contrib-htmlmin --dev`

Then add the following to the task section of the Gruntfile.js:

    htmlmin: {
        dist: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            files: [{
                expand: true,
                src: buildConfig.app.html,
                cwd: buildConfig.app.basePath,
                dest: buildConfig.dist.html
            }]
        },
    }

## Copy Other Assets

`yarn add grunt-contrib-copy --dev`

## Local Development and Distribution

Install the grunt-contrib-watch NPM package that we'll configure to watch and serve files from our app:

`yarn add grunt-contrib-watch --dev`

`yarn add connect-livereload --dev`

`yarn add grunt-express-server --dev`

`yarn add grunt-contrib-clean --dev`

# Gulp

## init and Configure

Install the Gulp command line interface globally:

`yarn global add gulp-cli`

Install the Gulp and Pump NPM package into our local project:

`yarn add gulp pump --dev`

Setup the basic gulpfile.js used to configure Gulp tasks:

`touch gulpfile.js`

Add this content to get started:

    var package = require('./package.json');
    var buildConfig = require('./lib/build-config.js')('gulp');
    var gulp = require('gulp');
    
    gulp.task('default', []);

## Add SASS

`yarn add gulp-sass --dev`
`yarn add gulp-sourcemaps --dev`
`yarn add gulp-rename --dev`

## Add JavaScript

`yarn add gulp-uglify --dev`
`yarn add gulp-concat --dev`

## Add HTML Minify

`yard add gulp-htmlmin --dev`

## Local Development and Distribution

`yarn add gulp-clean --dev`
`yarn add gulp-live-server --dev`

# Webpack

## init and Configure

Install the webpack and html-webpack-plugin NPM package into our local project:

`yarn add webpack --dev`

Setup the basic webpack.config.js used to configure Gulp tasks:

`touch webpack.config.js`

Add this content to get started:

Add a task to the package.json file; this will ease running the webpack command:

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

## Add SASS

## Add JavaScript

## Add HTML Minify

## Local Development and Distribution