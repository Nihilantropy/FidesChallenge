import db from '../database.js'; // Ensure the path includes the .js extension

// Constants
const MAX_LIMIT = 2147483647; // Max ID limit (32-bit signed integer)

// Get user data by ID function
async function getUserData(req, res) {
	const { id } = req.query;

	// Basic validation: Check if the id is provided
	if (!id) {
		return res.status(400).json({ message: 'User ID is required' });
	}

	// Ensure id is a string and no more than one id is provided
	if (Array.isArray(id)) {
		return res.status(400).json({ message: 'Only one User ID is allowed' });
	}

	// Check if the id is a digit and not negative
	const parsedId = parseInt(id, 10);

	if (isNaN(parsedId) || parsedId <= 0) {
		return res.status(400).json({ message: 'User ID must be a positive number' });
	}

	// Check if the id is within the MAX_LIMIT
	if (parsedId > MAX_LIMIT) {
		return res.status(400).json({ message: `User ID cannot exceed ${MAX_LIMIT}` });
	}

	try {
		// Query the database for the user by ID
		const user = await db('users').where({ id: parsedId }).first();

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Return the user data, excluding sensitive fields like password
		return res.status(200).json({
			id: user.id,
			first_name: user.first_name,
			last_name: user.last_name,
			username: user.username,
			email: user.email
		});
	} catch (error) {
		console.error('Error fetching user data:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

// Export the getUserData function
export default getUserData;