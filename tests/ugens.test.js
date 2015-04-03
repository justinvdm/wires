describe("wires.ugens", function() {
  var put = sig.put,
      map = sig.map,
      each = sig.each,
      end = sig.end,
      fin = sig.done

  var ugens = w.ugens,
      make = ugens.make,
      meta = ugens.meta

  var sine = w.sine,
      add = w.add

  var testUtils = w.testUtils,
      first = testUtils.first

  it("should be sticky", function() {
    var ugen = sine(220)
    var gibUgen = first(ugen)
    gibUgen.should.equal(first(ugen))
  })

  it("should support defaults params in metadata", function() {
    var ugen = vv({
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
      (first)
      ()

    ugen.frequency.should.equal(23)
    ugen.amp.should.equal(32)
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
    it("should support positional parameter passing", function() {
      var ugen = first(sine(440, 2))
      ugen.amp.should.equal(2)
      ugen.frequency.should.equal(440)
    })

    it("should support positional parameter pasing", function() {
      var ugen = first(sine({
        frequency: 440,
        amp: 2
      }))

      ugen.amp.should.equal(2)
      ugen.frequency.should.equal(440)
    })

    it("should support both named and positional parameter passing", function() {
      var ugen = first(sine(440, {amp: 2}))
      ugen.amp.should.equal(2)
      ugen.frequency.should.equal(440)
    })

    it("should support signals as parameters", function() {
      var freq = sig()
      var amp = sig()
      var ugen

      vv(sine(freq, amp))
        (each, function(newUgen) {
          ugen = newUgen
        })
        (fin)

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

      end(freq)
      put(freq, 110)
      ugen.frequency.should.equal(220)

      end(amp)
      put(amp, 4)
      ugen.amp.should.equal(3)
    })
  })


  describe("ugens with unnamed params", function() {
    it("should apply the same params to the ugen", function() {
      var ugen = first(add(2, 3))
      ugen[0].should.equal(2)
      ugen[1].should.equal(3)
    })

    it("should support signals as parameters", function() {
      var a = sig()
      var b = sig()
      var ugen

      vv(add(a, b))
        (each, function(newUgen) {
          ugen = newUgen
        })
        (fin)

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

      end(a)
      put(a, 6)
      ugen[0].should.equal(5)

      end(b)
      put(b, 4)
      ugen[1].should.equal(8)
    })
  })
})
