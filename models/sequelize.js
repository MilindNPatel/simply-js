var Sequelize = require('sequelize');
const Model = Sequelize.Model;
var { sequelize } = require('../config/database');

class User extends Model { }
User.init({
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
}, {
        tableName: 'tbl_user',
        sequelize
    });

module.exports.userData = function (param, callback) {
    User.findAll({ attributes: ['firstName', 'lastName'] }).then((users) => {
        callback(null, { success: true, msg: 'Successfully get data', users });
    }).catch((err) => {
        callback(null, { success: false, msg: 'Error while getting data', err });
    });
}

// Another Method of Schema
// var User = sequelize.define('tbl_user', {
//     firstName: {
//         type: Sequelize.STRING
//     },
//     lastName: {
//         type: Sequelize.STRING
//     }
// }, {
//         tableName: 'tbl_user'
//     });

