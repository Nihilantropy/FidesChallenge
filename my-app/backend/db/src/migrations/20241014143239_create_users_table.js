/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema.createTable('users', function(table) {
		table.increments('id').primary();
		table.string('first_name', 255).notNullable();
		table.string('last_name', 255).notNullable();
		table.string('username', 50).unique().notNullable();
		table.string('email', 100).unique().notNullable();
		table.string('password', 255).notNullable();
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema.dropTableIfExists('users');
};
