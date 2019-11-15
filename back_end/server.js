var app = require('express')();
var http = require('http').Server(app);
const io = require('socket.io')(http);

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


    //socket.emit('chatMsg', 'hi everyone.');

    /*
    socket.on('chatMsg', function(msg){
      io.emit('chatMsg', msg);
      //socket.broadcast.emit(msg);
    });
    */

    socket.emit('chatMsg', 'hi welcome.');
    socket.broadcast.emit('chatMsg',{description:'client disconnect!!!!!!!!!!'});
    socket.on('disconnect', function(){
      //io.socket.emit('chatMsg', {description: 'clients disconnected'})
    console.log('disconnected....');
  })

});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);