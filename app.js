var express = require('express');
var backendSocket = require('socket.io');
var app = express();

app.use('/assets',express.static(__dirname+'/assets'));



app.use('/',function(req, res){
    if (req.get('Cookie')) {
        
        var username = req.get('Cookie').replace('username=','');
    }
    console.log(username);
    
    if (req.url === '/' || req.url === '/home' ) {
        if (username !== undefined) {
            res.sendFile(__dirname+'/index.html');
            
        }
        else {
            res.sendFile(__dirname + '/login.html');
        }
    }
    
});



var server = app.listen(3000,'localhost',function(){
    console.log('server is runing at localhost:3000');
    
});


// socket setup
var io = backendSocket(server);

io.on('connection',function(backendSocket){
    console.log('connection is made');
    
    backendSocket.on('disconnect',function(){
        console.log('user disconnected');
        
    });

    // listening to text message
    backendSocket.on('send message',function(data){
        io.sockets.emit('send message', data);
        // console.log(data);
    });

    backendSocket.on('typing',function(data){
        io.sockets.emit('typing', data);
    });
});