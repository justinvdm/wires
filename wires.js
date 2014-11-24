
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(["sig-js","drainpipe","gibberish-dsp"], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('sig-js'), require('drainpipe'), require('gibberish-dsp'));
  } else {
    root.wires = factory(root.sig, root.v, root.Gibberish);
  }
}(this, function(sig, v, Gibberish) {

var wires = {}

wires.utils = function() {
  function rm(arr, x) {
    var i = arr.indexOf(x)
    if (i > -1) arr.splice(i, 1)
    return arr
  }


  return {
    rm: rm
  }
}()

wires.init = function() {
  function init(conf) {
    defineUgens(conf)

    wires.gib = conf.gib
    wires.gib.init()
    wires.master = wires.gib[conf.master]

    wires.lives = wires.gc()
    wires.gc.start(wires.lives, conf.maxLives, conf.maintainInterval)
  }
  

  function defineUgens(conf) {
    var define = wires.ugens.define

    conf.metadata.forEach(function(ugen) {
      wires[ugen.exportName] = define(ugen)
    })
  }


  return init
}()

wires.ugens = {}

wires.ugens.metadata = [{
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
}, {
  name: 'Sampler',
  exportName: 'sampler',
  paramNames: [
    'file',
    'pitch',
    'amp',
    'isRecording',
    'isPlaying',
    'input',
    'length',
    'start',
    'end',
    'loops',
    'pan'
  ],
  defaults: {
    pitch: 1
  },
  hooks: {
    connect: function(ugen) {
      ugen.note()
    }
  }
}]

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

wires.ugens.define = function() {
  var make = wires.ugens.make


  function define(ugen) {
    return function() {
      return make(ugen, Array.prototype.slice.call(arguments))
    }
  }


  return define
}()

wires.out = function() {
  var all = sig.all,
      then = sig.then,
      spread = sig.spread

  var meta = wires.ugens.meta


  function out(ugen, bus) {
    return vv([ugen, bus || wires.master])
      (all)
      (then, spread(function(ugen, bus) {
        ugen.connect(bus)
        wires.lives.store.push(ugen)

        var hook = (meta(ugen).hooks || 0).connect
        if (hook) hook(ugen)

        return ugen
      }))
      ()
  }


  return out
}()

wires.stop = function() {
  var all = sig.all,
      then = sig.then,
      spread = sig.spread

  var rm = wires.utils.rm


  function stop(ugen, bus) {
    return vv([ugen, bus])
      (all)
      (then, spread(function(ugen, bus) {
        if (!bus) ugen.disconnect()
        else ugen.disconnect(bus)
        rm(wires.lives.store, ugen)
        return ugen
      }))
      ()
  }


  return stop
}()

wires.gc = function() {
  var stopLive = wires.stop


  function gc() {
    return {
      store: [],
      cullId: null
    }
  }


  function cull(lives, hi) {
    var store = lives.store
    var n = store.length - hi
    var removed = store.splice(0, n)
    while (n--) stopLive(removed[n])
    return lives
  }


  function start(lives, n, interval) {
    if (lives.cullId !== null) return
    lives.cullId = setInterval(cull, interval, lives, n)
    return lives
  }


  function stop(lives) {
    clearInterval(lives.cullId)
    lives.cullId = null
    return lives
  }


  gc.cull = cull
  gc.start = start
  gc.stop = stop
  return gc
}()

;(function() {
  wires.init({
    gib: Gibberish,
    master: 'out',
    metadata: wires.ugens.metadata,
    maxLives: 512,
    maintainInterval: 2000
  })
})()

return wires;

}));
