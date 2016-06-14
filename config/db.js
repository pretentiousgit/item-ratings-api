// db.js
'use strict';

const mongoose = require('mongoose'),
    mongoUrl = require('../secrets.js').database_info,
    mongooseUri = require('mongodb-uri').formatMongoose(mongoUrl),
    options = {
        server: {
            socketOptions: {
                keepAlive: 1,
                connectTimeoutMS: 30000
            }
        },
        replset: {
            socketOptions: {
                keepAlive: 1,
                connectTimeoutMS: 30000
            }
        }
    };

mongoose.connect(mongoUrl, options);

let db = mongoose.connection;

console.log('opening db...');
db.on('error', function(err) {
    console.log("local error opening the db: " + err.message);
});
db.once('open', function callback() {
    // console.log(mongoUrl); // useful for checking where we're hooked to
    console.log('db open');
});

module.exports = {
    db: db
};
