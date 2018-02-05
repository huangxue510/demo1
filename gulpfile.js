var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var htmlmin = require('gulp-htmlmin');

//gulp-htmlmin
gulp.task('html',function () {
  gulp.src('index.html')
  .pipe(htmlmin({
    collapseWhitespace:true,
    removeComments:true
  }))
  .pipe(gulp.dest('dist/'))
  .pipe(browserSync.stream());
  gulp.src('page/**/*.html')
  .pipe(htmlmin({
    collapseWhitespace:true,
    removeComments:true
  }))
  .pipe(gulp.dest('dist/page/'))
  .pipe(browserSync.stream());
})
//压缩js
var ugilfy = require('gulp-uglify');
gulp.task('js',function () {
  gulp.src('js/**/*.js')
  .pipe(ugilfy())
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.stream());
});
//编译less文件并压缩生成的css文件
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
gulp.task('less',function () {
  gulp.src('less/**/*.less')
  .pipe(less())
  .pipe(minifyCSS())
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream());
});
//copy图片到dest文件夹
gulp.task('img',function () {
  gulp.src('images/**/*.*')
  .pipe(gulp.dest('dist/images'))
  .pipe(browserSync.stream());
});
//监视
gulp.task('watch',function () {
  gulp.watch(['index.html','page/**/*.html'],['html']);
  gulp.watch('js/**/*.js',['js']);
  gulp.watch('less/**/*.less',['less']);
  gulp.watch('images/**/*.*',['img']);
});
//浏览器同步刷新
gulp.task('browser-sync',function () {
  browserSync.init({
    server:{
      baseDir:'./dist/'
    },
    port:8888
  });
})
//默认任务
gulp.task('default',['html','less','js','img','watch','browser-sync']);
