const gulp = require('gulp');
const gulpClean = require('gulp-clean');
const gulpInlineNg2Template = require('gulp-inline-ng2-template');
const htmlMin = require('html-minifier');
const gulpSass = require('gulp-sass');
const gulpAutoPrefix = require('gulp-autoprefixer');
const gulpCssMin = require('gulp-cssmin');

gulp.task('clean:aot', function () {
    return gulp.src('./aot', {read: false}).pipe(gulpClean());
});
gulp.task('clean:dist', function () {
    return gulp.src('./dist', {read: false}).pipe(gulpClean());
});
gulp.task('clean:lib', function () {
    return gulp.src('./lib', {read: false}).pipe(gulpClean());
});

gulp.task('clean', ['clean:aot', 'clean:dist', 'clean:lib']);

gulp.task('copy', ['clean'], function () {
    return gulp.src('./src/assets/**/*').pipe(gulp.dest('./lib/assets/'));
});

gulp.task('templateTransfer', ['copy'], function () {
    return gulp.src('./src/modules/**/*.ts').pipe(gulpInlineNg2Template({
        useRelativePaths: true,
        templateProcessor(path, ext, file, cb) {
            try {
                let minifiedFile = htmlMin.minify(file, {
                    collapseWhitespace: true,
                    caseSensitive: true,
                    removeComments: true,
                    removeRedundantAttributes: true
                });
                cb(null, minifiedFile);
            }
            catch (err) {
                cb(err);
            }
        }
    })).pipe(gulp.dest('./lib/modules/'));
});

gulp.task('copyFonts', function () {
   return gulp.src('./src/assets/fonts/angular-ui/fonts/**.*').pipe(gulp.dest('./dist/fonts/'));
});
gulp.task('scss', ['copyFonts'], function () {
    return gulp.src('./src/assets/scss/index.scss')
        .pipe(gulpSass())
        .pipe(gulpAutoPrefix())
        .pipe(gulpCssMin())
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['templateTransfer', 'scss']);