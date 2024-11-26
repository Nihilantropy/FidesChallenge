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
		super('Utente non trovato', 404);
	}
}

export class InvalidCredentialsError extends CustomError {
	constructor() {
		super('Credenziali errrate', 401);
	}
}

export class NoCredentialError extends CustomError {
    constructor() {
        super('Le credenzil sono richieste', 400);
    }
}

export class TokenCreationError extends CustomError {
	constructor(message: string = 'Fallita la creazione del token') {
		super(message, 500);
	}
}

export class InvalidTokenError extends CustomError {
	constructor(message: string = 'Token invalido o scaduto') {
		super(message, 401);
	}
}

export class TokenNotFound extends CustomError {
	constructor(message: string = 'E richiesto un token') {
		super(message, 400);
	}
}

export class AuthHeaderNotFound extends CustomError {
	constructor(message: string = 'E richiesto un token') {
		super(message, 401);
	}
}

export class DBFetchQueryError extends CustomError {
	constructor(message: string = 'Errore nella query nel db') {
		super(message, 500);
	}
}

export class InternalServerError extends CustomError {
	constructor(message: string = 'Errore interno') {
		super(message, 500);
	}
}
