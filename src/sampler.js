wires.sampler = function() {
  var w = wires

  var spread = sig.spread,
      each = sig.each,
      end = sig.end

  var slice = Array.prototype.slice


  function sampler() {
    var args = slice.call(arguments)

    // make a sample immediately to cache the file
    var s = make()
    each(s, function() { end(s) })

    return make

    function make() {
      return spread(args, w.sample)
    }
  }


  return sampler
}()
