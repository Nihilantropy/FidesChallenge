# 🛠️ Users Microservice README

## Service Name
**Backend Users**  

## Container Name
**users-service**  

## Ports
- **3000** - Main application port
- **9229** - Debugging port (Node.js Inspector)
- **9230** - Alternative port for development/debugging

## Framework
**Node.js with Express.js**  

## Structure
The users microservice provides the following key routes for user management:
- **POST `/users/create`**: Create a new user.
- **POST `/users/login`**: Authenticate user and issue a token.
- **GET `/users/profile`**: Retrieve the authenticated user's profile.
- **DELETE `/users/delete`**: Delete the authenticated user account.
- **GET `/users/healthz`**: Health check endpoint to verify service availability.

## Functions

### Token Authentication Middleware
- Utilizes **Paseto** (Platform-Agnostic Security Tokens) for secure user authentication.
- The **generateKeys** script is included to generate asymmetric key pairs for signing and verifying tokens.
- The middleware verifies the token and extracts the payload, which includes user information for further requests.

### Password Hashing
- User passwords are hashed before storage using **bcrypt** to ensure secure password management.
- Passwords are never stored in plain text, significantly enhancing security against data breaches.

### Error Management
- Custom error handling is implemented using a **catchErrorTyped** function written in TypeScript.
- This function standardizes error handling across routes, ensuring consistent error messages and status codes for clients.

## Environment Variables
Sensitive information such as database credentials and secret keys are securely stored in a `.env` file to prevent exposure in the codebase. Key variables include:
- `PRIVATE_KEY`: Asymmetric private key for signing tokens.
- `PUBLIC_KEY`: Asymmetric public key for verifying tokens.
- `MYSQL_HOST`: Database host.
- `MYSQL_USER`: Database username.
- `MYSQL_PASSWORD`: Database password.
- `MYSQL_DATABASE`: Database name.


## Networking
The users microservice operates within a **separate bridge network**, which isolates communication between the frontend and the database. This setup ensures that:
- The frontend cannot directly communicate with the database, enhancing security.
- The users service communicates with both the frontend and the database through the bridge network.

---


