var mongoose = require('mongoose');
const config = require('./config');

mongoose.Promise = require('bluebird');

module.exports = function() {
    const db = mongoose.connect(config.db);
    require('../app/models/models.server.draft.js');
    return db;
}
