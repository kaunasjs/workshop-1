'use strict';

var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.use('/', express.static('public'));

http.listen(3000);

io.on('connection', function (socket) {
    console.log('user connected');

    socket.on('chat', function(data) {
        io.emit('chat', data);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});