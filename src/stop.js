wired.stop = function() {
  var all = sig.all,
      then = sig.then,
      spread = sig.spread

  var rm = wired.utils.rm


  function stop(ugen, bus) {
    return vv([ugen, bus])
      (all)
      (then, spread(function(ugen, bus) {
        if (!bus) ugen.disconnect()
        else ugen.disconnect(bus)
        rm(wired.lives.store, ugen)
        return ugen
      }))
      ()
  }


  return stop
}()
