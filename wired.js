
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(["sig-js","drainpipe","gibberish-dsp"], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('sig-js'), require('drainpipe'), require('gibberish-dsp'));
  } else {
    root.wired = factory(root.sig, root.v, root.Gibberish);
  }
}(this, function(sig, v, Gibberish) {

var wired = {}

wired.attach = function(conf) {
  var define = wired.ugens.define
  wired.gib = conf.gib
  wired.master = wired.gib[conf.master]

  conf.meta.forEach(function(ugen) {
    wired[ugen.exportName] = define(ugen)
  })
}

wired.ugens = {}

wired.ugens.meta = [{
  exportName: 'sine',
  name: 'Sine',
  paramNames: [
    'frequency',
    'amp',
    'sync'
  ]
}, {
  exportName: 'bus',
  name: 'Bus',
  paramNames: [
    'inputs',
    'amp'
  ]
}, {
  exportName: 'bus2',
  name: 'Bus2',
  paramNames: [
    'inputs',
    'amp',
    'pan'
  ]
}]

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

wired.ugens.define = function() {
  var make = wired.ugens.make


  function define(ugen) {
    return function() {
      return make(ugen, Array.prototype.slice.call(arguments))
    }
  }


  return define
}()

wired.out = function() {
  function out(ugen, bus) {
    return vv([ugen, bus || wired.master])
      (sig.all)
      (sig.then, sig.spread(function(ugen, bus) {
        ugen.connect(bus)
        return ugen
      }))
      ()
  }


  return out
}()

wired.stop = function() {
  function stop(ugen, bus) {
    return vv([ugen, bus])
      (sig.all)
      (sig.then, sig.spread(function(ugen, bus) {
        if (!bus) ugen.disconnect()
        else ugen.disconnect(bus)
        return ugen
      }))
      ()
  }


  return stop
}()

;(function() {
  Gibberish.init()

  wired.attach({
    gib: Gibberish,
    master: 'out',
    meta: wired.ugens.meta
  })
})()

return wired;

}));
