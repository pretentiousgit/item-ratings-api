// ratingsTest.js 
// Tests rating returns
'use strict';

// Module dependencies ==========================
const should = require('chai').should,
    expect = require('chai').expect,
    request = require('supertest-as-promised'),
    mongoose = require('mongoose'),
    Rating = require('../server/models/rating'),
    app = require('../server.js'),
    api = request(app);

// =============================================================
// ROOT FUNCTIONS
// =============================================================

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

function itemGenerator(number) {
    const pad = '00000000';
    let arr = []
    for (let i = 0; i < number; i++) {
        let str = randomNumber(1, 99999999);
        arr.push((pad + str).slice(-pad.length));
    }
    return arr;
}

function userGenerator(number) {
    let arr = [];
    for (let i = 0; i < number; i++) {
        let u = Math.round(Math.random() * 1E20).toString();
        u = (u.length < 20) ? u + '1' : u;
        arr.push(u);
    }
    return arr;
}

function ratingGenerator(number) {
    let arr = [];
    while (arr.length < number) {
        const randomnumber = Math.floor(Math.random() * 5);
        let found = false;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == randomnumber) {
                found = true;
                break
            }
        }
        if (!found) {
            arr[arr.length] = randomnumber;
        }
    }

    return arr;
}


// =============================================================
// START TESTS
// =============================================================

before(function(done) {
    Rating.remove({}, (err, doc) => {
        done();
    });
});

describe("Good Rating Tests", function() {
    const items = itemGenerator(10),
        users = userGenerator(5),
        rating = ratingGenerator(5),
        item_id = items[0],
        user_id = users[0],
        agent = request.agent(app); // this is to check logins, not account creation.

    console.log('check generators', item_id, user_id, rating[0], rating[1]);

    // good condition tests ====

    // User functions
    describe('/user', function() {
        //GET /items
        it('tests the router connection', function(done) {
            api.get('/hello')
                .end((err, data) => {
                    expect(data.body.message).to.equal('hello world');
                    done();
                })
        })

        it('Set rating on a item for this user. user id, item id, rating (int: 0, 1, 2, 3, 4 or 5)', function(done) {
            const obj = {
                user: user_id,
                item: item_id,
                rating: rating[0]
            };

            api.put('/user/' + user_id + '/item/' + item_id)
                .send(obj)
                .end(function(err, data) {
                    expect(data.body).to.be.an('object');
                    expect(data.body.user).to.equal(obj.user);
                    expect(data.body.item).to.equal(obj.item);
                    expect(data.body.rating).to.equal(obj.rating);
                    done();
                });
        })

        it('Only accepts one rating per user', function(done) {
            const obj = {
                user: user_id,
                item: item_id,
                rating: rating[1]
            };
            api.put('/user/' + user_id + '/item/' + item_id)
                .send(obj)
                .end(function(err, data) {
                    expect(data.body).to.be.an('object');
                    expect(data.body.user).to.equal(obj.user);
                    expect(data.body.item).to.equal(obj.item);
                    expect(data.body.rating).to.equal(obj.rating);
                    done();
                });
        })

        it('Only accepts ratings between 0 and 5', function(done) {
            const obj = {
                user: user_id,
                item: item_id,
                rating: 6.91
            };

            api.put('/user/' + user_id + '/item/' + item_id)
                .send(obj)
                .end(function(err, data) {
                    expect(data.body).to.be.an('object');
                    expect(data.body.message).to.equal("Bad rating number");
                    done();
                });
        })

        it('Un-set rating on item for this user item id, user id', function(done) {
            api.del('/user/' + user_id + '/item/' + item_id)
                .send({
                    user: user_id,
                    item: item_id
                })
                .end(function(err, data) {
                    expect(data.body.message).to.equal('Rating deleted.');
                    done();
                });
        })

        it.skip('Should fail a noncompliant user token', function(done) {})
        it.skip('Should fail a noncompliant item token', function(done) {})
        it.skip('Should fail a noncompliant rating integer', function(done) {})
    });


    describe("/items", function() {
        before(function(done) {
            // todo Generate fifty rating objects
            let arr = []
            for (let i = 0; i < items.length; i++) {
                for (let j = 0; j < users.length; j++) {
                    arr.push({
                        user: users[j],
                        item: items[i],
                        rating: randomNumber(0, 5)
                    });
                }
            }

            Rating.create(arr, (err, docs) => {
                done();
            })
        })

        it('Get all items with ratings data', function(done) {
            api.get('/items/')
                .end(function(err, data) {
                    expect(data.body).to.be.an('array');
                    expect(data.body).to.have.length('50');
                    done();
                });
        })

        it('Get all ratings for a specific item id', function(done) {
            api.get('/items/' + item_id)
                .end(function(err, data) {
                    expect(data.body).to.be.an('array')
                    expect(data.body).to.have.length('5')
                    done();
                });
        })

        it.skip('Should not respond to any other request', function(done) {})
    });
});
