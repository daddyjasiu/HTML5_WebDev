var express = require('express');
var bodyParser = require('body-parser');
var users = require("./zadanie/userDatabase");

var app = express();

// var parser = bodyParser.urlencoded();
var parser = bodyParser.json();

app.use(parser);

app.get('/users', function(req, res) {
    users.getUsers((err, data) => {
        console.log("data: ", data);
        res.end(JSON.stringify(data));
    });
})

app.get('/add_user', function(req, res) {
    console.log(req.body);
    users.addUser(req.query.last_name, req.query.first_name);
    res.end("Dodano użytkownika");
})

app.listen(8081);

