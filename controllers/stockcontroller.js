const Stock = require('../models/stock');
const Subscribe = require('../models/subscribe');
const PendingTrade = require('../models/pendingtrade');
const ConfirmTrade = require('../models/confirmtrade');

exports.saveStock = function (req, res) {
    var bulk = Stock.collection.initializeOrderedBulkOp();
    req.body.forEach(element => {
        var stockData = new Stock({
            "symbol": element.symbol,
            "regularMarketPrice": element.regularMarketPrice
        }, { "strict": false });
        bulk.find({ "symbol": element.symbol }).upsert().update({
            $set: {
                "symbol": stockData.symbol,
                "regularMarketPrice": stockData.regularMarketPrice
            }
        });
    });
    Stock.saveStock(bulk, (err, stock) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to save stock data' })
        } else {
            res.json({ success: true, msg: 'Saccessfully save stock data' })
        }
    })
}

exports.getStockList = function (req, res) {
    Stock.getList(req.params, (err, stock) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to save stock data' })
        } else {
            res.json(stock);
        }
    })
}

exports.getSubscribedScript = function (req, res) {
    Subscribe.getSubscribed(req.body.userId, (err, stock) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to save stock data' })
        } else {
            res.json(stock);
        }
    });
}

exports.subscribeStock = function (req, res) {
    Subscribe.getSubscribed(req.body.userId, (err, stock) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to get stock data' })
        } else {
            if (stock == null) {
                var script = [{
                    "stockid": req.body.stockId,
                    "symbol": req.body.symbol,
                    "regularMarketPrice": ""
                }];
                var stockData = new Subscribe({
                    "userid": req.body.userId,
                    "username": req.body.userName,
                    "script": script
                }, { "strict": false });
                var bulk = Subscribe.collection.initializeOrderedBulkOp();
                bulk.find({ "userid": req.body.userId }).upsert().update({
                    $set: {
                        "username": stockData.username,
                        "script": stockData.script
                    }
                });
                Subscribe.subscribe(bulk, (err, stock) => {

                    if (err) {
                        res.json({ success: false, msg: 'Failed to save stock data' })
                    } else {
                        res.json({
                            success: true,
                            msg: 'Subscribe Successfully',
                            data: {
                                "stockid": req.body.stockId,
                                "symbol": req.body.symbol,
                                "regularMarketPrice": req.body.regularMarketPrice
                            }
                        })
                    }
                })
            } else {
                var found = stock.script.some(function (el) {
                    return el.symbol === req.body.symbol;
                });
                if (!found) {
                    var script = stock.script;
                    script.push({
                        "stockid": req.body.stockId,
                        "symbol": req.body.symbol,
                        "regularMarketPrice": ""
                    });
                    var stockData = new Subscribe({
                        "userid": req.body.userId,
                        "username": req.body.userName,
                        "script": script
                    }, { "strict": false });
                    var bulk = Subscribe.collection.initializeOrderedBulkOp();
                    bulk.find({ "userid": req.body.userId }).upsert().update({
                        $set: {
                            "username": stockData.username,
                            "script": stockData.script
                        }
                    });
                    Subscribe.subscribe(bulk, (err, stock) => {

                        if (err) {
                            res.json({ success: false, msg: 'Failed to save stock data' })
                        } else {
                            res.json({
                                success: true,
                                msg: 'Subscribe Successfully',
                                data: {
                                    "stockid": req.body.stockId,
                                    "symbol": req.body.symbol,
                                    "regularMarketPrice": req.body.regularMarketPrice
                                }
                            })
                        }
                    })
                } else {
                    res.json({ success: false, msg: 'Script already exist' });
                }
            }
        }
    })
}

exports.pendingTrade = function (req, res) {

    var tradeData = new PendingTrade({
        userId: req.body.userId,
        userName: req.body.userName,
        symbol: req.body.symbol,
        price: req.body.limitPrice == "" ? req.body.currentPrice : req.body.limitPrice,
        type: req.body.type,
        status: 0,
        quantity: req.body.quantity
    }, { "strict": false });

    PendingTrade.saveTrade(tradeData, (err, stock) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to save trade' })
        } else {
            res.json({ success: true, msg: 'Saccessfully save trade' })
        }
    })
}

