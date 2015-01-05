
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
    Gibberish.init()
    wires.master = Gibberish.out

    wires.lives = wires.gc()
    wires.gc.start(wires.lives, conf.maxLives, conf.maintainInterval)
  }
  

  return init
}()

wires.ugens = {}

wires.ugens.metadata = function() {
  return [{
    ctor: Gibberish.Sampler,
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
    ctor: Gibberish.ugen,
    exportName: 'ugen',
    paramNames: []
  }, {
    ctor: Gibberish.future,
    exportName: 'future',
    paramNames: []
  }, {
    ctor: Gibberish.Proxy2,
    exportName: 'proxy2',
    paramNames: []
  }, {
    ctor: Gibberish.Proxy3,
    exportName: 'proxy3',
    paramNames: []
  }, {
    ctor: Gibberish.oscillator,
    exportName: 'oscillator',
    paramNames: []
  }, {
    ctor: Gibberish.Wavetable,
    exportName: 'wavetable',
    paramNames: []
  }, {
    ctor: Gibberish.Table,
    exportName: 'table',
    paramNames: ['frequency', 'amp', 'sync']
  }, {
    ctor: Gibberish.asmSine2,
    exportName: 'asmSine2',
    paramNames: ['frequency', 'amp', 'sr']
  }, {
    ctor: Gibberish.Sine,
    exportName: 'sine',
    paramNames: ['frequency', 'amp', 'sync']
  }, {
    ctor: Gibberish.Sine2,
    exportName: 'sine2',
    paramNames: ['frequency', 'amp', 'sync', 'pan']
  }, {
    ctor: Gibberish.Square,
    exportName: 'square',
    paramNames: ['frequency', 'amp', 'sync']
  }, {
    ctor: Gibberish.Saw,
    exportName: 'saw',
    paramNames: ['frequency', 'amp', 'sync']
  }, {
    ctor: Gibberish.Saw2,
    exportName: 'saw2',
    paramNames: ['frequency', 'amp', 'sync', 'pan']
  }, {
    ctor: Gibberish.Triangle,
    exportName: 'triangle',
    paramNames: ['frequency', 'amp', 'sync']
  }, {
    ctor: Gibberish.Triangle2,
    exportName: 'triangle2',
    paramNames: ['frequency', 'amp', 'sync', 'pan']
  }, {
    ctor: Gibberish.Saw3,
    exportName: 'saw3',
    paramNames: ['frequency', 'amp', 'sync', 'sr']
  }, {
    ctor: Gibberish.PWM,
    exportName: 'pwm',
    paramNames: ['frequency', 'amp', 'pulsewidth', 'sr']
  }, {
    ctor: Gibberish.Noise,
    exportName: 'noise',
    paramNames: ['amp']
  }, {
    ctor: Gibberish.KarplusStrong,
    exportName: 'karplusStrong',
    paramNames: ['blend', 'damping', 'amp', 'channels', 'pan']
  }, {
    ctor: Gibberish.PolyKarplusStrong,
    exportName: 'polyKarplusStrong',
    paramNames: ['inputs', 'amp', 'pan']
  }, {
    ctor: Gibberish.bus,
    exportName: 'bus',
    paramNames: []
  }, {
    ctor: Gibberish.Bus,
    exportName: 'bus',
    paramNames: ['inputs', 'amp']
  }, {
    ctor: Gibberish.Bus2,
    exportName: 'bus2',
    paramNames: ['inputs', 'amp', 'pan']
  }, {
    ctor: Gibberish.envelope,
    exportName: 'envelope',
    paramNames: []
  }, {
    ctor: Gibberish.ExponentialDecay,
    exportName: 'exponentialDecay',
    paramNames: ['decay', 'length']
  }, {
    ctor: Gibberish.Line,
    exportName: 'line',
    paramNames: ['start', 'end', 'time', 'loops']
  }, {
    ctor: Gibberish.AD,
    exportName: 'ad',
    paramNames: ['attack', 'decay']
  }, {
    ctor: Gibberish.ADSR,
    exportName: 'adsr',
    paramNames: ['attack', 'decay', 'sustain', 'release', 'attackLevel', 'sustainLevel', 'releaseTrigger']
  }, {
    ctor: Gibberish.ADR,
    exportName: 'adr',
    paramNames: ['attack', 'decay', 'release', 'attackLevel', 'releaseLevel']
  }, {
    ctor: Gibberish.Follow,
    exportName: 'follow',
    paramNames: ['input', 'bufferSize', 'mult', 'useAbsoluteValue']
  }, {
    ctor: Gibberish.SingleSampleDelay,
    exportName: 'singleSampleDelay',
    paramNames: ['input', 'amp']
  }, {
    ctor: Gibberish.Record,
    exportName: 'record',
    paramNames: ['input', 'size']
  }, {
    ctor: Gibberish.effect,
    exportName: 'effect',
    paramNames: []
  }, {
    ctor: Gibberish.Distortion,
    exportName: 'distortion',
    paramNames: ['input', 'amount']
  }, {
    ctor: Gibberish.Gain,
    exportName: 'gain',
    paramNames: ['input', 'amount']
  }, {
    ctor: Gibberish.Delay,
    exportName: 'delay',
    paramNames: ['input', 'time', 'feedback', 'wet', 'dry']
  }, {
    ctor: Gibberish.Decimator,
    exportName: 'decimator',
    paramNames: ['input', 'bitDepth', 'sampleRate']
  }, {
    ctor: Gibberish.RingModulation,
    exportName: 'ringModulation',
    paramNames: ['input', 'frequency', 'amp', 'mix']
  }, {
    ctor: Gibberish.DCBlock,
    exportName: 'dcblock',
    paramNames: ['input']
  }, {
    ctor: Gibberish.Tremolo,
    exportName: 'tremolo',
    paramNames: ['input', 'frequency', 'amp']
  }, {
    ctor: Gibberish.OnePole,
    exportName: 'onePole',
    paramNames: ['input', 'a0', 'b1']
  }, {
    ctor: Gibberish.Filter24,
    exportName: 'filter24',
    paramNames: ['input', 'cutoff', 'resonance', 'isLowPass']
  }, {
    ctor: Gibberish.SVF,
    exportName: 'svf',
    paramNames: ['input', 'cutoff', 'q', 'mode', 'sr']
  }, {
    ctor: Gibberish.Biquad,
    exportName: 'biquad',
    paramNames: ['input']
  }, {
    ctor: Gibberish.Flanger,
    exportName: 'flanger',
    paramNames: ['input', 'rate', 'feedback', 'amount', 'offset']
  }, {
    ctor: Gibberish.Vibrato,
    exportName: 'vibrato',
    paramNames: ['input', 'rate', 'amount', 'offset']
  }, {
    ctor: Gibberish.BufferShuffler,
    exportName: 'bufferShuffler',
    paramNames: ['input', 'chance', 'rate', 'length', 'reverseChange', 'pitchChance', 'pitchMin', 'pitchMax', 'wet', 'dry']
  }, {
    ctor: Gibberish.Reverb,
    exportName: 'reverb',
    paramNames: ['input', 'wet', 'dry', 'roomSize', 'damping']
  }, {
    ctor: Gibberish.synth,
    exportName: 'synth',
    paramNames: []
  }, {
    ctor: Gibberish.Synth,
    exportName: 'synth',
    paramNames: ['frequency', 'pulsewidth', 'attack', 'decay', 'sustain', 'release', 'attackLevel', 'sustainLevel', 'releaseTrigger', 'glide', 'amp', 'channels', 'pan', 'sr']
  }, {
    ctor: Gibberish.PolySynth,
    exportName: 'polySynth',
    paramNames: ['inputs', 'amp', 'pan']
  }, {
    ctor: Gibberish.Synth2,
    exportName: 'synth2',
    paramNames: ['frequency', 'pulsewidth', 'attack', 'decay', 'sustain', 'release', 'attackLevel', 'sustainLevel', 'releaseTrigger', 'cutoff', 'resonance', 'useLowPassFilter', 'glide', 'amp', 'channels', 'pan', 'sr']
  }, {
    ctor: Gibberish.PolySynth2,
    exportName: 'polySynth2',
    paramNames: ['inputs', 'amp', 'pan']
  }, {
    ctor: Gibberish.FMSynth,
    exportName: 'fmsynth',
    paramNames: ['frequency', 'cmRatio', 'index', 'attack', 'decay', 'sustain', 'release', 'attackLevel', 'sustainLevel', 'releaseTrigger', 'glide', 'amp', 'channels', 'pan']
  }, {
    ctor: Gibberish.PolyFM,
    exportName: 'polyFm',
    paramNames: ['inputs', 'amp', 'pan']
  }, {
    ctor: Gibberish.MonoSynth,
    exportName: 'monoSynth',
    paramNames: ['attack', 'decay', 'cutoff', 'resonance', 'amp1', 'amp2', 'amp3', 'filterMult', 'isLowPass', 'pulsewidth', 'amp', 'detune2', 'detune3', 'octave2', 'octave3', 'glide', 'pan', 'frequency', 'channels']
  }, {
    ctor: Gibberish.Sequencer2,
    exportName: 'sequencer2',
    paramNames: ['rate', 'isRunning', 'nextTime']
  }, {
    ctor: Gibberish.Sequencer,
    exportName: 'sequencer',
    paramNames: []
  }, {
    ctor: Gibberish.PolySeq,
    exportName: 'polySeq',
    paramNames: ['rate', 'isRunning', 'nextTime']
  }, {
    ctor: Gibberish.Input,
    exportName: 'input',
    paramNames: ['input', 'amp', 'channels']
  }, {
    ctor: Gibberish.Kick,
    exportName: 'kick',
    paramNames: ['pitch', 'decay', 'tone', 'amp', 'sr']
  }, {
    ctor: Gibberish.Conga,
    exportName: 'conga',
    paramNames: ['pitch', 'amp', 'sr']
  }, {
    ctor: Gibberish.Clave,
    exportName: 'clave',
    paramNames: ['pitch', 'amp', 'sr']
  }, {
    ctor: Gibberish.Tom,
    exportName: 'tom',
    paramNames: ['pitch', 'amp', 'sr']
  }, {
    ctor: Gibberish.Cowbell,
    exportName: 'cowbell',
    paramNames: ['amp', 'pitch', 'bpfFreq', 'bpfRez', 'decay', 'decayCoeff', 'sr']
  }, {
    ctor: Gibberish.Snare,
    exportName: 'snare',
    paramNames: ['cutoff', 'decay', 'tune', 'snappy', 'amp', 'sr']
  }, {
    ctor: Gibberish.Hat,
    exportName: 'hat',
    paramNames: ['amp', 'pitch', 'bpfFreq', 'bpfRez', 'hpfFreq', 'hpfRez', 'decay', 'decay2', 'sr']
  }, {
    ctor: Gibberish.Binops.Add,
    exportName: 'add',
    positionalParams: true
  }, {
    ctor: Gibberish.Binops.Sub,
    exportName: 'sub',
    positionalParams: true
  }, {
    ctor: Gibberish.Binops.Mul,
    exportName: 'mul',
    positionalParams: true
  }, {
    ctor: Gibberish.Binops.Div,
    exportName: 'div',
    positionalParams: true
  }, {
    ctor: Gibberish.Binops.Mod,
    exportName: 'mod',
    positionalParams: true
  }, {
    ctor: Gibberish.Binops.Abs,
    exportName: 'abs',
    positionalParams: true
  }, {
    ctor: Gibberish.Binops.Sqrt,
    exportName: 'sqrt',
    positionalParams: true
  }, {
    ctor: Gibberish.Binops.Pow,
    exportName: 'pow',
    positionalParams: true
  }, {
    ctor: Gibberish.Binops.Clamp,
    exportName: 'clamp',
    paramNames: ['input', 'min', 'max']
  }, {
    ctor: Gibberish.Binops.Merge,
    exportName: 'merge',
    positionalParams: true
  }]
}()

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

;(function() {
  var slice = Array.prototype.slice

  var make = wires.ugens.make,
      metadata = wires.ugens.metadata


  function define(ugen) {
    return function() {
      return make(ugen, slice.call(arguments))
    }
  }


  metadata.forEach(function(ugen) {
    wires[ugen.exportName] = define(ugen)
  })
})()

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
        return obj instanceof Gibberish.bus
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
    maxLives: 128,
    maintainInterval: 2000
  })
})()

return wires;

}));
