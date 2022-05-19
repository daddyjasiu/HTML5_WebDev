var express = require('express');
const User = require("../models/user");
var router = express.Router();

/* GET users listing. */
router.get('/', isLoggedIn, function (req, res, next) {
    User.find({}, function (err, allUsers) {
        if (err) {
            throw err;
        }
        res.render('users.ejs', { users: allUsers });
    })

});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}