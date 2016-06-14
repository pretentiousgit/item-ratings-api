// rating model for Mongo
// the main unit of interaction in this DB
'use strict';

const mongoose = require('mongoose'),
    validator = require('mongoose-validator'),
    Schema = mongoose.Schema,
    connect = require('../../config/db'),
    db = connect.db,
    now = new Date(),
    Rating = new Schema({
        created: Date,
        item: {
            type: String,
            trim: true,
            maxlength: 10
        },
        user: {
            type: String,
            trim: true,
            minlength: 20,
            maxlength: 64
        },
        rating: {
            type: Number,
            trim: true,
            enum: [0, 1, 2, 3, 4, 5]
        }
    });

Rating.pre('save', (next) => {
    this.created = (!!this.created) ?
        this.created :
        now;
    next();
});

module.exports = db.model('Rating', Rating);
