---
title: Types of Kubernetes Service
date: 2025-10-13
description: various type of kubernetes service and explanation
tags:
  - kubernetes
---

## ClusterIP
* Only communication between the IP in the internal pods
* Usually only for internal, but
	* We can use `kubectl port-forward`
	* `kubectl proxy` to expose dashboard
* Not suitable for production
## NodePort
* We will open a port in the NODE of kubernetes
* We will map between pod to the node kubernetes
* This is not good since if the node change, we need to change the A record in DNS 
* Port Range: 30000 - 32000

```yaml
kind: Service
apiVersion: v1
metadata:
	name: nginx
spec:
	type: NodePort
	ports:
		- name: web
		  port: 80
		  nodePort: 31600
	selector:
		app: nginx
```

* We can use this for a demo to show
## LoadBalancer
* if we create this in the VPS, it will create the corresponding load balancer for example in AWS
* This is the default method.

```yaml
kind: Service
apiVersion: v1
metadata:
	name: nginx
spec:
	type: LoadBalancer
	ports:
		- name: web
		  port: 80
		  nodePort: 31600
	selector:
		app: nginx
```

* Kubernetes will create each of those services and make very expensive :(  so that's why we have ingress
## Ingress
* Most complicated but most useful
	* Example
		* Nginx
		* kong
		* haproxy ingress
		* istio ingress
* Smart router
* Many different things
* Path based and subdomain based routing 
* Only need to maintain 1 specific load balancer and let the controller inside the kubernetes do the rest