// Config
var package = require('./package.json');
var platform = 'gulp';
var buildConfig = require('./lib/build-config.js')(platform);

// Gulp
var gulp = require('gulp');
var pump = require('pump');
var run = require('run-sequence');

// Gulp Plugins
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var htmlmin = require('gulp-htmlmin');

// Environment Variable Modification for Express
process.env.NODE_ENV = 'development';
process.env.PLATFORM = platform;
process.env.PORT = 3001;

// Live Server
var gls = require('gulp-live-server');

// Tasks
gulp.task('sass', function (cb) {
    var tasks = [
        gulp.src(buildConfig.app.styles.files),
        sourcemaps.init(),
        sass({ outputStyle: 'compressed' }),
        rename({ extname: '.min.css' }),
        gulp.dest(buildConfig.dist.basePath)
    ];

    pump(tasks, cb);
});

gulp.task('uglify', function (cb) {
    var tasks = [
        gulp.src(buildConfig.build.uglify),
        sourcemaps.init(),
        concat('app.js'),
        rename({ extname: '.min.js' }),
        uglify(),
        gulp.dest(buildConfig.dist.basePath)
    ];

    pump(tasks, cb);
});

gulp.task('copy:images', function (cb) {
    var tasks = [
        gulp.src(buildConfig.app.images.files, { cwd: buildConfig.app.images.cwd }),
        gulp.dest(buildConfig.dist.images)
    ];

    pump(tasks, cb);
});

gulp.task('copy:fonts', function (cb) {
    var tasks = [
        gulp.src(buildConfig.app.fonts.files, { cwd: buildConfig.app.fonts.cwd }),
        gulp.dest(buildConfig.dist.fonts)
    ];

    pump(tasks, cb);
});

gulp.task('htmlmin', function (cb) {
    var tasks = [
        gulp.src(buildConfig.app.html.files, { cwd: buildConfig.app.html.cwd }),
        htmlmin({ collapseWhitespace: true }),
        gulp.dest(buildConfig.dist.html)
    ];

    pump(tasks, cb);
});

gulp.task('clean', function (cb) {
    var tasks = [
        gulp.src(buildConfig.dist.basePath, { read: false }),
        clean()
    ];

    pump(tasks, cb);
});

gulp.task('watch', function () {
    gulp.watch(buildConfig.app.styles.watch, ['sass']);
    gulp.watch(buildConfig.app.scripts.files, ['uglify']);
    gulp.watch(buildConfig.app.html.files, ['htmlmin']);
});

gulp.task('server', function (cb) {
    var serverFileName = 'server.js',
        server = gls.new(serverFileName);

    server.start();

    // If any distribution files change reload them in the browser
    gulp.watch([buildConfig.dist.basePath + '**\*'], function (file) {
        console.log('file changed!', file);
        server.notify.apply(server, [file]);
    });

    gulp.watch(serverFileName, server.start.bind(server));
});

// build tasks
gulp.task('build', function (cb) {
    // By default, gulp will attempt to run tasks in parallel, but we have some dependencies to manage
    run('clean', ['sass', 'uglify', 'htmlmin', 'copy:images', 'copy:fonts'], cb);
});

// dev tasks
gulp.task('serve', function (cb) {
    run('build', ['watch', 'server']);
});

gulp.task('default', ['serve']);