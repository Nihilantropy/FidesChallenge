import { V4 } from 'paseto'; // Using V4 version of Paseto for token creation
import { Buffer } from 'buffer';
import db from '../database.js'; // Assuming you have a configured knex instance
import bcrypt from 'bcrypt'; // Assuming you're storing hashed passwords in the DB
import { InvalidCredentialsError, TokenCreationError, NoCredentialError, InternalServerError, DBFetchQueryError } from '../err/dist/CustomError.js';
import { error } from 'console';

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
		console.error(e)
		throw new DBFetchQueryError();
	}

	// If the user is not found
	if (!user) {
		throw new InvalidCredentialsError(); // Use the custom error
	}
	
	console.log("User found:", user);  // Debug log

	
	const hashedPassword = await bcrypt.hash(password, 10);

	// Check if the provided password matches the hashed password in the DB
	if (hashedPassword !== user.password) {
		console.error("invalid password");
		throw new InvalidCredentialsError(); // Use the custom error
	}

	// If password matches, generate a Paseto token
	try {
		const token = await V4.sign(
			{ id: user.id }, // Payload
			privateKey, // Secret key
			{ expiresIn: '1h' } // Token expiration time
		);
		
	
		if (!token) {
			throw new TokenCreationError();
		}

		console.log("token created!");
		return token;
	
	} catch (e) {
		console.error("Error during token generation:", e);
		throw new InternalServerError("Token generation failed");
	}
}

// Export the loginUser function
export default loginUser;
