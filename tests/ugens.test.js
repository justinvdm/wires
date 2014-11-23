describe("wires:ugens", function() {
  function capture(s) {
    var values = []

    sig.map(s, function(x) {
      values.push(x)
    })

    return values
  }

  it("should support unnamed parameter passing", function(done) {
    vv(w.sine(440, 2))
      (sig.then, function(ugen) {
        ugen.amp.should.equal(2)
        ugen.frequency.should.equal(440)
        done()
      })
  })

  it("should support named parameter pasing", function(done) {
    vv(w.sine({
        frequency: 440,
        amp: 2
      }))
      (sig.then, function(ugen) {
        ugen.amp.should.equal(2)
          ugen.frequency.should.equal(440)
          done()
      })
  })

  it("should support both named and unnamed parameter passing", function(done) {
    vv(w.sine(440, {amp: 2}))
      (sig.then, function(ugen) {
        ugen.amp.should.equal(2)
          ugen.frequency.should.equal(440)
          done()
      })
  })

  it("should support signals as parameters", function() {
    var freq = sig()
    var amp = sig()
    var ugen

    vv(w.sine(freq, amp))
      (sig.then, function(newUgen) {
        ugen = newUgen
      })

    expect(ugen).to.be.undefined

    sig.put(freq, 440)
    expect(ugen).to.be.undefined

    sig.put(amp, 2)
    ugen.amp.should.equal(2)
    ugen.frequency.should.equal(440)

    sig.put(freq, 220)
    ugen.frequency.should.equal(220)

    sig.put(amp, 3)
    ugen.amp.should.equal(3)

    sig.reset(freq)
    sig.put(freq, 110)
    ugen.frequency.should.equal(220)

    sig.reset(amp)
    sig.put(amp, 4)
    ugen.amp.should.equal(3)
  })

  it("should be sticky", function(done) {
    var ugen = w.sine(220)

    sig.then(ugen, function(gibUgen) {
      capture(ugen).should.deep.equal([gibUgen])
      capture(ugen).should.deep.equal([gibUgen])
      done()
    })
  })
})
