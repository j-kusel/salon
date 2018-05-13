var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DraftSchema = new Schema({
    TOKEN: String,
    AUTHOR: String,
    TITLE: String,
    BODY: String
}, {
    autoIndex: false
});

mongoose.model('Draft', DraftSchema)
    .on('index', (err) => {
        console.log('indexing error: ' + err);
    });
