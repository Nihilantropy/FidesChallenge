import { V4 } from 'paseto'; // Using V4 version of Paseto for token creation
import { Buffer } from 'buffer';
import db from '../database.js'; // Assuming you have a configured knex instance
import bcrypt from 'bcrypt'; // Assuming you're storing hashed passwords in the DB
import { InvalidCredentialsError, TokenCreationError, NoCredentialError, InternalServerError } from '../err/dist/CustomError.js';

const privateKey = Buffer.from(process.env.PRIVATE_KEY.replace(/\\n/g, '\n'), 'utf-8');

async function loginUser(email, password) {

    if (!email || !password) {
        throw new NoCredentialError(); // Throw NoCredentialError if either is missing
    }

	console.log("Attempting to login user:", email);  // Debug log

	let user;

	// Handle fetch query error
	try {
		user = await db('users').where({ email }).first();
	}
	catch (e) {
		console.error("user not found");
	}

	// If the user is not found
	if (!user) {
		throw new InvalidCredentialsError(); // Use the custom error
	}
	
	console.log("User found:", user);  // Debug log
	// if (password !== user.password) {
	// 	throw new InvalidCredentialsError(); // TODO remove this, uncomment below
	// }

	// Check if the provided password matches the hashed password in the DB
	const passwordMatch = await bcrypt.compare(password, user.password);
	if (!passwordMatch) {
		throw new InvalidCredentialsError(); // Use the custom error
	}

	// If password matches, generate a Paseto token
	try {
		const token = await V4.sign(
			{ id: user.id, email: user.email }, // Payload
			privateKey, // Secret key
			{ expiresIn: '1h' } // Token expiration time
		);
		
	
		if (!token) {
			throw new TokenCreationError();
		}

		console.log("token created!");
		return token;
	
	} catch (error) {
		console.error("Error during token generation:", error);
		throw new InternalServerError("Token generation failed");
	}
}

// Export the loginUser function
export default loginUser;
