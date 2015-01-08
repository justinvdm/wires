var gulp = require('gulp')
var karma = require('gulp-karma')
var umd = require('gulp-wrap-umd')
var concat = require('gulp-concat')


var src = [
  'src/index.js',
  'src/utils.js',
  'src/init.js',
  'src/ugens/index.js',
  'src/ugens/metadata.js',
  'src/ugens/meta.js',
  'src/ugens/make.js',
  'src/ugens/define.js',
  'src/out.js',
  'src/stop.js',
  'src/rout.js',
  'src/ctl.js',
  'src/sampler.js',
  'src/gc.js',
  'src/tail.js'
]


var testSrc = [
    'bower_components/sig-js/sig.js',
    'bower_components/drainpipe/drainpipe.js',
    'bower_components/gibberish-dsp/build/gibberish.js'
  ]
  .concat(src)
  .concat([
    'tests/init.js',
    'tests/testUtils.js',
    'tests/**/*.test.js'
 ])


gulp.task('build', function () {
  return gulp.src(src)
    .pipe(concat('wires.js'))
    .pipe(umd({
      exports: 'wires',
      namespace: 'wires',
      deps: [{
        name: 'sig',
        amdName: 'sig-js',
        cjsName: 'sig-js',
        globalName: 'sig'
      }, {
        name: 'v',
        amdName: 'drainpipe',
        cjsName: 'drainpipe',
        globalName: 'v'
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
    .src(testSrc)
    .pipe(karma({
      action: 'run',
      frameworks: ['mocha', 'chai'],
      browsers: ['Chrome']
    }))
})


gulp.task('ci', function() {
  return gulp
    .src(testSrc)
    .pipe(karma({
      action: 'run',
      frameworks: ['mocha', 'chai'],
      browsers: ['ChromeNoSandbox'],
      customLaunchers: {
        ChromeNoSandbox: {
          base: 'Chrome',
          flags: ['--no-sandbox']
        }
      }
    }))
})


gulp.task('default', ['build', 'test'])


gulp.task('watch', function() {
  gulp.watch(['src/**/*.js', 'tests/**/*.js'], ['default']);
});
