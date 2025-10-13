---
title: Service Mesh
date: 2025-10-13
description: Various service mesh explained
tags:
  - kubernetes
  - service-mesh
---

Wrote based on this talk: https://www.youtube.com/watch?v=91oylZSoYzM
## Service Mesh provides lot's of feature
- mTLS
	- I don't think if this same as zero trust or not but
	- usually we terminate the TLS at the load balancer level and we continue with http
	- With this, the sidecar proxy gives us ability to have mTLS without any configuration. So it will be done automatically
- Observability
	- Not all, but some already export Prometheus metric exporter, so we can just redirected it to Grafana to make graph
	- Mean time to recover
- Network Discovery
	* If i create new services, the operator can inject sidecar proxy automatically. No need to install this manually in every pod
- Traffic Control
	- Affinity
	- Split traffic
	- Canary deployment

## Sidecar
* Transparent
* Fine grained
* No noisy neighbor
* pod level encryption

### Example
* Istio
* LinkerD
* Consul

### Security concern
* Container race conditions
* apps need to be aware
* upgrades is challenging
## eBPF & Sidecarless

eBPF extend the kernel functionallity to have network observability

![[Pasted image 20251008211749.png]]

## Cillium
* eBPF L3/L4
* Container networking
* Ingress
* Mutual authentication
* Cillium Network Policy

### Architecture
![[Pasted image 20251008212430.png]]

![[Pasted image 20251008212724.png]]
## Istio
Started as sidecar service mesh
* Based on envoy
* L4/L7 servce mesh
* mTLS
* observability, tracing audot logging
* recently added ambient sidecarless

### Ambient Mode
* Support any CNI
* separate L4 and L7
* Gatweay api support

![[Pasted image 20251008213153.png]]
## Kubernetes CNI (Container Network Interface)

## XDS Protocol
github.com/cncf/xds

Sidenote
![[Pasted image 20251008214349.png]]