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
        },
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
        },
        watch: {
            sass: {
                files: buildConfig.app.styles,
                tasks: ['sass'],
                options: {
                    livereload: true,
                },
            },
            uglify: {
                files: buildConfig.app.scripts,
                tasks: ['uglify'],
                options: {
                    livereload: true,
                },
            },
            htmlmin: {
                files: buildConfig.app.html,
                tasks: ['htmlmin'],
                options: {
                    cwd: buildConfig.app.basePath,
                    livereload: true,
                },
            },
        },
    });

    grunt.registerTask('default', []);
};