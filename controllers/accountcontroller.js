var Balance = require('../models/balance');

exports.saveBalance = function(req, res){		
	Balance.getBalance(req.user, (err, resData) => {
		if (err) {
			res.json({ success: false, msg: 'Failed to save balance data' });
		} else {
			var crtAmt;
			var debAmt;			
			if (resData != null) {
				crtAmt = resData.creditAmt + req.body.creditAmt;
				debAmt = resData.debitAmt + req.body.debitAmt;
			} else {
				crtAmt = req.body.creditAmt;
				debAmt = req.body.debitAmt;
			}
			var bulk = Balance.collection.initializeOrderedBulkOp();
		    var balanceData = new Balance({
		        userId : req.user._id,
				userName : req.user.username,
				creditAmt : crtAmt,
				debitAmt : debAmt
		    }, { "strict": false });
		    bulk.find({ "userId": balanceData.userId, "userName": balanceData.userName }).upsert().update({
		        $set: {
		            "creditAmt": balanceData.creditAmt, 
		            "debitAmt": balanceData.debitAmt
		        }
		    });
			Balance.saveBalance(bulk, (err, resData) => {
				if (err) {
					res.json({ success: false, msg: 'Failed to save balance data' });
				} else {
					res.json({ success: true, msg: 'Balance save successfully' });
				}
			})
		}
	}) 
}
