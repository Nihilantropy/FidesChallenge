export class CustomError extends Error {
	code: number;

	constructor(message: string, code: number = 500) {
		super(message);
		this.code = code;
		this.name = this.constructor.name;
	}
}

export class ValidationError extends CustomError {
	constructor(message: string) {
		super(message, 400);
	}
}

export class ConflictError extends CustomError {
	constructor(message: string) {
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
	constructor(message: string = 'Error creating login token') {
		super(message, 500);
	}
}

export class TokenNotFound extends CustomError {
	constructor(message: string = 'Error: no token provided') {
		super(message, 401);
	}
}

export class DBFetchQueryError extends CustomError {
	constructor(message: string = 'Database fetch query error') {
		super(message, 500);
	}
}

export class InternalServerError extends CustomError {
	constructor(message: string = 'Internal server error') {
		super(message, 500);
	}
}
