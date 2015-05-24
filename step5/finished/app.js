'use strict';

var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    port = 3000;

app.use('/', express.static('public'));

http.listen(port);
console.log('Server is running on: http://localhost:' + port);

var users = {},
    messages = [];

function saveMessage(message) {
    messages.push(message);
    if (messages.length > 21) messages.shift();
}

io.on('connection', function (socket) {
    console.log('user connected');
    
    socket.emit('update users', users);
    socket.emit('update history', messages);

    socket.on('chat', function(data) {
        saveMessage(data);
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