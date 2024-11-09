export async function up(knex) {
    return knex.schema.alterTable('stories', function(table) {
      table.boolean('authorVisible').defaultTo(true).notNullable();
    });
  };
  
  export async function down(knex) {
    return knex.schema.alterTable('stories', function(table) {
      table.dropColumn('authorVisible');
    });
  };
  