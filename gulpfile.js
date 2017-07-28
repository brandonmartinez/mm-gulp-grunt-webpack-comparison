// Config
var package = require('./package.json');
var buildConfig = require('./lib/build-config.js')('gulp');

// Gulp
var gulp = require('gulp');
var pump = require('pump');

// Gulp Plugins
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var htmlmin = require('gulp-htmlmin');
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

gulp.task('server', function(cb){
    var server = gls.new('server.js');
    server.start();
});

// build tasks
gulp.task('build', ['clean', 'sass', 'uglify', 'htmlmin', 'copy:images', 'copy:fonts']);

// dev tasks
gulp.task('serve', ['build', 'server']);
gulp.task('default', ['serve']);