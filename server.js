var express = require('express'), // "^4.13.4"
    aws = require('aws-sdk'), // ^2.2.41
    bodyParser = require('body-parser'),
    multer = require('multer'), // "multer": "^1.1.0"
    multerS3 = require('multer-s3'); //"^1.4.1"
const cors = require('cors');



aws.config.update({
    secretAccessKey: 'Mz8xb+QC7yWg7WR+NukIgN3ulqkrXSVVb9RzkDRK',
    accessKeyId: 'AKIAJII73LPVYFRMV5OQ',
    region: 'us-west-2'
});

var app = express(),
    s3 = new aws.S3();

app.use(bodyParser.json());
app.use(cors());

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'sprout-media',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, Date.now() + file.originalname); //use Date.now() for unique file keys
        }
    })
});

//open in browser to see upload form
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index2.html');
});
app.get('/test', function (req, res) {
    var file = 'IMG_3353.JPG'
    var options = {
        Bucket: 'sprout-media',
        Key: file
    }

    s3.getObject(options, function(err, data){
        res.send(data)
        // res.writeHead(200, {'Content-Type': 'image/jpeg'});
        // res.write(data.Body, 'binary');
        // res.end(null, 'binary');
        // res.attachment(file)
        // res.send(data.Body)
    })
})


//used by upload form
app.post('/upload', upload.array('upl',1), function (req, res, next) {
    console.log('req files key',req.files[0].key)
    // console.log('res',res)
    res.send('upload');
});

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});