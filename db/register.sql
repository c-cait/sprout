INSERT INTO users (first_name, last_name, email, username, password)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;