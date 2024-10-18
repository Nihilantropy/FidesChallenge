import { InternalServerError } from "./CustomErrors";
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
        return [new InternalServerError(), undefined]; // Fallback to generic 500 error
    });
}
