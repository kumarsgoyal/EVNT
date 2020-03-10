const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel')
var bcrypt = require('bcryptjs');



router.post('/', function(req, res) {
    var x = false;
    UserModel.findOne({email: req.body.username}, function(err, user) {
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                req.session.email = user.email;
                res.status(200).send("ok");
            }
            else {
                res.status(401).send("Oh uh, something went wrong");
            }
        }
        else {
            res.status(401).send("Oh uh, something went wrong");
        }  
    })
})


module.exports = router