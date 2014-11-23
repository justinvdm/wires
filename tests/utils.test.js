describe("wires.utils", function() {
  var utils = w.utils,
      rm = utils.rm

  describe(".rm", function() {
    it("should remove a value from an array", function() {
      var arr = [1, 2, 3, 2]
      rm(arr, 2)
      arr.should.deep.equal([1, 3, 2])

      rm(arr, 2)
      arr.should.deep.equal([1, 3])

      rm(arr, 3)
      arr.should.deep.equal([1])

      rm(arr, 1)
      arr.should.deep.equal([])
    })

    it("should tolerate non-existant values", function() {
      rm([1, 2, 3], 23).should.deep.equal([1, 2, 3])
    })
  })
})
