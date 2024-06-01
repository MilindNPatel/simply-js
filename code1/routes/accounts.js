var express = require('express');
var router = express.Router();
var passport = require('passport');
var accountController = require('../controllers/accountcontroller');

router.use(passport.authenticate('jwt', { session: false }), function (req, res, next) {	
    var token = getToken(req.headers);
    next();
});

router.post('/balance', accountController.saveBalance);

module.exports = router;