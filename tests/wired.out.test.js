describe("wired.out", function() {
  it("should connect the ugen to the given bus", function() {
    var gibUgen
    var gibBus

    var ugen = sig.then(w.sine(), function(newGibUgen) {
      gibUgen = newGibUgen
      return gibUgen
    })

    var bus = sig.then(w.bus(), function(newBusUgen) {
      gibBus = newBusUgen
      return gibBus
    })

    w.out(ugen, bus)
    gibBus.inputs.should.have.length(1)
    gibBus.inputs[0].value.should.equal(gibUgen)
  })

  it("should use the master bus as the default bus", function() {
    var gibUgen
    w.master.inputs.should.be.empty

    var ugen = sig.then(w.sine(), function(newGibUgen) {
      gibUgen = newGibUgen
      return gibUgen
    })

    ugen = w.out(ugen)
    w.master.inputs[0].value.should.equal(gibUgen)

    w.stop(ugen)
  })
})
