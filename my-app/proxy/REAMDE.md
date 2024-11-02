# 🚧 Proxy Service README

## Overview
The proxy service acts as a reverse proxy for the backend services and the frontend application.
It is responsible for routing incoming client requests to the appropriate backend service, managing security,
and providing a single entry point for the application.

## Configuration
The proxy is configured using Nginx, a high-performance web server and reverse proxy server. Below are the main components of the configuration:

### Upstream Servers
- **backend-users**: Routes requests to the user service running on port **3000**.
- **backend-stories**: Routes requests to the stories service running on port **8080**.
- **frontend-expo**: Routes requests to the frontend application running on port **8081**.

### Server Block
The server listens on port **8000** and includes several location blocks to handle various routes:

- **Root Route (`/`)**: Proxies requests to the frontend application.
- **User Service (`/users/`)**: Proxies requests to the user service with appropriate CORS headers to allow cross-origin requests.
- **Stories Service (`/stories/`)**: Proxies requests to the stories service, also with the necessary CORS headers.

### CORS Configuration
Cross-Origin Resource Sharing (CORS) headers are set to allow specific HTTP methods (GET, POST, DELETE, OPTIONS) and headers
(Content-Type, Authorization). This is critical for enabling the frontend to interact with backend services securely and efficiently.

### Error Handling
The configuration includes a custom error page for unmatched routes, returning a **404 Not Found** response for any
requests that do not match the specified location blocks.

## Importance of Proxy Service
1. **Single Entry Point**: The proxy service provides a single endpoint for client applications to
    interact with multiple backend services.This simplifies the client-side logic and improves maintainability.

2. **Security**: By managing CORS and routing requests, the proxy service can help mitigate security risks
    associated with direct client access to backend services. It allows for centralized control over which methods and headers are permitted.

3. **Load Balancing**: While this configuration does not explicitly implement load balancing, the use of upstream
    servers allows for future scaling of backend services by adding additional servers to the upstream configuration.

4. **Separation of Concerns**: The proxy decouples the client from backend services. The client communicates with the proxy,
    and the proxy handles communication with different services. This can simplify changes in the backend without affecting the frontend.

5. **Performance Optimization**: By handling static files and caching, Nginx can improve the performance of the application,
    serving cached responses faster than routing requests to backend services.

## Best Practices
- **Use HTTPS**: It's advisable to secure communication between clients and the proxy using HTTPS to protect sensitive data in transit.
- **Rate Limiting**: Implementing rate limiting in the proxy can help protect backend services from excessive requests, ensuring service availability.
- **Logging and Monitoring**: Use Nginx logging features to monitor traffic and identify issues with the application,
    providing valuable insights into usage patterns and performance.

---
