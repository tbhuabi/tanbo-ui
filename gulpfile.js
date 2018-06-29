const gulp = require('gulp');

gulp.task('copy', function () {
    gulp.src('./src/tanbo/ui/**/*').pipe(gulp.dest('./library/projects/tanbo/ui/src/'));
});

gulp.task('default', ['copy']);