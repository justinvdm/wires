wires.rout = function() {
  var ensure = sig.ensure,
      redir = sig.redir,
      each = sig.each

  var out = wires.out,
      stop = wires.stop


  function rout(ugen, bus) {
    var s = sig()

    vv(bus || wires.master)
      (stop)
      (each, function() {
        vv(out(ugen, bus))
          (redir, s)
      })
      (redir, s)

    return s
  }


  return rout
}()
