import db from '../database.js'; // Ensure your database instance is imported
import { DBFetchQueryError, UserNotFoundError } from '../err/dist/CustomError.js';

// Function to fetch user profile information
async function getProfile(userId) {
	let	user;
	try
	{
		user = await db('users')
			.select('id', 'first_name', 'last_name', 'username', 'email') // Specify fields to retrieve
			.where({ id: userId })
			.first();
	}
	catch (e)
	{
		console.error(e);
		throw new DBFetchQueryError('Error getting user profile info'); // Or a custom error for "user not found"
	}

	if (!user)
		throw new UserNotFoundError();
	return user; // Return user info excluding password
}

export default getProfile;