//import { setupMaster } from 'cluster';

const MongoClient = require('mongodb').MongoClient;


const Q = require('q');
//import Q from 'q';

var assert = require('assert');
//import assert from 'assert';
//const uri = "mongodb+srv://mongoman01:mongoman01@cluster0-jcbtw.mongodb.net/little_chatie?retryWrites=true&w=majority";
const dbConnection = null;
const connection = null;




class Dao{

    /*
    test(uri){
        console.log(uri);
    }
    
    openDBConnect(uri){

        const deferred = Q.defer();

        var option = {
            useNewUrlParser : true,
        };

        if(this.dbConnection == null){
            console.log("connecting to database...");
            MongoClient.connect(uri, option, (err, db) => {
                assert.equal(null, err);
                this.dbConnection = db;

                if(err){
                    deferred.reject(new Error(JSON.stringify(err)));
                } else {
                    return deferred.resolve(this.dbConnection);
                }
            })
        }

        return deferred.promise;
    }
    */


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
