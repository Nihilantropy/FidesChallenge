const dotenv = require('dotenv');
dotenv.config({ path: '../.env' }); // Load environment variables from .env file

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.MYSQL_HOST,
	  root_password: process.env.MYSQL_ROOT_PASSWORD,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT
    },
    migrations: {
      directory: './migrations/'
    },
    seeds: {
      directory: './seeds/'
    }
  },
  production: {
    client: 'mysql2',
    connection: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT
    },
    migrations: {
      directory: './migrations/'
    },
    seeds: {
      directory: './seeds/'
    }
  }
};