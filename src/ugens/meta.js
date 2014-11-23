wires.ugens.meta = function() {
  function meta(gib, v) {
    return arguments.length > 1
      ? set(gib, v)
      : get(gib)
  }


  function get(gib) {
    var d = gib._wires_meta
    if (d) return d

    d = {}
    set(gib, d)
    return d
  }


  function set(gib, v) {
    gib._wires_meta = v
    return gib
  }


  meta.set = set
  meta.get = get
  return meta
}()
