export class CustomError extends Error {
    constructor(message, code = 500) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
    }
}
export class ValidationError extends CustomError {
    constructor(message) {
        super(message, 400);
    }
}
export class ConflictError extends CustomError {
    constructor(message) {
        super(message, 409);
    }
}
export class UserNotFoundError extends CustomError {
    constructor() {
        super('User not found', 404);
    }
}
export class InvalidCredentialsError extends CustomError {
    constructor() {
        super('Invalid email or password', 401);
    }
}
export class NoCredentialError extends CustomError {
    constructor() {
        super('No credentials provided', 400);
    }
}
export class TokenCreationError extends CustomError {
    constructor(message = 'Error creating login token') {
        super(message, 500);
    }
}
export class InvalidTokenError extends CustomError {
    constructor(message = 'Invalid or expired token') {
        super(message, 401);
    }
}
export class TokenNotFound extends CustomError {
    constructor(message = 'Error: no token provided') {
        super(message, 400);
    }
}
export class AuthHeaderNotFound extends CustomError {
    constructor(message = 'Protected routes require authorization header with token') {
        super(message, 401);
    }
}
export class DBFetchQueryError extends CustomError {
    constructor(message = 'Database fetch query error') {
        super(message, 500);
    }
}
export class InternalServerError extends CustomError {
    constructor(message = 'Internal server error') {
        super(message, 500);
    }
}
