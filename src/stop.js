wired.stop = function() {
  var all = sig.all,
      then = sig.then,
      spread = sig.spread


  function stop(ugen, bus) {
    return vv([ugen, bus])
      (all)
      (then, spread(function(ugen, bus) {
        if (!bus) ugen.disconnect()
        else ugen.disconnect(bus)
        return ugen
      }))
      ()
  }


  return stop
}()
