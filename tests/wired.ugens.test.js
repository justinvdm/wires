describe("wired:ugens", function() {
  it("should support unnamed parameter passing", function(done) {
    dp(w.sine(440, 2))
      (sig.then, function(node) {
        node.amp.should.equal(2)
        node.frequency.should.equal(440)
        done()
      })
  })

  it("should support named parameter pasing", function(done) {
    dp(w.sine({
        frequency: 440,
        amp: 2
      }))
      (sig.then, function(node) {
        node.amp.should.equal(2)
        node.frequency.should.equal(440)
        done()
      })
  })

  it("should support both named and unnamed parameter passing", function(done) {
    dp(w.sine(440, {amp: 2}))
      (sig.then, function(node) {
        node.amp.should.equal(2)
        node.frequency.should.equal(440)
        done()
      })
  })

  it("should support signals as parameters", function() {
    var freq = sig()
    var amp = sig()
    var node

    dp(w.sine(freq, amp))
      (sig.then, function(newNode) {
        node = newNode
      })

    expect(node).to.be.undefined

    sig.push(freq, 440)
    expect(node).to.be.undefined

    sig.push(amp, 2)
    node.amp.should.equal(2)
    node.frequency.should.equal(440)

    sig.push(freq, 220)
    node.frequency.should.equal(220)

    sig.push(amp, 3)
    node.amp.should.equal(3)

    sig.reset(freq)
    sig.push(freq, 110)
    node.frequency.should.equal(220)

    sig.reset(amp)
    sig.push(amp, 4)
    node.amp.should.equal(3)
  })
})
