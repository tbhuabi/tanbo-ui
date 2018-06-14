const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const gulpAutoPrefix = require('gulp-autoprefixer');
const gulpCssMin = require('gulp-cssmin');
const gulpConcat = require('gulp-concat');
const gulpSourceMap = require('gulp-sourcemaps');

gulp.task('copy', function () {
  gulp.src('./projects/tanbo/ui/src/assets/**/*').pipe(gulp.dest('./dist/tanbo/ui/assets/'));
});
gulp.task('scss',  function () {
  return gulp.src(['./projects/tanbo/ui/src/assets/scss/index.scss'])
    .pipe(gulpSourceMap.init())
    .pipe(gulpSass())
    .pipe(gulpAutoPrefix())
    .pipe(gulpConcat({
      path: 'index.min.css'
    }))
    .pipe(gulpCssMin())
    .pipe(gulp.dest('./dist/tanbo/ui'));
});

gulp.task('default', ['copy', 'scss']);
