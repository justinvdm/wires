wires.stop = function() {
  var all = sig.all,
      map = sig.map,
      spread = sig.spread

  var rm = wires.utils.rm


  function stop(ugen, bus) {
    return vv([ugen, bus])
      (all)
      (map, spread(function(obj, bus) {
        return obj instanceof wires.gib.bus
          ? disconnectBus(obj)
          : disconnectUgen(obj, bus)
      }))
      ()
  }


  function disconnectBus(bus) {
    var inputs = bus.inputs
    var i = inputs.length
    var input
    while (i--) disconnectUgen(inputs[i].value, bus)
    return bus
  }


  function disconnectUgen(ugen, bus) {
    if (!bus) ugen.disconnect()
    else ugen.disconnect(bus)
    rm(wires.lives.store, ugen)
    return ugen
  }


  return stop
}()
