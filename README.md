# mm-gulp-grunt-webpack-comparison
Source and presentation for my talk, Gulp, Grunt, WebPack: What’s a Dev to Choose?

## Actions To Achieve Using Each Platform
- Minimal configuration and setup of platform
- Compile SASS and Minify
- Combine JavaScript Into Single File and Minify
- Minify HTML
- Allow for local development and testing, ideally with a watch and local web server (express)
- Publish all files into distribution folder that is deployment ready

# Grunt

## init and Configure

Install the Grunt command line interface globally:

`npm install -g grunt-cli`

Install the Grunt NPM package into our local project:

`npm install grunt --save-dev`

Setup the basic Gruntfile.js used to configure Grunt tasks:

`touch Gruntfile.js`

Add this content to get started:

    var package = require('./package.json');
    var buildConfig = require('./lib/build-config.js')('grunt');
    
    module.exports = function (grunt) {
        grunt.initConfig({
            pkg: package,
            buildConfig: buildConfig
        });
    
        grunt.registerTask('default', []);
    };

## Add SASS

## Add JavaScript

## Add HTML Minify

## Add Local Development and Webserver

## Publish for Distribution

# Gulp

## init and Configure

Install the Gulp command line interface globally:

`npm install -g gulp-cli`

Install the Gulp NPM package into our local project:

`npm install gulp --save-dev`

Setup the basic gulpfile.js used to configure Gulp tasks:

`touch gulpfile.js`

Add this content to get started:

    var package = require('./package.json');
    var buildConfig = require('./lib/build-config.js')('gulp');
    var gulp = require('gulp');
    
    gulp.task('default', []);

## Add SASS

## Add JavaScript

## Add HTML Minify

## Add Local Development and Webserver

## Publish for Distribution

# Webpack

## init and Configure

Install the webpack and webpack file-loader NPM package into our local project:

`npm install webpack file-loader --save-dev`

Setup the basic webpack.config.js used to configure Gulp tasks:

`touch webpack.config.js`

Add this content to get started:

Add a task to the package.json file; this will ease running the webpack command:



## Add SASS

## Add JavaScript

## Add HTML Minify

## Add Local Development and Webserver

## Publish for Distribution