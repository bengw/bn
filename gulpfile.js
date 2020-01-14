'use strict';

var autoprefixer = require('gulp-autoprefixer');
var csso         = require('gulp-csso');
var del          = require('del');
var gulp         = require('gulp');
var runSequence  = require('run-sequence');
var sass         = require('gulp-sass');
var uglify       = require('gulp-uglify');
var node_sass    = require('node-sass');

// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

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
    // Auto-prefix css styles for cross browser compatibility
    .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    // Minify the file
    .pipe(csso())
    // Output
    .pipe(gulp.dest('assets/css'))
});

gulp.task('scss--admin', function () {
  return gulp.src('admin/scss/admin.scss')
    // Compile SASS files
    .pipe(sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.'],
      onError: console.error.bind(console, 'Sass error:')
    }))
    // Auto-prefix css styles for cross browser compatibility
    .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    // Minify the file
    .pipe(csso())
    // Output
    .pipe(gulp.dest('admin/css'))
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
  gulp.watch('assets/scss/*.scss', gulp.series('scss'));
  gulp.watch('admin/scss/*.scss', gulp.series('scss--admin'));
  gulp.watch('assets/js/*.js', gulp.series('js'));
});