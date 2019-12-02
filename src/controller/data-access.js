//import { setupMaster } from 'cluster';

const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const Q = require('q');
var assert = require('assert');
const uri = "mongodb+srv://mongoman01:mongoman01@cluster0-jcbtw.mongodb.net/test";
//const uri = "mongodb://mongoman01:mongoman01@cluster0-jcbtw.mongodb.net/todo_db?retryWrites=true&w=majority";
const dbConnection = null;



export default class DataAccess{
    
    constructor(){}

    openDbConnection(){
        
        var MongoClient = require('mongodb').MongoClient;
        //var url = "mongodb+srv://mongoman01:mongoman01@cluster0-jcbtw.mongodb.net/test";
        var url = "mongodb://localhost:27017/little_chatie";
        var db;

        MongoClient.connect(url, function(err, database){
            if(err){
                console.log(err);
                return;
            } 

            db = database;
        })
       
    }
}
