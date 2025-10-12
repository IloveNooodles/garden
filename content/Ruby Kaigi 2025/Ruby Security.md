---
title: Ruby Security
draft: false
date: 2025-10-12
tags:
  - ruby
  - security
  - ruby-kaigi
description: Security best practices and vulnerabilities in Ruby applications
lang: en
---

# Agenda
1. Ethitcally hacking github
2. protecting ourselv
3. keeping secrets

# Github App Structure
1. Huge monolith
2. Built on rails
	1. MVC
3. Views utilize viewComponent framework
	1. Build component-driven UI
	2. render ruby object into markup

# What is send()
1. method to do dynamic method dispatch

```ruby
obj = HelloWorld.new
obj.send("print", "world)
```

## Thinking like hacker
```ruby
obj.send('send', 'send', 'send')
```
1. identify potential vulnerability
2. determine exploitability
	1. any safeguards persent
	2. are sagefuards bypassable
	3. any explotation 
3. Zero argument
4. Call Zero-arguments with arity of 0 or -1
5. Drop into rails console via console
6. Tried invoking all methods and collected response for analysis
identified that disclosed 1k+ variables
7. _gh_render cookie
	1. Use marshal ENTERPRISE_SESSION_SECRET
8. Encrypt marshalled paylout


```ruby
__dir__(), caller()
class()
__calleee__(), __method__(), methods()
```

## Protecting Ourselves

Vulnerablity lifecylcle
1. Intake
	* Bug bounty program
	* code scanning allerts
	* red team / engineering team
	* customer report
2. Triage
	1. set priotity
	2. anaylze the report
	3. repspond
3. Remediation
	1. Containment / eradication
	2. Mitigation / remediation
4. Variant Analysis
	1. Taking this as starting point
	2. expanding and try to lalala
5. Disclosure
	1. Disclose the incident publicly
	2. issuing CVE
	3. releasing new patches
	4. send email

Code Scanning Tools
1. Brakeman (Rails)
	1. Run any stage in development
2. Rubocop
	1. PublicSendCop
3. Semgrep / Opengrep
4. CoeQL
	1. updated the default query set

### Takeways
1. Use powefrul languaage feature with greate care
2. utilize and customize your code scanning tools
3. always validate user controlled inputs in you r code



```ruby
def identifier_for(repostiory)
	repository.send(@repository_identifier_key)
end

# After

when :id, "id"
	repository.id
	else
	repository.global_relay_id
	end
```

### Blameless culture No pointing

I want to use send safely
```ruby
send() # Public
public_send(:secert)
```

```ruby
Variable Method

Variable Target
```

Do the remediation

```ruby
def rid_key
case when
else
nil
end
```

Fully Compromised

### Keeping Sicerts
Challenges of rotating secrets
1. Separeate config and secrets
2. identfiying owning teams and impact of rotation
3. automating secrrets rotation
4. how long things will take
5. have a playbook / rotation plan and actually test it

Storage Mechanism
1. Env
2. rails credentials
3. networked secrets store <--- best(hashicorp, azure key vault, etc)
	1. Audability
	2. hashicorp vault
	3. jit accesss
	4. least privillege
	5. secrets versioning


## Goal achieve a minimal footprint for sensitive data in memory
1. Overloading methods
2. moving away from ENV
	1. using subprocess
	2. external store
	3. custom class for managing secrets
	4. 
