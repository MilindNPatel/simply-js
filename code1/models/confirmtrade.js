var mongoose = require('mongoose');

const Schema = mongoose.Schema({
	userId : {type: String},
	userName : {type: String},
	symbol : {type: String},
	price : {type: Number},
	type : {type: String},
	status : {type: Number},
	quantity : {type: Number}
});

const ConfirmTrade = module.exports = mongoose.model('confirmtrade', Schema);

module.exports.saveTrade = function (tradeData, callback) {
    tradeData.save(callback);
}

module.exports.confirmTrad = function (bulk, callback){
	bulk.execute(callback);
}

module.exports.getTradeById = function (para, callback){
  	const query = { userName: para.username, status: 1 }
  	ConfirmTrade.find(query, callback);
}

module.exports.updateTrade = function (tradeData, callback) {
    tradeData.save(callback);
}
