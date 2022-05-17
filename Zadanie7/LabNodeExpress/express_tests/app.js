var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
var multer = require('multer');
var upload = multer({dest: './tmp'});
app.use(upload.any());

app.get('/upload.html', function (req, res) {
    res.sendFile(__dirname + "/" + "upload.html");
})

app.post('/file_upload', function (req, res) {
    var fileInfo = req.files;
    console.log(fileInfo);
    console.log(fileInfo.originalname);
    console.log(fileInfo.path);
    console.log(fileInfo.mimetype);
    var file = __dirname + "/uploads/" + fileInfo.originalname;
    fs.readFile(fileInfo.path, function (err, data) {
        fs.writeFile(file, data, function (err) {
            if (err) {
                console.log(err);
            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename: fileInfo.originalname
                };
            }
            console.log(response);
            res.end(JSON.stringify(response));
        });
    });
})

var server = app.listen(8081, "127.0.0.1", function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s/upload.html", host, port)
})