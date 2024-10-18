export class CustomError extends Error {
    code: number;
    constructor(message: string, code: number = 400) {
        super(message);
        this.code = code;
    }
}

export class ValidationError extends CustomError {
    constructor(message: string) {
        super(message, 400);
        this.name = 'ValidationError';
    }
}

export class ConflictError extends CustomError {
    constructor(message: string) {
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
    constructor(message: string = 'Internal server error') {
        super(message, 500);
        this.name = 'InternalServerError';
    }
}
