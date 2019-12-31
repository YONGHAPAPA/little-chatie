var express = require('express');
const session = require('express-session');
var path = require('path');
const {redisStore} = require('./lib/redis');
var app = require('express')();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
var bodyParser = require('body-parser');
const Routes = express.Router();
var userRouter = require('./routes/users');
var parseurl = require('parseurl');


app.all('/*', function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
})


//app.set('trust proxy', 1);
app.use(cors({
  credentials:true,
}));
app.use(bodyParser.json());

app.use(session({
  secret: 'secret cat', 
  //store: redisStore, 
  saveUninitialized: false, 
  resave: false, 
  //proxy: undefined,
  //secure:true,
  /*
  cookie : {
    secure: true,
    maxAge : 1000 * 60 * 60, 
  }, 
  */
  //rolling: true,
  //unset: 'keep'
}));

app.use(function(req, res, next){
  if(!req.session.views){
    console.log("init session....");
    req.session.views = {};
  }

  var pathname = parseurl(req).pathname;
  req.session.views[pathname] = (req.session.views[pathname]||0) + 1;
  next();
})

app.get('/foo', function(req, res, next){
  console.log('you viewed foo page ' + req.session.views['/foo'] + ' times');
})

app.get('/bar', function(req,res,next){
  console.log('you viewed bar page ' + req.session.views['/bar'] + ' times');
})

app.use('/user', userRouter);






const dbUri = "mongodb+srv://mongoman01:mongoman01@cluster0-jcbtw.mongodb.net/little_chatie?retryWrites=true&w=majority";
//const DBAccess = require('./lib/dao');
//var User = require('./lib/user');
//var dbo = null;
//var database = null;

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(express.static(path.join(__dirname, 'public')))


//userRouter(app);


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

//module.exports = app;

const port = 8000;
//io.listen(port);
http.listen(port);
console.log('listening on port ', port);