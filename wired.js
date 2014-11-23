
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

wired.utils = function() {
  function rm(arr, x) {
    var i = arr.indexOf(x)
    if (i > -1) arr.splice(i, 1)
    return arr
  }


  return {
    rm: rm
  }
}()

wired.init = function() {
  function init(conf) {
    wired.gib = conf.gib
    wired.gib.init()
    wired.master = wired.gib[conf.master]

    defineUgens(conf)
  }
  

  function defineUgens(conf) {
    var define = wired.ugens.define

    conf.meta.forEach(function(ugen) {
      wired[ugen.exportName] = define(ugen)
    })
  }


  return init
}()

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
  var all = sig.all,
      then = sig.then,
      spread = sig.spread

  function out(ugen, bus) {
    return vv([ugen, bus || wired.master])
      (all)
      (then, spread(function(ugen, bus) {
        ugen.connect(bus)
        return ugen
      }))
      ()
  }


  return out
}()

wired.stop = function() {
  var all = sig.all,
      then = sig.then,
      spread = sig.spread


  function stop(ugen, bus) {
    return vv([ugen, bus])
      (all)
      (then, spread(function(ugen, bus) {
        if (!bus) ugen.disconnect()
        else ugen.disconnect(bus)
        return ugen
      }))
      ()
  }


  return stop
}()

;(function() {
  wired.init({
    gib: Gibberish,
    master: 'out',
    meta: wired.ugens.meta
  })
})()

return wired;

}));
