wires.out = function() {
  var all = sig.all,
      then = sig.then,
      spread = sig.spread

  function out(ugen, bus) {
    return vv([ugen, bus || wires.master])
      (all)
      (then, spread(function(ugen, bus) {
        ugen.connect(bus)
        wires.lives.store.push(ugen)
        return ugen
      }))
      ()
  }


  return out
}()
