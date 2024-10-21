import { V4 } from 'paseto'; // Using V4 version of Paseto for token creation
import db from '../database.js'; // Assuming you have a configured knex instance
import bcrypt from 'bcrypt'; // Assuming you're storing hashed passwords in the DB
import { generateKeyPairSync } from 'crypto'; // To generate a key for Paseto
import { InvalidCredentialsError, TokenCreationError, DBFetchQueryError } from '../err/dist/CustomError.js';
import { Buffer } from 'buffer';

const privateKey = Buffer.from(process.env.PRIVATE_KEY, 'base64');

async function loginUser(email, password) {

	console.log("Attempting to login user:", email);  // Debug log

	let user;

    try {
        user = await db('users').where({ email }).first();
    } catch (dbError) {
        throw new DBFetchQueryError();
    }

	console.log("User found:", user);  // Debug log
	
	// If the user is not found
	if (!user) {
		console.log("email not found");
		throw new InvalidCredentialsError(); // Use the custom error
	}


    // Check if the provided password matches the hashed password in the DB
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        console.log("Passwords do not match!"); // Debug log
        throw new InvalidCredentialsError(); // Use the custom error
    }

	// If password matches, generate a Paseto token
	const token = await V4.sign(
		{ id: user.id, email: user.email }, // Payload
		privateKey, // Secret key
		{ expiresIn: '1h' } // Token expiration time
	);

	if (!token)
		throw new TokenCreationError();

	return token;
}

// Export the loginUser function
export default loginUser;
