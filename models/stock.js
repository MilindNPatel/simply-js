const mongoose = require('mongoose');

const StockSchema = mongoose.Schema({
    "symbol": { type: String },
    "regularMarketPrice": { type: Number }
})

const Stock = module.exports = mongoose.model('Stock', StockSchema);

module.exports.saveStock = function (bulk, callback) {
    bulk.execute(callback);
}

module.exports.getList = function (para, callback){
    var name=para.quote.toUpperCase();
	Stock.find({symbol: { $regex: '.*' + name + '.*' }}, callback);
}
