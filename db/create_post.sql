INSERT INTO post
(title, post_img, description, water, sunlight, user_id, posting_date_unix)
VALUES
($1, $2, $3, $4, $5, $6, $7);