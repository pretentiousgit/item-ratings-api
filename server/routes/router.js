// routes.js
// main file for API routes
'use strict';

const express = require('express'),
    router = express.Router(),
    Rating = require('../models/rating'),
    rate = (data, rating, res) => {
        if ([0, 1, 2, 3, 4, 5].indexOf(rating) !== -1) {
            data.rating = rating;
            data.save((err, saved) => {
                (err) ? console.error(String(err)):
                    res.json(saved);
            })
        } else {
            res.json({ message: 'Bad rating number' })
        }
    },
    newRating = (req, res) => {
        let rating = new Rating({
            user: req.params.user_id,
            rating: req.body.rating,
            item: req.params.item_id
        })

        rating.save((err, saved) => {
            (err) ? console.error(String(err)):
                res.json(saved);

        })
    };

router.get('/hello', (req, res) => {
    res.json({ message: 'hello world' });
})

// this is nested and more complex.
router.put('/user/:user_id/item/:item_id', (req, res) => {
    // One rating per user, if they post again it updates
    Rating.findOne({
        user: req.params.user_id,
        item: req.params.item_id
    }, (err, data) => {
        (!!data) ? rate(data, req.body.rating, res): newRating(req, res);
    })
})

router.delete('/user/:user_id/item/:item_id', (req, res) => {
    // delete a single item rating by user and id
    Rating.findOneAndRemove({
            user: req.params.user_id,
            item: req.params.item_id
        },
        (err, data) => {
            res.json({ message: 'Rating deleted.' });
        })
})

router.get('/items', (req, res) => {
    Rating.find({}, (err, data) => {
        (err) ? console.log(err):
            res.send(data);
    })
})

router.get('/items/:item_id', (req, res) => {
    Rating.find({ item: req.params.item_id }, (err, data) => {
        (err) ? console.log(err):
            res.send(data);
    })
})

module.exports = router;
