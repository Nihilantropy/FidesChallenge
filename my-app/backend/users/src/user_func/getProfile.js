import db from '../database.js'; // Ensure your database instance is imported

// Function to fetch user profile information
async function getProfile(userId) {
	const user = await db('users')
		.select('id', 'first_name', 'last_name', 'username', 'email', 'created_at', 'updated_at') // Specify fields to retrieve
		.where({ id: userId })
		.first();

	// If no user is found, throw an error
	if (!user) {
		throw new DBFetchQueryError(); // Or a custom error for "user not found"
	}
	return user; // Return user info excluding password
}

export default getProfile;