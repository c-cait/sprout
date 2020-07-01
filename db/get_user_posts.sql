SELECT * FROM post
WHERE user_id = $1
order by post.posting_date_unix desc;