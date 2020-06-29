CREATE TABLE user(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    email VARCHAR(100),
    username VARCHAR(20),
    bio VARCHAR(100),
    password TEXT,
    profile_pic TEXT
);