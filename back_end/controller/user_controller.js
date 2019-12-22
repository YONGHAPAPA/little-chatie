const security = require('../lib/security');
const {getAllActiveSessions} = require('../lib/redis');
const Users = require('../lib/userService');
const DAO = require('../lib/dao');
const db_uri = "mongodb+srv://mongoman01:mongoman01@cluster0-jcbtw.mongodb.net/little_chatie?retryWrites=true&w=majority";
let db_conn = null;


exports.register = (req, res) => {

    //console.log('*** register ***')
    //console.log(req.session);

    

    const newUser = {
        name : '', 
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
        if(key === 'name'){
            newUser.name = value;
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

    console.log("*** login ***");

    const inputData = {
        name : '', 
        email : '', 
        password : ''
    }

    var rtnData = {
        result : '', 
        user : {}
    }

    var inputStr = JSON.stringify(req.body);
    JSON.parse(inputStr, (key, value) => {
        if(key === "name") inputData.name = value;
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

                console.log('*** compare password ***')
                security.comparePassword(inputData.password, user.password, (result) => {
                
                rtnData.result = result ? "F" : "F";
                rtnData.user = user;

                //create user session 
                console.log('*** create session ***');
                req.session.user = {name:user.name, email:user.email};
                req.session.userid = 1;
                console.log(req.session.user);
                console.log(req.session.userid);
                console.log(req.session);
                console.log(req.sessionID);
                req.session.save();

                console.log('*** return to login ***')
                res.send(rtnData);            
                conn.close();
                })
            } else {
                console.log("*** user not exists ***");
                rtnData.result = "F";
                res.send(rtnData);            
                conn.close();
            }
        });
    })
}


exports.checkSession = (req, res) => {

    console.log('*** current session ***')
    console.log(req.sessionID);
    console.log(req.session.userid);
    console.log(req.session);
    console.log(req.session.cookie.expires);

    /*
    const sessions = await getAllActiveSessions();

    console.log('*** get active sesson ***');
    let users = sessions.map(session => {
        return session.user;
    })

    console.log(users);
    */

    //res.session.users = users;
    //res.send(users)
    res.send('');
}


exports.logout = (req, res) => {

    console.log("*** destroy session ***")
    req.session.destroy();

    console.log("*** log out ***")
    console.log(req.sessionID);
    console.log(req.session.id);

    //req.session.destroy();
    //res.clearCookie('')
}
