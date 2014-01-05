var gulp = require('gulp'),
  browserify = require('gulp-browserify'),
  sass = require('gulp-sass'),
  refresh = require('gulp-livereload'),
  lr = require('tiny-lr')(),
  concat = require('gulp-concat'),
  through = require('through'),
  express = require('express'),
  lrport = 35729,
  devport = 1337;

var app = express();
  app.use(require('connect-livereload')({
    port: lrport
  }));
  app.use(express.static('./experiments'));


gulp.task('sass', function(){
  gulp.src('experiments/*')
    .pipe(through(function(file) {

      gulp.src(file.path+'/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(file.path + '/build'))
        .pipe(refresh(lr));;

    }));
});

gulp.task('browserify', function(){
  gulp.src('experiments/*')
    .pipe(through(function(file) {

      gulp.src(file.path+'/*.js')
        .pipe(browserify({
          debug: true
        }))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(file.path + '/build'))
        .pipe(refresh(lr));;

    }));
});

gulp.task('watch', function() {
  app.listen(devport);
  lr.listen(lrport, function(err) {
    if(err) return console.log(err);

    gulp.watch('experiments/**/*.scss', function() {
      gulp.run('sass');
    });

    gulp.watch(['experiments/**/*.js', '!experiments/**/build/*'], function() {
      gulp.run('browserify');
    });

    gulp.watch('experiments/**/*.html', function (e) {
      lr.changed({body: {files: e.path}});
    })

  })
});