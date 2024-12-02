import bcrypt from 'bcryptjs';

export async function seed(knex) {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new Error("Environment variables ADMIN_EMAIL and ADMIN_PASSWORD must be set.");
    }

    let hashedPassword;

    try {
      console.log("hashing password...")
      hashedPassword = bcrypt.hashSync(adminPassword, 10);
      console.log("password hashed!")

      // Insert admin record if it doesn't already exist
      await knex('admins')
        .insert({
          email: adminEmail,
          password: hashedPassword,
        })
        .onConflict('email')
        .ignore(); // Ignore if admin with email already exists
    }
    catch (e) {
      console.error("error while inserting admin in db")
    }
}
