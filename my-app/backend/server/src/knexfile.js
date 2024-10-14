const dotenv = require('dotenv');
dotenv.config({ path: '../.env' }); // Load environment variables from .env file

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.MYSQL_HOST, // Ensure this matches the .env variable
      user: process.env.MYSQL_USER, // Ensure this matches the .env variable
      password: process.env.MYSQL_PASSWORD, // Ensure this matches the .env variable
      database: process.env.MYSQL_DATABASE, // Ensure this matches the .env variable
      port: process.env.MYSQL_PORT // Ensure this matches the .env variable
    },
    pool: { min: 0, max: 7 },
    migrations: {
      directory: './migrations/'
    },
    seeds: {
      directory: './seeds/'
    }
  }
};
