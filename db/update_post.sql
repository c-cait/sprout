UPDATE post 
SET title = $1,
description = $2,
water = $3,
sunlight = $4
WHERE post_id = $6 AND user_id = $5;