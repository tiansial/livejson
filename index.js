var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var jf = require('jsonfile'); 
var fs = require('fs'); 

app.get('/', function(req, res) {
res.sendFile(__dirname + '/index.html');
});



io.sockets.on('connection', function(socket) {
fs.watch("robot.json", function(event, fileName) { 

    jf.readFile('robot.json', function(err, data) { 
        var data = data; 
        console.log('sent') 
        socket.volatile.emit('notification', data);
    });

});

});

http.listen(3000, function() {
console.log('listening on *:3000');
});