var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling etc.
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var notify = require('gulp-notify');

var config = {
     //sassPath: './resources/sass',
     bowerDir: './bower_components' 
};


function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {

  var props = {
    entries: ['./app/' + file],
    debug : true,
    transform:  [reactify]
  };

  // watchify() if watch requested, otherwise run browserify() once
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulp.dest('./build/'));
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}


// run once
gulp.task('scripts', function() {
  return buildScript('main.js', false);
});

// Start a webserver at localhost:3000
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });

    gulp.watch('./build/*.*').on('change', browserSync.reload);
});

// run 'scripts' task first, then watch for future changes
gulp.task('default', ['scripts', 'server'], function() {
  return buildScript('main.js', true);
});


//
// gulp.task('browserify', function() {
//     var bundler = browserify({
//         entries: ['./app/main.js'], // Only need initial file, browserify finds the deps
//         transform: [reactify], // We want to convert JSX to normal javascript
//         debug: true, // Gives us sourcemapping
//         cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
//     });
//     var watcher  = watchify(bundler);
//
//     return watcher
//     .on('update', function () { // When any files update
//         var updateStart = Date.now();
//         console.log('Updating!');
//         watcher.bundle() // Create new bundle that uses the cache for high performance
//         .on('error', handleErrors)
//         .pipe(source('main.js'))
//         // This is where you add uglifying etc.
//         .pipe(gulp.dest('./build/'));
//         console.log('Updated!', (Date.now() - updateStart) + 'ms');
//     })
//
//
//     var props = {
//     entries: ['./scripts/' + file],
//     debug : true,
//     transform:  [babelify, reactify]
//   };
//
//   // watchify() if watch requested, otherwise run browserify() once
//   var bundler = watch ? watchify(browserify(props)) : browserify(props);
//
//   function rebundle() {
//     var stream = bundler.bundle();
//     return stream
//       .on('error', handleErrors)
//       .pipe(source(file))
//       .pipe(gulp.dest('./build/'));
//   }
//
//   // listen for an update and run rebundle
//   bundler.on('update', function() {
//     rebundle();
//     gutil.log('Rebundle...');
//   });
//
//   // run it once the first time buildScript is called
//   return rebundle();
// });
//
//
// // Start a webserver at localhost:3000
// gulp.task('server', function() {
//     browserSync.init({
//         server: {
//             baseDir: "./build"
//         }
//     });
//
//     gulp.watch('./build/*.*').on('change', browserSync.reload);
// });
//
// gulp.task('watch', function() {
//     gulp.watch('js/*.js', ['lint', 'scripts']);
//     gulp.watch('scss/*.scss', ['sass']);
// });
//
// //, 'lint', 'sass', 'scripts', 'watch'
//
// gulp.task('default', ['browserify', 'server']);
