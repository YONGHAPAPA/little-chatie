var redis = require('redis');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var client = redis.createClient();

var redisStore = new RedisStore({
    host:'redis://h:pd80519e6c08e9f2c2bae19a9054e984fa9e82364e683f4cdf656f71a95e3e44f@ec2-54-164-134-74.compute-1.amazonaws.com', 
    port: '23849', 
    client : client, 
    ttl : 3600
}); 


function getAllActiveSessions(){
    return new Promise((resolve, reject) => {
        redisStore.all(function(err, sessions){
            if(err) reject(err);
            else resolve(sessions);
        });
    });
}

module.exports = {redisStore, getAllActiveSessions};