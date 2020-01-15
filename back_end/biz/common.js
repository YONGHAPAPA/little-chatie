const Dao = require('../lib/dao');
const security = require('../lib/security');
const PROP_URL = require('../../src/properties/url');
const PROP_BASE = require('../../src/properties/base');

function authenticateUser(userinfo, next){

    /*
    let rtnVal = {
        loginUser,
        message
    };
    */

    let authenticatedUser = {
        userinfo : Object, 
        isLogin : false,
        remark : '',
    }


    console.log("========authenticateUser==========");
    console.log(userinfo.name);
    console.log(userinfo.email);
    console.log(userinfo.password);
    

    const dao = new Dao();
    dao.openConnection(PROP_URL.MG_DB).then(conn => {
        let db = conn.db();

        db.collection("users").findOne({
            $and:[
                {email:userinfo.email}, 
                //{password:inputData.password}
            ]
        }, (err, user) => {
            if(err) throw err;
            
            if(user){
                console.log("user exists.");
                console.log('*** compare password ***');
                security.comparePassword(userinfo.password, user.password, (result) => {

                    console.log("comparePassword result : " + result);

                    //let session = req.session;
                    //let result = result ? PROP_BASE.SUCCESS_FLAG : PROP_BASE.FAIL_FLAG;

                    //create user session 
                    //console.log('*** create session ***');
                    //session.username = user.name;
                    //session.usermail = user.email;
                    
                    //console.log(session.username);
                    //console.log(session.usermail);
                    //console.log(session);
                    //console.log(sessionID);
                    //session.save();

                    //console.log('*** return to login ***')
                    //res.send(rtnData);            
                    //rtnVal.loginUser = user;
                    //rtnVal.message = "";


                    authenticatedUser.userinfo = user;

                    if(result){
                        authenticatedUser.isLogin = true;
                        authenticatedUser.remark = 'beutiful user~^^'
                    } else {
                        authenticatedUser.isLogin = false;
                        authenticatedUser.remark = 'exists user info but not matched pwd...^^;'
                    }

                    conn.close();
                    next(authenticatedUser);
                })
            } else {
                console.log("*** user not exists ***");
                conn.close();
                authenticatedUser.isLogin = false;
                authenticatedUser.remark = "the user is not exists.";
                next(authenticatedUser);
            }
        });
    })
}



module.exports = {authenticateUser};