const express = require('express');
const router = express.Router();

const dbUtils = require('../../util/db');

router.post('/', async (req, res, next) => {
  if (!req.session.loggedIn || req.session.userEmail !== req.body.email) {
    res.send({success: false});
    return;
  }

  let user = await dbUtils.getUser(req.body.email);
  if (user) {
    res.send({success: true, username: user.username, messages: user.messages});
  } else {
    res.send({success: false});
  }
});

module.exports = router;
