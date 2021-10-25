-- Drop and recreate users table
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(150),
  email VARCHAR(150) NOT NULL,
  password VARCHAR(150) NOT NULL
);
