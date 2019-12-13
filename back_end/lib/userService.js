const DAO = require('./dao');
const Q = require('q');
const uri = "mongodb+srv://mongoman01:mongoman01@cluster0-jcbtw.mongodb.net/little_chatie?retryWrites=true&w=majority";
//var database = null;

class User {

    constructor(user){
        this.user = user;
    }

    
    encryptPassword(password){

    }
   
}

module.exports = User;