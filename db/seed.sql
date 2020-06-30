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

CREATE TABLE post(
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    post_img TEXT,
    description TEXT,
    water TEXT,
    sunlight TEXT,
    posting_date DATE NOT NULL DEFAULT CURRENT_DATE,
    user_id INT REFERENCES users(user_id)
);

CREATE TABLE comment(
    comment_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    post_id INT REFERENCES post(post_id),
    comment TEXT,
    posting_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE likes(
    like_id SERIAL PRIMARY KEY,
    post_id INT REFERENCES post(post_id),
    user_id INT REFERENCES user(user_id)
)
