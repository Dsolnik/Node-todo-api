const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5a30c4cb38a0032d5ea9a49e';
var id2 = '5a30afd5f69089972d84c458';
// var id2 = 'ffffffffffffffff';

if (!ObjectID.isValid(id)) {
    console.log('id not valid');
}

User.findById(id2).then((todo) => {
    if (!todo) {
        return console.log('unable to find user');
    }
    console.log('Todo by Id2', JSON.stringify(todo, undefined, 4));
}).catch((e) => console.log(e));

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log("Id not found");
    }
    console.log('Todo by ID', todo);
}).catch((e) => console.log(e));

Todo.findB