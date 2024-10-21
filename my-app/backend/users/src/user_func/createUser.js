import db from '../database.js'; // Ensure the path includes the .js extension
import { ValidationError, ConflictError } from '../err/dist/CustomError.js'; // Ensure the path includes the .js extension

async function createUser(userData) {
	const { first_name, last_name, username, email, password } = userData;

	// Validate required fields
	if (!first_name || !last_name || !username || !email || !password) {
		throw new ValidationError('All fields are required');
	}

	// Validate field lengths
	const fields = { first_name, last_name, username, email, password };
	for (const [key, value] of Object.entries(fields)) {
		if (value.length > 20) {
			throw new ValidationError(`${key} cannot be longer than 20 characters`);
		}
	}

	// Validate email format
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		throw new ValidationError('Invalid email format');
	}

	// Check if the username already exists
	const existingUsername = await db('users').where({ username }).first();
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
	const [userId] = await db('users').insert(newUser);

	// Return the created user's details
	return {
		id: userId,
		first_name,
		last_name,
		username,
		email
	};
}

// Export the createUser function
export default createUser;
