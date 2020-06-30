require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const cors = require('cors');
//import the library to access s3 bucket
const AWS = require('aws-sdk');
const fs = require('fs');

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
app.post('/api/auth/login', ctrl.login)
app.get('/api/auth/user', ctrl.getUser)
app.delete('/api/auth/logout', ctrl.logout)





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



