---
title: A side gig for RuboCop, the Bookworm code crawler
draft: false
date: 2025-10-12
tags:
  - ruby
  - ruby-kaigi
description: Using RuboCop's NodePattern API for code analysis with Bookworm
lang: en
---

> Related: [[Writing Ruby with TypeProf]] for type analysis, [[Benchmark]] for code performance, [[Deprecation on the Fly]] for code maintenance

RuboCop is typically thought of as 'just' a linting or refactoring tool. However, one of RuboCop's foundational features, the NodePattern API, is so useful for crawling Ruby AST that an open-source tool called Bookworm has been written that uses the NodePattern API to understand the large Chef Ruby codebase used at Meta.

Hierarchy conrols

1. Elimination
2. Substition
3. Engineering Controls
4. Administrative Controls
 1. peer code controls
5. RFTM
 1. read manual documentation

# Rubocop can also be used as a large scale refactoring tool (2024)

Cookstyle
NodePattern AST matchers to find

You can use rubocop to find interesting talk about the codebase

People don't want to use tools that hard to use
