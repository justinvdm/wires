wired.stop = function() {
  function stop(ugen, bus) {
    return dp([ugen, bus])
      (sig.all)
      (sig.then, sig.spread(function(gibUgen, gibBus) {
        if (!gibBus) gibUgen.disconnect()
        else gibUgen.disconnect(gibBus)
        return gibUgen
      }))
      ()
  }


  return stop
}()
