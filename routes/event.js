const express = require('express');
const router = express.Router();
const EvntModel = require('../models/Evntpersonal')


router.post('/', function(req, res) {
    EvntModel.findOne({email: req.body.username}).then(user => {
        if(user) {
            console.log(user);
            res.status(200).send({events: user.events, flag: true});
        }
        else {
            res.send(401).send('unauthorized');
        }
    }).catch(err => {
        res.status(501).send('error');
    })

})


module.exports = router