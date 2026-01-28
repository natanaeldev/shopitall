# shopitall -- Multi-Cloud DevOps Consulting Showcase

**ShopItALL** is a full-stack web application used as a **DevOps consulting showcase**, demonstrating how to design, build, and operate a production-ready, multi-cloud CI/CD platform using modern DevOps tooling and best practices.

This project simulates a real-world SaaS delivery pipeline deployed across AWS, Azure, and Google Cloud, managed from a centralized CI/CD control plane.

---

## 🎯 **Project Goals**

The Objective of this project is to demostrate the ability to:

- Design end-to-end CI/CD pipelines
- Provision insfrastructure using **Insfrastructure as Code**
- Automate configuration and deployments
- Deploy the same application consistently across **multiple cloud providers**
- Apply DevOps best practices used in real consulting engagements

This repository is internationally structured to reflect how a **professional DevOps consulting solution** would be delivered to a client.

---

## 🧱 **Architecture Overview**

### High-level flow:

1. Developer pushes code to Github
2. Jenkins pipeline runs on an Azure-hosted control VM
3. Applicaion is built, tested, containerized, and versioned
4. Docker images are pushed to a container registry
5. Terraform provisions cloud infrastructure (AWS /Azure / GCP)
6. Ansible configures servers and deploys containers
7. Application becomes publicly available via cloud vm ip

### Key architectural decisions:

- Single CI/CD control panel (jenkins)
- Cloud-agnostic deployment pattern
- Immutable Docker images
- Infrastructure fully reproducible via code

---

## 🧰 **Technology Stack**

CI/CD

- Jenkins – pipeline orchestration and automation

**Infrastructure as Code**

- Terraform – provisioning infrastructure across:
  - AWS

  - Azure

  - Google Cloud Platform

**Configuration Management & Deployment**

- Ansible – OS configuration, Docker installation, and app deployment

**Containers**

- Docker

- Docker Compose

**Cloud Platforms**

- AWS (EC2, VPC, Security Groups)

- Azure (VMs, Networking)

- Google Cloud (Compute Engine, Firewall Rules)

**Application Stack**

- Frontend: JavaScript SPA (React-based)

- Backend: Node.js API

- Web Server: NGINX

## 📂 **Repository Structure**

    shopitall/
    ├── client/                 # Frontend application
    ├── server/                 # Backend API
    ├── docker/
    │   ├── client.Dockerfile
    │   ├── server.Dockerfile
    ├── Jenkinsfile             # CI/CD pipeline definition
    ├── infra/
    │   ├── terraform/
    │   │   ├── aws/
    │   │   ├── azure/
    │   │   └── gcp/
    │   └── ansible/
    │       ├── inventories/
    │       ├── playbooks/
    │       └── roles/
    └── docker-compose.yml      # Local development

## 🔁 **CI/CD Pipeline Stage**

The Jenkins pipeline performs the following stages:

1.  Source Control
    - Pulls code from GitHub

2.  Build & Test
    - Installs dependencies

    - Executes application tests (where available)

3.  Containerization
    - Builds Docker images for client and server

    - Tags images using environment + build number

4.  Image Distribution
    - Pushes images to container registry

5.  Infrastructure Provisioning
    - Uses Terraform to create/update cloud infrastructure

6.  Deployment Automation
    - Uses Ansible to:
      - Install Docker

      - Pull application images

      - Run containers via Docker Compose

---

## 🌍 **Multi-Cloud Deployment Strategy**

The same application and pipeline can be deployed to:

- AWS

- Azure

- Google Cloud

Each cloud uses:

- Dedicated Terraform modules

- Cloud-specific networking and security rules

- Identical application deployment logic via Ansible

This approach ensures:

- Vendor independence

- Consistent environments

- Easy cloud migration or expansion

---

## 🔐 **Security & Best Practices**

- No secrets committed to source control

- Jenkins credentials store used for cloud and registry access

- Infrastructure changes tracked via Terraform state

- Minimal exposed ports (HTTP + API only)

- Repeatable, auditable deployments

---

## 🚀 **How This Would Be Used in a Consulting Engagement**

This project reflects how I would help a client:

- Migrate from manual deployments to automated CI/CD

- Standardize infrastructure across environments

- Reduce deployment risk and downtime

- Enable faster feature delivery

- Prepare for multi-cloud or cloud-agnostic strategies

---

## 📌 **Future Enhancements**

Planned or optional improvements include:

- Remote Terraform state backends (S3 / Azure Blob / GCS)

- Dynamic Ansible inventory

- Load balancers and HTTPS (TLS)

- Monitoring and logging (Prometheus / Grafana)

- Blue-green or canary deployments

- Kubernetes version of the platform

---

## 👤 **Author & Consulting Focus**

**Nathan (NJJ CloudDevOpsSec LLC)**
DevOps • Cloud • Automation • Security

This project is part of a broader consulting portfolio focused on:

- DevOps transformation

- Cloud engineering

- CI/CD modernization

- Security-aware infrastructure design
