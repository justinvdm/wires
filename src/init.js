wires.init = function() {
  function init(conf) {
    defineUgens(conf)

    wires.gib = conf.gib
    wires.gib.init()
    wires.master = wires.gib[conf.master]

    wires.lives = wires.gc()
    wires.gc.start(wires.lives, conf.maxLives, conf.maintainInterval)
  }
  

  function defineUgens(conf) {
    var define = wires.ugens.define

    conf.meta.forEach(function(ugen) {
      wires[ugen.exportName] = define(ugen)
    })
  }


  return init
}()
