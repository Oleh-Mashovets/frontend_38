const {src, dest, watch, parallel, series} = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');

function convertScss() {
    return src('app/scss/style.scss')
    .pipe(concat('style.min.css'))
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}

function convertJS() {
    return src('app/js/script.js')
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

function watching() {
    watch(['app/js/script.js'], convertJS);
    watch(['app/scss/style.scss'], convertScss);
    watch(['app/index.html']).on('change', browserSync.reload);
}

function browserUpdate() {
    browserSync.init({
        server: {
            baseDir: "app"
        }
    });
}

function clearDist() {
    return src('dist').pipe(clean());
}

function createBuild() {
    return src([
        'app/css/style.min.css',
        'app/js/script.min.js',
        'app/*.html'
    ], {base: 'app'}).pipe(dest('dist'))
}

exports.convertScss = convertScss;
exports.convertJS = convertJS;
exports.watching = watching;
exports.browserUpdate = browserUpdate;
exports.createBuild = createBuild;

exports.build = series(clearDist, createBuild)
exports.default = parallel(convertScss, convertJS, browserUpdate, watching);
