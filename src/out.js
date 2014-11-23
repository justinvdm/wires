wires.out = function() {
  var all = sig.all,
      then = sig.then,
      spread = sig.spread

  var meta = wires.ugens.meta


  function out(ugen, bus) {
    return vv([ugen, bus || wires.master])
      (all)
      (then, spread(function(ugen, bus) {
        ugen.connect(bus)
        wires.lives.store.push(ugen)

        var hook = (meta(ugen).hooks || 0).connect
        if (hook) hook(ugen)

        return ugen
      }))
      ()
  }


  return out
}()
