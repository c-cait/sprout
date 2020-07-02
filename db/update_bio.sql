UPDATE users 
SET bio = $1
WHERE user_id = $2;