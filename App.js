const express = require('express');
const session = require('express-session');
var bodyParser = require("body-parser");
const cors = require('cors');

const login = require('./routes/login');
const register = require('./routes/register');
const addevent = require('./routes/form');
const eventlist= require('./routes/event');
const deleteevent = require('./routes/delete');
const logout = require('./routes/logout');


const app = express();


// port no. of server
const port = 5000;

const whiltelist = ['http://localhost:3000'];
const corsOption = {
    credentails: true,
    origin: function(origin, callback) {
        if(whiltelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed By CORS'))
        }
    },credentials: true
}


app.use(bodyParser.json());
app.use(cors(corsOption));


app.use(session({
    key: 'passiskey',
    secret: 'passmusrbesecret',
    saveUninitialized: true,
    resave: 'false'
}))


const aunt = (req, res, next) => {
    if(req.session.email) {
        next();
    }
}

const logt = (req, res, next) => {
    if(req.session.email) {
        req.session.email = null;
        next();
    }
    else {
        res.status(401);
    }
}



// import routes
app.use('/login', login); 
app.use('/register', register); 
app.use('/addevent', aunt,addevent); 
app.use('/eventlist', aunt, eventlist); 
app.use('/deleteevent', deleteevent); 
app.use('/logout',logt, logout);


app.listen(port, () => {
    console.log('server is running on port' + port);
})



// killall node
