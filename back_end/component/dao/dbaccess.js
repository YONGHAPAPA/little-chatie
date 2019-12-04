//import { setupMaster } from 'cluster';

const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const Q = require('q');
var assert = require('assert');
const uri = "mongodb+srv://mongoman01:mongoman01@cluster0-jcbtw.mongodb.net/little_chatie?retryWrites=true&w=majority";
const dbConnection = null;



class DBAccess{
    
    openDBConnect(uri){

        const deferred = Q.defer();

        var option = {
            useNewUrlParser : true,
        };

        if(this.dbConnection == null){
            console.log("connecting to database...");
            MongoClient.connect(uri, option, (err, db) => {
                assert.equal(null, err);

                /*
                if(err){
                    console.log(err);
                } else {
                    this.dbConnection = db;
                    console.log("connected successfully to database");
                }
                */

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

    closeDBConnect(){
        if(this.dbConnection){
            this.dbConnection.close();
            this.dbConnection = null;
        }
    }
}

module.exports = DBAccess;
