describe("wires.rout", function() {
  var all = sig.all,
      each = sig.each,
      spread = sig.spread

  var rout = w.rout,
      out = w.out,
      bus = w.bus,
      sine = w.sine,
      stop = w.stop,
      master = w.master,
      make = w.ugens.make

  it("should connect the ugen to the given bus", function(done) {
    vv([sine(), bus()])
      (all)
      (each, spread, function(ugen, bus) {
        rout(ugen, bus)
        bus.inputs.should.have.length(1)
        bus.inputs[0].value.should.equal(ugen)
        done()
     })
  })

  it("should disconnect all other ugens connected to the bus", function(done) {
    vv([sine(), sine(), sine(), bus()])
      (all)
      (each, spread, function(ugen1, ugen2, ugen3, bus) {
        out(ugen1, bus)
        out(ugen2, bus)
        bus.inputs.should.have.length(2)
        bus.inputs[0].value.should.equal(ugen1)
        bus.inputs[1].value.should.equal(ugen2)

        rout(ugen3, bus)
        bus.inputs.should.have.length(1)
        bus.inputs[0].value.should.equal(ugen3)

        done()
     })
  })

  it("should use the master bus as the default bus", function(done) {
    vv(sine())
      (each, function(ugen) {
        rout(ugen)
        master.inputs.should.have.length(1)
        master.inputs[0].value.should.equal(ugen)
        stop(ugen)
        done()
     })
  })
})
