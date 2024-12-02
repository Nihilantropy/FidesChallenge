-- Create the admins table if it doesn't exist
CREATE TABLE IF NOT EXISTS admins (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,  -- Store hashed passwords only
    role_id INT UNSIGNED NOT NULL DEFAULT 1,  -- Default to 'admin' role
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    removed_at TIMESTAMP NULL,
    -- Add the foreign key constraint for role_id referencing roles table
    FOREIGN KEY (role_id) REFERENCES roles(id)
);
