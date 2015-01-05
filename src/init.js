wires.init = function() {
  function init(conf) {
    Gibberish.init()
    wires.master = Gibberish.out

    wires.lives = wires.gc()
    wires.gc.start(wires.lives, conf.maxLives, conf.maintainInterval)
  }
  

  return init
}()
