var gulp = require('gulp'),
  browserify = require('gulp-browserify'),
  sass = require('gulp-sass'),
  refresh = require('gulp-livereload'),
  lr = require('tiny-lr')(),
  concat = require('gulp-concat'),
  through = require('through'),
  embedlr = require('gulp-embedlr'),
  ecstatic = require('ecstatic'),
  http = require('http'),
  lrport = 35729,
  devport = 1337;

gulp.task('sass', function(){
  gulp.src('experiments/*')
    .pipe(through(function(file) {
      gulp.src(file.path+'/src/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(file.path + ''))
        .pipe(refresh(lr));

    }));
});

gulp.task('browserify', function(){
  gulp.src('experiments/*')
    .pipe(through(function(file) {

      gulp.src(file.path+'/src/*.js')
        .pipe(browserify({
          debug: true
        }))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(file.path + ''))
        .pipe(refresh(lr));

    }));
});

gulp.task('html', function(){
  gulp.src('experiments/*')
    .pipe(through(function(file) {

      gulp.src(file.path+'/src/*.html')
        .pipe(embedlr())
        .pipe(gulp.dest(file.path + ''))
        .pipe(refresh(lr));

  }));

});

gulp.task('build', function() {
  gulp.run('html', 'browserify', 'sass');
});

gulp.task('watch', function() {
  http.createServer(ecstatic({ root: __dirname + '/experiments' })).listen(devport);

  lr.listen(lrport, function(err) {
    if(err) return console.log(err);

    gulp.watch('experiments/**/src/*.scss', function() {
      gulp.run('sass');
    });

    gulp.watch(['experiments/**/src/*.js', '!experiments/**/build/*'], function() {
      gulp.run('browserify');
    });

    gulp.watch('experiments/**/src/*.html', function () {
      gulp.run('html');
    });

  });
});