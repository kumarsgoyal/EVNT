const express = require('express');
const router = express.Router();
const validateRegisterInput = require('../validation/Register');
const UserModel = require('../models/UserModel')
const EvntModel = require('../models/Evntpersonal')
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash;



router.post('/', function(req, res) {
    const x = validateRegisterInput(req.body);
    if(x.isValid === true) {
        UserModel.findOne({email: req.body.email}).then(user => {
            if(user) {
                res.status(401).send("try another email");
            }
            else {
                hash = bcrypt.hashSync(req.body.password1, salt); 
                const newrecord = new UserModel({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: hash,
                });
                const newevent = new EvntModel({
                    email: req.body.email,
                    events: [],
                })
                newevent.save().then(data => {

                }).catch(err => {
                    res.status(501).send("error");
                })
                newrecord.save().then(data => {
                    res.status(200).send("ok");
                }).catch(err => {
                    res.status(501).send("error");
                })
            }
        }).catch(error => {
            res.status(501).send("error");
        })

    }
    else {
        res.status(409).send("password doesn't match");
    }
})

module.exports = router