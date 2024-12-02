-- Create MySQL user with limited privileges (excluding `admins` table)
CREATE USER 'mysql_user'@'%' IDENTIFIED BY 'userpassword';
-- ALTER USER 'mysql_user'@'%' IDENTIFIED WITH mysql_native_password BY 'userpassword';

-- Grant privileges on all tables except `admins`
GRANT SELECT, INSERT, UPDATE, DELETE ON myapp_db.* TO 'mysql_user'@'%';
REVOKE ALL PRIVILEGES ON myapp_db.admins FROM 'mysql_user'@'%';

-- Apply privilege changes
FLUSH PRIVILEGES;
