-- Create the roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS roles (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Insert default roles if they do not already exist
INSERT IGNORE INTO roles (name) 
VALUES 
    ('admin'),
    ('user');
