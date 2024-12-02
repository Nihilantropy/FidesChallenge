-- Create the stories table if it doesn't exist
CREATE TABLE IF NOT EXISTS stories (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    -- Polymorphic relationship fields
    author_id INT UNSIGNED NOT NULL,
    author_role_id INT UNSIGNED NOT NULL DEFAULT 2,
    author_name VARCHAR(255) NOT NULL,
    author_visible BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    removed_at TIMESTAMP NULL,
    -- Add the foreign key constraint for author_role_id referencing roles table
    FOREIGN KEY (author_role_id) REFERENCES roles(id) ON DELETE CASCADE
);
