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
