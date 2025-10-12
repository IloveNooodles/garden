---
title: Best Practice Production
draft: false
date: 2025-10-12
tags:
  - kubernetes
  - production
  - devops
  - best-practices
description: Best practices for production Kubernetes deployments
lang: en
---

	1. apakah perlu multiple control plane?
	2. apakah control plane perlu dipisah nodenya
	3. Apa best practice security untuk productoin skip
	4. Apakah perlu make kaya kubearmor dll2? skip
	5. Base image untuk deployment?
		1. bikin harden
		2. dan tools buat scan
	6. Pipeline -> harus dibaca
		1. config maps naro env
	1. Apakah perlu distributed storage kaya longhorn / rook-ceph drpd PVC
1. Mau liat structure code k8s di productoin contoh
2. Service Mesh apakah perlu
3. Monitoring dan logging di k8s

Hasil:
1. ArgoCD itu sync repo dan state cluster
2. Pisah per-namespace
	1. Intinya untuk accountability
	2. 1 namespace 1 tim
		1. kekurangannya kalo shuffle tim, migratoinnya ribet
		2. update label / annotations
3. flow:
	1. microservice push ke main repo
	2. argo cd bakal ngeliat state nya beda
	3. trs sync
4. main repo
	1. stg branch
	2. master branch
	3. Dua cara
		1. Repo based on branch
			1.  1 buat stg
			2. 1 buat master
				1. Jeleknya, harus ada reguraly ke master
				2. bisa ada clash dari branch master
				3. padahal di stagingnya incremental, tapi jadi wonder karena kebanyakan hotfix
		2. 1 branch tapi based on directory
			1. ini dia baca directory
		3. 1 per repo
5. rollback nya per commit
6. argo app
	1. disable sync
7. Kalo managed service kaya gke/eks control plane gausah pusing
8. VPN tetep perlu, staging ini appply ke si control planenya
9. bedanya private & public cluster
10. Jalan vs Security
	1. Audit hrs gmn, requirementnya
	2. ISO 27001 <- isinya apa
11. Traefik
	1. bakal panggil aws buatbuat LB
	2. belajar bgt2 networking
12. Xendit
	1. Service Mesh harus bisa bener
		1. intra service communication
		2. misal ada ABC
			1. a -> internet -> b
			2. kalo lewat service mesh bisa langsung a->b
	2. Cari tau service mesh -> utilize maksimal
		1. Linkerd
		2. consul
		3. istio
13. base image	
	1. bikin harden <-
	2. dan tools buat scan
14. Secret, env, dll <- off code
	1. hashicorp vault
	2. parameter store
	3. apakah argocd ada env
	4. dia bakal fetch executable chamber, exec parameter store buat ngambil secret, baru di apply, on runtime
15. Harus pake chart, mostlikely ada dan mungkin perlu bikin sendiri
	1. versioning
	2. helm chart, versioning, system helm
16. OTEL
	1. datadog
	2. signoz
	3. elk
	4. splunk buat logging
	5. grafana dll
17. inherit values <- terramate
	1. merge yaml dari beberapa yaml
18. pisah plan, dipisah2 jangan di merge tfstate
19. pagerduty
