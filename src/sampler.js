wires.sampler = function() {
  var w = wires

  var spread = sig.spread,
      then = sig.then,
      reset = sig.reset

  var slice = Array.prototype.slice


  function sampler() {
    var args = slice.call(arguments)

    // make a sample immediately to cache the file
    var s = make()
    then(s, function() { reset(s) })

    return make

    function make() {
      return spread(args, w.sample)
    }
  }


  return sampler
}()
