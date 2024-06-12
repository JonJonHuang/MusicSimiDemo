var express = require('express');
var router = express.Router();
const db = require('../../util/db');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let users = await db.getAllUsers();
  res.send(users);
});

module.exports = router;
