const Chat = require('../models/chat');

exports.chat = function (req, res) {
    // console.log(req.body);
    let newChat = new Chat({
        username: req.body.user,
        room: req.body.room,
        message: req.body.message
    });

    Chat.saveChat(newChat, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user' });
        } else {
            res.json({ success: true, msg: 'Chat Save Successfully' });
        }
    });
};