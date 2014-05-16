/*global require*/
var gulp = require('gulp'),
    hint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    rename = require('gulp-rename'),
    browserify = require('gulp-browserify');

gulp.task('hint', function(){
    return gulp.src('index.js')
            .pipe(hint())
            .pipe(hint.reporter('default'));
});

gulp.task('test', function() {
    return gulp.src('./test/tests.js')
            .pipe(mocha({
            reporter: 'nyan'
        }));
});

gulp.task('build', function() {
    return gulp.src('index.js')
        .pipe(rename('console.face.js'))
        .pipe(browserify())
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
    gulp.watch('./test/*.js', ['test']);
    gulp.watch('./src/*.js', ['hint', 'test', 'build']);
});

gulp.task('default', ['hint', 'test', 'build', 'watch']);


