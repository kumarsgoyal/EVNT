const express = require('express');
const router = express.Router();


router.post('/', function(req, res) {
    res.status(200).send("logout");
})



module.exports = router