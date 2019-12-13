var express = require('express');
const session = require('express-session');
const {RedisStore} = require('./lib/redis');
var app = require('express')();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
var bodyParser = require('body-parser');
const Routes = express.Router();

var userRouter = require('./routes/users');

app.use(cors());
app.use(bodyParser.json());

const dbUri = "mongodb+srv://mongoman01:mongoman01@cluster0-jcbtw.mongodb.net/little_chatie?retryWrites=true&w=majority";
//const DBAccess = require('./lib/dao');
//var User = require('./lib/user');
//var dbo = null;
//var database = null;

app.use(session({
  secret: 'somesecret', 
  store: RedisStore, 
  saveUninitialized: false, 
  resave: false
}));

app.use('/user', userRouter);


//set new namespace (s)
const nsp = io.of("myNamespace");

nsp.on('connection', function(socket){
  socket.on('chatMsg', function(msg){
    nsp.emit('chatMsg', msg);
  })
})
//set new namespace (e)


const responseData = {
  room : '', 
  type : '',
  message : '',
  desc : ''
}

var roomNo = 1;
io.on('connection', (socket) => {

    //console.log("io connection...");
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

    socket.on('connect:room', function(req){

      console.log("connection room.");

      const room = req.room;
      socket.join(room);

      //console.log('connection');
      //da = new DAO();
      //dbo = da.openDBConnect();


      /*
      var promise = da.openDBConnect();
      promise.then(da.getUserInfo('zero@gmail.com', dbo).then((result) => {
        if(result){
          console.log("getUserInfo");
          console.log(result);
        }
      }));
      */

      /*
      da.getUserInfo('zero@gmail.com', dbo).then((result) => {
        if(result){
          console.log("getUserInfo");
          console.log(result);
        }
      });
      */

     //database 
     /*
     var dbo = new DBAccess();
     dbo.openDBConnect(dbUri).then((db) => {
       this.database = db;
       console.log(this.database);
     })
     */

     /*
     User = new User();
     User.getAllUsersInfo().then((result) => {
       if(result){
         console.log(result);
       }
     });
     */

      //io.in(room).emit('connect:room', {message:`You are in the ${room}`});
      socket.emit('connect:room', {type:'notice', message:`You are in the ${room}` })
    })

    socket.on('send:message', function(req){
      const room = req.room;
      const message = req.message;

      /*
      da.getUserInfo('zero@gmail.com', dbo).then((result) => {
        if(result){
          console.log("getUserInfo");
          console.log(result);
        }
      });
      */


      io.sockets.in(room).emit('send:message', {type:'chatmsg', message:message});
    })

    socket.on('disconnect', function(){
      let notiMsg = `client ${socket.id} is disconnected....`;
      //socket.broadcast.emit('chatMsg', notiMsg);
      socket.leave("room_" + roomNo);
      //console.log(notiMsg);
  })
});

const port = 8000;
//io.listen(port);
http.listen(port);

console.log('listening on port ', port);