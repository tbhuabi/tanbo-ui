const gulp = require('gulp');

gulp.task('copy', function () {
  gulp.src('./projects/tanbo/ui/src/assets/**/*').pipe(gulp.dest('./dist/tanbo/ui/assets/'));
});

gulp.task('default', ['copy']);
