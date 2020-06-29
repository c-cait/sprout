require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const cors = require('cors');

const app = express();
const ctrl = require('./controller');
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

app.use(express.json());
app.use(cors());

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        cookie: {maxAge: 1000 * 60 * 60 * 24 * 14} //2weeks
    })
)

//auth endpoints
app.post('/api/auth/register', ctrl.register)
// app.post('/api/auth/login', ctrl.login)
// app.delete('/api/auth/logout', ctrl.logout)



massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
})
.then(db => {
    app.set('db', db)
    console.log('db connected')
})
.catch(err => console.log(err))

app.listen(SERVER_PORT, () => console.log(`running on ${SERVER_PORT}`));