wired.attach = function(conf) {
  var define = wired.ugens.define
  wired.gib = conf.gib
  wired.master = wired.gib[conf.master]

  conf.meta.forEach(function(ugen) {
    wired[ugen.exportName] = define(ugen)
  })
}
