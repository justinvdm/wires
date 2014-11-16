wired.init = function() {
  function init(conf) {
    wired.gib = conf.gib
    wired.gib.init()
    wired.master = wired.gib[conf.master]

    defineUgens(conf)
  }
  

  function defineUgens(conf) {
    var define = wired.ugens.define

    conf.meta.forEach(function(ugen) {
      wired[ugen.exportName] = define(ugen)
    })
  }


  return init
}()
