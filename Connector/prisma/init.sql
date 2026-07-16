CREATE DATABASE IF NOT EXISTS connector_db;
GRANT ALL PRIVILEGES ON connector_db.* TO 'central_bank'@'%';
FLUSH PRIVILEGES;
