describe("wired.utils", function() {
  var u = wired.utils

  describe("is", function() {
    it("should support instance checking", function() {
      function Foo() {}
      function Bar() {}
      u.is(new Foo, Foo).should.be.true
      u.is(new Bar, Bar).should.be.true
      u.is(new Foo, Bar).should.be.false
      u.is(new Bar, Foo).should.be.false
      u.is(null, Foo).should.be.false
      u.is(void 0, Foo).should.be.false
    })

    it("should support array checking", function() {
      u.is([], 'array').should.be.true
      u.is(new Array(), 'array').should.be.true
      u.is({}, 'array').should.be.false
      u.is(0, 'array').should.be.false
      u.is('', 'array').should.be.false
      u.is(null, 'array').should.be.false
      u.is(void 0, 'array').should.be.false
    })

    it("should support object checking", function() {
      function Foo() {}
      u.is({}, 'object').should.be.true
      u.is([], 'object').should.be.true
      u.is(new Object(), 'object').should.be.true
      u.is(new Foo(), 'object').should.be.true
      u.is(0, 'object').should.be.false
      u.is('', 'object').should.be.false
      u.is(null, 'object').should.be.false
      u.is(void 0, 'object').should.be.false
    })

    it("should support null checking", function() {
      u.is(null, 'null').should.be.true
      u.is(23, 'null').should.be.false
      u.is({}, 'null').should.be.false
      u.is([], 'null').should.be.false
      u.is(void 0, 'null').should.be.false
    })

    it("should support object checking", function() {
      u.is(null, 'null').should.be.true
      u.is(23, 'null').should.be.false
      u.is({}, 'null').should.be.false
      u.is([], 'null').should.be.false
      u.is(void 0, 'null').should.be.false
    })

    it("should support undefined checking", function() {
      u.is(void 0, 'undefined').should.be.true
      u.is(23, 'undefined').should.be.false
      u.is({}, 'undefined').should.be.false
      u.is([], 'undefined').should.be.false
    })

    it("should support number checking", function() {
      u.is(0, 'number').should.be.true
      u.is(23, 'number').should.be.true
      u.is('0', 'number').should.be.false
      u.is('23', 'number').should.be.false
      u.is(null, 'number').should.be.false
      u.is(void 0, 'number').should.be.false
      u.is({}, 'number').should.be.false
    })

    it("should support string checking", function() {
      u.is('', 'string').should.be.true
      u.is('foo', 'string').should.be.true
      u.is(0, 'string').should.be.false
      u.is(23, 'string').should.be.false
      u.is(null, 'string').should.be.false
      u.is(void 0, 'string').should.be.false
      u.is({}, 'string').should.be.false
    })

    it("should support custom type checking", function() {
      u.is({type: 'foo'}, 'foo').should.be.true
      u.is(0, 'foo').should.be.false
      u.is(23, 'foo').should.be.false
      u.is(null, 'foo').should.be.false
      u.is(void 0, 'foo').should.be.false
      u.is({}, 'foo').should.be.false
    })
  })
})
