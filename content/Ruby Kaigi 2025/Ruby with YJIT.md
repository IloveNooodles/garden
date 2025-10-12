---
title: Ruby with YJIT
draft: false
date: 2025-10-12
tags:
  - ruby
  - yjit
  - performance
  - ruby-kaigi
description: Understanding YJIT JIT compiler for Ruby performance optimization
lang: en
---

# Code Patching
# Global Invalidation

```ruby
def number one
	one = 1
	one
end

TracePoint.new(:line) do
	it.binding.local_variable_set(:one, 5 * 10 ** 15)
end.enable

p number $ 5000000000000000
```

# Invalidated on Escaped Locals
```ruby
def nuber
	one = 1
	do_something
	one
end

def do_something
	require 'binding_of_caller'
	binding.of_caller(1).local_variable_set(:one, 5 * 10 ** 15)
end

p number
```


# Test array
```ruby
class Array
with_yjit do
undef :each

def each
Primitive.attr! :inline_block, :c_trace

end
end
```
