var package = require('./package.json');
var buildConfig = require('./lib/build-config.js')('grunt');

module.exports = function (grunt) {
    // Automatically register grunt tasks
    require('grunt-task-loader')(grunt, {
        mapping: {
            express: 'grunt-express-server'
        }
    });

    grunt.initConfig({
        pkg: package,
        buildConfig: buildConfig,
        clean: {
            dist: {
                src: [buildConfig.dist.basePath]
            }
        },
        sass: {
            dist: {
                options: {
                    outputStyle: 'compressed',
                    sourceMap: true
                },
                files: {
                    '<%=buildConfig.dist.styles%>': buildConfig.app.styles
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%=buildConfig.dist.scripts%>': buildConfig.app.scripts
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
                    cwd: buildConfig.app.cwd,
                    dest: buildConfig.dist.html
                }]
            },
        },
        copy: {
            dist: {
                files: [
                    // images
                    {
                        expand: true,
                        flatten: true,
                        //cwd: buildConfig.app.cwd,
                        src: buildConfig.app.images,
                        dest: buildConfig.dist.basePath
                    },
                    // fonts
                    {
                        expand: true,
                        flatten: true,
                        //cwd: buildConfig.app.cwd,
                        src: buildConfig.app.fonts,
                        dest: buildConfig.dist.basePath
                    }
                ],
            },
        },
        watch: {
            options: {
                livereload: true
            },
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
            express: {
                files: ['app.js'],
                tasks: ['express:dev'],
                options: {
                    spawn: false
                }
            }
        },
        express: {
            options: {

            },
            dev: {
                options: {
                    script: 'app.js'
                }
            }
        }
    });

    grunt.registerTask('build', ['clean:dist', 'sass:dist', 'uglify:dist', 'htmlmin:dist', 'copy:dist']);
    grunt.registerTask('serve', ['build', 'express:dev', 'watch']);
    grunt.registerTask('default', 'serve');
};