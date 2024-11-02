import knex from 'knex';
import knexConfig from './knexfile.js'; // Pointing to the knexfile.js

const db = knex(knexConfig.development);

export default db;