export function catchErrorTyped(promise, errorToCatch) {
    return promise
        .then((data) => {
        return [undefined, data];
    })
        .catch((error) => {
        if (!errorToCatch) {
            return [error, undefined];
        }
        const isKnownError = errorToCatch.some((e) => error instanceof e);
        if (isKnownError) {
            return [error, undefined];
        }
        // Return a default Internal Server Error object and cast it to type E
        const fallbackError = {
            code: 500,
            message: 'Errore interno',
            name: 'InternalServerError'
        };
        return [fallbackError, undefined]; // Fallback to generic 500 error
    });
}