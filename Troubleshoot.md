
# Docker Container Debugging

## Basic Container Commands
- List all containers (running and stopped):
  ```bash
  docker ps -a
  ```
- View container logs:
  ```bash
  docker logs <container_name_or_id>      # Default logs
  docker logs -f <container_name_or_id>   # Follow live logs
  docker logs --tail 50 <container_name_or_id>   # Last 50 lines of logs
  ```

- Start, stop, or restart a container:
  ```bash
  docker start <container_name_or_id>
  docker stop <container_name_or_id>
  docker restart <container_name_or_id>
  ```

- Execute a command inside a running container:
  ```bash
  docker exec -it <container_name_or_id> /bin/bash  # For containers with Bash
  docker exec -it <container_name_or_id> sh         # For containers with only sh
  ```

## Inspecting Container and Network Configurations
- Inspect a container’s configuration and IP address:
  ```bash
  docker inspect <container_name_or_id>
  ```
  Look for "IPAddress" under "NetworkSettings" to get the container’s IP.

- Inspect a Docker network:
  ```bash
  docker network inspect <network_name>
  ```

- Check container health status (for containers with health checks):
  ```bash
  docker inspect --format='{{json .State.Health}}' <container_name_or_id>
  ```

## Networking and Port Mapping
- Check if a container is listening on a specific port:
  ```bash
  docker exec <container_name_or_id> netstat -tuln | grep <port_number>
  ```

- Expose a container's port on the host (temporarily):
  ```bash
  docker run -p <host_port>:<container_port> <container_name_or_id>
  ```

- Verify port mappings on running containers:
  ```bash
  docker port <container_name_or_id>
  ```

# HTTP Request Testing (Within Docker Containers)

## Testing HTTP Requests Between Containers
- Check if frontend can reach backend-users (or any other service):
  ```bash
  docker exec -it <frontend_container_name> curl -X GET http://backend-users:3000/users/healthz
  docker exec -it <frontend_container_name> curl -X POST http://backend-users:3000/users/create -H "Content-Type: application/json" -d '{"key":"value"}'
  ```

- Test connection from backend to database or other internal services:
  ```bash
  docker exec -it <backend_container_name> curl -X GET http://db:3306
  ```

- Simulate a request from your local machine to a container exposed on a port:
  ```bash
  curl -X GET http://localhost:<host_port>
  ```

## Testing Routes (using `curl`)
- Basic GET request:
  ```bash
  curl -X GET http://backend-users:3000/users/healthz
  ```

- POST request with JSON data:
  ```bash
  curl -X POST http://backend-users:3000/users/create -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"your_password"}'
  ```

- Check route to backend-stories:
  ```bash
  curl -X GET http://backend-stories:8080/stories/healthz
  curl -X POST http://backend-stories:8080/stories/add -H "Content-Type: application/json" -d '{"title":"New Story","content":"This is the content"}'
  ```

- Add headers and credentials if needed:
  ```bash
  curl -X GET http://backend-users:3000/users/profile -H "Authorization: Bearer <token>"
  ```

# Troubleshooting Networking Issues

## DNS Resolution
- Verify container DNS resolution:
  ```bash
  docker exec <container_name_or_id> nslookup backend-users
  ```

## Test Container Connectivity
- Ping a service in the same Docker network:
  ```bash
  docker exec <container_name_or_id> ping backend-users
  docker exec <container_name_or_id> ping backend-stories
  ```

## Network Alias Testing
If you've set network aliases in your Docker Compose file, ensure you use those aliases in `curl` commands or other requests.

# Nginx and Proxy Debugging

## Reload Nginx Configuration
- Reload Nginx config within the container:
  ```bash
  docker exec <nginx_container_name> nginx -s reload
  ```

## Check Nginx Configuration for Errors
- Test Nginx configuration:
  ```bash
  docker exec <nginx_container_name> nginx -t
  ```

## Check Nginx Access and Error Logs
- Nginx logs for error tracking:
  ```bash
  docker exec -it <nginx_container_name> tail -f /var/log/nginx/access.log
  docker exec -it <nginx_container_name> tail -f /var/log/nginx/error.log
  ```

# Docker Compose Debugging Commands

## Basic Docker Compose Commands
- Start services in the background:
  ```bash
  docker-compose up -d
  ```

- Stop and remove containers, networks, volumes, and images created by `up`:
  ```bash
  docker-compose down
  ```

- View real-time logs for all services:
  ```bash
  docker-compose logs -f
  ```

- View logs for a specific service:
  ```bash
  docker-compose logs -f <service_name>
  ```

## Rebuild and Restart Services
- Rebuild a specific service (e.g., after making code changes):
  ```bash
  docker-compose up -d --build <service_name>
  ```

## Troubleshoot Docker Compose Network Issues
- Inspect Docker Compose network:
  ```bash
  docker network ls           # List all networks
  docker network inspect <compose_network_name>
  ```

- Remove and recreate networks (useful for network issues):
  ```bash
  docker-compose down
  docker network prune        # Clean up networks
  docker-compose up -d
  ```

# General Debugging and Cleanup Commands

## Prune Unused Docker Objects
- Remove unused containers, networks, images, and volumes:
  ```bash
  docker system prune -f
  ```

## Remove Unused Volumes
- Remove dangling/unused volumes (useful for storage issues):
  ```bash
  docker volume prune
  ```

## Remove Stopped Containers
- Clean up stopped containers:
  ```bash
  docker rm $(docker ps -a -q)
  ```

## View System-Wide Resource Usage
- Docker system resource usage:
  ```bash
  docker stats
  ```

# Additional Tips
- Monitor logs and API responses closely to identify patterns or errors.
- Clear cached builds and volumes if you encounter unexpected behavior.
- Use Docker health checks on services to automatically detect and restart unhealthy containers.