import { V4 } from 'paseto';
import { Buffer } from 'buffer';
import { TokenNotFound, InternalServerError } from '../err/dist/CustomError.js'; // Import your custom error classes

// Middleware to authenticate using Paseto token
export async function authenticate(req) {
	// Extract token from the Authorization header
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1]; // Get token part after "Bearer "

	// console.log("token is: ", token);
	// If no token is provided, throw a TokenNotFound error
	if (!token) {
		throw new TokenNotFound();
	}

	const publicKey = Buffer.from(process.env.PUBLIC_KEY.replace(/\\n/g, '\n'), 'utf-8');

	// Attempt to verify the token
	const payload = await V4.verify(token, publicKey).catch(() => {
		// If verification fails, throw an InternalServer<Error
		console.error("Error on token verify")
		throw new InternalServerError();
	});
	console.log("payload is: ", payload)

	// Attach the user ID to req.user, extracting the first element from the id array
	req.user = { id: payload.id[0] };
}
