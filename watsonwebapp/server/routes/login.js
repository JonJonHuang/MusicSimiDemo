const express = require('express');
const router = express.Router();

const dbUtils = require('../../util/db');

router.post('/', async (req, res, next) => {
  let success = await dbUtils.validateUser(req.body.email, req.body.password);
  if (success) {
    let user = await dbUtils.getUser(req.body.email);
    req.session.loggedIn = true;
    req.session.userEmail = req.body.email;
    res.send({success: success, username: user.username, messages: user.messages});
  } else {
    res.send({success: false});
  }
});

module.exports = router;
