# nanobench-utils

Utility functions for timers and benchmarks. Works well with [nanobench](https://github.com/mafintosh/nanobench).

```
npm install nanobench-utils
```

## API


``` 
const { clock, memory } = require('nanobench-utils')
const bench = require('nanobench-utils/nanobench')
```

### const bench = require('nanobench-utils/nanobench')

Usage as with nanobench. Additional methods on the `b` benchmark object provided are:

* `b.throughput(bytes)`: Set the throughput produced by this benchmark, to be logged as bytes per second.

* `b.time(name)`: Start a new timer `name`

* `b.timeLog(name, [message])`: Log the current time of timer `name`

* `b.memory([message])`: Log the current memory usage. The first diff is towards the start of the benchmark.

The utilities are also exported directly:

### const timer = clock([name])

Start a new timer with optional name

* `timer.throughput(bytes)`: Set the throughput produced during this timer, to be logged as bytes per second.

* `timer.log([message])`: Log elapsed time with optional message.

* `timer.debug([message])`: As log, but print with [debug](https://github.com/visionmedia/debug) (on the `time` target)

* `timer.ns()`: get elapsed time in nanoseconds.

### const mem = memory(gc = true)

Measure memory usage. If `node` is run with `--expose-gc`, the garbage collector is run before logging memory. This can be disabled with `gc = false`.

* `memory.log([message])`: Log current memory usage and diff to last measurement, with optional message.

