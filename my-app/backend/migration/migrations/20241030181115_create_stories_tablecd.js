export async function up(knex) {
    // Create the stories table if it doesn't exist
    const hasStoriesTable = await knex.schema.hasTable('stories');
    if (!hasStoriesTable) {
        await knex.schema.createTable('stories', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.text('body').notNullable();
            table.integer('author_id').unsigned().notNullable().references('id').inTable('users');
            table.integer('likes').defaultTo(0);
            table.integer('comments_nbr').defaultTo(0);
            table.string('comment_author').notNullable();
            table.text('comment_body').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
        });
    }
}

export async function down(knex) {
    // Drop the stories table if it exists
    return knex.schema.dropTableIfExists('stories');
}
