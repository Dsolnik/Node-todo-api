"use strict";

// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const serverAddress = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(serverAddress, (err, db) => {

    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').deleteMany({name: 'Daniel S'}).then((result) => {
        console.log(result);
    });

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID("5a304981bd86c07ccde2bba6")
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 4));
    });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });
    db.close();
});