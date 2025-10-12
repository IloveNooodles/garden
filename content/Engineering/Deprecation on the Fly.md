---
title: Deprecation on the Fly
draft: false
date: 2025-04-16
tags:
  - ruby
  - ruby-kaigi
description: Managing code deprecation in Ruby applications
lang: en
---

> Related: [[A side gig for RuboCop, the Bookworm code crawler]] for code analysis, [[Writing Good Documentation]] for deprecation notices

1. Static analysis: Rubocop
2. Learning from other leanguages

3. Warning module
4. Documentation
5. @deprecated tag and annotation
6. `#[deprecated], #[obsolete]`

Documentation ONly
Runtime Warnings
IDE Integrations
Auto fix <-- rust

Deprewriter

Logger << log

1. Annotation
2. Execution
3. Exception Handling
4. Caller Rewriting
5. Execution Continues

Author

1. Legacy Class

YARD

Gem::Deprecate

extend Deprewriter

Deprewriter Ruby Implementation Details

Challenges

1. How to write transformation rules
2. HOw to transform code
3. is rewriting code at runtime safe
4. will the ruby ecosystem adopt it

Synvert

1. AST Based Ruby Code Transforemation tool
2. parser included for prism

NodeMutation::PrismAddapter
Gem::DEprecate

presever original method behaviour to resume later

send old, *args, &blocks

```ruby
filepath, line = Gem.location+of+caller

```
