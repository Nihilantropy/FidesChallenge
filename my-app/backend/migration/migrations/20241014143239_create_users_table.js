export async function up(knex) {
    const hasUsersTable = await knex.schema.hasTable('users');
    if (!hasUsersTable) {
        await knex.schema.createTable('users', (table) => {
            table.increments('id').primary();
            table.string('first_name', 255).notNullable();
            table.string('last_name', 255).notNullable();
            table.string('username', 50).notNullable();
            table.string('email', 100).notNullable();
            table.string('password', 255).notNullable();
            table.integer('role_id').unsigned().defaultTo(2);
            table.timestamp('created_at').defaultTo(knex.fn.now());
        });
    }
}

export async function down(knex) {
    return knex.schema.dropTableIfExists('users');
}
