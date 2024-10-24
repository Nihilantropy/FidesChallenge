USE myapp_db;

INSERT INTO roles (role_name) VALUES ('admin'), ('user'), ('guest')
ON DUPLICATE KEY UPDATE role_name=VALUES(role_name);