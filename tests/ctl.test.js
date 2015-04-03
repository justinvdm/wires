describe("wires.ctl", function() {
  var val = sig.val,
      each = sig.each,
      put = sig.put

  var ctl = w.ctl,
      sine = w.sine

  var testUtils = w.testUtils,
      first = testUtils.first

  it("should change the params of the ugen", function() {
    var s = sine({frequency: 440})
    var ugen = first(s)
    assert.equal(ugen.frequency, 440)
    ctl(s, {frequency: 220})
    assert.equal(ugen.frequency, 220)
  })

  it("should allow the params to be a signal", function() {
    var s = sine({frequency: 440})
    var ugen = first(s)
    var params = val({frequency: 220})

    assert.equal(ugen.frequency, 440)
    ctl(ugen, params)
    assert.equal(ugen.frequency, 220)

    put(params, {frequency: 110})
    assert.equal(ugen.frequency, 110)
  })
})
