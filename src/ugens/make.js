wired.ugens.make = function() {
  function make(ugen, args) {
    var out = sig.sticky()
    var params = makeParams(ugen, args)

    vv(params)
      (sig.all)
      (sig.then, function(params0) {
        var gibUgen = new wired.gib[ugen.name](params0)

        vv(params)
          (sig.any)
          (sig.map, sig.spread(function(v, k) { gibUgen[k] = v }))
          (sig.depend, out)

        sig.put(out, gibUgen)
      })
      (sig.depend, out)

    return out
  }


  function makeParams(ugen, args) {
    var params = args[args.length - 1]

    if (isObject(params)) args = args.slice(0, -1)
    else params = {}

    return setProps(params, ugen.paramNames, args)
  }


  function isObject(v) {
    return !sig.isSig(v)
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
