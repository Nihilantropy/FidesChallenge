# Backend Services Routes

## Users Service (Account Creation, Authentication, Profile Info, Account Deletion)

### `/users/create`
- **Request Type**: `POST`
- **Expected Info**:
  - JSON `{ email, first_name, last_name, username, password }`
- **Response**:
  - JSON `{ token: "v4token" }`
- **Return Status**:
  - **201 Created** - Success
  - **400 Bad Request** - Validation error (e.g., invalid email format, credential length)
  - **409 Conflict** - Conflict error (e.g., username or email already present in database)
  - **500 Internal Server Error** - Internal server errors

### `/users/login`
- **Request Type**: `POST`
- **Expected Info**:
  - JSON `{ email, password }`
- **Response**:
  - JSON `{ token: "v4token" }`
- **Return Status**:
  - **200 OK** - Success
  - **400 Bad Request** - Validation error (e.g., missing fields)
  - **401 Unauthorized** - Invalid credentials (e.g., incorrect email or password)
  - **500 Internal Server Error** - Internal server errors

### `/users/profile`
- **Request Type**: `GET`
- **Expected Info**:
  - Header `Authorization: Bearer <token>`
- **Response**:
  - JSON `{ email, first_name, last_name, username, profileInfo }`
- **Return Status**:
  - **200 OK** - Success
  - **401 Unauthorized** - Unauthorized (missing or invalid token)
  - **404 Not Found** - User not found (profile not found for authenticated user)
  - **500 Internal Server Error** - Internal server errors

### `/users/delete`
- **Request Type**: `DELETE`
- **Expected Info**:
  - Header `Authorization: Bearer <token>`
- **Response**:
  - JSON `{ message: "User account deleted successfully" }`
- **Return Status**:
  - **204 No Content** - Success
  - **401 Unauthorized** - Unauthorized (missing or invalid token)
  - **404 Not Found** - User not found (account already deleted or not found)
  - **500 Internal Server Error** - Internal server errors

### `/users/healthz`
- **Request Type**: `GET`
- **Expected Info**: None
- **Response**:
  - Plain text: `"I am happy and healthy\n"`
- **Return Status**:
  - **200 OK** - Success
