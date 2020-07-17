const chalk = require('chalk')
const pretty = require('pretty-bytes')

module.exports = function memory (gc = true) {
  let current, last
  return {
    update,
    log
  }

  function update () {
    if (global.gc && gc) global.gc()
    const stats = process.memoryUsage()
    // stats = { rss, heapTotal, heapUsed, external }
    const { heapTotal: total, heapUsed: used } = stats
    last = { ...current }
    current = { total, used }
    return current
  }

  function log (msg) {
    update()
    const { total, used } = current
    if (msg) console.log(chalk.blue(msg))
    console.log(`total: ${fmtBytes(total)} used: ${fmtBytes(used)}`)
    if (last) {
      console.log(` diff: ${fmtDiff(total, last.total)} diff: ${fmtDiff(used, last.used)}`)
    }
  }
}

function fmtBytes (bytes) {
  return pretty(bytes).padStart(10)
}

function fmtDiff (now, last) {
  const diff = now - last
  let color = 'black'
  if (diff > 100) color = 'red'
  if (diff < 100) color = 'green'
  return chalk[color](fmtBytes(diff))
}
