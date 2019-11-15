import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:8000');

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
    
    sendMessage(msg, cb){
        //console.log("sendMessage - api.js");

        console.log('socket id > ' + socket.id);
        socket.emit('chatMsg', msg);

        

        /*
        socket.on('chatMsg', function(msg){
            cb(msg);
        });
        */
    }

    connectChatRoom(cb){
        socket.on('chatMsg', function(msg){
            //console.log("connectChatRoom > socket id" + socket.id);
            cb(msg);
        })
    }
}




//export {subscribeToTimer, sendMessage};