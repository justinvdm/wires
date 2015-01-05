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
    connect: function(ugen) {
      ugen.note()
    }
  }
}]
