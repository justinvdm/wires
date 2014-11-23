wired.init = function() {
  function init(conf) {
    defineUgens(conf)

    wired.gib = conf.gib
    wired.gib.init()
    wired.master = wired.gib[conf.master]

    wired.lives = wired.gc()
    wired.gc.start(wired.lives, conf.maxLives, conf.maintainInterval)
  }
  

  function defineUgens(conf) {
    var define = wired.ugens.define

    conf.meta.forEach(function(ugen) {
      wired[ugen.exportName] = define(ugen)
    })
  }


  return init
}()
