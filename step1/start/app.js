'use strict';

var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    port = 3000;

app.use('/', express.static('public'));

http.listen(port);
console.log('Server is running on: http://localhost:' + port);

// Start here