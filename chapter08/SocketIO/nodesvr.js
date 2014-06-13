var app = require('express')()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server);

server.listen(8080);
console.log('Server started, port 8080');

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.get('/app.js', function (req, res) {
    res.sendfile(__dirname + '/app.js');
});

io.sockets.on('connection', function (socket) {
    socket.emit('new:msg', 'Welcome to AnonBoard');

    socket.on('broadcast:msg', function (data) {
        // 将新消息通知所有客户端（除发送消息用户本身）
        socket.broadcast.emit('new:msg', data.message);
    });
});
