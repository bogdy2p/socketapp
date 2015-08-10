var express = require('express'),
        app = express(),
        server = require('http').createServer(app),
        io = require('socket.io').listen(server);

//server.listen(3000);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
//    res.sendFile(__dirname + '/chat.js');
});

app.get('/chat.js', function (req, res) {
    res.sendFile(__dirname + '/chat.js');
});

io.on('connection', function (socket) {
//    console.log('a user connected');
    socket.broadcast.emit('Hello');


    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('chat message', function (msg) {
        console.log(socket.handshake.headers.cookie);
        io.emit('chat message', msg);
    });

});

server.listen(3000, function () {
    console.log("Server started. Listening on port 3000");
});

