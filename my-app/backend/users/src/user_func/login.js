import db from '../database.js'; // Assuming you have a configured knex instance
import bcrypt from 'bcrypt'; // Assuming you're storing hashed passwords in the DB
import { InvalidCredentialsError, NoCredentialError, DBFetchQueryError, TokenCreationError } from '../err/dist/CustomError.js';
import { genToken } from '../middleware/genToken.js';

async function loginUser(email, password) {

    if (!email || !password) {
        throw new NoCredentialError(); // Throw NoCredentialError if either is missing
    }

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
		console.log("user not found")
		throw new InvalidCredentialsError(); // Use the custom error
	}

	const passwordMatch = await bcrypt.compare(password, user.password); // Use bcrypt.compare here

    if (!passwordMatch) {
        console.error("Invalid password");
        throw new InvalidCredentialsError(); // Use the custom error
    }

    // Generate a token
    const payload = { id: user.id, username: user.username, role_id: user.role_id };
	
	try {
		const token = await genToken(payload);
		console.log("user correctly authenticated, returning token")
		return token;
	}
	catch (e) {
		throw new TokenCreationError();
	}
    
}

// Export the loginUser function
export default loginUser;
