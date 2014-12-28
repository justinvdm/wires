wires.ctl = function() {
  var all = sig.all,
      map = sig.map,
      spread = sig.spread


  function ctl(ugen, params) {
    return vv([ugen, params])
      (all)
      (map, spread, function(ugen, params) {
        for (var k in params) if (params.hasOwnProperty(k)) ugen[k] = params[k]
        return ugen
      })
      ()
  }


  return ctl
}()
