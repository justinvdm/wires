wires.ugens.make = function() {
  var any = sig.any,
      all = sig.all,
      put = sig.put,
      then = sig.then,
      isSig = sig.isSig,
      once = sig.once,
      val = sig.val,
      spread = sig.spread,
      redir = sig.redir

  var meta = wires.ugens.meta


  function make(metadata, args) {
    var params = makeParams(metadata, args)
    if (metadata.defaults) defaults(params, metadata.defaults)

    var out = val()
    var gibUgen

    vv(params)
      (all)
      (once)
      (then, enter)
      (redir, out)

    vv(params)
      (any)
      (then, spread(update))
      (redir, out)

    return out

    function enter(params0) {
      gibUgen = makeGibUgen(metadata.name, params0)
      meta(gibUgen, metadata)
      put(this, gibUgen)
    }

    function update(v, k) {
      if (!gibUgen) return
      gibUgen[k] = v
    }
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
