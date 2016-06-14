// server.js
// what we call to turn the app on.
'use strict';

// modules ==========================================================
const express = require('express'),
    app = express(),
    http = require('http'),
    path = require('path'),
    _ = require('lodash'),
    server = http.createServer(app),
    mongoose = require('mongoose'),

    // EXPRESS MODULES ==================================================
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),

    // SESSION STORAGE ==================================================
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    sessionStore = new MongoStore({
        mongooseConnection: mongoose.connection
    }),
    // PROCESS PORTS =====================================================
    port = Number(process.env.PORT || 8081),

    // Database summoning ===============================================
    database = require('./config/db'),
    db = database.db,
    router = require('./server/routes/router');

// Detailed logging ================
// app.use(morgan('combined'));

// GLOBAL VARIABLES =================================================
app.locals = (!!process.env.APP_SECRET_KEY) ? {
        cookie_name: 'connect.sid',
        secret: process.env.APP_SECRET_KEY
    } :
    _.merge(app.locals, require(path.join(__dirname, 'secrets')));


// CONFIGURATION ====================================================
global.rootRequire = (name) => require(__dirname + '/' + name);

// express 4.0 basic configuration ==================================
app.use(cookieParser());
app.use(express.static(__dirname + '/dist'));
app.use(bodyParser());

// session start ====================================================
app.use(session({
    secret: process.env.APP_SECRET_KEY || app.locals.secret,
    cookie: {
        path: '/',
        expires: false, // Alive Until Browser Exits
        // secure: true, // TODO: implement https
        httpOnly: true
    },
    store: sessionStore,
    saveUninitialized: true, // (default: true)
    resave: true // (default: true)
}));

// server /api/ routes -> replies to /etc requests ==================
app.use('/', router);

// DEFAULT ROUTE ====================================================
app.use('*', function(req, res) {
    res.status(404) // HTTP status 404: NotFound
        .send('404 - Route not found');
});

// Turn it on
server.listen(port, function() {
    console.log('listening on', port);
});

// EXPOSE APP AS OBJECT =============================================
exports = module.exports = app;
