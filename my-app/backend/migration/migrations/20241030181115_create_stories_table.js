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
            table.foreign('author_role_id').references('id').inTable('roles').onDelete('CASCADE');
            
            table.string('author_name').notNullable();
            table.boolean('author_visible').defaultTo(true).notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').nullable();
            table.timestamp('removed_at').nullable();
        });
    }
}

export async function down(knex) {
    await knex.schema.alterTable('stories', (table) => {
        table.dropForeign('author_role_id'); // Drop foreign key to roles
    });

    // Drop the table
    await knex.schema.dropTableIfExists('stories');
}