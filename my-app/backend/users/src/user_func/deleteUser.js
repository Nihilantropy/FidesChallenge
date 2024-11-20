import db from '../database.js';
import { DBFetchQueryError, UserNotFoundError } from '../err/dist/CustomError.js';

async function deleteUser(userId) {
    const dbTransaction = await db.transaction(); // Start a transaction

    try {
        // First, delete all stories by the user
        const deletedStories = await db('stories')
            .transacting(dbTransaction) // Use the transaction
            .where({ author_id: userId })
            .del();

        console.log(`${deletedStories} stories deleted for user with ID: ${userId}`);

        // Then, delete the user from the database
        const affectedRows = await db('users')
            .transacting(dbTransaction) // Use the transaction
            .where({ id: userId })
            .del();

        if (affectedRows === 0) {
            // If no rows were affected, throw an error indicating user not found
            throw new UserNotFoundError();
        }

        await dbTransaction.commit(); // Commit the transaction
        return true; // User and stories successfully deleted
    } catch (e) {
        await dbTransaction.rollback(); // Rollback the transaction on error
        console.error('Error during user deletion:', e.message);
        throw new DBFetchQueryError('Error deleting the user and their stories');
    }
}
export default deleteUser;