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

export class InvalidCredentialsError extends CustomError {
	constructor() {
		super('Invalid email or password', 401);
	}
}

export class TokenCreationError extends CustomError {
	constructor(message: string = 'Error creating login token') {
		super(message, 500);
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
