$(document).ready(function(){
    var socket = io('http://localhost:3000');
    

    // showing the username
    var username = (document.cookie.replace('username=', ''));
    
    
    
    $('h1 span').text(username);
    
    function sendMsg(e){
        e.preventDefault();
        var text = $('#message').val();
        socket.emit('send message', {
            msg: text,
            user: username
        });
    }
    

    $('#sendBtn').on('click', function(e){
        sendMsg(e);
    });

    $('#message').on('keypress', function (e) {
        if (e.which === 13) {
            sendMsg(e);
        }
        
        // e.preventDefault();
        socket.emit('typing',{msg: username +' is typing...',user:username});
    });

    // listen for event in front end
    socket.on('send message',function(data){
        // console.log(data);
        
        
        if (username === data.user) {
            $('#mylist ').append('<li class="list-group-item list-group-item-primary text-left "><strong>' + data.user + ':</strong><span >' + data.msg.substr(0, 70) + ' </span ></li>');
        }else{
            $('#mylist ').append('<li class="list-group-item list-group-item-info text-right"><strong>' + data.user + ':</strong><span >' + data.msg.substr(0, 70) + '</span ></li>');

        }
        
        $('#message').val('');
        $('#feedback').text('');
    });

    socket.on('typing', function(data){
        if (username !== data.user) {
            $('#feedback').text(data.msg);
        }
    });
});