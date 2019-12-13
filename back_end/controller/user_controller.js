const security = require('../lib/security');
const Users = require('../lib/userService');
const DAO = require('../lib/dao');
const db_uri = "mongodb+srv://mongoman01:mongoman01@cluster0-jcbtw.mongodb.net/little_chatie?retryWrites=true&w=majority";
let db_conn = null;


exports.register = (req, res) => {

    const newUser = {
        username : '', 
        email : '', 
        password : '', 
        cre_dt : new Date(),
        upd_dt : new Date()
    }

    var rtnData = {
        result : '', 
        user : {}
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
            //newUser.password = security.encryptPassword(value, 10);
        }
    })

    
    security.encryptPassword(newUser.password, 10, (hash) => {
        newUser.password = hash;

        const dao = new DAO();
        dao.openConnection(db_uri).then(conn => {
            this.db_connection = conn;
            let db = conn.db();

            db.collection('users').insertOne(newUser, function(err, result){
                if(err) throw err; 

                if(result.insertedCount > 0){
                    rtnData.result = "S"
                } else {
                    rtnData.result = "F";
                }

                conn.close();
                res.send(rtnData);
            })
        })
    });
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
                //{password:inputData.password}
            ]
        }, (err, user) => {
            if(err) throw err;
            
            if(user){
                console.log(user.password)
                security.comparePassword(inputData.password, user.password, (result) => {
                console.log("comparePassword....");
                rtnData.result = result ? "S" : "F";
                rtnData.user = user;
               
                res.send(rtnData);            
                conn.close();

                })
            } else {
                console.log("no user...")
                rtnData.result = "F";

                res.send(rtnData);            
                conn.close();
            }
        });
    })
}
