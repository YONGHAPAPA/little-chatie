const Users = require('../lib/userService');
const DAO = require('../lib/dao');
const db_uri = "mongodb+srv://mongoman01:mongoman01@cluster0-jcbtw.mongodb.net/little_chatie?retryWrites=true&w=majority";
let db_connection = null;


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
    dao.openConnection(db_uri).then(connection => {
        this.db_connection = connection;
        let database = connection.db();

        database.collection('org_user').insertOne(newUser, function(err, result){
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
