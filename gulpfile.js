var gulp = require('gulp')
var karma = require('gulp-karma')
var umd = require('gulp-wrap-umd')
var concat = require('gulp-concat')


var src = [
  'src/index.js'
]


gulp.task('build', function () {
  return gulp.src(src)
    .pipe(concat('wired.js'))
    .pipe(umd({
      exports: 'wired',
      namespace: 'wired',
      deps: [{
        name: 'sig',
        amdName: 'sig-js',
        cjsName: 'sig-js',
        globalName: 'sig'
      }, {
        name: 'sigAll',
        amdName: 'sig.all',
        cjsName: 'sig.all',
        globalName: 'sig.all'
      }, {
        name: 'sigAny',
        amdName: 'sig.any',
        cjsName: 'sig.any',
        globalName: 'sig.any'
      }, {
        name: 'dp',
        amdName: 'drainpipe',
        cjsName: 'drainpipe',
        globalName: 'drainpipe'
      }, {
        name: 'Gibberish',
        amdName: 'gibberish-dsp',
        cjsName: 'gibberish-dsp',
        globalName: 'Gibberish'
      }]
    }))
    .on('error', function(e) {
      console.error(e)
      this.end()
    })
    .pipe(gulp.dest('.'))
})


gulp.task('test', function() {
  return gulp
    .src([
      'bower_components/sig-js/sig.js',
      'bower_components/sig.any/sig.any.js',
      'bower_components/sig.all/sig.all.js',
      'bower_components/drainpipe/drainpipe.js',
      'bower_components/gibberish-dsp/build/gibberish.js',
    ]
    .concat(src)
    .concat([
      'tests/**/*.test.js'
    ]))
    .pipe(karma({
      action: 'watch',
      frameworks: ['mocha', 'chai'],
      browsers: ['Chrome']
    }))
})


gulp.task('default', ['build'])
