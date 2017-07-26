var package = require('./package.json');
var buildConfig = require('./lib/build-config.js')('grunt');

module.exports = function (grunt) {
    // Automatically register grunt tasks
    require('grunt-task-loader')(grunt);

    grunt.initConfig({
        pkg: package,
        buildConfig: buildConfig,
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%=buildConfig.dist.minifiedStyles%>': buildConfig.app.styles
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%=buildConfig.dist.minifiedScripts%>': buildConfig.app.scripts
                }
            }
        }
    });

    grunt.registerTask('default', []);
};