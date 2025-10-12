---
title: Benchmark
draft: false
date: 2025-10-12
tags:
  - ruby
  - benchmark
  - performance
  - ruby-kaigi
description: Benchmark-driven development and performance optimization in Ruby
lang: en
---

> Related: [[Ruby with YJIT]] for JIT performance, [[Taxonomy of Ruby Calls]] for call optimization, [[A side gig for RuboCop, the Bookworm code crawler]] for code analysis

```ruby
require 'benchmark/ips'
```

Benchmark driven development

1. set a measruable goal
2. Write code
3. Measure & improve

TDD:

1. Write failing test
2. make tit pass
3. redo again

> Itstead of write fast code from the beginning, it's hard to make slow code fast

Performance 101: Focus on the bottlenecks

1. If something slow, wee should work on that
2. Work on the algorithm / architecture

But there's don't always be a bottlenecks

1. Not Slow != fast

```ruby
numbers = (1..100).to_a

numbers.select {it.even?}

numbers.find {it.even?}
```

Benchmark every single change in the PR

1. Compare before and after change
2. Maybe on everypull request
3. Maybe on everycommit
4. Everytime you type?

BenchDD -- Tools

1. Set a measurable perf goal
2. Write a code
 * vim -> bench -> vim -> bench
3. Measure & Improve

```ruby
Benchmark.ips do |x|
```

Benchmark result

1. Sinatra 35000ns/req
2. Roda: 912 ns /req
3. 100x Sinatra: 350ns/req
4. Empty Rack: 215ns/req

```ruby
class Xinatra::Base
def call
```

Full feature Hono was fsater than Empty Rack

Problem

1. Benchmark is NOT FUN
2. Berchmarking is not provide enough information

Benchmarking Framework

Workloads should be

1. Realistic
2. Compact

ex:

1. Small (10k/reqs)
2. Large (100k/reqs)

The important question:
information we know: time periteration

How did performance change
why did the performance change

Benchmarking & Profiling

1. Explaining performance is excatly what profilerls do

We can differeential flamegraph

1. Before and After
 1. Blue are improved
 2. red are degraded

Important to write benchmark for every feature

1. Trie based routing
2. Linear routing
3. Choosing The Routing Strategy is Important

Importan Info

1. params() is slower than params

class

```
```

data
struct

WHEN YJIT

It's important to experiment near the production env
calling methods is faster than calling blocks
Rack::Session

```ruby
# Slower
hash = {}
hash[key] ||= []
hash[key]

# Faster
hash. = Hash.new {[]}
hash << something
```

Tips for benchmarking

1. CPU Time is very precious
 * Databases aren't very bottlenecks
 1. Rails is not that IO Bound
 2. That 1ms could go far especially when scale
2. Instead of gcha
 1. we can do a statistical hypotetical test
3. YJIT
 1. enabling yjit is important
 2. keep close to prod

Wont profilling affect benchmarking
you will see lower scores the profiles enabled

Benchmarking in CI

1. Why not run the benchmarking in ci
 1. Hyper threading
 2. unstable base cpu
 3. CI / Envs is VERY UNSTABLE!!!
 4. Always run benchmarks when writing code

Lesson Learned:
1.

