import db from '../database.js';
import { DBFetchQueryError, UserNotFoundError } from '../err/dist/CustomError.js';

async function deleteUser(userId) {
	// Delete the user from the database
	try {
		await db('users').where({ id: userId }).del();
		return { success: true };
	} catch (e) {
		throw new DBFetchQueryError('Error deleting the user');
	}
}

export default deleteUser;