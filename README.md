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
