const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
  req.session.loggedIn = false;
  req.session.userEmail = '';
  res.send({success: true});
});

module.exports = router;
