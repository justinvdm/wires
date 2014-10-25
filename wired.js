
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(["sig-js","sig.all","sig.any","drainpipe","gibberish-dsp"], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('sig-js'), require('sig.all'), require('sig.any'), require('drainpipe'), require('gibberish-dsp'));
  } else {
    root.wired = factory(root.sig, root.sig.all, root.sig.any, root.drainpipe, root.Gibberish);
  }
}(this, function(sig, sigAll, sigAny, dp, Gibberish) {

var wired = {}

wired.utils = function() {
  function is(x, type) {
    if (typeof type == 'function') return x instanceof type
    if (type === 'array') return Array.isArray(x, type)
    if (type === 'null') return x === null
    if (x === null && type === 'object') return false

    return (x || 0).type
      ? x.type === type
      : typeof x == type
  }


  return {
    is: is
  }
}()

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
  var u = wired.utils


  function make(ugen, args) {
    var out = sig()
    var params = makeParams(ugen, args)

    dp(params)
      (sig.all)
      (sig.then, function(params0) {
        var gibUgen = new wired.gib[ugen.name](params0)

        dp(params)
          (sig.any)
          (sig.map, sig.spread(function(v, k) { gibUgen[k] = v }))
          (sig.depend, out)

        sig.push(out, gibUgen)
      })
      (sig.depend, out)

    return out
  }


  function makeParams(ugen, args) {
    var params = args[args.length - 1]

    if (u.is(params, 'object')) args = args.slice(0, -1)
    else params = {}

    return setProps(params, ugen.paramNames, args)
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
    return dp([ugen, bus || wired.master])
      (sig.all)
      (sig.then, sig.spread(function(gibUgen, gibBus) {
        gibUgen.connect(gibBus)
        return gibUgen
      }))
      ()
  }


  return out
}()

wired.stop = function() {
  function stop(ugen, bus) {
    return dp([ugen, bus])
      (sig.all)
      (sig.then, sig.spread(function(gibUgen, gibBus) {
        if (!gibBus) gibUgen.disconnect()
        else gibUgen.disconnect(gibBus)
        return gibUgen
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
