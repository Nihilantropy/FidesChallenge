import db from '../database.js';
import { DBFetchQueryError, UserNotFoundError } from '../err/dist/CustomError.js';

async function deleteUser(userId) {
	// Verify if the user exists before trying to delete
	const user = await db('users').where({ id: userId }).first();
	if (!user) {
		throw new UserNotFoundError();
	}

	// Delete the user from the database
	try {
		await db('users').where({ id: userId }).del();
		return { success: true };
	} catch (error) {
		throw new DBFetchQueryError('Error deleting the user');
	}
}

export default deleteUser;