
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
  name: 'Sampler',
  exportName: 'sample',
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
    connect: function(ugen) { ugen.note() }
  }
}, {
  name: 'ugen',
  exportName: 'ugen',
  paramNames: []
}, {
  name: 'future',
  exportName: 'future',
  paramNames: []
}, {
  name: 'Proxy2',
  exportName: 'proxy2',
  paramNames: []
}, {
  name: 'Proxy3',
  exportName: 'proxy3',
  paramNames: []
}, {
  name: 'oscillator',
  exportName: 'oscillator',
  paramNames: []
}, {
  name: 'Wavetable',
  exportName: 'wavetable',
  paramNames: []
}, {
  name: 'Table',
  exportName: 'table',
  paramNames: ['frequency', 'amp', 'sync']
}, {
  name: 'asmSine2',
  exportName: 'asmSine2',
  paramNames: ['frequency', 'amp', 'sr']
}, {
  name: 'Sine',
  exportName: 'sine',
  paramNames: ['frequency', 'amp', 'sync']
}, {
  name: 'Sine2',
  exportName: 'sine2',
  paramNames: ['frequency', 'amp', 'sync', 'pan']
}, {
  name: 'Square',
  exportName: 'square',
  paramNames: ['frequency', 'amp', 'sync']
}, {
  name: 'Saw',
  exportName: 'saw',
  paramNames: ['frequency', 'amp', 'sync']
}, {
  name: 'Saw2',
  exportName: 'saw2',
  paramNames: ['frequency', 'amp', 'sync', 'pan']
}, {
  name: 'Triangle',
  exportName: 'triangle',
  paramNames: ['frequency', 'amp', 'sync']
}, {
  name: 'Triangle2',
  exportName: 'triangle2',
  paramNames: ['frequency', 'amp', 'sync', 'pan']
}, {
  name: 'Saw3',
  exportName: 'saw3',
  paramNames: ['frequency', 'amp', 'sync', 'sr']
}, {
  name: 'PWM',
  exportName: 'pwm',
  paramNames: ['frequency', 'amp', 'pulsewidth', 'sr']
}, {
  name: 'Noise',
  exportName: 'noise',
  paramNames: ['amp']
}, {
  name: 'KarplusStrong',
  exportName: 'karplusStrong',
  paramNames: ['blend', 'damping', 'amp', 'channels', 'pan']
}, {
  name: 'PolyKarplusStrong',
  exportName: 'polyKarplusStrong',
  paramNames: ['inputs', 'amp', 'pan']
}, {
  name: 'bus',
  exportName: 'bus',
  paramNames: []
}, {
  name: 'Bus',
  exportName: 'bus',
  paramNames: ['inputs', 'amp']
}, {
  name: 'Bus2',
  exportName: 'bus2',
  paramNames: ['inputs', 'amp', 'pan']
}, {
  name: 'envelope',
  exportName: 'envelope',
  paramNames: []
}, {
  name: 'ExponentialDecay',
  exportName: 'exponentialDecay',
  paramNames: ['decay', 'length']
}, {
  name: 'Line',
  exportName: 'line',
  paramNames: ['start', 'end', 'time', 'loops']
}, {
  name: 'AD',
  exportName: 'ad',
  paramNames: ['attack', 'decay']
}, {
  name: 'ADSR',
  exportName: 'adsr',
  paramNames: ['attack', 'decay', 'sustain', 'release', 'attackLevel', 'sustainLevel', 'releaseTrigger']
}, {
  name: 'ADR',
  exportName: 'adr',
  paramNames: ['attack', 'decay', 'release', 'attackLevel', 'releaseLevel']
}, {
  name: 'Follow',
  exportName: 'follow',
  paramNames: ['input', 'bufferSize', 'mult', 'useAbsoluteValue']
}, {
  name: 'SingleSampleDelay',
  exportName: 'singleSampleDelay',
  paramNames: ['input', 'amp']
}, {
  name: 'Record',
  exportName: 'record',
  paramNames: ['input', 'size']
}, {
  name: 'effect',
  exportName: 'effect',
  paramNames: []
}, {
  name: 'Distortion',
  exportName: 'distortion',
  paramNames: ['input', 'amount']
}, {
  name: 'Gain',
  exportName: 'gain',
  paramNames: ['input', 'amount']
}, {
  name: 'Delay',
  exportName: 'delay',
  paramNames: ['input', 'time', 'feedback', 'wet', 'dry']
}, {
  name: 'Decimator',
  exportName: 'decimator',
  paramNames: ['input', 'bitDepth', 'sampleRate']
}, {
  name: 'RingModulation',
  exportName: 'ringModulation',
  paramNames: ['input', 'frequency', 'amp', 'mix']
}, {
  name: 'DCBlock',
  exportName: 'dcblock',
  paramNames: ['input']
}, {
  name: 'Tremolo',
  exportName: 'tremolo',
  paramNames: ['input', 'frequency', 'amp']
}, {
  name: 'OnePole',
  exportName: 'onePole',
  paramNames: ['input', 'a0', 'b1']
}, {
  name: 'Filter24',
  exportName: 'filter24',
  paramNames: ['input', 'cutoff', 'resonance', 'isLowPass']
}, {
  name: 'SVF',
  exportName: 'svf',
  paramNames: ['input', 'cutoff', 'q', 'mode', 'sr']
}, {
  name: 'Biquad',
  exportName: 'biquad',
  paramNames: ['input']
}, {
  name: 'Flanger',
  exportName: 'flanger',
  paramNames: ['input', 'rate', 'feedback', 'amount', 'offset']
}, {
  name: 'Vibrato',
  exportName: 'vibrato',
  paramNames: ['input', 'rate', 'amount', 'offset']
}, {
  name: 'BufferShuffler',
  exportName: 'bufferShuffler',
  paramNames: ['input', 'chance', 'rate', 'length', 'reverseChange', 'pitchChance', 'pitchMin', 'pitchMax', 'wet', 'dry']
}, {
  name: 'Reverb',
  exportName: 'reverb',
  paramNames: ['input', 'wet', 'dry', 'roomSize', 'damping']
}, {
  name: 'synth',
  exportName: 'synth',
  paramNames: []
}, {
  name: 'Synth',
  exportName: 'synth',
  paramNames: ['frequency', 'pulsewidth', 'attack', 'decay', 'sustain', 'release', 'attackLevel', 'sustainLevel', 'releaseTrigger', 'glide', 'amp', 'channels', 'pan', 'sr']
}, {
  name: 'PolySynth',
  exportName: 'polySynth',
  paramNames: ['inputs', 'amp', 'pan']
}, {
  name: 'Synth2',
  exportName: 'synth2',
  paramNames: ['frequency', 'pulsewidth', 'attack', 'decay', 'sustain', 'release', 'attackLevel', 'sustainLevel', 'releaseTrigger', 'cutoff', 'resonance', 'useLowPassFilter', 'glide', 'amp', 'channels', 'pan', 'sr']
}, {
  name: 'PolySynth2',
  exportName: 'polySynth2',
  paramNames: ['inputs', 'amp', 'pan']
}, {
  name: 'FMSynth',
  exportName: 'fmsynth',
  paramNames: ['frequency', 'cmRatio', 'index', 'attack', 'decay', 'sustain', 'release', 'attackLevel', 'sustainLevel', 'releaseTrigger', 'glide', 'amp', 'channels', 'pan']
}, {
  name: 'PolyFM',
  exportName: 'polyFm',
  paramNames: ['inputs', 'amp', 'pan']
}, {
  name: 'MonoSynth',
  exportName: 'monoSynth',
  paramNames: ['attack', 'decay', 'cutoff', 'resonance', 'amp1', 'amp2', 'amp3', 'filterMult', 'isLowPass', 'pulsewidth', 'amp', 'detune2', 'detune3', 'octave2', 'octave3', 'glide', 'pan', 'frequency', 'channels']
}, {
  name: 'Sequencer2',
  exportName: 'sequencer2',
  paramNames: ['rate', 'isRunning', 'nextTime']
}, {
  name: 'Sequencer',
  exportName: 'sequencer',
  paramNames: []
}, {
  name: 'PolySeq',
  exportName: 'polySeq',
  paramNames: ['rate', 'isRunning', 'nextTime']
}, {
  name: 'Input',
  exportName: 'input',
  paramNames: ['input', 'amp', 'channels']
}, {
  name: 'Kick',
  exportName: 'kick',
  paramNames: ['pitch', 'decay', 'tone', 'amp', 'sr']
}, {
  name: 'Conga',
  exportName: 'conga',
  paramNames: ['pitch', 'amp', 'sr']
}, {
  name: 'Clave',
  exportName: 'clave',
  paramNames: ['pitch', 'amp', 'sr']
}, {
  name: 'Tom',
  exportName: 'tom',
  paramNames: ['pitch', 'amp', 'sr']
}, {
  name: 'Cowbell',
  exportName: 'cowbell',
  paramNames: ['amp', 'pitch', 'bpfFreq', 'bpfRez', 'decay', 'decayCoeff', 'sr']
}, {
  name: 'Snare',
  exportName: 'snare',
  paramNames: ['cutoff', 'decay', 'tune', 'snappy', 'amp', 'sr']
}, {
  name: 'Hat',
  exportName: 'hat',
  paramNames: ['amp', 'pitch', 'bpfFreq', 'bpfRez', 'hpfFreq', 'hpfRez', 'decay', 'decay2', 'sr']
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
      map = sig.map,
      spread = sig.spread

  var meta = wires.ugens.meta


  function out(ugen, bus) {
    return vv([ugen, bus || wires.master])
      (all)
      (map, spread, function(ugen, bus) {
        ugen.connect(bus)
        wires.lives.store.push(ugen)

        var hook = (meta(ugen).hooks || 0).connect
        if (hook) hook(ugen)

        return ugen
      })
      ()
  }


  return out
}()

