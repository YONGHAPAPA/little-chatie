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
    
    sendMessage(msg, cb){
        socket.emit('chatMsg', msg);
    }

    connectChatRoom(cb){
        socket.on('chatMsg', function(receivedData){
            cb(receivedData);
        })
    }
}

//export {subscribeToTimer, sendMessage};