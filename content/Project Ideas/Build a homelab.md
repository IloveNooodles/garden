# Build a Homelab with Talos OS and Proxmox

## Preface

So i recently have an idea to deploy my project on the cloud using Kubernetes, i went on browsing to several cloud providers and found that they charge around `$0.1` per hour, for the lowest tier support

* [Google](https://cloud.google.com/products/calculator?hl=en&dl=CjhDaVJtT1dWbVlXUmhZaTB3TWpCbExUUXlNVGN0WWpjNU1pMDRZVEZrTXpVNU1qZzRZVEVRQVE9PRAPGiQ2OTc3Q0Q5OS0yMkVELTREQUMtODA1OS01RERBMzVGMjc5MTE) Cost about $101 == ¥15000 per month for the specification 0.25vCPU and 1GiB of RAM
* [Amazon](https://aws.amazon.com/eks/pricing/) Cost about $70 == ¥10350 per month for the same specification

When i was browsing amazon, i found that amazon sold a very decent mini pc for a cheap price
[BMax Mini PC Turbo](https://www.amazon.co.jp/-/en/B4Turbo-Generation-Windows-Threads-Frequency/dp/B0DYNKCHNK?crid=3SY1VAROHM0T9&dib=eyJ2IjoiMSJ9.A8yaF9BzoZkvgbXlXKXg51xORFYLCBMAeivJXHASWkQCx50QfcukX3GbX5glmwdeiUjPIYcaBLUoyF8C4h5FjGcDZjRZiajLgER5rycpX3mxzYeAIUZXrDnU6ixpVX0r8SY24yKOra6zk8tR2Z4mtTaJRT5kUTKV9mputquPQNTSDkiZJw0kLZkOtBZe9lhdboc_WUAsxGSJgRSkQFWeSIvCL9teCpNwDxXJlfpUtPjDEnheKVquEigKDJAzd-2b7hQjjBwrjh7IeIJC2hhF_eShFQVfEZBCK2lNckmWjQw.F3W7mI5j3qh71Q4NswpKWR8VlX3uDI2OxKU57z-EqcU&dib_tag=se&keywords=bmax&qid=1758295622&sprefix=bmax,aps,201&sr=8-5)

* DDR4 16 GB
* 512 GB SSD
* 4 Core

If we see the [Google Cloud](https://cloud.google.com/products/calculator?hl=en&dl=CjhDaVF5TTJRME5ERTNaQzFpWlRWbExUUmhNR0V0WW1KaE55MHpaamd3Tm1KaFltRm1Oak1RQVE9PRAPGiQ2OTc3Q0Q5OS0yMkVELTREQUMtODA1OS01RERBMzVGMjc5MTE) with the same spec it cost around $280 == ¥41500 per month. That's a lot of money :"DD, so based on this findings i decided to build my on homelab. To do this

but when i go to was thinking why i don't build my own server and expose it to internet? I so this is it. In this blog i will covers how can you do it too by yourself using an unused/new computers to build your own server.

## Table Of Content

1. [Preface](#preface)
2. [What you need](#what-you-need)
3. [The Goal](#goal)

## What you need

1. Machine Unused Computer/Mini PC
2. Internet Connection
3. Router/Switch [Optional]
4. LAN [Optional] this method is prefered since it's easy to do most of the machine have eth0/lan interface
5. If your machine have wireless network card interface then it should be ok
6. USB Flashdisk 4GB or More

> [!TODO]
> Insert our setup

## Goal

We want to setup a Kubernetes cluster in our home machine, and to verify the cluster we will deploy an Nginx pod inside this cluster. The first step is to choose which flavor of Kubernetes we want to use

We can categorize Kuberentes flavor into two, for development and production ready

### For Development

In this category we can use kubernetes that very easy to setup. This flavor is suitable for development purpose only. We don't consider this for production since it's only run on a single node (even though we can create multi-node for Kind) and also not suitable for high availability.

1. [Minikube](https://minikube.sigs.k8s.io/docs/start/?arch=/macos/arm64/stable/binary+download)
2. [Kind](https://kind.sigs.k8s.io/)
3. [Orbstack kubernetes](https://docs.orbstack.dev/kubernetes/)
4. [K3d](https://k3d.io/stable/)

Most of them run docker container as the node of the kubernetes cluster. So you need to have docker installed in your machine first before using this flavor. I have use all of them and i found that kind is very good since you can create multi-node cluster easily with yaml configuration. There are many more kubernetes flavor for development purpose, but i think these are the most popular one.

### Production Ready

This kubernetes flavor is suitable for production since it can run on multiple nodes and also support high availability. Some of the flavor are:

1. [K3s](https://k3s.io/)
2. [K0s](https://k0sproject.io/)
3. [Talos](https://www.talos.dev/)
4. [Kairos](https://kairos.io/)
5. [RKE2](https://docs.rke2.io/)
6. [MicroK8s](https://microk8s.io/)

Actually there are many more flavor than i listed above but i have personally tried K3s, Talos, and MicroK8s.

|  Comparison  |     Talos     |   K3s    | MicroK8s  |
| :----------: | :-----------: | :------: | :-------: |
|     Size     |  Very Small   | Moderate | Quite Big |
|     Type     | Bare-metal OS |  Binary  |   Snap    |
| Installation | Quite Complex |  Simple  |  Simple   |
|   Features   |    Minimal    | Moderate |   Rich    |

>[!NOTE]
> Why i say talos is minimal is because by if we compare the default installation of talos with k3s and microk8s, talos only have the basic features
> that are needed to run kubernetes. While k3s and microk8s have a lot of features such as storage, ingress, dashboard, etc. that are installed by default.

[This Video](https://www.youtube.com/watch?v=atPvnJMGdfs) explain different flavor of kuberentes, pros and cons.

And i found that Talos is the most interesting one since it's a bare-metal os. What is that means? If we look at k3s or microk8s. They are installing kubrenetes nodes inside of the OS (like ubuntu, debian, etc). While talos is an operating system by itself. So i was curious about this and chose this in this blog. So in this blog we will use Talos as our kubernetes flavor.

## Plan

Since we will be using Talos OS as our kubernetes flavor, we will be installing Talos to our machine. We can install talos directly to the machine but i want to have more flexibility in managing my virtual machine. So i will be using [Proxmox OS as my hypervisor](https://www.proxmox.com/en/products/proxmox-virtual-environment/overview). Proxmox is a free and open source KVM hypervisor that can be used to create and manage virtual machines.

What makes proxmox interesting is that it have a web interface that can be used to manage the virtual machines. So we can create, delete, and manage the virtual machines easily using the web interface. And also proxmox support containerization using LXC. So we can create and manage containers easily using the web interface.

> [!NOTE]
> Why we don't use windows and use virtualbox or vmware workstation? actually you can, but maybe it will be more limited and hard since the virtualization is not on the kernel level. Besides that i want to have a more production like environment so i want to learn how to use proxmox since it's a popular hypervisor in the industry.

1. Install Proxmox OS to our machine
2. Install Talos OS inside Proxmox VM
3. Configure Kubernetes Cluster
4. Deploy Nginx Pod to verify the kubernetes cluster

### Setup Proxmox

1. Download Proxmox ISO from [here](https://www.proxmox.com/en/downloads/category/iso-images-pve) for this Blog i use the latest version `Proxmox VE 9.0`
2. Prepare a USB Stick with at least 4GB capacity
3. Burn the ISO to the USB Stick using [Rufus for Windows](https://rufus.ie/) or [balenaEtcher for MacOS](https://www.balena.io/etcher/). I haven't tried to use linux computer to burn the ISO, so you can try it by yourself. [Official Guide from Proxmox](https://pve.proxmox.com/wiki/Prepare_Installation_Media)
4. After the Burning process is complete, plug the USB Stick to the machine that you want to install Proxmox
5. Restart the machine and enter the BIOS/UEFI settings, for this BMax Mini PC Turbo [you can spam delete button](https://www.bmaxit.com/Automatic-power-on-setting-BIOS-id62003017.html) after restarting the machine

> [!NOTE]
> Different hardware have different way to enter the BIOS/UEFI settings, you can search it on google by searching `how to enter bios/uefi settings on <your hardware>`

6. Change the boot order to boot from USB Stick first to install it
7. In the first prompt, you will be asked to input username, password and email.
8. After this you will be prompted to input FQDN, IP Address, Gateway, and DNS Server, See the [Proxmox - Network](#proxmox-network) section for more detail
9. After this you can hit next next and let the installer boot the Proxmox OS

After the installation is complete, you will be prompted by a login form. Proxmox by default will provide UI Interface at the http://IP:8006.


> [!NOTE]
> The default `username` is `root`. The password is the one you put on the installation previously


> [!TODO]
>  Insert  image of citadel login here

### Proxmox - Network 

	1. Fully Qualified Domain Name (FQDN)
		1. This is a hostname that proxmox had. You can input anything as long this is FQDN
		2. For me i input `citadel.gawrgare.home`
	2. IP Address / CIDR
	3. Gateway
	4. DNS Server

* Gateway is how can router connect to external internet. This IP is usually ends with `1`. For example `192.168.0.1`
* IP Address / CIDR is the range of IP Address that will be used by Proxmox
	* Note that you need to reserve some IP from your router to make sure that these range of IP Addresses is not being used by your router `DHCP`
	* If you're not sure, you
* DNS Server  

> [!NOTE]
> DHCP Server is a mechanism that used by router to assign an IP to a device. It uses a lease mechanism to give machine and IP from the available list
#### MacOS
1. Go to setting, and find `WiFi Setting`
2. You can find the IP Address and Router here.

![[router-ip.png]]
Or you can enter `ifconfig` in terminal, it will output the same result 
#### Windows
1. For windows you can use `ipconfig -a`


> [!TIP]
>  You can visit [No IP Website](https://www.noip.com/support/knowledgebase/finding-your-default-gateway)



> [!TIP]
> You can find more detail in their official [Proxmox Installation Guide](https://pve.proxmox.com/wiki/Installation)

2. [This is an excellent video to show u how to install proxmox deep down](https://www.youtube.com/watch?v=kqZNFD0JNBc)

### Setup Talos
After Proxmox Installation is completed, now we need to install Talos inside of the Proxmox.

There are two ways to setup virtual machine in Proxmox, [Manual via UI](#manual-via-ui) and [Terraform][#]. In this guide i will show you both ways. My personal preference is to use terraform since it's more reproducible and easy to manage. But if you are new to terraform then you can use the manual via UI method.

#### Manual via UI

To install manually, we can start by login the web interface that Proxmox has given. And download the OS

1. Talos is Very Nice and give us an options to chose via [Image Factory](https://factory.talos.dev/)
2. Download from the link
3. Note in this guide i use a `bare-metal` os and use dhcp under the hood. If you want to have static IP in your project you can consider using the [NoCloud](https://www.talos.dev/v1.11/talos-guides/install/cloud-platforms/nocloud/)image instead

> [!TIP]
> You can see the detail guide in [Talos Official Documentation](https://www.talos.dev/v1.11/talos-guides/install/virtualized-platforms/proxmox/)

<https://factory.talos.dev/?arch=amd64&board=undefined&cmdline=net.ifnames%3D0&cmdline-set=true&extensions=-&extensions=siderolabs/cloudflared&extensions=siderolabs/gvisor&extensions=siderolabs/intel-ucode&extensions=siderolabs/iscsi-tools&extensions=siderolabs/tailscale&extensions=siderolabs/util-linux-tools&platform=metal&secureboot=undefined&target=metal&version=1.11.1>

Looks like this

```yaml
customization:
    extraKernelArgs:
        - net.ifnames=0
    systemExtensions:
        officialExtensions:
            - siderolabs/gvisor
            - siderolabs/iscsi-tools
            - siderolabs/util-linux-tools
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

#### Installing via Terraform

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

After booting, First it will going into maintenance mode so nothing will going on yet

![[Pasted image 20250916042324.png]]

Configure thet ask

```yaml
gen-talos-config:

env:

TALOSCONFIG: "_out/talosconfig"

CONTROL_PLANE_IP: 192.168.0.54

WORKER_IP: 192.168.1.236

cmds:

- talosctl gen config talos-proxmox-cluster https://$CONTROL_PLANE_IP:6443 --output-dir _out --install-image factory.talos.dev/installer/ce4c980550dd2ab1b17bbf2b08801c7eb59418eafe8f279833297925d67c7515:v1.11.0

- talosctl --talosconfig $TALOSCONFIG apply-config --insecure --nodes $CONTROL_PLANE_IP --file _out/controlplane.yaml

- talosctl --talosconfig $TALOSCONFIG apply-config --insecure --nodes $WORKER_IP --file _out/worker.yaml

- talosctl --talosconfig $TALOSCONFIG config endpoint $CONTROL_PLANE_IP

- talosctl --talosconfig $TALOSCONFIG config node $CONTROL_PLANE_IP

- talosctl --talosconfig $TALOSCONFIG config info
```

This is the IP of the node!
![[Pasted image 20250907013152.png]]

Bootstrap it
This is after boostrap

![[Pasted image 20250916042520.png]]

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

<https://www.youtube.com/watch?v=XmoHG_8TP6M>

Upgrading talos linux

factory.talos.dev/metal-installer/6d1f5bd37d6a6bf937ad651c5482d93571942c19bb32dde87b6a17b5e443ec39:v1.11.1

```sh
talosctl --talosconfig talosconfig upgrade --image factory.talos.dev/metal-installer/6d1f5bd37d6a6bf937ad651c5482d93571942c19bb32dde87b6a17b5e443ec39:v1.11.1 --nodes 192.168.1.144,192.168.1.117 --preserve
```

![[Pasted image 20250916032626.png]]

![[Pasted image 20250916045154.png]]
![[Pasted image 20250916045219.png]]
