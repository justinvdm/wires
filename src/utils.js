wired.utils = function() {
  function is(x, type) {
    if (typeof type == 'function') return x instanceof type
    if (type === 'array') return Array.isArray(x, type)
    if (type === 'null') return x === null
    if (x === null && type === 'object') return false

    return (x || 0).type
      ? x.type === type
      : typeof x == type
  }


  return {
    is: is
  }
}()
