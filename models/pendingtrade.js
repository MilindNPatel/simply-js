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

const PendingTrade = module.exports = mongoose.model('pendingtrade', Schema);

module.exports.saveTrade = function (tradeData, callback) {
    tradeData.save(callback);
}

module.exports.getTrade = function (trade, callback) {
	// const query = [{symbol: trade.symbol}, {price: trade.price}];
  	const query = { symbol: trade.symbol, status: 0, $or:[{type: "Sale", price: { $lt : trade.price}}, {type: "Buy", price: { $gt : trade.price}}] }
  	// PendingTrade.find({$and : query}, callback);
  	PendingTrade.find(query, callback);
}

// module.exports.updateTrade = function (bulk, callback){
// 	bulk.execute(callback);
// }

module.exports.getTradeById = function (para, callback){
  	const query = { userName: para.username, status: 0 }
  	PendingTrade.find(query, callback);
}
