import db from '../database.js'; // Ensure the path includes the .js extension
import { V4 } from 'paseto'; // Using V4 version of Paseto for token creation
import { Buffer } from 'buffer';
import { ValidationError, ConflictError, DBFetchQueryError } from '../err/dist/CustomError.js'; // Ensure the path includes the .js extension
const privateKey = Buffer.from(process.env.PRIVATE_KEY.replace(/\\n/g, '\n'), 'utf-8');

async function createUser(userData) {
	console.log(userData);
	const { first_name, last_name, username, email, password } = userData;

	// Validate required fields
	if (!first_name || !last_name || !username || !email || !password) {
		throw new ValidationError('All fields are required: first name, last name, username, email, password');
	}

	// Validate field lengths
	const fields = { first_name, last_name, username, email, password };
	for (const [key, value] of Object.entries(fields)) {
		if (value.length > 100) {
			throw new ValidationError(`${key} cannot be longer than 40 characters`);
		}
	}

	// Validate email format
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		throw new ValidationError('Invalid email format');
	}

	const existingUsername = await db('users').where({ username }).first();
	// Check if the username already exists
	if (existingUsername) {
		throw new ConflictError('Username already exists');
	}
	
	// Check if the email already exists
	const existingEmail = await db('users').where({ email }).first();
	if (existingEmail) {
		throw new ConflictError('Email already in use');
	}
	
	// Insert new user into the database
	const newUser = { first_name, last_name, username, email, password };

	let	userId;

	try {
		userId = await db('users').insert(newUser);
	} catch (e) {
		console.error("Error adding user:", e); // Log the actual error for debugging
		throw new DBFetchQueryError('Error adding user to the database'); // Throw a custom error
	}
	console.log("creating user token for direct authentication");

	try {
		const token = await V4.sign(
			{ id: userId }, // Payload
			privateKey, // Secret key
			{ expiresIn: '1h' } // Token expiration time
		);
		
		if (!token) {
			throw new TokenCreationError();
		}

		console.log("token created!");
		return (token);
	
	} catch (e) {
		console.error("Error during token generation:", e);
		throw new InternalServerError("Token generation failed");
	}
}

// Export the createUser function
export default createUser;
