wired.stop = function() {
  function stop(ugen, bus) {
    return vv([ugen, bus])
      (sig.all)
      (sig.then, sig.spread(function(ugen, bus) {
        if (!bus) ugen.disconnect()
        else ugen.disconnect(bus)
        return ugen
      }))
      ()
  }


  return stop
}()
