wired.ugens.make = function() {
  var any = sig.any,
      all = sig.all,
      put = sig.put,
      map = sig.map,
      then = sig.then,
      isSig = sig.isSig,
      depend = sig.depend,
      sticky = sig.sticky,
      spread = sig.spread


  function make(ugen, args) {
    var out = sticky()
    var params = makeParams(ugen, args)

    vv(params)
      (all)
      (then, function(params0) {
        var gibUgen = makeGibUgen(ugen.name, params0)

        vv(params)
          (any)
          (map, spread(function(v, k) { gibUgen[k] = v }))
          (depend, out)

        put(out, gibUgen)
      })
      (depend, out)

    return out
  }


  function makeParams(ugen, args) {
    var params = args[args.length - 1]

    if (isObject(params)) args = args.slice(0, -1)
    else params = {}

    return setProps(params, ugen.paramNames, args)
  }


  function makeGibUgen(name, params) {
    var type = wired.gib[name]

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


  return make
}()
