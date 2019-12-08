//import MongoClient from 'mongodb';
const MongoClient = require('mongodb').MongoClient;
//import Q from 'q';

var connection;
var uri;

export default class DBH {

    openConnection = (uri) => {
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
                    return deferred.resolve(this.connection);
                }
            })
        } else {
            return deferred.resolve(this.connection);
        }

        return deferred.promise;

    }

    closeConnection = () => {
        if(this.connection){
            this.connection.close();
            this.connection = null;
        }
    }
}

