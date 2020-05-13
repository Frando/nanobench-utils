# nanobench-utils

Utility functions for timers and benchmarks. Works well with [nanobench](https://github.com/mafintosh/nanobench).

## API

``` 
const { clock } = require('benchutils')
```

### const timer = clock([name])

Start a new timer with optional name

* `timer.throughput(bytes)`: Set the throughput produced during this timer, to be logged as bytes per second.

* `timer.log([message])`: Log elapsed time with optional message.

* `timer.ns()`: get elapsed time in nanoseconds.

### const bench = require('benchutils/nanobench')

Usage as with nanobench. Additional methods on the `b` benchmark object provided are:

* `b.throughput(bytes)`: Set the throughput produced by this benchmark, to be logged as bytes per second.

* `b.time(name)`: Start a new timer `name`

* `b.timeLog(name, message)`: Log the current time of timer `name`
