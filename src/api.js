import openSocket from 'socket.io-client'
//const socket = openSocket('http://localhost:8000/myNamespace');
const socket = openSocket('http://localhost:8000/');
//const socket = openSocket();


export default class Api{
    constructor(){}

    subscribeToTimer(cb){
        socket.emit('subscribeToTimer', 1000);
        socket.on('timer', timestamp => cb(null, timestamp));
    }

    subscribeNotice(userNm, cb){
        socket.emit('subscribeNotice', userNm);
        socket.on('notice', notice => {
            cb(notice);
        })
    }
    
    sendMessage(req, cb){
        socket.emit('send:message', req);
    }

    connectChatRoom(req, cb){
        //console.log("connectChatRoom : " + req.room);
        socket.emit('connect:room', req);        
        socket.on('connect:room', function(res){
            cb(res);
        })

        socket.on('send:message', function(res){
            cb(res);
        })
    }
}

//export {subscribeToTimer, sendMessage};