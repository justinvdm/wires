describe("wires.ctl", function() {
  var val = sig.val,
      then = sig.then,
      put = sig.put

  var ctl = w.ctl,
      sine = w.sine

  it("should change the params of the ugen", function(done) {
    vv({frequency: 440})
      (sine)
      (ctl, {frequency: 220})
      (then, function(ugen) {
        assert.equal(ugen.frequency, 220)
        done()
      })
  })

  it("should allow the params to be a signal", function(done) {
    var params = val({frequency: 220})

    vv({frequency: 440})
      (sine)
      (then, function(ugen) {
        ctl(ugen, params)
        assert.equal(ugen.frequency, 220)
        put(params, {frequency: 110})
        assert.equal(ugen.frequency, 110)
        done()
      })
  })
})
