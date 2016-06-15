var gulp = require('gulp'),
    gUtil = require('gulp-util'),
    concat = require('gulp-concat'),
    browerify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    gulpIf = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html'),
    imagemin = require('gulp-imagemin'),
    pngCrush = require('imagemin-pngcrush');

var env,
    outputDir,
    outputStyle,
    styleSrc,
    sassSrc,
    htmlSrc,
    jsSrc,
    imagesSrc;

    env = process.env.NODE_ENV || 'development';

    if(env === 'development'){
        outputDir = 'builds/developments/';
        outputStyle = 'expanded';
    }else if(env === 'production'){
        outputDir = 'builds/productions/';
        outputStyle = 'compressed';
    }

    styleSrc = 'components/sass/style.scss';
    sassSrc = 'components/sass/**/*.scss';
    jsSrc = 'components/script/*.js';
    htmlSrc = 'builds/developments/*.html';
    imagesSrc = 'builds/developments/images/*.*';

gulp.task('compass', function(){
    gulp.src(styleSrc)
        .pipe(compass({
            sass: 'components/sass',
            image: outputDir + 'images',
            style: outputStyle
        }))
        .on('error', gUtil.log)
        .pipe(gulp.dest(outputDir + 'css'))
        .pipe(connect.reload())
});

gulp.task('js', function(){
    gulp.src(jsSrc)
        .pipe(concat('script.js'))
        .pipe(browerify())
        .pipe(gulpIf(env === 'production', uglify()))
        .pipe(gulp.dest(outputDir + 'js'))
        .pipe(connect.reload())
});

gulp.task('html', function(){
    gulp.src(htmlSrc)
        .pipe(gulpIf(env === 'production', minifyHtml()))
        .pipe(gulpIf(env === 'production', gulp.dest(outputDir)))
        .pipe(connect.reload())
});

gulp.task('images', function(){
    gulp.src(imagesSrc)
        .pipe(gulpIf(env === 'production', imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngCrush()]
        })))
        .pipe(gulpIf(env === 'production', gulp.dest(outputDir + 'images')))
        .pipe(connect.reload())
});

gulp.task('connect', function(){
    connect.server({
        root: outputDir,
        livereload: true
    })
});

gulp.task('watch', function(){
    gulp.watch(sassSrc, ['compass']);
    gulp.watch(jsSrc, ['js']);
    gulp.watch(htmlSrc, ['html']);
    gulp.watch(imagesSrc, ['images']);
});

gulp.task('default', ['html', 'js', 'compass', 'images', 'connect', 'watch']);





