export async function up(knex) {
    // Create the admins table if it doesn't exist
    const hasAdminsTable = await knex.schema.hasTable('admins');
    if (!hasAdminsTable) {
        await knex.schema.createTable('admins', (table) => {
            table.increments('id').primary().unsigned();
            table.string('email', 100).unique().notNullable();
            table.string('password', 255).notNullable();  // Store hashed passwords only
            table.integer('role_id').unsigned().notNullable().defaultTo(1);  // Default to 'admin' role
            table.foreign('role_id').references('id').inTable('roles');
            
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').nullable();
            table.timestamp('removed_at').nullable();
        });
    }
}

export async function down(knex) {
    await knex.schema.alterTable('admins', (table) => {
        table.dropForeign('role_id'); // Drop foreign key to roles
    });

    // Drop the table
    await knex.schema.dropTableIfExists('admins');
}
