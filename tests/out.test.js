describe("wires.out", function() {
  var all = sig.all,
      then = sig.then,
      spread = sig.spread

  var out = w.out,
      bus = w.bus,
      sine = w.sine,
      stop = w.stop,
      master = w.master,
      make = w.ugens.make

  it("should connect the ugen to the given bus", function(done) {
    vv([sine(), bus()])
      (all)
      (then, spread, function(ugen, bus) {
        out(ugen, bus)
        bus.inputs.should.have.length(1)
        bus.inputs[0].value.should.equal(ugen)
        done()
     })
  })

  it("should use the master bus as the default bus", function(done) {
    vv(sine())
      (then, function(ugen) {
        out(ugen)
        master.inputs.should.have.length(1)
        master.inputs[0].value.should.equal(ugen)
        stop(ugen)
        done()
     })
  })

  it("should support a ugen connect hook", function() {
    var results = []

    function hook(ugen) {
      results.push(ugen)
    }

    vv({
        ctor: Gibberish.Sine,
        paramNames: [],
        exportName: 'sine',
        hooks: {connect: hook}
      })
      (make, [])
      (then, function(ugen) {
        results.should.be.empty
        return ugen
      })
      (out, bus())
      (then, function(ugen) {
        results.should.deep.equal([ugen])
      })
  })
})
