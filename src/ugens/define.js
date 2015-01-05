;(function() {
  var slice = Array.prototype.slice

  var make = wires.ugens.make,
      metadata = wires.ugens.metadata


  function define(ugen) {
    return function() {
      return make(ugen, slice.call(arguments))
    }
  }


  metadata.forEach(function(ugen) {
    wires[ugen.exportName] = define(ugen)
  })
})()
