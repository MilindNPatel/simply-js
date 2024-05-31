const mongoose = require('mongoose');

const SubscribeSchema = mongoose.Schema({
    "userid": { type: String },
    "username": { type: String },
    "script": []
})

const Subscribe = module.exports = mongoose.model('Subscribe', SubscribeSchema);

module.exports.getSubscribed = function (userid, callback) {
  const query = { userid: userid }
  Subscribe.findOne(query, callback);
}

module.exports.subscribe = function (bulk, callback){
	bulk.execute(callback);
}
