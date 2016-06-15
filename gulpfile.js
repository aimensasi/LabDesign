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
    pngCruch = require('imagemin-pngcrush');

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
    gulp.src(style)
        .pipe(compass({
            sass: 'components/sass',
            image: outputDir + 'images',
            style: outputStyle
        }))
        .on('error', gUtil.log)
        .pipe(gulp.dest(outputDir + 'css'))
        .pipe(connect.reload())
});











