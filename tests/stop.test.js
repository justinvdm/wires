describe("wires.stop", function() {
  var all = sig.all,
      then = sig.then,
      spread = sig.spread

  var out = w.out,
      bus = w.bus,
      sine = w.sine,
      stop = w.stop


  it("should disconnect the ugen from given bus", function(done) {
    vv([sine(), bus(), bus()])
      (all)
      (then, spread(function(ugen, bus, bus2) {
        out(ugen, bus)
        bus.inputs.should.have.length(1)
        bus.inputs[0].value.should.equal(ugen)

        out(ugen, bus2)
        bus2.inputs.should.have.length(1)
        bus2.inputs[0].value.should.equal(ugen)

        stop(ugen, bus)
        bus.inputs.should.have.length(0)
        bus2.inputs.should.have.length(1)

        stop(ugen, bus2)
        bus.inputs.should.have.length(0)
        bus2.inputs.should.have.length(0)

        done()
      }))
  })
})
