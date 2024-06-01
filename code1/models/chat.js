const mongoose = require('mongoose');

// User Schema
const UserChatSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    message: {
        type: String
    }
});

const Chat = module.exports = mongoose.model('Chat', UserChatSchema);

module.exports.saveChat = function (newChat, callback) {
    // if (err) throw err;
    // console.log(newChat);
    newChat.save(callback);
}