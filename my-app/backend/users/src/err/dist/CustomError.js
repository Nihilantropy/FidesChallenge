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
        super('Utente non trovato', 404);
    }
}
export class InvalidCredentialsError extends CustomError {
    constructor() {
        super('Credenziali errate', 401);
    }
}
export class NoCredentialError extends CustomError {
    constructor() {
        super('Le credenzil sono richieste', 400);
    }
}
export class TokenCreationError extends CustomError {
    constructor(message = 'Creazione del token fallita') {
        super(message, 500);
    }
}
export class InvalidTokenError extends CustomError {
    constructor(message = 'Token invalido o scaduto') {
        super(message, 401);
    }
}
export class TokenNotFound extends CustomError {
    constructor(message = 'è richiesto un token') {
        super(message, 400);
    }
}
export class AuthHeaderNotFound extends CustomError {
    constructor(message = 'è richiesto un token') {
        super(message, 401);
    }
}
export class DBFetchQueryError extends CustomError {
    constructor(message = 'Errore nella query nel db') {
        super(message, 500);
    }
}
export class InternalServerError extends CustomError {
    constructor(message = 'Errore interno') {
        super(message, 500);
    }
}
