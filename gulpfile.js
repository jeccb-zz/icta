const gulp = require('gulp');
const eslint = require('gulp-eslint');
const watch = require('gulp-watch');
//const print = require('gulp-print');
const gutil = require('gulp-util');
const chalk = require('chalk');

const lintFiles = ['web/static/js/**/*.js', 'web/static/js/**/*.jsx'];

const lint = () => gulp.src(lintFiles)
    .pipe(eslint())
    .pipe(eslint.format());

gulp.task('eslint', () => {
	lint()
    .pipe(eslint.failAfterError());
});

gulp.task('eslint:watch', () => {
	lint()
		.pipe(eslint.result(result => {}));

	var watcher = gulp.watch(lintFiles, (file) => {
		gulp.src(file.path)
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.result(result => {
				if (result.warningCount == 0 && result.errorCount == 0) {
					gutil.log(chalk.green("ESLint: Everything ok!"));
				}
			}));
	});
});

gulp.task('default', ['eslint'], () => {
});
