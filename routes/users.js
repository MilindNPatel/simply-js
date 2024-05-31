const express = require('express');
const router = express.Router();
const passport = require('passport');
// var rest = require('../controllers/usercontroller');
var rest = require('../controllers/usercontroller');
var Demo = require('../controllers/democontroller');

const demo = new Demo('Milind', 21);

// var axios = require('axios');
// axios.post(url).then(response => {
//     return res.json({ rates: response.data.rates });
// }).catch(error => {
//     console.log(error);
// });

router.post('/demo', demo.test);

router.post('/register', rest.register);

router.post('/authenticate', rest.authenticate);

router.use(passport.authenticate('jwt', { session: false }), function (req, res, next) {  
  var token = getToken(req.headers);
  next();
});

router.get('/getprofile/:id', rest.gprofile);

router.post('/updateprofile/:id', rest.uprofile);

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
