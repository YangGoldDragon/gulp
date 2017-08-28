/**
 * Created by 金龙 on 2017/8/27.
 */
var gulp = require('gulp');

//设置默认任务
gulp.task('default', function() {
    gulp.start('css', 'concat-uglify', 'imagemin');
});

//使用gulp-watch插件，自动监听文件改变
var watch = require('gulp-watch');
gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', ['css']);
    gulp.watch('app/js/**/*.js', ['concat-uglify']);
    gulp.watch('app/images/*', ['imagemin']);
});

//将sass转化成css,压缩css,添加css属性前缀
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
gulp.task('css',function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(gulp.dest('dist/css'));
});


//合并、压缩js
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
gulp.task('concat-uglify',function () {
    return gulp.src('app/js/**/*.js')
        .pipe(concat('merge.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

//压缩图片
var imagemin = require('gulp-imagemin');
gulp.task('imagemin',function () {
    return gulp.src('app/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});