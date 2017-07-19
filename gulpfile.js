
// Requiring packages 
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create(),
    eslint = require('gulp-eslint');


// --------- Gulp Tasks Below ----------------------------------------

// Gulp Scripts Task
gulp.task('scripts', function(){
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


    gulp.watch(['build/js/*.js', 'index.html', 'CSS/*.css']).on('change', browserSync.reload);
});


// Gulp Watch Task
gulp.task('watch', function(){
    gulp.watch('js/*.js', ['scripts']);

} );

// Gulp Eslint Task
gulp.task('lint', () => {
    // ESLint ignores files with "node_modules" paths. 
    // So, it's best to have gulp ignore the directory as well. 
    // Also, Be sure to return the stream from the task; 
    // Otherwise, the task may end before the stream has finished. 
    return gulp.src(['**/*.js','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property 
        // of the file object so it can be used by other modules. 
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console. 
        // Alternatively use eslint.formatEach() (see Docs). 
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on 
        // lint error, return the stream and pipe to failAfterError last. 
        .pipe(eslint.failAfterError());
});
 

gulp.task('default', ['lint'], function () {
    // This will only run if the lint task is successful... 
});

// Gulp Default Task
gulp.task('default', ['watch', 'browser-sync']);