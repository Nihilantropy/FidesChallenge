import db from '../database.js'; // Assuming you have a configured knex instance
import bcrypt from 'bcrypt'; // Assuming you're storing hashed passwords in the DB
import { InvalidCredentialsError, NoCredentialError, DBFetchQueryError, TokenCreationError } from '../err/dist/CustomError.js';
import { genToken } from '../middleware/genToken.js';

async function loginAdmin(email, password) {

    if (!email || !password) {
        throw new NoCredentialError(); // Throw NoCredentialError if either is missing
    }

	console.log("Attempting to login admin:", email);  // Debug log

	let admin;

	// Handle fetch query error
	try {
		admin = await db('admins').where({ email }).first();
	}
	catch (e) {
		console.error(e)
		throw new DBFetchQueryError();
	}

	// If the admin is not found
	if (!admin) {
		throw new InvalidCredentialsError(); // Use the custom error
	}
	
	console.log("admin found:", admin);  // Debug log

	const passwordMatch = await bcrypt.compare(password, admin.password); // Use bcrypt.compare here

    if (!passwordMatch) {
        console.error("Invalid password");
        throw new InvalidCredentialsError(); // Use the custom error
    }

    // Generate a token
    const payload = { id: admin.id, username: admin.username, role_id: admin.role_id };
	
	try {
		const token = await genToken(payload);
		console.log("admin correctly authenticated, returning token")
		return token;
	}
	catch (e) {
		throw new TokenCreationError();
	}
}

// Export the loginUser function
export default loginAdmin;
