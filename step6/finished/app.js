'use strict';

var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    port = 3000;

app.use('/', express.static('public'));
app.use('/bower_components',  express.static(__dirname + '../../../bower_components'));

http.listen(port);
console.log('Server is running on: http://localhost:' + port);

var users = {
        'global': {},
        'kaunasjs': {}
    },
    messages = {
        'global': [],
        'kaunasjs': []
    };

function saveMessage(message, room) {
    messages[room].push(message);
    if (messages.length > 21) messages.shift();
}

io.on('connection', function (socket) {
    console.log('user connected');

    socket.join('global', function() {
        var room = socket.rooms[1];
        socket.emit('update users', users[room]);
        socket.emit('update history', messages[room]);
    });

    socket.on('chat', function(data) {
        var room = socket.rooms[1];
        saveMessage(data, room);
        socket.broadcast.to(room).emit('chat', data);
    });

    socket.on('new user', function(data) {
        var room = socket.rooms[1];
        users[room][socket.id] = data;
        io.to(room).emit('update users', users[room]);
    });

    socket.on('change room', function(room) {
        var oldRoom = socket.rooms[1];
        if (oldRoom === room) return;

        socket.leave(oldRoom);

        users[room][socket.id] = users[oldRoom][socket.id];
        delete users[oldRoom][socket.id];

        socket.join(room);
        io.to(oldRoom).emit('update users', users[oldRoom]);
        io.to(room).emit('update users', users[room]);
        socket.emit('update history', messages[room]);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');

        var room = 'global';
        if (!users[room][socket.id]) {
            room = 'kaunasjs';
        }

        if (!users[room][socket.id]) {
            return;
        }

        delete users[room][socket.id];
        io.to(room).emit('update users', users[room]);
    });
});