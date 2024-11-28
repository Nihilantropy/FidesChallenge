-- Create database
CREATE DATABASE IF NOT EXISTS myapp_db;

-- Create MySQL user with limited privileges (excluding `admins` table)
CREATE USER 'mysql_user'@'%' IDENTIFIED BY 'userpassword';
-- ALTER USER 'mysql_user'@'%' IDENTIFIED WITH mysql_native_password BY 'userpassword';

-- Grant privileges on all tables except `admins`
GRANT CREATE SELECT, INSERT, UPDATE, DELETE ON myapp_db.* TO 'mysql_user'@'%';
REVOKE ALL PRIVILEGES ON myapp_db.admins FROM 'mysql_user'@'%';

-- Apply privilege changes
FLUSH PRIVILEGES;

-- Creazione della tabella roles
CREATE TABLE IF NOT EXISTS roles (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Creazione della tabella users
CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT UNSIGNED NOT NULL DEFAULT 2,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    removed_at TIMESTAMP NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Creazione della tabella stories
CREATE TABLE IF NOT EXISTS stories (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id INT UNSIGNED NOT NULL,
    author_role_id INT UNSIGNED NOT NULL DEFAULT 2,
    author_name VARCHAR(255) NOT NULL,
    author_visible BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    removed_at TIMESTAMP NULL,
    FOREIGN KEY (author_role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Creazione della tabella likes
CREATE TABLE IF NOT EXISTS likes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    story_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    removed_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE,
    UNIQUE (user_id, story_id)
);

-- Creazione della tabella admins
CREATE TABLE IF NOT EXISTS admins (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT UNSIGNED NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    removed_at TIMESTAMP NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);
