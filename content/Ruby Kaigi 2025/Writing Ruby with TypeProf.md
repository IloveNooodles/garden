---
title: Writing Ruby with TypeProf
draft: false
date: 2025-10-12
tags:
  - ruby
  - typeprof
  - ruby-kaigi
description: Notes on using TypeProf for Ruby type checking and editor support
lang: en
---

* Steep or Sorbet 
* TypeProf
	* Ruby Editor Support
	* Error Report
	* go to defintion
	* minimal type anotations

TLDR: TypeProf is good

How to use typeprof
* Install VSCODE ruby typeprof
* put typeprof.conf.json

```ruby
{
"typeprof": "experimental"
"rbs_dir": "sig/"
"diagnostic_severity": "info" # Error Level
"analysis_unit_dirs": [
]
}
```

## Analysis Unit Dirs
1. Provide directory to be analyzed together, seperate anaylsiss
2. as the project grows, will stop inference
3. stop type inference between units


## Ruby Constant is too complex
```ruby
class P < Q
end

class A
class B < Z
class C < P
include M
Foo.new()
end
end
end
```
1. C::FOO
2. M::FOO, P::FOO, Q::FOO
3. 

constant anylsis requires wholes programs

```ruby
class MyApp
string.new(...)
end
```

```ruby
module M
class string
end
end
class myapp
include m
end
```

How to handle constants
1. When a constsnatnt is defined
2. when the inheritance hierarchy is changed

When including, include the scope

```ruby
class MyApp
include M
include X # include ::M::X instead
```
