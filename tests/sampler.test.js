describe("wires.sampler", function() {
  var slice = Array.prototype.slice

  var sampler = w.sampler,
      sampleOrig = w.sample

  var sampleCalls = []

  function sampleFake() {
    sampleCalls.push(slice.call(arguments))
    return sig()
  }

  beforeEach(function() {
    sampleCalls = []
    w.sample = sampleFake
  })

  afterEach(function() {
    w.sample = sampleOrig
  })

  it("should make a sample immediately", function() {
    sampleCalls.should.be.empty
    var s = sampler('foo.wav', {bar: 'baz'})
    sampleCalls.should.deep.equal([['foo.wav', {bar: 'baz'}]])
  })

  it("should call make a sample whenever it is called", function() {
    var s = sampler('foo.wav', {bar: 'baz'})
    sampleCalls = []

    s()
    sampleCalls.should.deep.equal([['foo.wav', {bar: 'baz'}]])

    s()
    sampleCalls.should.deep.equal([
      ['foo.wav', {bar: 'baz'}],
      ['foo.wav', {bar: 'baz'}]
    ])

    s()
    sampleCalls.should.deep.equal([
      ['foo.wav', {bar: 'baz'}],
      ['foo.wav', {bar: 'baz'}],
      ['foo.wav', {bar: 'baz'}]
    ])
  })
})
