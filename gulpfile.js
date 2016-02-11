	var gulp = require('gulp');
	var nodemon = require('gulp-nodemon');
	var jshint = require('gulp-jshint');
	var jscs = require('gulp-jscs');
	var wiredep = require('wiredep').stream;
	var inject = require('gulp-inject');
	var debug = require('gulp-debug');
	
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

	var injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], {read: false});
	var injectOptions = {
		ignorePath: '/public'	
	};
	var options = {
		bowerJson: require('./bower.json'),
		directory: './public/lib',
		ignorePath: '../../public'
	};
	
	gulp.task('inject', function() {
		return gulp.src('./src/views/*.html')
				//.pipe(debug())
				.pipe(wiredep(options))
				//.pipe(debug())
				.pipe(inject(injectSrc, injectOptions))
				//.pipe(debug())
				.pipe(gulp.dest('./src/views'));
				
	});
	gulp.task('default', ['style', 'inject'], function() {
		nodemon({
				script: 'server.js',
				ext: 'js',
				ignore: ['./node_modules/**']
			})
			.on('restart', function() {
				console.log('Gulp is restarting the script');

			});
	});