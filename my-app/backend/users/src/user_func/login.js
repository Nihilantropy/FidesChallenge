import { V4 } from 'paseto'; // Using V4 version of Paseto for token creation
import { Buffer } from 'buffer';
import db from '../database.js'; // Assuming you have a configured knex instance
import bcrypt from 'bcrypt'; // Assuming you're storing hashed passwords in the DB
import { InvalidCredentialsError, TokenCreationError, NoCredentialError, InternalServerError, DBFetchQueryError } from '../err/dist/CustomError.js';
import { error } from 'console';
import { genToken } from '../middleware/genToken.js';

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

	const passwordMatch = await bcrypt.compare(password, user.password); // Use bcrypt.compare here

    if (!passwordMatch) {
        console.error("Invalid password");
        throw new InvalidCredentialsError(); // Use the custom error
    }

    // Generate a token
    const payload = { id: user.id, username: user.username };
	
    const token = await genToken(payload);
    
    return token;
}

// Export the loginUser function
export default loginUser;
