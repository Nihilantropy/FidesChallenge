import knexModule from 'knex';
import knexConfig from '../knexfile.js'; // Ensure to use .js for ES modules
import { healthCheck } from './healthcheck.js';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory of the module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const knex = knexModule(knexConfig.development); // Initialize knex with the development configuration

/**
 * Run the backup before applying migrations.
 */
const backupDatabase = () => {
    return new Promise((resolve, reject) => {
        const backupScriptPath = path.resolve(__dirname, '../backup.sh');
        exec(`sh "${backupScriptPath}"`, (error, stdout, stderr) => { // Ensure you are executing with bash
            if (error) {
                console.error(`Backup error: ${stderr}`);
                return reject(error);
            }
            console.log(stdout);
            resolve();
        });
    });
};

/**
 * Run migrations after confirming the database is ready.
 */
const runMigrations = async () => {
    try {
        // Perform the health check
        await healthCheck();

        console.log('Database is ready, proceeding with backup...');

        // Backup the database
        await backupDatabase();
        console.log('Backup completed, proceeding with migrations...');

        // Run migrations
        await knex.migrate.latest();
        await knex.seed.run();
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
