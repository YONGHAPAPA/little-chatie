//import { setupMaster } from 'cluster';
const MongoClient = require('mongodb').MongoClient;
const Q = require('q');
//import Q from 'q';

var assert = require('assert');
const dbConnection = null;
const connection = null;

class Dao{

    openConnection(uri){
        const deferred = Q.defer();

        var option = {
            useNewUrlParser : true,
        }

        if(this.connection == null){
            MongoClient.connect(uri, option, (err, db) => {
                if(err) {
                    console.log(err);
                    deferred.reject(new Error(JSON.stringify(err)));
                } else {
                    this.connetion = db;
                    return deferred.resolve(db);
                }
            })
        } else {
            return deferred.resolve(db);
        }

        return deferred.promise;

    }

    closeDBConnect(){
        if(this.dbConnection){
            this.dbConnection.close();
            this.dbConnection = null;
        }
    }
}

module.exports = Dao;
