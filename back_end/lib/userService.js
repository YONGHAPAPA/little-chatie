const DAO = require('./dao');
const Q = require('q');
const uri = "mongodb+srv://mongoman01:mongoman01@cluster0-jcbtw.mongodb.net/little_chatie?retryWrites=true&w=majority";
//var database = null;

class User {

    constructor(user){
        this.user = user;
    }

    getAllUsersInfo(dataBase){
        const deferred = Q.defer();
        var dbo = database.db("little_chatie");;
        var userCollection = dbo.collection('users').find();

        userCollection.each((err, documents) => {
            if(err){
                deferred.reject(new Error(JSON.stringify(err)));
            } else {
                return deferred.resolve(documents);
            }
        })

        return deferred.promise;
    }

    registerUser(){
        
    }
}

module.exports = User;