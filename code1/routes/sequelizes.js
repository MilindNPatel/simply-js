var express = require('express');
var router = express.Router();
var usercontroller = require('../controllers/sequelizecontroller');

router.get('/', usercontroller.getUserData);

module.exports = router;