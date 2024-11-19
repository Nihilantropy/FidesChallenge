# Backend Services Routes

## Users Service (Account Creation, Authentication, Profile Info, Account Deletion)

### CORS:
  - **Allowed origin**: `http://expo-service:8081`, `http://localhost:8000`, `http://backend-stories:8081`
  - **Allowed methods**: `GET, POST, DELETE`
  - **Allowed headers**: `Content-Type, Authorization`
  - **Credentials**: `True`

### All request has to be send to => `http://localhost:8000/users/(endpoints)`

## endpoints:

### `/create`
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

### `/login`
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

### `/login-admin`
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

### `/profile`
- **Request Type**: `GET`
- **Expected Info**:
  - Header `Authorization: Bearer <token>`
- **Response**:
  - JSON `{ id, first_name, last_name, username, email }`
- **Return Status + json {message}**:
  - **200 OK + message** - Success
  - **401 Unauthorized + error message** - Unauthorized (missing or invalid token)
  - **404 Not Found + error message** - User not found (profile not found for authenticated user)
  - **500 Internal Server Error + error message** - Internal server errors

### `/delete`
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

### `/healthz`
- **Request Type**: `GET`
- **Expected Info**: None
- **Response**:
  - JSON  `"{ message: "I am happy and healthy\n" }`
- **Return Status + json {message}**:
  - **200 OK + message** - Success
  - **503 Service Unavailable + error message** - Database is down



<=============================================================================================================>


## Stories Service (Story Creation and Retrieval)

### CORS:
  - **Allowed origin**: `http://expo-service:8081`, `http://localhost:8000`, `http://backend-users:3000`
  - **Allowed methods**: `GET, POST, PUT, DELETE`
  - **Allowed headers**: `Content-Type, Authorization`
  - **Credentials**: `True`

### All requests must be sent to => `http://localhost:8000/stories/(endpoints)`

## Endpoints:

### `/`(Create Story)
- **Request Type**: `POST`
- **Expected Info**:
  - Header `Authorization: Bearer <token>`
  - JSON `{ title, content, author_visible (true/false) }`
- **Response**:
  - NONE
- **Return Status + JSON `{message}`**:
  - **201 Created** - Story created successfully
  - **400 Bad Request** - Invalid input (e.g., title or content is empty)
  - **401 Unauthorized** - Unauthorized (missing or invalid token)
  - **500 Internal Server Error** - Internal server errors

### `/{Id}`(Update Story)
- **Request Type**: `PUT`
- **Expected Info**:
  - Header `Authorization: Bearer <token>`
  - JSON `{ title, content, author_visible (true/false) }` if title or content are "" they won't be updated
- **Response**:
  - NONE
- **Return Status + JSON `{message}`**:
  - **200 OK** - Story updated successfully
  - **400 Bad Request** - Invalid input (e.g., title or content is empty)
  - **401 Unauthorized** - Unauthorized (missing or invalid token)
  - **500 Internal Server Error** - Internal server errors

### `/{Id}`(Delete Story)
- **Request Type**: `DELETE`
- **Expected Info**:
  - Header `Authorization: Bearer <token>`
- **Response**:
  - NONE
- **Return Status + JSON `{message}`**:
  - **204 No Content** - Story deleted successfully
  - **401 Unauthorized** - Unauthorized (missing or invalid token), or user requesting id differes from story author_id (user is not the story author)
  - **500 Internal Server Error** - Internal server errors

### `/user` (Get User Stories)
- **Request Type**: `GET`
- **Expected Info**:
  - Header `Authorization: Bearer <token>`
- **Response**:
  - JSON `{ title, id, created_at }`
- **Return Status + JSON `{message}`**:
  - **200 OK** - A list of user stories for the authenticated user.
  - **400 Bad Request** - Invalid author information (e.g., missing or invalid user ID).
  - **401 Unauthorized** - Missing or invalid authorization token.
  - **500 Internal Server Error** - Internal server error when retrieving stories.

### `/latest` (Get Latest Stories)
- **Request Type**: `GET`
- **Expected Info**:
  - None
- **Response**:
  - JSON `{ title, id, created_at }`
- **Return Status + JSON `{message}`**:
  - **200 OK** - List of latest stories (up to a limit of 5)
  - **204 No Content** - No stories available
  - **500 Internal Server Error** - Internal server errors

### `/random` (Get Random Story)
- **Request Type**: `GET`
- **Expected Info**:
  - None
- **Response**:
  - JSON `{ title, id, content, created_at, author_id, author_role_id, author_name, author_visible }`
- **Return Status + JSON `{message}`**:
  - **200 OK** - Random story fetched succesfully
  - **204 No Content** - No stories available
  - **500 Internal Server Error** - Internal server errors

### `/{Id}` (Get story by Id)
- **Request Type**: `GET`
- **Expected Info**:
  - None
- **Response**:
  - JSON `{ title, id, content, created_at, author_id, author_role_id, author_name, author_visible }`
- **Return Status + JSON `{message}`**:
  - **200 OK** - Story fetched succesfully
  - **204 No Content** - No stories available
  - **500 Internal Server Error** - Internal server errors


### `/healthz`
- **Request Type**: `GET`
- **Expected Info**: None
- **Response**:
  - JSON `"{ message: "Stories service is up and running\n" }`
- **Return Status + JSON `{message}`**:
  - **200 OK** - Success
  - **503 Service Unavailable** - Database or service is down


<=============================================================================================================>

## tts Service (text to speech)

### CORS:
  - **Allowed origin**: `http://expo-service:8081`, `http://localhost:8000`
  - **Allowed methods**: `POST`
  - **Allowed headers**: `Content-Type`

### All requests must be sent to => `http://localhost:8000/speak`

## Endpoints:

### `/speak`(Create Story)
- **Request Type**: `POST`
- **Expected Info**:
  - JSON `{ text }`
- **Response**:
  - none
- **Return Status + JSON `{message}`**:
  - ?