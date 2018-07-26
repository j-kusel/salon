var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const configMongoose = require('./config/mongoose');
const axios = require('axios');

var $db = configMongoose();

$db
    .then(() => {
        var Draft = mongoose.model('Draft');
        return Draft.find();
    })
    .then((drafts) => {
        drafts.forEach((draft, index) => {
            console.log(draft);
            axios.post('http://localhost:8500/posts/', {
                title: draft.TITLE,
                author: 0,
                body: draft.BODY
            });
        });
    });
