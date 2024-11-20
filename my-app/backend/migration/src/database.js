import knex from 'knex'; // Use import instead of require
import knexConfig from './knexfile.js'; // Ensure to use .js for ES modules

const db = knex(knexConfig.development);

export default db;