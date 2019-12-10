const Users = require('../lib/userService');
const DAO = require('../lib/dao');
const db_uri = "mongodb+srv://mongoman01:mongoman01@cluster0-jcbtw.mongodb.net/little_chatie?retryWrites=true&w=majority";
let db_conn = null;


exports.register = function(req, res){

    const newUser = {
        username : '', 
        email : '', 
        password : '', 
        cre_dt : new Date(),
        upd_dt : new Date()
    }

    var rtnData = {
        result : ''
    }


    var inputStr = JSON.stringify(req.body);
    JSON.parse(inputStr, (key, value) => {
        if(key === 'username'){
            newUser.username = value;
        } 
        if(key === "email"){
            newUser.email = value;
        }
        if(key === "password"){
            newUser.password = value;
        }
    })

    const dao = new DAO();
    dao.openConnection(db_uri).then(conn => {
        this.db_connection = conn;
        let db = conn.db();

        db.collection('users').insertOne(newUser, function(err, result){
            if(err) throw err; 

            if(result.insertedCount > 0){
                rtnData.result = "OK"
            } else {
                rtnData.result = "ERROR";
            }

            connection.close();
            res.send(rtnData);
        })
    })
}

exports.login = function(req, res){
    const inputData = {
        username : '', 
        email : '', 
        password : ''
    }

    var rtnData = {
        result : '', 
        user : {}
    }

    var inputStr = JSON.stringify(req.body);
    JSON.parse(inputStr, (key, value) => {
        if(key === "username") inputData.username = value;
        if(key === "email") inputData.email = value;
        if(key === "password") inputData.password = value;
    })

    const dao = new DAO();
    dao.openConnection(db_uri).then(conn => {
        let db = conn.db();

        db.collection("users").findOne({
            $and:[
                {email:inputData.email}, 
                {password:inputData.password}
            ]
        }, (err, item) => {
            if(err) throw err;
            rtnData.result = (item._id !== "") ? "S" : "F"
            rtnData.user = item;
            res.send(rtnData);            
            conn.close();
        });
    })
}
