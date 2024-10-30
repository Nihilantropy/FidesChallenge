CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

INSERT INTO roles (name) VALUES ('admin'), ('user'), ('guest') ON DUPLICATE KEY UPDATE name=name;  -- Prevent duplicates
