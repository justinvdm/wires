describe("wires.ugens", function() {
  var put = sig.put,
      map = sig.map,
      then = sig.then,
      reset = sig.reset

  var ugens = w.ugens,
      make = ugens.make,
      meta = ugens.meta

  var sine = w.sine,
      add = w.add


  function capture(s) {
    var values = []

    map(s, function(x) {
      values.push(x)
    })

    return values
  }

  it("should be sticky", function(done) {
    var ugen = sine(220)

    then(ugen, function(gibUgen) {
      capture(ugen).should.deep.equal([gibUgen])
      capture(ugen).should.deep.equal([gibUgen])
      done()
    })
  })

  it("should support defaults params in metadata", function() {
    vv({
        ctor: Gibberish.Sine,
        exportName: 'sine',
        paramNames: [
          'frequency',
          'amp'
        ],
        defaults: {
          frequency: 23,
          amp: 32
        }
      })
      (make, [])
      (then, function(ugen) {
        ugen.frequency.should.equal(23)
        ugen.amp.should.equal(32)
      })
  })

  it("should support metadata retrieval", function() {
    var ugen = new Gibberish.Sine()
    var metadata = meta(ugen)
    metadata.should.deep.equal({})
    meta(ugen).should.deep.equal(metadata)
  })

  it("should support metadata setting", function() {
    var ugen = new Gibberish.Sine()
    var metadata = {foo: 23}
    meta(ugen, metadata)
    meta(ugen).should.deep.equal(metadata)
  })


  describe("ugens with named params", function() { 
    it("should support positional parameter passing", function(done) {
      vv(sine(440, 2))
        (then, function(ugen) {
          ugen.amp.should.equal(2)
          ugen.frequency.should.equal(440)
          done()
        })
    })

    it("should support positional parameter pasing", function(done) {
      vv(sine({
          frequency: 440,
          amp: 2
        }))
        (then, function(ugen) {
          ugen.amp.should.equal(2)
          ugen.frequency.should.equal(440)
          done()
        })
    })

    it("should support both named and positional parameter passing", function(done) {
      vv(sine(440, {amp: 2}))
        (then, function(ugen) {
          ugen.amp.should.equal(2)
          ugen.frequency.should.equal(440)
          done()
        })
    })

    it("should support signals as parameters", function() {
      var freq = sig()
      var amp = sig()
      var ugen

      vv(sine(freq, amp))
        (then, function(newUgen) {
          ugen = newUgen
        })

      expect(ugen).to.be.undefined

      put(freq, 440)
      expect(ugen).to.be.undefined

      put(amp, 2)
      ugen.amp.should.equal(2)
      ugen.frequency.should.equal(440)

      put(freq, 220)
      ugen.frequency.should.equal(220)

      put(amp, 3)
      ugen.amp.should.equal(3)

      reset(freq)
      put(freq, 110)
      ugen.frequency.should.equal(220)

      reset(amp)
      put(amp, 4)
      ugen.amp.should.equal(3)
    })
  })


  describe("ugens with unnamed params", function() {
    it("should apply the same params to the ugen", function(done) {
      vv(add(2, 3))
        (then, function(ugen) {
          ugen[0].should.equal(2)
          ugen[1].should.equal(3)
          done()
        })
    })

    it("should support signals as parameters", function() {
      var a = sig()
      var b = sig()
      var ugen

      vv(add(a, b))
        (then, function(newUgen) {
          ugen = newUgen
        })

      expect(ugen).to.be.undefined

      put(a, 2)
      expect(ugen).to.be.undefined

      put(b, 3)
      ugen[0].should.equal(2)
      ugen[1].should.equal(3)

      put(a, 5)
      ugen[0].should.equal(5)

      put(b, 8)
      ugen[1].should.equal(8)

      reset(a)
      put(a, 6)
      ugen[0].should.equal(5)

      reset(b)
      put(b, 4)
      ugen[1].should.equal(8)
    })
  })
})
