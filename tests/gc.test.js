describe("wires.gc", function() {
  var gc = w.gc,
      cull = gc.cull,
      start = gc.start,
      stop = gc.stop

  var testUtils = w.testUtils,
      timer = testUtils.timer

  var at = timer.at,
      end = timer.end


  function makeUgen(bus) {
    var ugen = new Gibberish.Sine()
    ugen.connect(bus)
    return ugen
  }


  function makeUgens(bus, n) {
    var results = []
    while (n--) results.push(makeUgen(bus))
    return results
  }


  function connected(bus) {
    return bus.inputs
      .map(function(input) { return input.value })
  }

  describe(".cull", function() {
    it("should stop the oldest ugens exceeding the count", function() {
      var lives = gc()
      var b = new Gibberish.Bus()
      var ugens = makeUgens(b, 5) 

      lives.store = ugens
      connected(b).should.deep.equal(ugens)
      cull(lives, 3)
      connected(b).should.deep.equal(ugens.slice(-3))
    })

    it("should stop tracking stopped ugens", function() {
      var lives = gc()
      var b = new Gibberish.Bus()
      var ugens = makeUgens(b, 5)

      lives.store = ugens
      cull(lives, 3)
      lives.store.should.deep.equal(ugens.slice(-3))
    })
  })

  describe(".start", function() {
    it("should cull the live ugens each interval", function(done) {
      var lives = gc()
      var b = new Gibberish.Bus()
      var ugens = makeUgens(b, 5)

      lives.store = ugens
      start(lives, 3, 100)

      vv(timer())
        (at, 110, function() {
          lives.store.should.deep.equal(ugens.slice(-3))
          ugens = makeUgens(b, 5)
          lives.store = ugens
        })
        (at, 210, function() {
          lives.store.should.deep.equal(ugens.slice(-3))
          ugens = makeUgens(b, 5)
          lives.store = ugens
        })
        (at, 310, function() {
          lives.store.should.deep.equal(ugens.slice(-3))
        })
        (end, done)
    })
  })

  describe(".stop", function() {
    it("should stop culling the live ugens", function(done) {
      var lives = gc()
      var b = new Gibberish.Bus()
      var ugens = makeUgens(b, 5)

      lives.store = ugens
      start(lives, 3, 100)

      vv(timer())
        (at, 110, function() {
          lives.store.should.deep.equal(ugens.slice(-3))
          ugens = makeUgens(b, 5)
          lives.store = ugens
          stop(lives)
        })
        (at, 210, function() {
          lives.store.should.deep.equal(ugens)
        })
        (end, done)
    })
  })
})
