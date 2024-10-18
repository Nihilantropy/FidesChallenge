export class CustomError extends Error {
    constructor(message, code = 400) {
        super(message);
        this.code = code;
    }
}
export class ValidationError extends CustomError {
    constructor(message) {
        super(message, 400);
        this.name = 'ValidationError';
    }
}
export class ConflictError extends CustomError {
    constructor(message) {
        super(message, 409); // 409 Conflict
        this.name = 'ConflictError';
    }
}
export class InvalidCredentialsError extends CustomError {
    constructor() {
        super('Invalid email or password', 401);
        this.name = 'InvalidCredentialsError';
    }
}
export class InternalServerError extends CustomError {
    constructor(message = 'Internal server error') {
        super(message, 500);
        this.name = 'InternalServerError';
    }
}
