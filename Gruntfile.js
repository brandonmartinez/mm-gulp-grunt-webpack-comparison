var package = require('./package.json');
var buildConfig = require('./lib/build-config.js')('grunt');

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: package,
        buildConfig: buildConfig
    });

    grunt.registerTask('default', []);
};