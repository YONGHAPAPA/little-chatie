const security = require('../lib/security');
const {getAllActiveSessions} = require('../lib/redis');
const Users = require('../lib/userService');
const DAO = require('../lib/dao');
const common = require('../biz/common');
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
    const userinfo = {
        name : '', 
        email : '', 
        password : '',
        isLogin : false
    }

    var rtnData = {
        result : '', 
        user : {}
    }
    
    var inputStr = JSON.stringify(req.body);
    JSON.parse(inputStr, (key, value) => {
        if(key === "name") userinfo.name = value;
        if(key === "email") userinfo.email = value;
        if(key === "password") userinfo.password = value;
    })

    common.authenticateUser(userinfo, (result)=> {
        
        console.log("next..");
        console.log(result.userinfo);
        console.log(result.isLogin)
        console.log(result.remark);
    });
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

