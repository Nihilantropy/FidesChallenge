export async function up(knex) {
    const hasLikesTable = await knex.schema.hasTable('likes');
    if (!hasLikesTable) {
    await knex.schema.createTable('likes', (table) => {
        table.increments('id').primary(); // Auto-increment primary key
        table.integer('user_id').unsigned().notNullable(); // Foreign key to users table
        table.integer('story_id').unsigned().notNullable(); // Foreign key to stories table
        table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp for when the like was added
        table.timestamp('removed_at').nullable();

        // Add foreign key constraints
        table
            .foreign('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        table
            .foreign('story_id')
            .references('id')
            .inTable('stories')
            .onDelete('CASCADE');

        // Add unique constraint to prevent duplicate likes
        table.unique(['user_id', 'story_id']);
        });
    }
}

export async function down(knex) {
    await knex.schema.dropTableIfExists('likes'); // Rollback action
}
