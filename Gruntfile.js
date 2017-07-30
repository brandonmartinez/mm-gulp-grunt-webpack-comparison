var package = require('./package.json');
var platform = 'grunt';
var buildConfig = require('./lib/build-config.js')(platform);

module.exports = function (grunt) {
    // Automatically register grunt tasks
    require('grunt-task-loader')(grunt, {
        mapping: {
            express: 'grunt-express-server'
        }
    });

    // Environment Variable Modification for Express
    process.env.NODE_ENV = 'development';
    process.env.PLATFORM = platform;
    process.env.PORT = 3000;

    grunt.initConfig({
        pkg: package,
        buildConfig: buildConfig,
        clean: {
            dist: {
                src: [
                    buildConfig.dist.basePath
                ]
            }
        },
        copy: {
            dist: {
                files: [
                    // images
                    {
                        expand: true,
                        cwd: buildConfig.app.images.cwd,
                        src: buildConfig.app.images.files,
                        dest: buildConfig.dist.images
                    },
                    // fonts
                    {
                        expand: true,
                        cwd: buildConfig.app.fonts.cwd,
                        src: buildConfig.app.fonts.files,
                        dest: buildConfig.dist.fonts
                    }
                ],
            },
        },
        sass: {
            dist: {
                options: {
                    outputStyle: 'compressed',
                    sourceMap: true
                },
                src: buildConfig.app.styles.files,
                dest: buildConfig.dist.styles,
            }
        },
        uglify: {
            options: {
                compress: true,
                mangle: true,
                sourceMap: true
            },
            dist: {
                src: buildConfig.build.uglify,
                dest: buildConfig.dist.scripts
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
                    src: buildConfig.app.html.files,
                    cwd: buildConfig.app.html.cwd,
                    dest: buildConfig.dist.html
                }]
            },
        },
        watch: {
            options: {
                livereload: false
            },
            sass: {
                files: buildConfig.app.styles.watch,
                tasks: ['sass'],
                options: {
                    cwd: buildConfig.app.styles.cwd
                },
            },
            uglify: {
                files: buildConfig.app.scripts.files,
                tasks: ['uglify'],
            },
            htmlmin: {
                files: buildConfig.app.html.files,
                tasks: ['htmlmin'],
                options: {
                    cwd: buildConfig.app.html.cwd
                },
            },
            express: {
                files: ['server.js'],
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
                    script: 'server.js'
                }
            }
        }
    });

    // build tasks
    grunt.registerTask('build', ['clean:dist', 'sass:dist', 'uglify:dist', 'htmlmin:dist', 'copy:dist']);

    // dev tasks
    grunt.registerTask('serve', ['build', 'express:dev', 'watch']);
    grunt.registerTask('default', 'serve');
};