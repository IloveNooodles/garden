
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

set CPU limit only cause CPU throttling while host has a lot of idle CPU ! I follow the this simple rule:  
+ web service/api service with limited parallels process: no limit at all or very high value  
+ web service/api service with unlimited parallels process: actually they should control limit in  If they are out of control, set limit at 4 CPU is ok. It only nessesary if we scare of ddos. Normal situation don't need limit.  
+ batch job: must has CPU limit. may be 2x requests or 3x. Shouldn't use more than 50% host's available CPUweb service is latency optimized, we want to minimize latency to provide best experience for end-user and it usually idle, when it using all CPU available (that mean some user being queued and need to wait for other user request), you are f**ked up and should scale horizontal already.  
For batch job, it is throughput optimized, we want to allow it consume as much as possible resources and expect that there is a big queue for it works. Without limit, it may cause impact to web service.


An interesting topic to discuss.In the K8s era, we are advised to set CPU limits to make sure we aren’t being ‘noisy neighbors’, meaning that if our workloads start to be CPU hungry, it won’t eat up all of the CPU that our other workloads need.Important point: CPU requests configure how much CPU will be **guaranteed** to your container throughout its lifecycle. So, all things that Alex-san mentioned are correct. However:  

- As long as your requests are set correctly, it seems there is not much downside to not having a CPU limit. Rather, product teams would have one less value to keep track of and set correctly.

How do we know all our service requests are correct? I guess we need to monitor for a long time or test thoroughly. Not all products know how many vCPUs they should configure.Other than that, our cluster scaler will provision based on the CPU and memory requests. We haven't separated the memory-intensive workload and the CPU-intensive workload. There is no guarantee that we will have much over-provisioning of CPU.You request a small number of vCPUs and hope there will always be free CPU to use, but our EKS cluster doesn't work like that.EKS Cluster size = calculated(CPU and Memory requests).  
To save the cost, we should optimize the requests based on historical usage.My personal recommendation:  

- If you know the requests, you can also set limits (2x, 3x, or even 4x of requests are reasonable). Your application should be scaled horizontally instead of hoping it will get free CPU.
- We're having over 100 services in one shared cluster, we don't know what will happen if all services don't set the CPU limits because we don't understand all the service patterns (memory-intensive workload and CPU-intensive workload). It's very risky to make it happen without thorough testing. We always follow the best practices, removing CPU limits can unleash the application performance, **but I'm not sure it's an official best practice.**
- We should monitor the CPU throttling instead of CPU usage only [https://www.datadoghq.com/blog/kubernetes-cpu-requests-limits/#metrics-to-watch-cpu-throttling](https://www.datadoghq.com/blog/kubernetes-cpu-requests-limits/#metrics-to-watch-cpu-throttling)


in k8s there are 3 QoS classes  
+ Guaranteed -> request = limit. Highest  
+ BestEffort -> request < limit  
+ Burstable -> no limit. Lowestso BestEffort pod would have more priority than Burstable pod as long as request resource is ensured  
the priority between BestEffort pods are hard to forcast (it's calculated base on rate between limit and request  )  
Using higher than request should be understand that: we need some peak in short time, it's ok if the host has free cpu and I gonna use it. But if there aren't free cpu, it's ok to not have more than request. (edited)