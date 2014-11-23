wires.stop = function() {
  var all = sig.all,
      then = sig.then,
      spread = sig.spread

  var rm = wires.utils.rm


  function stop(ugen, bus) {
    return vv([ugen, bus])
      (all)
      (then, spread(function(ugen, bus) {
        if (!bus) ugen.disconnect()
        else ugen.disconnect(bus)
        rm(wires.lives.store, ugen)
        return ugen
      }))
      ()
  }


  return stop
}()
