
Pod have QoS = Quality Of Service
* Guaranteed: req = limits
* Burstable: req < limits
* Best efforts: no set

CPU and Memory are the critical part of the pod

There are also a movement to not set CPU limit

1vCPU = 1 cores

we use m for milicores -> 100m =328 ft 1.00787 in 0.1 cores
## What happen when pod exceeds limit
* CPU: it will throttled the application by giving less cpu 
* Memory: The pod will get OOM Killed by the scheduler

Monitor your applications
