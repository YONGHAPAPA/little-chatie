const io = require('socket.io')();

io.on('connection', (socket) => {

  socket.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      socket.emit('timer', new Date());
    }, interval);
  });

  socket.on('chatMsg', function(msg){
    io.emit('chatMsg', msg);
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);