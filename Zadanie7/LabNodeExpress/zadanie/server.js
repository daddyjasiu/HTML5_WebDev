var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

const userFile = "users.json";

function readDatabase(cb) {
    fs.readFile(userFile, (err, data)=>{
        if(err) {
            cb(`Plik userFile nie istnieje`);
        } else {
            cb(undefined, JSON.parse(data.toString()));
        }
    })
}

function getUsersFromDB() {

}

function sendFileToDB(){
    var file = __dirname + "/uploads/" + userFile;
    fs.readFile( userFile, function (err, data) {
        fs.writeFile(file, data, function (err) {
            if( err ){
                console.log( err );
            }else{
                response = {
                    message:'File uploaded successfully',
                    filename:fileInfo.originalname
                };
            }
            console.log( response );
            res.end( JSON.stringify( response ) );
        });
    });
}

function writeDatabase(users) {
    fs.writeFile(userFile, JSON.stringify(users), (err) =>{
        if(err)
            console.log("writeDatabase error: ", err)
    })
}

function addUser(last_name, first_name) {
    readDatabase((err, users) => {
        users.push({first_name: first_name, last_name: last_name});
        writeDatabase(users);
    })
}

var app = express();

var parser = bodyParser.urlencoded();

app.use(parser);

app.get('/input.html', function (req, res) {
    res.sendFile(__dirname + "/" + "input.html");
})

app.get('/add_user', function(req, res) {
    addUser(req.query.last_name, req.query.first_name);
    res.end("User with credentials " + req.query.first_name + " " + req.query.last_name + " added to database!");
})

app.listen(8081);