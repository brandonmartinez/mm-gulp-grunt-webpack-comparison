// Config
const package = require('./package.json');
const platform = 'gulp';
const buildConfig = require('./lib/build-config.js')(platform);

// Gulp
const gulp = require('gulp');
const pump = require('pump');
const run = require('run-sequence');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

// Gulp Plugins
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const htmlmin = require('gulp-htmlmin');
const browserify = require('browserify');
const babelify = require('babelify');
const uglify = require('gulp-uglify');
const webpack = require('gulp-webpack');

// Environment Variable Modification for Express
process.env.NODE_ENV = 'development';
process.env.PLATFORM = platform;
process.env.PORT = 3001;
process.env.USE_WEBPACK = process.env.USE_WEBPACK || false;

// Live Server
var gls = require('gulp-live-server');

// Tasks
gulp.task('styles', function (cb) {
    var tasks = [
        gulp.src(buildConfig.app.styles.files),
        sourcemaps.init(),
        sass({
            outputStyle: 'compressed'
        }),
        rename({
            extname: '.min.css'
        }),
        gulp.dest(buildConfig.dist.basePath)
    ];

    pump(tasks, cb);
});

gulp.task('scripts', function (cb) {
    var tasks;

    if (process.env.USE_WEBPACK) {
        tasks = [
            gulp.src(buildConfig.app.scripts.file),
            webpack(require('./webpack.config')),
            gulp.dest(buildConfig.dist.basePath)
        ];
    } else {
        tasks = [
            browserify({
                entries: buildConfig.app.scripts.file,
                debug: true
            })
            .transform(babelify)
            .bundle(),
            //gulp.src(buildConfig.build.babel),
            source('app.js'),
            buffer(),
            sourcemaps.init({
                loadMaps: true
            }),
            babel(),
            uglify(),
            concat('app.min.js'),
            sourcemaps.write('.'),
            gulp.dest(buildConfig.dist.basePath)
        ];
    }

    pump(tasks, cb);
});

gulp.task('images', function (cb) {
    var tasks = [
        gulp.src(buildConfig.app.images.files, {
            cwd: buildConfig.app.images.cwd
        }),
        gulp.dest(buildConfig.dist.images)
    ];

    pump(tasks, cb);
});

gulp.task('fonts', function (cb) {
    var tasks = [
        gulp.src(buildConfig.app.fonts.files, {
            cwd: buildConfig.app.fonts.cwd
        }),
        gulp.dest(buildConfig.dist.fonts)
    ];

    pump(tasks, cb);
});

gulp.task('html', function (cb) {
    var tasks = [
        gulp.src(buildConfig.app.html.files, {
            cwd: buildConfig.app.html.cwd
        }),
        htmlmin({
            collapseWhitespace: true
        }),
        gulp.dest(buildConfig.dist.html)
    ];

    pump(tasks, cb);
});

gulp.task('clean', function (cb) {
    var tasks = [
        gulp.src(buildConfig.dist.basePath, {
            read: false
        }),
        clean()
    ];

    pump(tasks, cb);
});

gulp.task('watch', function () {
    gulp.watch(buildConfig.app.styles.watch, ['styles']);
    gulp.watch(buildConfig.app.scripts.files, ['scripts']);
    gulp.watch(buildConfig.app.html.files, ['html']);
});

gulp.task('server', function (cb) {
    var serverFileName = 'server.js',
        server = gls.new(serverFileName);

    server.start();
});

// build tasks
gulp.task('build', function (cb) {
    // By default, gulp will attempt to run tasks in parallel, but we have some dependencies to manage
    run('clean', ['styles', 'scripts', 'html', 'images', 'fonts'], cb);
});

// dev tasks
gulp.task('serve', function (cb) {
    run('build', ['watch', 'server']);
});

gulp.task('default', ['serve']);