wires.stop = function() {
  var all = sig.all,
      map = sig.map,
      spread = sig.spread

  var rm = wires.utils.rm


  function stop(ugen, bus) {
    return vv([ugen, bus])
      (all)
      (map, spread, function(obj, bus) {
        return obj instanceof wires.gib.bus
          ? disconnectBus(obj)
          : disconnectUgen(obj, bus)
      })
      ()
  }


  function disconnectBus(bus) {
    var inputs = bus.inputs
    var i = inputs.length
    var input
    while (i--) disconnectUgen(inputs[i].value, bus)
    return bus
  }


  function disconnectUgen(ugen, bus) {
    if (!bus) ugen.disconnect()
    else ugen.disconnect(bus)
    rm(wires.lives.store, ugen)
    return ugen
  }


  return stop
}()

wires.rout = function() {
  var ensure = sig.ensure,
      redir = sig.redir,
      then = sig.then

  var out = wires.out,
      stop = wires.stop


  function rout(ugen, bus) {
    var s = sig()

    vv(bus || wires.master)
      (stop)
      (then, function() {
        vv(out(ugen, bus))
          (redir, s)
      })
      (redir, s)

    return s
  }


  return rout
}()

wires.ctl = function() {
  var all = sig.all,
      map = sig.map,
      spread = sig.spread


  function ctl(ugen, params) {
    return vv([ugen, params])
      (all)
      (map, spread, function(ugen, params) {
        for (var k in params) if (params.hasOwnProperty(k)) ugen[k] = params[k]
        return ugen
      })
      ()
  }


  return ctl
}()

wires.sampler = function() {
  var w = wires

  var spread = sig.spread,
      then = sig.then,
      reset = sig.reset

  var slice = Array.prototype.slice


  function sampler() {
    var args = slice.call(arguments)

    // make a sample immediately to cache the file
    var s = make()
    then(s, function() { reset(s) })

    return make

    function make() {
      return spread(args, w.sample)
    }
  }


  return sampler
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
    while (n-- > 0) stopLive(removed[n])
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
    maxLives: 128,
    maintainInterval: 2000
  })
})()

return wires;

}));
