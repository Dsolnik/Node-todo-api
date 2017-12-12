"use strict";

// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const serverAddress = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(serverAddress, (err, db) => {

    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5a3050d8caf2c9e161d3c6d4')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 4));
    // }, (err) => {
    //     cosole.log('Unable to Fetch Todos', err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     cosole.log('Unable to Fetch Todos', err);
    // });

    db.collection('Users').find({name: 'Daniel S'}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 4));
    }, (err) => {
        console.log('Unable to fetch users', err);
    })


    db.close();
});