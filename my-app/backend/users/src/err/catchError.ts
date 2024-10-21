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

            // Return a default Internal Server Error object and cast it to type E
            const fallbackError = {
                code: 500,
                message: 'Internal Server Error',
                name: 'InternalServerError'
            } as unknown as E;

            return [fallbackError, undefined]; // Fallback to generic 500 error
		});
}