var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var minify = require('gulp-minify');



gulp.task('minify', function() {
  return gulp.src('assets/views/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('public'));
});

gulp.task('minify-css', function(){
  return gulp.src('assets/styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('public'));
});

gulp.task('minify-js', function() {
  gulp.src('assets/js/*.js')
    .pipe(minify())
    .pipe(gulp.dest('public'))
});

gulp.task('move',function(){
	gulp.src('node_modules/jquery/dist/jquery.min.js')
	.pipe(gulp.dest('public'))
})
 
gulp.task('default',['minify','minify-css','minify-js','move']);
