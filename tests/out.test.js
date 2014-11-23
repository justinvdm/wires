describe("wires.out", function() {
  var all = sig.all,
      then = sig.then,
      spread = sig.spread

  var out = w.out,
      bus = w.bus,
      sine = w.sine,
      stop = w.stop,
      master = w.master

  it("should connect the ugen to the given bus", function(done) {
    vv([sine(), bus()])
      (all)
      (then, spread(function(ugen, bus) {
        out(ugen, bus)
        bus.inputs.should.have.length(1)
        bus.inputs[0].value.should.equal(ugen)
        done()
     }))
  })

  it("should use the master bus as the default bus", function(done) {
    vv(w.sine())
      (then, function(ugen) {
        out(ugen)
        master.inputs.should.have.length(1)
        master.inputs[0].value.should.equal(ugen)
        stop(ugen)
        done()
     })
  })
})
