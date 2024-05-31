var User = require('../models/sequelize');

exports.getUserData = function (req, res) {
    User.userData('', (err, user) => {
        if (err) {
            res.json(err);
        } else {
            res.json(user);
        }
    });
    let fnCall = add( 11, 12);
    console.log(fnCall);
};

function retStr() {
    return "hello world!!!"
}  

function add( n1,n2, n3 = 1) { 
    var sum = n1 + n2 + n3;
    return sum;
 } 