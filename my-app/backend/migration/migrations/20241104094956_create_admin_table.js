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
        });
    }
}

export async function down(knex) {
    // Drop the admins table if it exists
    return knex.schema.dropTableIfExists('admins');
}