"use strict";

// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const serverAddress = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(serverAddress, (err, db) => {

    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert Todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 4));

    // });

    // Insert new doc into the Users (name, age, location)

    // db.collection('Users').insertOne({
    //     name: 'Daniel S',
    //     age: 25,
    //     location: '5 Atwood Rd, Plainview NY, 11803'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log("Unable to insert User");
    //     }
    //     console.log(result.ops[0]._id);
    // });

    db.close();
});