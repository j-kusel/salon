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
            axios.post('http://localhost:8500/api/posts/', {
                title: draft.TITLE,
                author: 1,
                body: draft.BODY
            })
            .then(res => console.log(res));
        });
    })
    .catch(err => console.log(err));
