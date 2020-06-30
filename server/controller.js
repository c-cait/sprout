const bcrypt = require('bcrypt')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db');
        const {first_name, last_name, email, username, password} = req.body;

        const existingUser = await db.check_user(username)

        if(existingUser[0]){
            return res.status(409).send('user already exists')
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt)

        const newUser = await db.register(first_name, last_name, email, username, hash)

        req.session.user = {
            user_id: newUser[0].user_id,
            first_name: newUser[0].first_name,
            last_name: newUser[0].last_name,
            email: newUser[0].email,
            username: newUser[0].username,
            bio: newUser[0].bio,
            profile_pic: newUser[0].profile_pic
        }

        return res.status(200).send(req.session.user)
    },

    login: async (req, res) => {
        const db = req.app.get('db');
        const { username, password } = req.body;

        //check to see if user exists
        const user = await db.check_user(username)

        if(!username[0]){
            return res.status(404).send('user does not exist')
        }

        const authenticated = bcrypt.compareSync(password, user[0].password)
        if(authenticated){
            req.session.user = {
                user_id: user[0].user_id,
                first_name: user[0].first_name,
                last_name: user[0].last_name,
                email: user[0].email,
                username: user[0].username,
                bio: user[0].bio,
                profile_pic: user[0].profile_pic
            }
            return res.status(200).send(req.session.user)
        } else {
            return res.status(403).send('username or password incorrect')
        }
    },
    
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },

    getUser: (req, res) => {
        if (req.session.user) {
          res.status(200).send(req.session.user)
        } else {
          res.sendStatus(404)
        }
    },

    createPost: async (req, res) => {
        const db = req.app.get('db');

        const {title, post_img, description, water, sunlight, user_id} = req.body

        const newPost = await db.create_post(title, post_img, description, water, sunlight, user_id);

        res.status(200).send(newPost)
    },

    getAllPosts:  async (req, res) => {
        const db = req.app.get('db')

        post = await db.get_all_posts()

        res.status(200).send(post)
    },

    getPost:  async (req, res) => {
        const db = req.app.get('db')

        const { post_id } = req.params

        post = await db.get_post(post_id)

        res.status(200).send(post[0])
    },

    getUserPosts:  async (req, res) => {
        const db = req.app.get('db')

        const { user_id } = req.params

        post = await db.get_user_posts(user_id)

        res.status(200).send(post)
    },

    updatePost: async (req, res) => {
        const db = req.app.get('db')

        const {title, description, water, sunlight, user_id, post_id} = req.body

        post = await db.update_post(title, description, water, sunlight, user_id, post_id)

        res.status(200).send(post)
    },

    deletePost: async (req, res) => {
        const db = req.app.get('db')

        const { post_id } = req.params

        post = await db.delete_post(post_id)

        res.sendStatus(200)
    }
    
}