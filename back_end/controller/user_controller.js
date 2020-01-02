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

                    let session = req.session;
                    rtnData.result = result ? "S" : "F";
                    rtnData.user = user;

                    //create user session 
                    console.log('*** create session ***');
                    session.username = user.name;
                    session.usermail = user.email;
                    
                    console.log(session.username);
                    console.log(session.usermail);
                    console.log(session);
                    //console.log(sessionID);
                    //ession.save();

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

    let session = req.session;

    console.log('*** current session ***')
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


exports.foo = (req, res) => {
    console.log("receive foo....");

    //console.log("req data : " + req.body.name + " / " + req.body.email);
    console.log("session : " + req.session.name);
    if(req.session.name != undefined){
        req.session.name += "_";
    } else {
        req.session.name = req.body.name;
    }

    req.session.save(()=>{
        res.send({result:req.session.name});
    });
}

exports.bar = (req, res) => {
    console.log("receive bar....");
    console.log("session : " + req.session.name);

    //req.session.name = req.body.name;

    req.session.save(()=>{
        res.send({result:req.session.name});
    });

}
