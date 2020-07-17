const bench = require('./nanobench')

bench('foo', b => {
  process.nextTick(b.start)
  b.throughput(1024 * 1024 * 4)
  setTimeout(() => b.time('step1'), 10)
  setTimeout(() => b.timeEnd('step1'), 40)
  setTimeout(() => b.elapsed('mid'), 350)
  setTimeout(() => b.end(), 700)
})

bench('bar', b => {
  process.nextTick(b.start)
  b.throughput(1024 * 1024 * 10)
  setTimeout(() => b.end(), 700)
})

bench('many', b => {
  b.start()
  const res = []
  for (let i = 0; i < 100000; i++) {
    res.push(i * i)
  }
  b.memory()
  b.end()
})
