export async function up(knex) {
    return knex.schema.createTable('stories', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('body').notNullable();
        table.integer('author_id').unsigned().notNullable();
        table.integer('likes').defaultTo(0);
        table.integer('comments').defaultTo(0);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    }); 
}

export async function down(knex) {
	return knex.schema.dropTable('stories');
  };