const express = require('express');
const router = express.Router();
const EvntModel = require('../models/Evntpersonal')
var nodemailer = require('nodemailer');


function mailer(Event, first_name) {
    

    EvntModel.find({}, function(err, users) {
        users.forEach(function(user) {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'evntinc@gmail.com',
                  pass: 'evnt@1234'
                }
            });

        
            var mailOptions = {
                from: 'evntinc@gmail.com',
                to: `${user.email}`,
                subject: `${Event[0].name}`,
                html : `<h1>hi ${user.email} </h1><p> ${Event[0].owner} is organising an event on ${Event[0].date} <br>
                 Timing: ${Event[0].time} <br> Description: ${Event[0].desc} <br> Venue: ${Event[0].venue} </p> `
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
    
    EvntModel.findOne({email: req.body.userName}).then(user => { 
        if(user) {
            var Event = [{name: req.body.eventName, desc: req.body.msg, owner: req.body.userName,
                date: req.body.date, time: req.body.time, duration: req.body.duration, venue: req.body.venue}];
            
            mailer(Event);
            

            x = user.events;
            x = x.concat(Event);
            EvntModel.findOneAndUpdate({email:req.body.userName}, {$set: {events: x}}).
            then(() => {
                res.status(200).send("ok");
            })
            .catch(err => {
                res.status(501).send("error");
            })
        }
        else {
            res.status(401).send("unauthorised");
        }
    }).catch(err => {
        res.status(501).send("error");
    })

})


module.exports = router