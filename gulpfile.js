var es = require('event-stream'),
    inject = require('gulp-inject'),
    concat = require('gulp-concat'),
    gulp=require('gulp'),
    clean=require('rimraf'),
    runSeq = require('run-sequence'),
    uglify = require('gulp-uglify');
 
let buildFileName='Build_'+new Date().getFullYear().toString()+new Date().getMonth().toString()+new Date().getDate().toString()+new Date().getMilliseconds()+'.js';
//clean dist
gulp.task('clean',function(cd){
    console.log('cleaning');
    clean("dist/*",cd);
});
// Concatenate vendor scripts
gulp.task('concatenate-js',function(){
    console.log('concatenate js files');
   return gulp.src(['js/*.js'])
        .pipe(concat(buildFileName))
        .pipe(gulp.dest('./dist'));
});
 
// Concatenate AND minify app sources
// var appStream = gulp.src(['./src/app/*.js'])
//   .pipe(concat('app.js'))
//   .pipe(uglify())
//   .pipe(gulp.dest('./dist'));
//inject files to html
gulp.task('inject-task',function(){
    console.log('Inject js files to html file');
    let sources = gulp.src(['dist/*.js'], {read: false});
    gulp.src('index.html')
        .pipe(inject(es.merge(sources)))
        .pipe(gulp.dest(''));
});

gulp.task('build',function(){
    runSeq('clean','concatenate-js','inject-task')
});

//['clean','concatenate-js','inject-task'])

  



// import {gulp} from '@gulp';
// import {rimraf} from '@rimraf'
// //import {gulp-inject as inject} from '@gulp-inject';
// var inject = require('gulp-inject');
 


// const scriptPath='js/*.js';

// gulp.task('clean',function(cb){
//     console.log("Clean all files in build folder");
//     rimraf("build/*", cb);
// });

// gulp.task("concat-js", function () {
//     console.log("concat js  files");
//     let buildFileName='Build_'+new Date().getFullYear().toString()+new Date().getMonth().toString()+new Date().getDate().toString()+new Date().getMilliseconds()+'.js';
//     return gulp.src([scriptPath])
//        .pipe(count('## js-files selected'))
//        .pipe(concat(buildFileName))
//        .pipe(gulp.dest("build"));
// });

// gulp.src('./src/**/*.html')
//   .pipe(inject(gulp.src('build/*.js', {read: false}), {relative: true}))
//   .pipe(gulp.dest('./src'));

// gulp.task('',function(){

// });

