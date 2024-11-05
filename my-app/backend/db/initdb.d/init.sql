-- Create the roles table
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Insert roles
INSERT INTO roles (name) VALUES ('admin'), ('user'), ('guest') ON DUPLICATE KEY UPDATE name=name;

-- Create MySQL user and grant privileges
CREATE USER 'mysql_user'@'%' IDENTIFIED BY 'userpassword';  -- Change this to your desired username and password
GRANT ALL PRIVILEGES ON myapp_db.* TO 'mysql_user'@'%';
FLUSH PRIVILEGES;
