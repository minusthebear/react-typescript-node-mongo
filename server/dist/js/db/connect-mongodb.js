"use strict";
const mongoose = require('mongoose');
const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/${process.env.MONGO_DB}`;
// let db = {};
const _ = require("lodash");
const { MongoError } = require("mongodb");
const chalk = require('chalk');
const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;
module.exports = (function connectDB() {
    // if (!_.isEmpty(db)) return db;
    console.log(url);
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) {
            process.exit(1);
            mongoose.connection.close();
        }
    });
    mongoose.connection.on('connected', function () {
        console.log(connected("Mongoose default connection is open to ", process.env.MONGO_URL));
    });
    mongoose.connection.on('error', function (err) {
        console.log(error("Mongoose default connection has occured " + err.toString() + " error"));
    });
    mongoose.connection.on('disconnected', function () {
        console.log(disconnected("Mongoose default connection is disconnected"));
    });
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0);
        });
    });
})();
