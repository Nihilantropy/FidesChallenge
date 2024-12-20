export async function up(knex) {
    const hasUsersTable = await knex.schema.hasTable('users');
    if (!hasUsersTable) {
        await knex.schema.createTable('users', (table) => {
            table.increments('id').primary().unsigned();
            table.string('first_name', 255).notNullable();
            table.string('last_name', 255).notNullable();
            table.string('username', 50).notNullable();
            table.string('email', 100).notNullable();
            table.string('password', 255).notNullable();
            table.integer('role_id').unsigned().notNullable().defaultTo(2);
            table.foreign('role_id').references('id').inTable('roles').onDelete('CASCADE');
            
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').nullable();
            table.timestamp('removed_at').nullable();
        });
    }
}

export async function down(knex) {
    await knex.schema.alterTable('users', (table) => {
        table.dropForeign('role_id'); // Drop foreign key to roles
    });

    // Drop the table
    await knex.schema.dropTableIfExists('users');
}

