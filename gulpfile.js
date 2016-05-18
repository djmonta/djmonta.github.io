var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var notifier = require('node-notifier');
var watch = require('gulp-watch');

gulp.task('sass', function () {
	return gulp.src('sass/**/*.scss')
	.pipe(watch('sass/**/*.scss'))
	.pipe(plumber({
		errorHandler: function(error) {
			// ここでエラーをキャッチできる
			var title = '[task]' + taskName + ' ' + error.plugin;
			var errorMsg = 'error: ' + error.message;
			console.error(title + '\n' + errorMsg);
			// node-notifierがデスクトップ通知をしてくれる
			notifier.notify({
				title: title,
				message: errorMsg,
				time: 3000
			});
		}
	}))
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'expanded'}))
	.pipe(sourcemaps.write('.'))
	.pipe(plumber.stop())
	.pipe(gulp.dest('css'));
});

gulp.task('sass:watch', function () {
	gulp.watch('sass/**/*.scss', ['sass']);
});

// デフォルトで起動するタスク
gulp.task('default', ['sass', 'sass:watch']);
