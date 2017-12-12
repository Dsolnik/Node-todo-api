"use strict";

// const MongoClient = require('mongodb').MongoClient;

const serverAddress = 'mongodb://localhost:27017/TodoApp';
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect(serverAddress, (err, db) => {

    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID("5a305886caf2c9e161d3c7dc")
    },{
        $set : {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    })

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5a3047b0b3fa757b2ac15aa6")
    },{
        $set: {
            name: 'Daniel S'
        },
        $inc: {
            age: 1
        }
    },{
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    // db.close();
});