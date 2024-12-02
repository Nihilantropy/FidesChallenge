import knex from './database.js'; // Importing the database connection

/**
 * Check if the database is reachable.
 * @returns {Promise<boolean>} - True if the database is reachable, false otherwise.
 */
export async function checkDatabaseConnection() {
    try {
        // Test the database connection
        await knex.raw('SELECT 1');
        console.log('Database is up and running');
        return true;
    } catch (error) {
        console.error('Database connection failed:', error.message);
        return false;
    }
}

/**
 * Start the health check process.
 * The service attempts to reconnect to the database every second for * seconds.
 */
export async function healthCheck() {
    const dbIsUp = await checkDatabaseConnection();
    if (!dbIsUp) {
        console.error('Database is not reachable, attempting to reconnect...');
        let attempts = 0;

        // Attempt to reconnect every second for up to 60 seconds
        while (attempts < 3000) {
            if (await checkDatabaseConnection()) {
                console.log('Database is now up!');
                return; // Exit if connected
            }
            attempts++;
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 1 second
        }

        // If after 60 seconds the DB is still not reachable, exit the service
        console.error('Failed to connect to the database after 60 seconds. Shutting down the service...');
        process.exit(1);
    }
}

/**
 * Health check endpoint logic.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export async function healthCheckEndpoint(req, res) {
    if (await checkDatabaseConnection()) {
        return res.status(200).send('DB is up and running');
    } else {
        return res.status(500).send('DB is down');
    }
}