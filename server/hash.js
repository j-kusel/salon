var mongoose = require('mongoose');
const configMongoose = require('./config/mongoose');
const crypto = require('crypto');
const uuid = require('uuid/v4');

var seeds = Array(10).fill(0).map(() => uuid());
var hashes = seeds.map((seed) => crypto.createHmac('sha256', seed).digest('hex'));
console.log(hashes);

var $db = configMongoose();


$db
    .then(() => {
        hashes.forEach((hash) => {
            var Draft = mongoose.model('Draft');
            var newDraft = Draft({
                TOKEN: hash,
                AUTHOR: 'jon dough',
                TITLE: 'spicy take',
                BODY: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            });
            newDraft.save();
        });
    });
