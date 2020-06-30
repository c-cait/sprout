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


aws.config.update({
    secretAccessKey: 'Mz8xb+QC7yWg7WR+NukIgN3ulqkrXSVVb9RzkDRK',
    accessKeyId: 'AKIAJII73LPVYFRMV5OQ',
    region: 'us-west-2'
});

const   app = express(),
        s3 = new aws.S3()

const ctrl = require('./controller');
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

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
app.get('/api/sprout/post', ctrl.getAllPosts)
app.get('/api/sprout/post/:post_id', ctrl.getPost)
app.get('/api/sprout/user-posts/:user_id', ctrl.getUserPosts)
app.delete('/api/sprout/post/:post_id', ctrl.deletePost)

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

app.listen(SERVER_PORT, () => console.log(`running on ${SERVER_PORT}`));







// //initialize s3 interface by passing our access keys
// const s3 = new AWS.S3({
//     accessKeyId: AWSAccessKeyId,
//     secretAccessKey: AWSSecretKey
// })

// //create bucket
// // const params = {
// //     Bucket: Bucket,
// //     CreateBucketConfiguration: {
// //         // Set your region here
// //         LocationConstraint: "us-west-2"
// //     }
// // };

// // s3.createBucket(params, function(err, data) {
// //     if (err) console.log(err, err.stack);
// //     else console.log('Bucket Created Successfully', data.Location);
// // });


// const uploadfile = (fileName) => {
//     const fileContent = fs.readFile(fileName)

//     const params = {
//         Bucket: Bucket,
//         Body: fileContent
//     };

//     s3.upload(params, function(err, data) {
//         if (err) {
//             throw err
//         }
//         console.log(`file upload success. ${data.location}`)
//     })
// }

// app.post('/aws/s3', (req, res) =>{
//     const {fileName} = req.body
//     uploadfile(fileName)
// })



