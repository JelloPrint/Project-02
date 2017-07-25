
// Requiring packages 
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create(),
    eslint = require('gulp-eslint'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    prettyError = require('gulp-prettyerror');


// --------- Gulp Tasks Below ----------------------------------------

// Gulp Scripts Task
gulp.task('scripts', ['lint'], function(){
    // place code for your default task here
  gulp.src('./JavaScript/*.js')
    .pipe(uglify()) //call the uglify function on the files
    .pipe(rename({ extname: '.min.js'})) //rename uglified file
    .pipe(gulp.dest('./build/js'))

});


// Reload Browser
gulp.task('browser-sync', function(){
    browserSync.init({
        server: {
            baseDir: './'
        }
}); // end of Browser sync init


    gulp.watch(['build/js/*.js', 'index.html', 'sass/*.scss']).on('change', browserSync.reload);
});


// Gulp Watch Task
gulp.task('watch', function(){
    gulp.watch('sass/*.scss', ['sass']);
    gulp.watch('js/*.js', ['scripts']);

} );

// Gulp Eslint Task
gulp.task('lint', function() {

    gulp.src(['./js/*.js']) 
    // Also need to use it here..
    //.pipe(prettyError())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
});

// Gulp Sass Task
gulp.task('sass', function() {
   gulp.src('./sass/*.scss')
      .pipe(prettyError())
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('./build/css'))
      .pipe(cssnano())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./build/css'));
});
 

gulp.task('default', ['lint'], function () {
    // This will only run if the lint task is successful... 
});

// Gulp Default Task
gulp.task('default', ['watch', 'browser-sync', 'scripts', 'lint', 'sass' ]);
