const config = require('./config')
const mongoose = require('mongoose')
const Redis = require('redis');
const MySql = require('mysql2');
const MongoClient = require('mongodb').MongoClient;
const Sequelize = require('sequelize');

// =================================================
// Mongoose Connection
// -------------------------------------------------
// Mongoose promise library for avoid deprecation
mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true });
mongoose.connection.on('connected', () => {
    console.log('Mongoose Connected to Database');
});
mongoose.connection.on('error', (err) => {
    console.log('Mongoose Connection Error ' + err);
});

// =================================================
// Redis Connection
// -------------------------------------------------
const redis = Redis.createClient(config.redis_url);

redis.on('connect', () => {
    console.log(`Redis Connected`);
});
redis.on('error', err => {
    console.log(`Redis Connection Error: ${err}`);
});

// client.set('my string', 'this is a string1233333', redis.print);
// client.get('my string', function(err, result) {
//   console.log(result); // this is a string
// });

// =================================================
// MongoClient Connection
// -------------------------------------------------
MongoClient.connect(config.database, function (err, client) {
    if (err) {
        console.log('MongoClient Connection Error');
    } else {
        console.log('MongoClient Connected to Database');
        db = client.db('meanauthapp')
        // db.collection('sample').find({ symbol: "HTFC" }).toArray(function (err, result) {
        //   if (err) throw err
        //   console.log(result)
        // })
    }
});

// ===============================================
// Sequelize Connection
// -----------------------------------------------
var sequelize = new Sequelize('test', 'traveltroopz', 'FB4rL43RRBNIIVLE', {
    host: '192.168.1.10',
    port: '3306',
    dialect: 'mysql'
})

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', 'err');
    });

// ================================================
// MySql Connection
// ------------------------------------------------
const mysql = MySql.createConnection({
    host: '192.168.1.10',
    user: 'travelasia',
    password: 'nphzoUMS2YXjzwtm',
    database: 'test'
})
mysql.connect((err) => {
    if (!err) {
        console.log('MySql Connected...');
    } else {
        console.log('MySql Connection Error');
    }
})

// ===============================================
// Module Exports
// -----------------------------------------------
module.exports = { sequelize, mysql, redis }
// module.exports = sequelize
