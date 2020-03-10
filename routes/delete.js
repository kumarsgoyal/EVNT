const express = require('express');
const router = express.Router();
const EvntModel = require('../models/Evntpersonal')
const UserModel = require('../models/UserModel')
var nodemailer = require('nodemailer');


function mailer(Event, first_name) {
    

    UserModel.find({}, function(err, users) {
        users.forEach(function(user) {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'email@gmail.com',
                  pass: 'password'
                }
            });
        
            var mailOptions = {
                from: 'evntinc@gmail.com',
                to: `${user.email}`,
                subject: `${Event.name}`,
                html : `<h1>hi ${user.email} </h1><p> An event organised by ${first_name} has been cancelled. <br>
                Date: ${Event.date} <br>
                Timing: ${Event.time} <br/>
                Sorry for the inconvenience.<br> Description: ${Event.desc} <br> Venue: ${Event.venue} </p> `
            };
        
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
            });
        })
    })


}

router.post('/', function(req, res) {

    var userx;
    var Event;
    EvntModel.findOne({email: req.body.username},(err, response) => {
        userx = response; 
        userx.events = userx.events.filter((x) => {
            if(x._id == req.body._id) {
                Event = x;
                return false;
            }
            else {
                return true;
            }
        })

        EvntModel.findOneAndUpdate({email:req.body.username}, {$set: userx}).
        then(() => {
                mailer(Event, userx.email);
                res.status(200).send("ok");
        })
        .catch(err => {
            res.status(501).send("error");
        })
    }).catch (error => {
        res.status(501).send("error");
    })

})



module.exports = router
