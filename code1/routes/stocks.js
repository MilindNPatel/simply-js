const express = require('express');
const router = express.Router();
const passport = require('passport');
const stockController = require('../controllers/stockcontroller')

router.post('/save', stockController.saveStock);

router.post('/getpendingtrade', stockController.getPendingTrade);

router.post('/updatetrade', stockController.updatetrade);

router.post('/confirmtrading', stockController.confirmTrading);

router.post('/pendingtrading', stockController.pendingTrading);

router.use(passport.authenticate('jwt', { session: false }), function (req, res, next) {	
    var token = getToken(req.headers);
    next();
});

router.post('/getSubscribution', stockController.getSubscribedScript);

router.get('/getList/:quote', stockController.getStockList);

router.post('/subscribestock', stockController.subscribeStock);

router.post('/pendingtrade', stockController.pendingTrade);

router.post('/confirmtrade', stockController.confirmTrade);

router.get('/getPendingTradeById', stockController.getPendingTradeById);

router.get('/getConfirmTradeById', stockController.getConfirmTradeById);

module.exports = router;
