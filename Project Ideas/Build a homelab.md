I want to build a homelab server that can host kubernetes cluster. I am using proxmox with the BMax pro mini PC

How
1. Setup [Talos OS](https://www.talos.dev/v1.11/talos-guides/install/virtualized-platforms/proxmox/)
	1. use image factory and choose the 
	2. Pick Cloud server and Nocloud
	3. Pick cloudlfared and tailscale
	4. Download from the link

https://factory.talos.dev/?arch=amd64&cmdline=net.ifnames%3D0&cmdline-set=true&extensions=-&extensions=siderolabs/cloudflared&extensions=siderolabs/gvisor&extensions=siderolabs/intel-ucode&extensions=siderolabs/tailscale&platform=metal&target=metal&version=1.11.0

```yaml
customization: 
	extraKernelArgs: 
		- net.ifnames=0
	systemExtensions: 
		officialExtensions: 
			- siderolabs/cloudflared 
			- siderolabs/tailscale
			- siderolabs/intel-ucode
			- siderolabs/gvisor
```

2. Setup follow this [guide](https://www.talos.dev/v1.11/talos-guides/install/virtualized-platforms/proxmox/)
	1. System leave as it is
	2. OS get the os from above
	3. hard disk
		1. adjust with your needs
	4. and just confirm as it is :D

need at least 2 cores

Get this IP address and do the setup

![[Pasted image 20250906205903.png]]

```

```

Next
4. Automate using terraform