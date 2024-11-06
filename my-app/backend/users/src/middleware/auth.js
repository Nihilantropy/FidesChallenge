import { V4 } from 'paseto';
import { Buffer } from 'buffer';
import { TokenNotFound, InternalServerError } from '../err/dist/CustomError.js'; // Import your custom error classes

const publicKey = Buffer.from(process.env.PUBLIC_KEY.replace(/\\n/g, '\n'), 'utf-8');

async function verifyToken(token) {
	try {
        const payload = await V4.verify(
            token,         // The token to verify
            publicKey,     // Public key (or privateKey if using symmetric encryption)
            { complete: true }  // Optional: may provide additional verification details
        );
        
        return payload;  // Contains { id, username } based on your genToken structure

    } catch (e) {
        console.error("Error during token verification:", e);
        throw new InvalidTokenError("Invalid or expired token");
    }
}

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

	const payload = await verifyToken(token)

	console.log("token verified!")

	//return the payload nested object that stores the actual data
	return payload.payload;
}
