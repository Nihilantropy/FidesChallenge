import { V4 } from 'paseto';
import { Buffer } from 'buffer';
import { TokenNotFound, InvalidCredentialsError } from '../err/dist/CustomError.js'; // Import your custom error classes

// Middleware to authenticate using Paseto token
export async function authenticate(req) {
	// Extract token from the Authorization header
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1]; // Get token part after "Bearer "

	console.log(token);
	// If no token is provided, throw a TokenNotFound error
	if (!token) {
		throw new TokenNotFound();
	}

	const publicKey = Buffer.from(process.env.PUBLIC_KEY.replace(/\\n/g, '\n'), 'utf-8');

	// Attempt to verify the token
	const payload = await V4.verify(token, publicKey).catch(() => {
		// If verification fails, throw an InvalidCredentialsError
		throw new InvalidCredentialsError();
	});

	// Attach the user info to the request object
	req.user = payload;
}
