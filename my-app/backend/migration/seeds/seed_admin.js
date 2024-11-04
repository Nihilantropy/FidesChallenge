import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

export const seed = async (knex) => {
    try {
        // Start transaction
        await knex.transaction(async trx => {

            // Check for the 'admin' role, inserting it if it doesn't exist
            let adminRole = await trx('roles').where({ name: 'admin' }).first();
            if (!adminRole) {
                const [roleId] = await trx('roles').insert({ name: 'admin' }).returning('id');
                adminRole = { id: roleId };
                console.log("Admin role created.");
            }

            // Check if the environment variables for admin credentials are set
            const adminEmail = process.env.ADMIN_EMAIL;
            const adminPassword = process.env.ADMIN_PASSWORD;
            if (!adminEmail || !adminPassword) {
                throw new Error("Missing ADMIN_EMAIL or ADMIN_PASSWORD environment variables.");
            }

            // Check if an admin with the specified email already exists
            const existingAdmin = await trx('admins').where({ email: adminEmail }).first();
            if (existingAdmin) {
                console.log(`Admin user with email ${adminEmail} already exists.`);
            } else {
                // Hash the password and insert the admin user
                const hashedPassword = await bcrypt.hash(adminPassword, 10);
                await trx('admins').insert({
                    email: adminEmail,
                    password: hashedPassword,
                    role_id: adminRole.id  // Use the ID of the existing or newly created 'admin' role
                });
                console.log(`Admin user with email ${adminEmail} created successfully.`);
            }
        });

    } catch (error) {
        console.error(`Error seeding admin user: ${error.message}`);
    }
};
