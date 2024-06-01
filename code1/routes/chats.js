const express = require('express');
const router = express.Router();
const passport = require('passport');
var rest = require('../controllers/chatcontroller');

router.use(passport.authenticate('jwt', { session: false }), function (req, res, next) {
  var token = getToken(req.headers);
  next();
});

router.post('/chat', rest.chat);

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
