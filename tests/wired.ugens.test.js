describe("wired:ugens", function() {
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

    sig.push(freq, 440)
    expect(ugen).to.be.undefined

    sig.push(amp, 2)
    ugen.amp.should.equal(2)
    ugen.frequency.should.equal(440)

    sig.push(freq, 220)
    ugen.frequency.should.equal(220)

    sig.push(amp, 3)
    ugen.amp.should.equal(3)

    sig.reset(freq)
    sig.push(freq, 110)
    ugen.frequency.should.equal(220)

    sig.reset(amp)
    sig.push(amp, 4)
    ugen.amp.should.equal(3)
  })
})
