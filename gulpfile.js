'use strict';

var autoprefixer = require('gulp-autoprefixer');
var csso         = require('gulp-csso');
var del          = require('del');
var gulp         = require('gulp');
var runSequence  = require('run-sequence');
var sass         = require('gulp-sass');
var uglify       = require('gulp-uglify');
var node_sass    = require('node-sass');

// Gulp task to minify CSS files
gulp.task('scss', function () {
  return gulp.src('assets/scss/style.scss')
    // Compile SASS files
    .pipe(sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.'],
      onError: console.error.bind(console, 'Sass error:')
    }))
    // Minify the file
    .pipe(csso())
    // Output
    .pipe(gulp.dest('assets/css'))
});

// Gulp task to minify JavaScript files
gulp.task('js', function() {
  return gulp.src('assets/js/*.js')
    // Minify the file
    .pipe(uglify())
    // Output
    .pipe(gulp.dest('assets/js/min'))
});

// Watch all SASS and JavaScript files
gulp.task('watch', function() {
    gulp.watch('scss');
    gulp.watch('js');
});