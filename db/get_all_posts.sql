select users.username, post.title, post.description, post.water, post.sunlight, post.post_id, post.user_id, post.posting_date_unix, post.post_img from users
inner join post 
on users.user_id = post.user_id
order by post.posting_date_unix desc;