wires.testUtils = function() {
  var all = sig.all,
      each = sig.each,
      kill = sig.end,
      except = sig.catch,
      teardown = sig.teardown,
      put = sig.put


  function timer() {
    return {runs: []}
  }


  timer.at = function(d, ms, fn) {
    var s = sig()
    var id = setTimeout(fire, ms)

    teardown(s, function() {
      clearTimeout(id)
    })

    function fire() {
      fn()
      put(s, null)
    }

    d.runs.push(s)
    return d
  }


  timer.end = function(d, done) {
    vv(d.runs)
      (all)
      (each, function() { end() })
      (except, end)

    function end(e) {
      d.runs.forEach(kill)
      if (e) done(e)
      else done()
    }

    return d
  }


  return {
    timer: timer
  }
}()
