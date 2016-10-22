var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var multistream = require('gulp-multistream');
var fs = require('fs');
var config = require('./config');
var menu = config.menu;
var fs = require('fs');

gulp.task('default', ['sass', 'jade', 'js']);

gulp.task('sass', function(done) {
	gulp.src('./src/sass/main.scss')
	.pipe(sass())
	.on('error', sass.logError)
	.pipe(gulp.dest('./www/css/'))
	.pipe(minifyCss({
		keepSpecialComments: 0
	}))
	.pipe(rename({ extname: '.min.css' }))
	.pipe(multistream(
		gulp.dest('./www/css/')
	))
	.on('end', function() {
		gulp.src('./src/sass/simple-sidebar.scss')
		.pipe(sass())
		.on('error', sass.logError)
		.pipe(gulp.dest('./www/css/'))
		.pipe(minifyCss({
			keepSpecialComments: 0
		}))
		.pipe(rename({ extname: '.min.css' }))
		.pipe(multistream(
			gulp.dest('./www/css/')
		))
		.on('end', function() {
			gulp.src('./src/sass/styleguide-style.scss')
			.pipe(sass())
			.on('error', sass.logError)
			.pipe(gulp.dest('./www/css/'))
			.pipe(minifyCss({
				keepSpecialComments: 0
			}))
			.pipe(rename({ extname: '.min.css' }))
			.pipe(multistream(
				gulp.dest('./www/css/')
			))
			.on('end', done);
		});
	});
});

var jadeOptions = {
	locals : {
		dev: true,
		menu: JSON.stringify(menu),
		colors: config.colors
	},
	pretty : true,
	doctype: 'html'
};

gulp.task('jade', function(done) {
	fs.readFile('./src/views/main.jade', 'utf-8', function(err, res) {
		var file = res.split('		include menu');
		menu.forEach(function(e, i) {
			e.children.forEach(function(f,i){
				file[0] += '		script(id="/styleguide/partials/'+e.name.toLowerCase()+'/'+f.toLowerCase()+'" type="text/ng-template")\n';
				file[0] += '			include ./partials/styleguide-navigation/'+e.name.toLowerCase()+'/'+f.toLowerCase()+'\n';
			});
		});
		fs.writeFile('./src/views/index.jade', (file[0]+file[1]), function() {
			gulp.src('./src/views/index.jade')
			.pipe(jade(jadeOptions))
			.pipe(gulp.dest('./www/'))
			.on('end', done);
		});
	});
});

gulp.task('js', function(done) {
	try {
		gulp.src([
			'./src/js/main.js'
		])
		.pipe(sourcemaps.init())
		.pipe(concat('main.js'))
		.pipe(sourcemaps.write())
		.pipe(multistream(
			gulp.dest('./www/js')
		))
		.on('end', function() {
			gulp.src([
				'./src/js/directives.js'
			])
			.pipe(sourcemaps.init())
			.pipe(concat('directives.js'))
			.pipe(sourcemaps.write())
			.pipe(multistream(
				gulp.dest('./www/js')
			))
			.on('end', function() {
				gulp.src([
					'./src/js/styleguide-directives.js'
				])
				.pipe(sourcemaps.init())
				.pipe(concat('styleguide-directives.js'))
				.pipe(sourcemaps.write())
				.pipe(multistream(
					gulp.dest('./www/js')
				))
				.on('end', done);
			});
		});
	} catch (e) {
		console.log(e);
	}
});

gulp.task('watch', function() {
	gulp.watch(['./src/views/**/**/*.jade'], ['jade']);
	gulp.watch(['./src/sass/**/**/*.scss'], ['sass']);
	gulp.watch(['./src/js/**/**/*.js'], ['js']);
});
