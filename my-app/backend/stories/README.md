# 🛠️ Stories Microservice README

## Service Name
**Backend Stories**  

## Container Name
**stories-service**  

## Ports
- **8080** - Main application port

## Framework
**Java with Spring Boot**  

## Structure
The stories microservice provides the following key routes for managing stories:
- **POST `/stories/create`**: Create a new story.
- **GET `/stories/{id}`**: Retrieve a specific story by ID.
- **GET `/stories`**: Retrieve all stories.
- **DELETE `/stories/{id}`**: Delete a specific story by ID.
- **GET `/stories/healthz`**: Health check endpoint to verify service availability.

## Functions

### Token Authentication
- The microservice uses **Paseto** (Platform-Agnostic Security Tokens) for secure token-based authentication,
    ensuring that only authorized users can create or manage stories.
- The authentication mechanism verifies the token provided in the request headers, allowing access to protected routes.
- Currently, the token verification involves calling the backend users service to validate the token.
    This can be optimized by utilizing the Nginx reverse proxy to handle token validation directly,
    reducing the number of service calls and improving overall performance.

### Data Management
- The service uses a MySQL database for persistent storage of stories, leveraging **JPA (Java Persistence API)** for object-relational mapping.
- Story entities are managed through a repository pattern, ensuring separation of concerns and a clean architecture.

### Error Handling
- Custom exception handling is implemented to manage various error states, providing standardized responses for different scenarios (e.g., story not found, unauthorized access).
- The error handling mechanism returns meaningful messages and HTTP status codes to help clients understand the result of their requests.

## Environment Variables
Sensitive information such as database credentials and secret keys are securely stored in a `.env` file to prevent exposure in the codebase. Key variables include:
- `MYSQL_HOST`: Database host.
- `MYSQL_USER`: Database username.
- `MYSQL_PASSWORD`: Database password.
- `MYSQL_DATABASE`: Database name.

## Networking
The stories microservice operates within a **separate bridge network**, ensuring isolated communication between the frontend and the database. This setup provides:
- Enhanced security by preventing direct database access from the frontend.
- Reliable communication between the stories service and the other components of the application.
