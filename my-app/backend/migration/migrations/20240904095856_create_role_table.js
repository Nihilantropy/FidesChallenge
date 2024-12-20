export async function up(knex) {
    // Create the roles table if it doesn't exist
    const hasRolesTable = await knex.schema.hasTable('roles');
    if (!hasRolesTable) {
        await knex.schema.createTable('roles', (table) => {
            table.increments('id').primary().unsigned();
            table.string('name', 50).notNullable().unique();
        });

        // Insert default roles
        await knex('roles').insert([{ name: 'admin' }, { name: 'user' }])
            .onConflict('name')
            .ignore();  // Avoid duplicates if migration is re-run
    }
}

export async function down(knex) {
    await knex.schema.dropTableIfExists('stories'); // Stories depends on roles
    await knex.schema.dropTableIfExists('users');   // Users depends on roles
    await knex.schema.dropTableIfExists('admins');  // Admins depends on roles
    // Drop the roles table if it exists
    await knex.schema.dropTableIfExists('roles');
}