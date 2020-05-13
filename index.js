const hrtime = require('browser-process-hrtime')
const prettyBytes = require('pretty-bytes')
const prettyTime = require('pretty-hrtime')
const nanobench = require('nanobench')

module.exports = {
  clock,
  prettyBytes,
  prettyTime,
  prettyThroughput,
  hrtime,
}

function clock (name) {
  const start = hrtime()
  let last = start
  let throughput
  function elapsed () {
    return hrtime(start)
  }
  elapsed.throughput = function (tp) {
    throughput = tp
  }
  elapsed.ns = function () {
    const [ds, dn] = elapsed()
    const ns = (ds * 1e9) + dn
    return ns
  }
  elapsed.log = function (message = '', noprint) {
    const time = elapsed()
    let msg = 'time '
    if (name) msg += '[' + name + '] '
    msg += prettyTime(time)
    if (last) msg += ' (+' + prettyTime(hrtime(last)) + ')'
    if (throughput) msg += ' throughput ' + prettyThroughput(throughput)
    if (message) msg += ' (' + message + ')'
    if (!noprint) console.log(msg)
    last = hrtime()
    return msg
  }
  return elapsed
}


function prettyThroughput (ns, bytes) {
  if (Array.isArray(ns)) ns = ns[0] * 1e9 + ns[1]
  const bytespers = prettyBytes(bytes / (ns / 1e9))
  return `${bytespers}/s`
}

function noop () {}
