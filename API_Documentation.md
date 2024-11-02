# Backend Services Routes

## Users Service (Account Creation, Authentication, Profile Info, Account Deletion)

### CORS:
  - **Allowed origin**: `http://expo-service:8081`, `http://localhost:8000`
  - **Allowed methods**: `GET, POST, DELETE`
  - **Allowed headers**: `Content-Type, Authorization`
  - **Credentials**: `True`

### All request has to be send to => `http://localhost:8000(endpoints)`

## endpoints:

### `/users/create`
- **Request Type**: `POST`
- **Expected Info**:
  - JSON `{ email, first_name, last_name, username, password }`
- **Response**:
  - JSON `{ token: "v4token" }`
- **Return Status + json {message}**:
  - **201 Created + message** - Success
  - **400 Bad Request + error message** - Validation error (e.g., invalid email format, credential length)
  - **409 Conflict + error message** - Conflict error (e.g., username or email already present in database)
  - **500 Internal Server Error + error message** - Internal server errors

### `/users/login`
- **Request Type**: `POST`
- **Expected Info**:
  - JSON `{ email, password }`
- **Response**:
  - JSON `{ token: "v4token" }`
- **Return Status + json {message}**:
  - **200 OK + message** - Success
  - **400 Bad Request + error message** - Validation error (e.g., missing fields)
  - **401 Unauthorized + error message** - Invalid credentials (e.g., incorrect email or password)
  - **500 Internal Server Error + error message** - Internal server errors

### `/users/profile`
- **Request Type**: `GET`
- **Expected Info**:
  - Header `Authorization: Bearer <token>`
- **Response**:
  - JSON `{ email, first_name, last_name, username, profileInfo }`
- **Return Status + json {message}**:
  - **200 OK + message** - Success
  - **401 Unauthorized + error message** - Unauthorized (missing or invalid token)
  - **404 Not Found + error message** - User not found (profile not found for authenticated user)
  - **500 Internal Server Error + error message** - Internal server errors

### `/users/delete`
- **Request Type**: `DELETE`
- **Expected Info**:
  - Header `Authorization: Bearer <token>`
- **Response**:
  - JSON `{ message: "User account deleted successfully" }`
- **Return Status + json {message}**:
  - **204 No Content + message** - Success
  - **401 Unauthorized + error message** - Unauthorized (missing or invalid token)
  - **404 Not Found + error message** - User not found (account already deleted or not found)
  - **500 Internal Server Error + error message** - Internal server errors

### `/users/healthz`
- **Request Type**: `GET`
- **Expected Info**: None
- **Response**:
  - JSON  `"{ message: "I am happy and healthy\n" }`
- **Return Status + json {message}**:
  - **200 OK + message** - Success
  - **503 Service Unavailable + error message** - Database is down
