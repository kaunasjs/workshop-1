'use strict';

var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.use('/', express.static('public'));

http.listen(3000);

var users = {};

io.on('connection', function (socket) {
    console.log('user connected');
    
    socket.emit('update users', users);

    socket.on('chat', function(data) {
        socket.broadcast.emit('chat', data);
    });

    socket.on('new user', function(data) {
        users[socket.id] = data;
        io.emit('update users', users);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
        
        delete users[socket.id];
        io.emit('update users', users);
    });
});