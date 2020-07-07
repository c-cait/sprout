require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
//import the library to access s3 bucket
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3'); 
const http = require('http');
const path = require('path');


aws.config.update({
    secretAccessKey: '',
    accessKeyId: '',
    region: ''
});

const   app = express(),
        s3 = new aws.S3()

const ctrl = require('./controller');
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;


app.use(express.static(path.join(__dirname, '../build')))

app.use(bodyParser.json());
// app.use(express.json());
app.use(cors());

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        cookie: {maxAge: 1000 * 60 * 60 * 24 * 14} //2weeks
    })
)

var upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'sprout-media',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, Date.now() + file.originalname); //use Date.now() for unique file keys
        }
    })
});


//auth endpoints
app.post('/api/auth/register', ctrl.register)
app.post('/api/auth/login', ctrl.login)
app.get('/api/auth/user', ctrl.getUser)
app.delete('/api/auth/logout', ctrl.logout)


//post endpoints
app.post('/api/sprout/post', ctrl.createPost)
app.get('/api/sprout/posts', ctrl.getAllPosts)
app.get('/api/sprout/post/:post_id', ctrl.getPost)
app.get('/api/sprout/user-posts/:user_id', ctrl.getUserPosts)
app.put('/api/sprout/post', ctrl.updatePost)
app.delete('/api/sprout/post/:post_id', ctrl.deletePost)

app.put('/api/sprout/bio', ctrl.updateBio)


//aws s3 bucket upload
app.post('/upload', upload.array('upl',1), function (req, res, next) {
    console.log('got hit')
    console.log(req.files)
    console.log('req files key',req.files[0].location)
    if(req.files.length === 0){
        res.status(404).send('no image found')
    }
    // // console.log('res',res)
    res.status(200).send(req.files[0].location);
});


massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
})
.then(db => {
    app.set('db', db)
    console.log('db connected')
})
.catch(err => console.log(err))


app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
    res.status(200);
  });
  
  const server = http.createServer(app);
  
  const port = process.env.PORT || 1337;
  
  server.listen(port);
  
  console.log("Server running at http://localhost:%d", port);




