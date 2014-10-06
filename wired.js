
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(["sig-js","sig.all","sig.any","drainpipe","gibberish-dsp"], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('sig-js'), require('sig.all'), require('sig.any'), require('drainpipe'), require('gibberish-dsp'));
  } else {
    root.wired = factory(root.sig, root.sig.all, root.sig.any, root.drainpipe, root.Gibberish);
  }
}(this, function(sig, sigAll, sigAny, dp, Gibberish) {

var wired = {}

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

return wired;

}));
