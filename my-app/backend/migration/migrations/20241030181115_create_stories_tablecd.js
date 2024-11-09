export async function up(knex) {
    const hasStoriesTable = await knex.schema.hasTable('stories');
    if (!hasStoriesTable) {
        await knex.schema.createTable('stories', (table) => {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.text('content').notNullable();
            
            // Polymorphic relationship fields
            table.integer('author_id').unsigned().notNullable();
            table.string('author_type').notNullable(); // 'user' or 'admin'
            
            table.string('author_name').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
        });
    }
}

export async function down(knex) {
    // Drop the stories table if it exists
    return knex.schema.dropTableIfExists('stories');
}