exports.confirmTrade = function (req, res) {

    var tradeData = new ConfirmTrade({
        userId: req.body.userId,
        userName: req.body.userName,
        symbol: req.body.symbol,
        price: req.body.currentPrice,
        type: req.body.type,
        status: 1,
        quantity: req.body.quantity
    }, { "strict": false });

    ConfirmTrade.saveTrade(tradeData, (err, stock) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to save trade' })
        } else {
            res.json({ success: true, msg: 'Saccessfully save trade' })
        }
    })
}

exports.confirmTrading = function (req, res) {

    var bulk = ConfirmTrade.collection.initializeOrderedBulkOp();
    req.body.forEach(element => {
        var tradeData = new ConfirmTrade({
            userId: element.userId,
            userName: element.userName,
            symbol: element.symbol,
            price: element.currentPrice,
            type: element.type,
            status: 1,
            quantity: element.quantity
        }, { "strict": false });
        bulk.insert(tradeData);
    });

    ConfirmTrade.confirmTrad(bulk, (err, stock) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to save trade' })
        } else {
            res.json({ success: true, msg: 'Saccessfully save trade' })
        }
    })
}

exports.pendingTrading = function (req, res) {
    console.log(req.body);
    // var bulk = ConfirmTrade.collection.initializeOrderedBulkOp();
    // req.body.forEach(element => {
    //     var tradeData = new ConfirmTrade({
    //         userId: element.userId,
    //         userName: element.userName,
    //         symbol: element.symbol,
    //         price: element.currentPrice,
    //         type: element.type,
    //         status: 1,
    //         quantity: element.quantity
    //     }, { "strict": false });
    //     bulk.insert(tradeData);
    // });

    // ConfirmTrade.confirmTrad(bulk, (err, stock) => {
    //     if (err) {
            res.json({ success: false, msg: 'Failed to save trade' })
    //     } else {
    //         res.json({ success: true, msg: 'Saccessfully save trade' })
    //     }
    // })
}

exports.getPendingTrade = function (req, res) {
    PendingTrade.getTrade(req.body, (err, stock) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to save trade' })
        } else {
            res.json(stock);
        }
    })
}

exports.getPendingTradeById = function (req, res) {
    PendingTrade.getTradeById(req.user, (err, stock) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to save trade' })
        } else {
            res.json(stock);
        }
    })
}

exports.getConfirmTradeById = function (req, res) {
    ConfirmTrade.getTradeById(req.user, (err, stock) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to save trade' })
        } else {
            res.json(stock);
        }
    })
}

exports.updatetrade = function (req, res) {
    console.log(req.body);
    let dataArray = [];
    req.body.forEach(element => {
        var tradeData = new ConfirmTrade({
            "userId": req.body.userId,
            "userName": req.body.userName,
            "symbol": req.body.symbol,
            "price": req.body.price,
            "type": req.body.type,
            "status": req.body.status,
            "quantity": req.body.quantity
        }, { "strict": false });
        dataArray.push(tradeData);
    });
    console.log(dataArray);
    // res.json(dataArray);
    // ConfirmTrade.updateTrade(dataArray, (err, stock) => {
    //     if (err) {
    //         res.json({ success: false, msg: 'Failed to save stock data' })
    //     } else {
    //         res.json({ success: true, msg: 'Saccessfully save stock data' })
    //     }
    // })
}

// exports.updatetrade = function (req, res) {
//     console.log(req.body);
//     var bulk = PendingTrade.collection.initializeOrderedBulkOp();
//     req.body.forEach(element => {
//         var tradeData = new PendingTrade({
//             "symbol": element.symbol,
//             "price": element.price,
//         }, { "strict": false });
//         bulk.find({ "symbol": element.symbol, "price": element.price }).upsert().update({
//             $set: {
//                 "status": 1
//             }
//         });
//     });    
//     PendingTrade.updateTrade(bulk, (err, stock) => {
//         if (err) {
//             res.json({ success: false, msg: 'Failed to save stock data' })
//         } else {
//             res.json({ success: true, msg: 'Saccessfully save stock data' })
//         }
//     })
// }
