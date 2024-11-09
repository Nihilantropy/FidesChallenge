export async function up(knex) {
    return knex.schema.alterTable('stories', function(table) {
      table.boolean('author_visible').defaultTo(true).notNullable();
      table.integer('author_role_id').defaultTo(2).notNullable();
    });
  };
  
  export async function down(knex) {
    return knex.schema.alterTable('stories', function(table) {
      table.dropColumn('author_visible');
      table.dropColumn('author_role_id');
    });
  };
  