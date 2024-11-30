export async function up(knex) {
	const hasLikesTable = await knex.schema.hasTable('likes');
	if (!hasLikesTable) {
		await knex.schema.createTable('likes', (table) => {
		// 	table.increments('id').primary().unsigned(); // Auto-increment primary key
		// 	table.integer('user_id').unsigned().notNullable(); // Foreign key to users table
		// 	table.integer('story_id').unsigned().notNullable(); // Foreign key to stories table
		// 	table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp for when the like was added
        //     table.timestamp('removed_at').nullable(); // Nullable timestamp for when the like was removed

		// 	// Add foreign key constraints
		// 	table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
		// 	table.foreign('story_id').references('id').inTable('stories').onDelete('CASCADE');

		// 	// Add unique constraint to prevent duplicate likes
		// 	table.unique(['user_id', 'story_id']);
		});

		// // Add composite index for efficient querying
		// await knex.schema.table('likes', (table) => {
		// 	table.index(['story_id', 'removed_at'], 'idx_story_removed');
		// });
	}
}

export async function down(knex) {
    // // Drop indexes if they exist
    // await knex.schema.table('likes', (table) => {
    //     table.dropIndex(['story_id', 'removed_at'], 'idx_story_removed');
    // });

    // Drop the table
    await knex.schema.dropTableIfExists('likes');
}
