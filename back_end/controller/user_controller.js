//const mongoClient = require('mongodb');
const Users = require('../lib/user');

exports.register = function(req, res){

    console.log("user_controller register...");

    console.log("regist users....");
    //res.send("OK");
    var data = {result:'OK'}
    res.send(data);

    
}
