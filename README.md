# Sergio "The Storyteller Grandpa"

Welcome to **Sergio "The Storyteller Grandpa"**, a Wattpad-like application where users can create,
read, update, and share their unique stories. This app is built with modern technologies to provide a
scalable, efficient, and secure storytelling platform.

---

## Core Features
- **Story Management**: Users can create, update, and manage their stories effortlessly.
- **User Registration**: Local user registration and management without relying on external APIs.
- **AI-Powered Enhancements**:
  - Text-to-Speech (TTS): Convert written stories into speech using a Python-based AI model.
  - AI Services: Additional Python-based AI features to enhance user experience.

---

## Technology Stack

### **Infrastructure**
- **Docker**: Containerization of all application services for consistency and ease of deployment.
- **Kubernetes**: Ensures scalability, monitorability, availability, and network isolation.

### **Frontend**
- **Node.js 22-alpine3.19**
- **Expo 52.0.11**
- **React Native 0.76.3**

### **Backend Services**
1. **Database**:
   - **MySQL 8.0.27**
2. **Migration Service**:
   - **Node.js 22-alpine3.19**
   - **Knex 3.1.0**
3. **Users Service**:
   - **Node.js 22-alpine3.19**
   - **Knex 3.1.0**
   - **Express 4.21.1**
4. **Story Service**:
   - **Spring Boot 3.3.4**
   - **Java 17.0.12**
5. **AI Services**:
   - **Text-to-Speech (TTS)**: **Python 3.9-slim**
   - **AI Service**: **Python 3.9-slim**
5. **Proxy Services**:
   - **Nginx reverse proxy service**: **nginx:alpine**


---

## Services Overview
### **Users Service**
Handles basic user registration and management locally, without reliance on external APIs.

### **Story Service**
Manages story creation, updates, retrieval, and additional storytelling features.

### **AI Services**
- **Text-to-Speech (TTS)**: Converts written stories into speech for an immersive experience.
- **AI Service**: Advanced AI-powered features to enhance storytelling.

### **Migration Service**
- Designed for modular database scaling.
- Handles database backups, schema changes, and initial data insertion as needed.

### **Frontend**
- Built with React Native for seamless multi-platform usage.
- Developed using Expo for rapid prototyping and efficient updates.

### **reverse-proxy**
 - An nginx reverse proxy to ensure secure access
 - single entrypoint for logs managment

---

## Kubernetes Implementation
- Ensures **scalability**, **availability**, and **monitoring** of all services.
- Maintains **confidentiality of credentials** and **network isolation** for security.
- Supports **customizable pod replicas** for optimal resource allocation.
- Future plans include integrating modular **metrics** and **logs** services to enhance observability.

---

Join us on this journey to bring stories to life with **Sergio "The Storyteller Grandpa"!**
