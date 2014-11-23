describe("wires.out", function() {
  var all = sig.all,
      then = sig.then,
      spread = sig.spread

  it("should connect the ugen to the given bus", function(done) {
    vv([w.sine(), w.bus()])
      (all)
      (then, spread(function(ugen, bus) {
        w.out(ugen, bus)
        bus.inputs.should.have.length(1)
        bus.inputs[0].value.should.equal(ugen)
        done()
     }))
  })

  it("should use the master bus as the default bus", function(done) {
    vv(w.sine())
      (then, function(ugen) {
        w.out(ugen)
        w.master.inputs.should.have.length(1)
        w.master.inputs[0].value.should.equal(ugen)
        done()
     })
  })
})
