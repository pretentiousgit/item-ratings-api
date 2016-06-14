// addAndPullFromArray.js
// takes an array of things to add
// and an array of things to remove
// from a final array value
'use strict';

module.exports = function(main, add, remove) {
    // Module requirements ==========================
    var Promise = require('bluebird');

    var addThings = function(a) {
        Promise.map(a, function(n) {
            if (main.indexOf(n) === -1) {
                main.push(n);
                return main;
            } else {
                return main;
            }
        });
    }

    var removeThings = function(r) {
        Promise.map(r, function(n) {
            if (main.indexOf(n) !== -1) {
                main.splice(main.indexOf(n), 1);
                return main;
            } else {
                return main;
            }
        });
    }

    return Promise.all([addThings(add), removeThings(remove)])
};
