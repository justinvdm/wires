wired.out = function() {
  function out(ugen, bus) {
    return dp([ugen, bus || wired.master])
      (sig.all)
      (sig.then, sig.spread(function(gibUgen, gibBus) {
        gibUgen.connect(gibBus)
        return gibUgen
      }))
      ()
  }


  return out
}()
