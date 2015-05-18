'use strict';

var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.use('/', express.static('public'));

http.listen(3000);

// Start here