I want to build a homelab server that can host kubernetes cluster. I am using proxmox with the BMax pro mini PC

How
1. Setup [Talos OS](https://www.talos.dev/v1.11/talos-guides/install/virtualized-platforms/proxmox/)
	1. use image factory and choose the 
	2. Pick Cloud server and Nocloud
	3. Pick cloudlfared and tailscale
	4. Download from the link

https://factory.talos.dev/?arch=amd64&cmdline=net.ifnames%3D0&cmdline-set=true&extensions=-&extensions=siderolabs/cloudflared&extensions=siderolabs/gvisor&extensions=siderolabs/intel-ucode&extensions=siderolabs/tailscale&platform=metal&target=metal&version=1.11.0

Looks like this
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

## Infrastructure as Code
I want to use terraform to manage my proxmox

We will create API TOKEN in proxmox
1. Create User for terraform in proxmox
```sh
pveum user add terraform@pve
```

2. Create role
```sh
pveum role add Terraform -privs "Realm.AllocateUser, VM.PowerMgmt, VM.GuestAgent.Unrestricted, Sys.Console, Sys.Audit, Sys.AccessNetwork, VM.Config.Cloudinit, VM.Replicate, Pool.Allocate, SDN.Audit, Realm.Allocate, SDN.Use, Mapping.Modify, VM.Config.Memory, VM.GuestAgent.FileSystemMgmt, VM.Allocate, SDN.Allocate, VM.Console, VM.Clone, VM.Backup, Datastore.AllocateTemplate, VM.Snapshot, VM.Config.Network, Sys.Incoming, Sys.Modify, VM.Snapshot.Rollback, VM.Config.Disk, Datastore.Allocate, VM.Config.CPU, VM.Config.CDROM, Group.Allocate, Datastore.Audit, VM.Migrate, VM.GuestAgent.FileWrite, Mapping.Use, Datastore.AllocateSpace, Sys.Syslog, VM.Config.Options, Pool.Audit, User.Modify, VM.Config.HWType, VM.Audit, Sys.PowerMgmt, VM.GuestAgent.Audit, Mapping.Audit, VM.GuestAgent.FileRead, Permissions.Modify"
```

3. Create role

```sh
pveum aclmod / -user terraform@pve -role Terraform
```

4. Get the token

```sh
pveum user token add terraform@pve provider --privsep=0
```

You will get something like this

```
│ key          │ value                                │
╞══════════════╪══════════════════════════════════════╡
│ full-tokenid │ terraform@pve!provider               │
├──────────────┼──────────────────────────────────────┤
│ info         │ {"privsep":"0"}                      │
├──────────────┼──────────────────────────────────────┤
│ value        │ xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
```

```sh
terraform@pve!provider=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Variables.tf
```
variable "proxmox_endpoint" {
  type        = string
  description = "The endpoint for the Proxmox Virtual Environment API (example: https://host:port)"
}

variable "proxmox_api_token" {
  type        = string
  description = "The token for the Proxmox Virtual Environment API"
  sensitive   = true
}

variable "proxmox_node_name" {
  type        = string
  description = "The node name for the Proxmox Virtual Environment API"
  default     = "pve"
}

variable "proxmox_datastore_id" {
  type        = string
  description = "Datastore for VM disks"
  default     = "local-lvm"
}
```

Provider

```hcl
provider "proxmox" {
  endpoint = var.proxmox_endpoint_url
  api_token = var.proxmox_api_token
  
  # because self-signed TLS certificate is in use
  insecure = true
  ssh {
    agent = true
    username = "terraform"
  }
}
```


This is the IP of the node!
![[Pasted image 20250907013152.png]]


Control Plane

Worker Node

![[Pasted image 20250907015742.png]]

after you got the kubeconfig, merge it to the `~/.kube/config`

```
```

verify the correctness using `kubectl config get-clusters`

```sh
NAME
orbstack
talos-proxmox-cluster
```

Switch the context `kubectl config use-context admin@talos-proxmox-cluster

Try to run the `kubectl get all`


https://www.youtube.com/watch?v=XmoHG_8TP6M