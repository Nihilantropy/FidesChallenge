export async function up(knex) {
    const hasStoriesTable = await knex.schema.hasTable('stories');
    if (!hasStoriesTable) {
        await knex.schema.createTable('stories', (table) => {
            table.increments('id').primary().unsigned();
            table.string('title').notNullable();
            table.text('content').notNullable();
            
            // Polymorphic relationship fields
            table.integer('author_id').unsigned().notNullable();
            table.integer('author_role_id').unsigned().notNullable().defaultTo(2);
            table.foreign('author_role_id').references('id').inTable('roles');
            
            table.string('author_name').notNullable();
            table.boolean('author_visible').defaultTo(true).notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            // TODO table.timestamp('updated_at').defaultTo(knex.fn.now());
        });
    }
}

export async function down(knex) {
    // Drop the stories table if it exists
    return knex.schema.dropTableIfExists('stories');
}
