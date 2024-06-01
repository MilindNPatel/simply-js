var mongoose = require('mongoose');

const Schema = mongoose.Schema({
	userId : {type:String},
	userName : {type: String},
	creditAmt : {type: Number},
	debitAmt : {type: Number}
})

const Balance = module.exports = mongoose.model('balance', Schema);

module.exports.saveBalance = function(bulk, callback){
	bulk.execute(callback);
}

module.exports.getBalance = function(para, callback){
	const query = { userName: para.username }
  	Balance.findOne(query, callback);
}