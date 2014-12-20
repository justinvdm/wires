wires.rout = function() {
  var ensure = sig.ensure,
      redir = sig.redir,
      then = sig.then

  var out = wires.out,
      stop = wires.stop


  function rout(ugen, bus) {
    var s = sig()

    vv(bus || wires.master)
      (stop)
      (then, function() {
        vv(out(ugen, bus))
          (redir, s)
      })
      (redir, s)

    return s
  }


  return rout
}()
