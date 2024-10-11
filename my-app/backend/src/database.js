const knex = require('knex');
const { database } = require('./config');

module.exports = knex({
  client: 'mysql2',
  connection: database,
  pool: { min: 0, max: 10 },
});