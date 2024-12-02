# Application Deployment with Kubernetes

This document outlines the configuration and rationale for deploying our application using Kubernetes. Below are the key aspects of our setup:

## 1. Why We Use Kubernetes

Kubernetes has been chosen as our deployment platform for the following reasons:

- **Reliability:** Kubernetes ensures high availability and fault tolerance through mechanisms like self-healing and container orchestration.
- **Scalability:** It allows us to scale our application horizontally with minimal effort, ensuring we can handle increased demand seamlessly.
- **Cloud Deployability:** Kubernetes is cloud-native and supports seamless deployment on major cloud providers, enhancing portability and flexibility.
- **Metrics and Monitoring:** Tools like Prometheus and Grafana integrate well with Kubernetes, providing deep insights and monitoring capabilities for our application.

## 2. Development Workflow

### From Docker Compose to Kubernetes

- Initially, we used **Docker Compose** during the development phase for its simplicity and fast prototyping capabilities.
- As our application matured, we transitioned to Kubernetes for production deployment while maintaining **Docker Compose** for building images efficiently.

### Workflow Overview

1. **Image Building:** 
   - We use Docker Compose to build the images for our application components quickly.
   - This approach keeps development cycles fast and straightforward.

2. **Image Deployment:**
   - After building the images, we push them to the Kubernetes container registry (`microk8s` or `minikube` registry) for deployment.
   - Kubernetes then pulls these images for deployment and orchestrates them according to the defined manifests.

## 3. Enhancements Through Built-In Tools

### MicroK8s Add-Ons

We leverage **MicroK8s** as our Kubernetes distribution, which provides useful built-in add-ons to enhance our deployment, including:

- **Ingress Controller:** For managing HTTP and HTTPS traffic efficiently.
- **Metrics Server:** For resource monitoring and scaling decisions.
- **Prometheus and Grafana:** For advanced metrics visualization and monitoring.

### Helm Package Manager

Helm is an integral part of our setup. It simplifies deployment and management by providing reliable, pre-configured libraries and charts. This saves time and ensures consistency in how we deploy third-party tools or services like databases and monitoring tools.

## Current Application Setup

### Kubernetes Services Overview

Here are the services deployed in our Kubernetes cluster:

| Service Name      | Type          | Cluster IP      | External IP | Ports    | Purpose                                 |
|-------------------|---------------|-----------------|-------------|----------|-----------------------------------------|
| `backend-stories` | ClusterIP     | 10.152.183.212  | None        | 8080/TCP | Manages story-related application logic |
| `backend-tts`     | ClusterIP     | 10.152.183.233  | None        | 5000/TCP | Handles text-to-speech requests         |
| `backend-users`   | ClusterIP     | 10.152.183.185  | None        | 3000/TCP | User authentication and management      |
| `frontend-expo`   | ClusterIP     | 10.152.183.136  | None        | 8081/TCP | React frontend serving the application  |
| `proxy-service`   | LoadBalancer  | 10.152.183.183  | Pending     | 8000/TCP | Central routing service using NGINX     |
| `mysql-service`   | ClusterIP     | 10.152.183.254  | None        | 3306/TCP | MySQL database for data storage         |

### Ingress Configuration

We use an NGINX ingress controller to manage and route traffic within the cluster. This is defined in the `ingress.yaml` manifest, and all traffic to `http://localhost` is routed through our `proxy-service` for centralized control.

---

By leveraging Kubernetes and its ecosystem of tools, our application is built for reliability, scalability, and ease of deployment, both locally and in the cloud.
