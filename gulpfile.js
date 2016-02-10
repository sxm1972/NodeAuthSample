	var gulp = require('gulp');
	var nodemon = require('gulp-nodemon');
	var jshint = require('gulp-jshint');
	var jscs = require('gulp-jscs');

	var jsFiles = ['*.js', 'src/**/*.js'];
	gulp.task('code', function() {
		return gulp.src(jsFiles).pipe(jscs());
	});

	gulp.task('style', function() {
		return gulp.src(jsFiles)
			.pipe(jshint())
			.pipe(jshint.reporter('jshint-stylish', {
				verbose: true
			}))
			.pipe(jscs());
	});

	gulp.task('default', function() {
		nodemon({
				script: 'server.js',
				ext: 'js',
				ignore: ['./node_modules/**']
			})
			.on('restart', function() {
				console.log('Gulp is restarting the script');

			});
	});