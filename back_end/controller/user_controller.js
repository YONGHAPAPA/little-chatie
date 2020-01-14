const security = require('../lib/security');
const {getAllActiveSessions} = require('../lib/redis');
const Users = require('../lib/userService');
const DAO = require('../lib/dao');
//const db_uri = "mongodb+srv://mongoman01:mongoman01@cluster0-jcbtw.mongodb.net/little_chatie?retryWrites=true&w=majority";
//const db_uri = process.env.DB_URL;

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
    const inputData = {
        name : '', 
        email : '', 
        password : ''
    }

    var rtnData = {
        result : '', 
        user : {}
    }
    
    console.log(process.env.SUCCESS_FLG);

    var inputStr = JSON.stringify(req.body);
    JSON.parse(inputStr, (key, value) => {
        if(key === "name") inputData.name = value;
        if(key === "email") inputData.email = value;
        if(key === "password") inputData.password = value;
    })

    const dao = new DAO();
    dao.openConnection(process.env.DB_URL).then(conn => {
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

                    let session = req.session;
                    rtnData.result = result ? process.env.SUCCESS_FLAG : process.env.FAIL_FLAG;
                    rtnData.user = user;

                    //create user session 
                    console.log('*** create session ***');
                    session.username = user.name;
                    session.usermail = user.email;
                    
                    console.log(session.username);
                    console.log(session.usermail);
                    console.log(session);
                    //console.log(sessionID);
                    session.save();

                    console.log('*** return to login ***')
                    res.send(rtnData);            
                    conn.close();
                })
            } else {
                console.log("*** user not exists ***");
                rtnData.result = process.env.Fail_FLAG;
                res.send(rtnData);            
                conn.close();
            }
        });
    })
}


exports.checkSession = (req, res) => {

    console.log('*** check session ***');

    let session = req.session;
    console.log(session);

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
    res.send('Check Current Session..');
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

