const nanobench = require('nanobench')

const WRAPPED = Symbol('nanobench-plus')

const { clock, memory, prettyThroughput } = require('.')

function bench (name, fn, only) {
  nanobench(name, wrapNanobench(fn), only)
}

bench.only = function (name, fn) {
  nanobench.only(name, wrapNanobench(fn))
}

bench.skip = function () {}

module.exports = bench

function wrapNanobench (fn) {
  if (fn[WRAPPED]) return fn
  fn[WRAPPED] = true

  return function (b) {
    let tp = null
    const timers = {}
    const mem = memory()

    const start = b.start
    b.start = function () {
      timers._start = clock()
      mem.update()
      start()
    }

    b.time = function (name) {
      timers[name] = clock(name)
    }

    b.timeLog = function (name, message = '') {
      b.log(timers[name].log(message, true))
    }

    b.elapsed = function (message) {
      b.log(timers._start.log(message, true))
    }

    b.timeEnd = function (name) {
      b.timeLog(name)
    }

    b.throughput = function (bytes) {
      tp = bytes
    }

    b.memory = function (message) {
      mem.log()
    }

    const end = b.end
    b.end = function (msg) {
      const time = timers._start.ns()
      if (tp) b.log(`throughput ${prettyThroughput(time, tp)}`)
      end(msg)
    }
    fn(b)
  }
}
