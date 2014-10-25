wired.out = function() {
  function out(ugen, bus) {
    return dp([ugen, bus || wired.master])
      (sig.all)
      (sig.then, sig.spread(function(ugen, bus) {
        ugen.connect(bus)
        return ugen
      }))
      ()
  }


  return out
}()
