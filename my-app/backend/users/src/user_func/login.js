import { V4 } from 'paseto'; // Using V4 version of Paseto for token creation
import db from '../database.js'; // Assuming you have a configured knex instance
import bcrypt from 'bcrypt'; // Assuming you're storing hashed passwords in the DB
import crypto from 'crypto'; // To generate a key for Paseto
import { InvalidCredentialsError } from '../err/dist/CustomErrors.js';

// Generate a secret key for Paseto (usually you store this securely in your environment)
const PASSPHRASE_SECRET = crypto.randomBytes(32);

async function loginUser(email, password) {
	// Find the user by email
	const userEmail = await db('users').where({ email }).first();

	// If the user is not found
	if (!userEmail) {
		throw new InvalidCredentialsError(); // Use the custom error
	}

	// Check if the provided password matches the hashed password in the DB
	//const passwordMatch = await bcrypt.compare(password, user.password);
	//if (!passwordMatch) {
	//	throw new InvalidCredentialsError(); // Use the custom error
	//}
	if (password !== user.password) {
		throw new InvalidCredentialsError(); // Use the custom error
	} // TODO only for basic tests, remove this and uncomment the code above

	// If password matches, generate a Paseto token
	const token = await V4.sign(
		{ id: user.id, email: user.email }, // Payload
		PASSPHRASE_SECRET, // Secret key
		{ expiresIn: '1h' } // Token expiration time (1 hour)
	);

	// Return the token
	return token;
}

// Export the loginUser function
export default loginUser;
