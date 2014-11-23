wires.ugens.make = function() {
  var any = sig.any,
      all = sig.all,
      put = sig.put,
      map = sig.map,
      then = sig.then,
      isSig = sig.isSig,
      depend = sig.depend,
      sticky = sig.sticky,
      spread = sig.spread

  var meta = wires.ugens.meta


  function make(metadata, args) {
    var out = sticky()
    var params = makeParams(metadata, args)
    if (metadata.defaults) defaults(params, metadata.defaults)

    vv(params)
      (all)
      (then, function(params0) {
        var gibUgen = makeGibUgen(metadata.name, params0)
        meta(gibUgen, metadata)

        vv(params)
          (any)
          (map, spread(function(v, k) { gibUgen[k] = v }))
          (depend, out)

        put(out, gibUgen)
      })
      (depend, out)

    return out
  }


  function makeParams(metadata, args) {
    var params = args[args.length - 1]

    if (isObject(params)) args = args.slice(0, -1)
    else params = {}

    return setProps(params, metadata.paramNames, args)
  }


  function defaults(target, source) {
    for (var k in source) {
      if (!source.hasOwnProperty(k)) continue
      if (k in target) continue
      target[k] = source[k]
    }

    return target
  }


  function makeGibUgen(name, params) {
    var type = wires.gib[name]

    return !isEmpty(params)
      ? new type(params)
      : new type()
  }


  function isEmpty(obj) {
    var k
    for (k in obj) return false
    return true
  }


  function isObject(v) {
    return !isSig(v)
        && v !== null
        && typeof v == 'object'
  }


  function setProps(props, names, values) {
    var i = -1
    var n = values.length
    while (++i < n) props[names[i]] = values[i]
    return props
  }


  make.makeParams = makeParams
  return make
}()
