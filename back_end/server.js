var app = require('express')();
var http = require('http').Server(app);
const io = require('socket.io')(http);


//set new namespace (s)
const nsp = io.of("myNamespace");

nsp.on('connection', function(socket){
  socket.on('chatMsg', function(msg){
    nsp.emit('chatMsg', msg);
  })
})
//set new namespace (e)



var roomNo = 1;
io.on('connection', (socket) => {

    /*
    socket.on('subscribeToTimer', (interval) => {
      console.log('client is subscribing to timer with interval ', interval);
      setInterval(() => {
        io.emit('timer', new Date());
      }, interval);
    });

    //subscribeNotice
    socket.on('subscribeNotice', (userName) => {
      let welcomeNotice = `Hi ${userName} Have a nice day~.`    
      io.emit('notice', welcomeNotice);
    })
    */
    
    //socket.emit('chatMsg', 'Hi Welcome.  Little-Chat Room.');
    if(io.nsps['/'].adapter.rooms["room_" + roomNo] && io.nsps['/'].adapter.rooms["room_" + roomNo].length > 1) roomNo++;

    console.log("room No. : " + roomNo);
    socket.join("room_" + roomNo);
    //io.sockets.in("room_" + roomNo).emit('chatMsg', "You are in room no : " + roomNo);
    io.in("room_" + roomNo).emit('chatMsg', "you are in room no : " + roomNo);
    
    
    socket.on('chatMsg', function(msg){
      io.sockets.emit('chatMsg', msg); // send event to all the clients.
      socket.broadcast.emit('chatMsg', msg); // send event to all the clients except the client that caused it.
      
      //io.in("room_" + roomNo).emit('chatMsg', msg);
    });
   
    socket.on('disconnect', function(){
      let notiMsg = `client ${socket.id} is disconnected....`;
      //socket.broadcast.emit('chatMsg', notiMsg);
      socket.leave("room_" + roomNo);
      console.log(notiMsg);
  })
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);