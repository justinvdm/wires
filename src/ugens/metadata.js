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
