export async function up(knex) {
    // Create the stories table if it doesn't exist
    const hasStoriesTable = await knex.schema.hasTable('stories');
    if (!hasStoriesTable) {
        await knex.schema.createTable('stories', (table) => {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.text('content').notNullable();
            table.integer('author_id').unsigned().notNullable().references('id').inTable('users');
            table.string('author_name').notNullable()
            table.timestamp('created_at').defaultTo(knex.fn.now());
        });
    }
}

export async function down(knex) {
    // Drop the stories table if it exists
    return knex.schema.dropTableIfExists('stories');
}
