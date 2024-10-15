const knex = require('knex');
const knexConfig = require('./knexfile'); // Pointing to the knexfile.js

const db = knex(knexConfig.development);

module.exports = db;