import dotenv from 'dotenv';
dotenv.config({ path: '../.env' }); // Load environment variables from .env file

export default {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT
    },
    pool: { min: 0, max: 7 },
    migrations: {
      directory: './migrations/'
    },
    seeds: {
      directory: './seeds/'
    },
  }
};
