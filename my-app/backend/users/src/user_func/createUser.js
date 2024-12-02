import db from '../database.js'; // Ensure the path includes the .js extension
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing
import { ValidationError, ConflictError, DBFetchQueryError, InternalServerError } from '../err/dist/CustomError.js'; // Ensure the path includes the .js extension
import { genToken } from '../middleware/genToken.js';

async function createUser(userData) {
	const { first_name, last_name, username, email, password } = userData;

	// Validate required fields
	if (!first_name || !last_name || !username || !email || !password) {
		throw new ValidationError('All fields are required: first name, last name, username, email, password');
	}

	// Validate field lengths
	const fields = { first_name, last_name, username, email, password };
	for (const [key, value] of Object.entries(fields)) {
		if (value.length > 100) {
			throw new ValidationError(`${key} cannot be longer than 100 characters`);
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

	// Hash the password before storing it in the database
	const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
	
	// Insert new user into the database
	const newUser = { first_name, last_name, username, email, password: hashedPassword };

	let	userId;

	try {
		const result = await db('users').insert(newUser);
  		userId = result[0]; // Extract the first element from the array
	} catch (e) {
		console.error("Error adding user:", e); // Log the actual error for debugging
		throw new DBFetchQueryError('Error adding user to the database'); // Throw a custom error
	}

	console.log("creating user token for direct authentication");

	// Generate a token
	const payload = { id: userId, username: username, role_id: 2 };

	if (!token) {
		throw new InternalServerError();
	}

	return token;
}

// Export the createUser function
export default createUser;
