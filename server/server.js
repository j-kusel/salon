const express = require('express');
var socket = require('socket.io');
var socketioJwt = require('socketio-jwt');
var jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secret = 'hunkydory';
const uuid = require('uuid/v4');
const config = require('./config/config');

var mongoose = require('mongoose');
const configMongoose = require('./config/mongoose');


var $db = configMongoose();

var app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

$db
    .then(() => {
        var Draft = mongoose.model('Draft');
        return Draft.find({});
    })
    .then((drafts) => {
        drafts.forEach((draft, index) => {
            console.log(draft.TOKEN);
            app.get('/' + draft.TOKEN, (req, res) => {
                var profile = {
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'qwerty@nomics.biz',
                    text_index: index,
                    id: uuid()
                }

                var token = jwt.sign(profile, 'hunkydory');

                res.json({token: token, editor: profile.text_index});
            });
        });
    })
    .then(() => {
        app.get('/test', (req, res) => {
            res.json({test: 'YAY'});
        });

        var server = app.listen(8500, () => console.log('server running on port 8500'));
        var io = socket(server);
        io.set('origins', '*:*');

        io.set('authorization', socketioJwt.authorize({
            secret: 'hunkydory',
            handshake: true
        }));

        io.sockets
            .on('connection', (socket) => {
                console.log(socket.handshake, 'connected');
            });
    });





