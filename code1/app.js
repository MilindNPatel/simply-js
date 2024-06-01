const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors');
const passport = require('passport')
const config = require('./config/config')
const database = require('./config/database');
const app = express();

// Routes
const users = require('./routes/users');
const chats = require('./routes/chats');
const stocks = require('./routes/stocks');
const accounts = require('./routes/accounts');
const sequelize = require('./routes/sequelizes');

// CORS Middleware
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/chats', chats);
app.use('/stocks', stocks);
app.use('/accounts', accounts);
app.use('/sequelize', sequelize);

// Index Route
app.get('/', (req, res) => {
    res.send('invaild endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// app.listen(port, () => {
//     console.log('Server started on port ' + port);
// });

module.exports = app;

// Mongoose promise library for avoid deprecation
// mongoose.Promise = global.Promise;
// mongoose.connect(config.database, { useMongoClient: true });
// mongoose.connection.on('connected', () => {
//   console.log('Connected to Database ');
// });
// mongoose.connection.on('error', (err) => {
//   console.log('Database error ' + err);
// });

// var db = mongoose.connection;
// db.on("error", function (error) {
//   console.log("Mongoose Error: ", error);
// });
// db.once("open", function () {
//   console.log("Mongoose connection successful.");
// });
// var db;
// Mongo Client Connection
// MongoClient.connect(config.database, function (err, client) {
//   if (err) {
//     console.log('MongoClient Connection Error');
//   } else {
//     console.log('MongoClient Connected to Database');
//     db = client.db('meanauthapp')

//     // db.collection('sample').find({ symbol: "HTFC" }).toArray(function (err, result) {
//     //   if (err) throw err
//     //   console.log(result)
//     // })
//   }
// });
// var bulk = db.collection('sample').initializeUnorderedBulkOp();
// bulk.find({ symbol: "HNGL" }).upsert().update({ $set: { symbol: "HNGL", price: 100 } });
// bulk.find({ symbol: "HCL" }).upsert().update({ $set: { price: 200 } });
// bulk.find({ symbol: "HCLP" }).upsert().update({ $set: { symbol: "HCLP", price: 300 } });
// bulk.execute(function (err, results) {
//   if(err){
//     console.log('Err');
//   }
//   if(results){
//     console.log('Save');
//   }
// });
// })

// db.collection('sample').find({ symbol: "HDFC" }, function (err, result) {
//   // if (err) throw err;
//   console.log(result)
// })

// var bulk = db.collection('sample').initializeUnorderedBulkOp();  
//   bulk.find({ symbol: "HCL" }).upsert().update({ $set: { price: 1000 } });
//   bulk.find({ symbol: "HNGL" }).upsert().update({ $set: { symbol: "HNGL", price: 2000 } });
//   bulk.find({ symbol: "HCLP" }).upsert().update({ $set: { symbol: "HCLP", price: 3000 } });
//   bulk.find({ symbol: "NHCL" }).upsert().update({ $set: { symbol: "NHCL", price: 4000 } });
//   bulk.execute(function (err, results) {
//     if(err){
//       console.log('Err');
//     }
//     if(results){
//       console.log('Save');
//     }
//   });

// const Schema1 = mongoose.Schema({ name: String })
// const Cat = mongoose.model('Cat', Schema1)
// const kitty = new Cat({name: 'Milind'})
// kitty.save().then(() => console.log('save'))

// Schema1 = mongoose.Schema({
//   "symbol": { type: String },
//   "price": { type: Number }
// });

// var Sample = mongoose.model("Sample", Schema1, "sample");

// var sampleSchema = new Sample({
//   "symbol": "HTFC",
//   "price": 500
// }, { "strict": false });

// sampleSchema.save().then(() => console.log('Save'))

// bulk = db.sample.initializeUnorderedBulkOp();
// var bulk = Sample.collection.initializeOrderedBulkOp();
// for (var x = 0; x < 10; x++) {
//   bulk.find({ "symbol": "symbol" + x }).upsert().update({
//     "symbol": "symbol" + x,
//     "price": 10 * x
//   });
// }
// bulk.execute().then(() => console.log('Save'));

// var bulk = Sample.collection.initializeUnorderedBulkOp();
// bulk.find( { symbol: "HTFC" } ).update( { $set: { symbol: "IDFC", price: 300 } } );
// // bulk.find( { item: null } ).update( { $set: { item: "TBD" } } );
// bulk.execute();

// var bulk = Sample.collection.initializeOrderedBulkOp();
// var counter = 0;

// representing a long loop
// for (var x = 0; x < 100000; x++) {
//   bulk.find({ "symbol": "symbol" + x }).upsert().updateOne({
//     "symbol": "symbol" + x,
//     "price": 10 * x
//   });
//   counter++;

//   if (counter % 1000 == 0) {
//     bulk.execute(function (err, result) {
//       bulk = Sample.collection.initializeOrderedBulkOp();
//     });
//   }
//   if (counter % 1000 != 0) {
//     bulk.execute(function (err, result) {
//       // maybe do something with result
//     });
//   }
// };
// var bulk
// mongoose.connection.on("open", function (err, conn) {
//   console.log("Connected");
//   bulk = Sample.collection.initializeOrderedBulkOp();
//   for (var x = 1; x <= 10; x++) {
//     var sampleSchema = new Sample({
//       "symbol": "HDFC" + x,
//       "price": 10 * x
//     }, { "strict": false });
//     bulk.find({ "symbol": "HDFC" + x }).upsert().update({
//       $set: {
//         "symbol": sampleSchema.symbol, "price": sampleSchema.price
//       }
//     });
//   }
// });
// mongoose.connection.on("open", function (err, conn) {
//   bulk.execute(function (err, result) {
//     console.log(result);
//   });
// });