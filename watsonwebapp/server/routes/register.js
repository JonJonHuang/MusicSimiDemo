const express = require('express');
const router = express.Router();

const dbUtils = require('../../util/db');

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

router.post('/', async (req, res, next) => {
  let errors = []
  if (!emailRegex.test(req.body.email)) {
    // User failed to provide a legal email address
    errors.push('User provided an invalid email address.');
  }
  if (req.body.password.length < 8) {
    errors.push('Password shorter than 8 characters.');
  }
  if (errors.length === 0) {
    let success = await dbUtils.registerUser(req.body.email, req.body.username, req.body.password);
    res.send({success: success});
  } else {
    res.send({success: false, errors: errors});
  }
});

module.exports = router;
