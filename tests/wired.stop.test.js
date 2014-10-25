describe("wired.stop", function() {
  it("should disconnect the ugen from given bus", function(done) {
    dp([w.sine(), w.bus(), w.bus()])
      (sig.all)
      (sig.then, sig.spread(function(ugen, bus, bus2) {
        w.out(ugen, bus)
        bus.inputs.should.have.length(1)
        bus.inputs[0].value.should.equal(ugen)

        w.out(ugen, bus2)
        bus2.inputs.should.have.length(1)
        bus2.inputs[0].value.should.equal(ugen)

        w.stop(ugen, bus)
        bus.inputs.should.have.length(0)
        bus2.inputs.should.have.length(1)

        w.stop(ugen, bus2)
        bus.inputs.should.have.length(0)
        bus2.inputs.should.have.length(0)

        done();
      }))
  })
})
