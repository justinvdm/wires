# wires

![Build Status](https://api.travis-ci.org/justinvdm/wires.png)

[Gibberish](https://github.com/charlieroberts/Gibberish) wrapped to work in a reactive way.


```javascript
var put = sig.put

var sine = wires.sine,
    square = wires.square,
    add = wires.add,
    mul = wires.mul,
    out = wires.out


var s = sig()

vv(7)
  (sine)
  (mul, 220)
  (add, 440)
  (mul, s)
  (square)
  (out)

vv(s)
  (mul, 440)
  (sine)
  (out)

setInterval(function() {
  put(s, Math.random())
}, 200)
```

## docs

  - [install](#install)
  - [overview](#overview)
  - [api](#api)


## install

```
$ bower install wires-js
```

```html
<script src="/bower_components/gibberish-dsp/build/gibberish.js"></script>
<script src="/bower_components/drainpipe/drainpipe.js"></script>
<script src="/bower_components/sig-js/sig.js"></script>
<script src="/bower_components/wires-js/wires.js"></script>
```

## overview

### why

wires is an experiment to test if a reactive style of programming is useful for live coding situations. [Gibberish](https://github.com/charlieroberts/Gibberish) does a great job by itself, and wires doesn't really provide one with anything that you can't already do with Gibberish already.

### signal properties

The way ugen properties are changed in Gibberish looks something like this:

```javascript
var u = new Gibberish.Sine({frequency: 440})
u.frequency = 220
```

In contrast, wires allows one to pass [sig](https://github.com/justinvdm/sig) signals as properties. Whenever the signal changes, the corresponding ugen property will be updated:

```javascript
var val = sig.val,
    put = sig.put,
    sine = wires.sine

var v = val(440)
sine(v)
put(v, 220)
```

Controlling a specific ugen property for a specific ugen instance as Gibberish allows is possible using `ctl`:

```javascript
var sine = wires.sine,
    ctl = wires.ctl

var u = sine(440)
ctl(u, {frequency: 220})
```

### connecting and disconnecting ugens

With Gibberish, ugens are connected to a bus using their `.connect` method, and disconnected using their `.disconnect` method.

```javascript
var b = new Gibberish.Bus()
var u = new Gibberish.Sine()
u.connect(u, b)
u.disconnect(b)
```

With wires, ugens are connected to a bus using the `out` function and disconnected using the `stop` function:

```javascript
var sine = wires.sine,
    bus = wires.bus,
    out = wires.out
    
var b = bus()
var u = sine()
out(u, b)
stop(u, b)
```

### sound garbage collection

Something I struggled to find in Gibberish was a way of automatically freeing ugens that are no longer producing sound.Often, manually disconnecting ugens works, but there are cases where this is less doable. Gibberish's `polyInit` is one way of handling this, though I wasn't able to find a solution using it for the problem I was running into. The case I ran into was when trying to output samples, since it isn't easy to manually disconnect each sample once it is done playing. Eventually, one ends up with too many live ugens, and artefacts like 'chopping' start to occur.

To get around this, wires maintains a list of the current live ugens. At regular intervals (every `2000` milliseconds by default), the list is checked to see whether its length exceeds a configured maximum (`128` by default). If it does, the list is shortened to meet the configured maximum by taking off the oldest running ugens and disconnecting them.

## api

### ugens

In almost all cases, a Gibberish ugen is accessible as a wires ugen using the camel-cased version of its name. For example, the wires equivalent of `SingleSampleDelay` is `singleSampleDelay`. One exception to this is `sample`, which maps to the `Sampler` Gibberish ugen.

All parameters given to a wires ugen can either be a signal or a normal value. If signals are given, the ugen is created once all the signals have outputted at least one value. When a signal changes, its corresponding ugen property changes.

If a Gibberish ugen supports named parameters, the equivalent wires ugen supports both positional parameters and named parameters, both being optional. Named parameters should be given as the last argument and be an options object. For example, the following are equivalent.

```javascript
sine(440)

sine(440, 2)

sine(440, {amp: 2})

sine({
  amp: 2,
  frequency: 440
})
```

If a Gibberish ugen does not support named parameters, the equivalent wires ugen only supports positional parameters:

```javascript
add(1, 2)
``

The mappings to Gibberish ugens can be found in the wires ugen [metadata](src/ugens/metadata.js).

wires ugens return a signal with its current value set to the created gibberish ugen once the gibberish ugen has been created.

```javascript
var s = sig()

vv(s)
  (sine)
  (then, log)

put(s, 440)  // this causes the gibberish ugen to be logged
```

### out(ugen[, bus])

Connects the given `ugen` to the given `bus`.

`bus` defaults to the global bus, `wires.master`.

`ugen` and `bus` can both be Gibberish ugens or signals that output Gibberish ugens.

```javascript
out(sine())
```

### rout(ugen[, bus])

Disconnects all ugens connected to the given `bus`, then connects the given `ugen` ('rout' means 'replace out', a bit obscure, sorry).

`bus` defaults to the global bus, `wires.master`.

`ugen` and `bus` can both be Gibberish ugens or signals that output Gibberish ugens.

### stop(ugen[, bus])

Disconnects the given `ugen` from the given `bus`. If not `bus` is given, the ugen is connected to all busses it is currently connected to.

`ugen` and `bus` can both be Gibberish ugens or signals that output Gibberish ugens.

### stop(bus)

Disconnects all ugens connected to the given `bus`.

`bus` can be a Gibber ugen or a signal that outputs Gibberish ugens.

### ctl(ugen, params)

Changes the given `ugen`'s parameters to the given `params`.

`ugen` can be a Gibberish ugen or a signal that outputs Gibberish ugens. Each value in the `params` object can be either a value or a signal that outputs values. If a param value is a signal, the relevant parameter will change whenever the signal outputs a value.


```javascript
var s = sine()
ctl(s, {frequency: 220})

var v = val(660)
ctl(s, {frequency: v})
setInterval(function() { put(s, Math.random() * 220) }, 200)
```

### sampler([param1[, param2[, ...[, namedParams]]]])

Returns a function that creates a new `sample()` ugen with the given arguments each time it is called.

A `sample()` call is also made with the given arguments immediately to cache the sample.

```javascript
var snare = sampler('snare.wav')
snare()
snare()
snare()
```
