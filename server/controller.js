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
            userId: newUser[0].id,
            first_name: newUser[0].first_name,
            last_name: newUser[0].last_name,
            email: newUser[0].email,
            username: newUser[0].username,
        }

        return res.status(200).send(req.session.user)
    }
}