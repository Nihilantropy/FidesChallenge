import db from '../database.js';
import { DBFetchQueryError, UserNotFoundError } from '../err/dist/CustomError.js';

async function deleteUser(userId) {
	// Delete the user from the database
	try {
		const affectedRows = await db('users').where({ id: userId }).del();

		if (affectedRows === 0) {
			// If no rows were affected, throw an error indicating user not found
			throw new UserNotFoundError();
		}

		return true; // User successfully deleted
	} catch (e) {
		// Handle database fetch/query errors
		throw new DBFetchQueryError('Error deleting the user');
	}
}

export default deleteUser;