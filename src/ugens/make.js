wires.ugens.make = function() {
  var isArray = Array.isArray

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
      (then, spread, update)
      (redir, out)

    return out

    function enter(params0) {
      gibUgen = applyNew(metadata.ctor, params0)
      meta(gibUgen, metadata)
      put(this, gibUgen)
    }

    function update(v, k) {
      if (!gibUgen) return
      gibUgen[k] = v
    }
  }


  function makeParams(metadata, args) {
    var params = args

    if (!metadata.positionalParams) {
      params = args[args.length - 1]
      if (isObject(params)) args = args.slice(0, -1)
      else params = {}
      setProps(params, metadata.paramNames, args)
    }

    return params
  }


  function defaults(target, source) {
    for (var k in source) {
      if (!source.hasOwnProperty(k)) continue
      if (k in target) continue
      target[k] = source[k]
    }

    return target
  }


  function applyNew(ctor, params) {
    function Surrogate(args) {
      return ctor.apply(this, args)
    }

    Surrogate.prototype = ctor.prototype
    if (isArray(params)) return new Surrogate(params)
    if (isEmpty(params)) return new Surrogate()
    return new Surrogate([params])
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


  return make
}()
