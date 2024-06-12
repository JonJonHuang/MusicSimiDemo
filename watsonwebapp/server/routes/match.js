const express = require('express');
const router = express.Router();


var db = require('../../util/db.js');
var matcher = require('../../util/match');
router.get('/', async function(req, res, next) {
    let matched = await matcher.findMatch(req.query.email);
    res.send(matched);
});

module.exports = router;
