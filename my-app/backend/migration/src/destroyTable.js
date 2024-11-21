import knexModule from 'knex';
import knexConfig from '../knexfile.js';
  
const knex = knexModule(knexConfig.development);

  // Define down methods for each table
export async function dropTables() {
    try {
      console.log("Dropping likes table...");
      await knex.schema.dropTableIfExists('likes');
  
      console.log("Dropping stories table...");
      await knex.schema.dropTableIfExists('stories');
  
      console.log("Dropping admins table...");
      await knex.schema.dropTableIfExists('admins');
  
      console.log("Dropping users table...");
      await knex.schema.dropTableIfExists('users');
  
      console.log("Dropping roles table...");
      await knex.schema.dropTableIfExists('roles');
  
      console.log("All tables have been dropped successfully.");
    } catch (error) {
      console.error("Error dropping tables:", error);
    } finally {
      // Close the connection after operations are done
      knex.destroy();
    }
}
