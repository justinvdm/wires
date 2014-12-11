wires.testUtils = function() {
  var all = sig.all,
      then = sig.then,
      reset = sig.reset,
      except = sig.except,
      cleanup = sig.cleanup,
      put = sig.put


  function timer() {
    return {runs: []}
  }


  timer.at = function(d, ms, fn) {
    var s = sig()

    var id = setTimeout(function() {
      fn()
      put(s, null)
    }, ms)

    cleanup(s, function() {
      clearTimeout(id)
    })

    d.runs.push(s)
    return d
  }


  timer.end = function(d, done) {
    vv(d.runs)
      (all)
      (then, function() { end() })
      (except, end)

    function end(e) {
      d.runs.forEach(reset)
      if (e) done(e)
      else done()
    }

    return d
  }


  return {
    timer: timer
  }
}()
