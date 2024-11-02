import knexModule from 'knex'; // Import the default knex package
import knexConfig from './knexfile.js'; // Your knex configuration
import { healthCheck } from './healthcheck.js'; // Import health check function

const knex = knexModule(knexConfig.development); // Initialize knex with the development configuration

/**
 * Run migrations after confirming the database is ready.
 */
const runMigrations = async () => {
    try {
        // Perform the health check
        await healthCheck();

        console.log('Database is ready, proceeding with migrations...');

        // Run migrations
        await knex.migrate.latest();
        console.log('Migrations have been successfully applied.');
    } catch (error) {
        console.error('Error during migrations:', error.message);
        process.exit(1); // Exit on migration error
    } finally {
        // Destroy the knex connection
        await knex.destroy();
        process.exit(0); // Exit the process successfully
    }
};

// Execute the migration function
runMigrations();
