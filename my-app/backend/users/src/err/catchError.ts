import { InternalServerError } from "./CustomErrors";

export function catchErrorTyped<T, E extends Error>(
	promise: Promise<T>,
	errorToCatch?: (new (message?: string) => E)[]
): Promise<[E | undefined, T | undefined]> {
	return promise
		.then((data) => {
			return [undefined, data] as [undefined, T];
		})
		.catch((error) => {
			if (!errorToCatch) {
				return [error, undefined] as [E, undefined];
			}

			const isKnownError = errorToCatch.some((e) => error instanceof e);
			if (isKnownError) {
				return [error, undefined] as [E, undefined];
			}

			return [new InternalServerError() as unknown as E, undefined]; // Fallback to generic 500 error
		});
}