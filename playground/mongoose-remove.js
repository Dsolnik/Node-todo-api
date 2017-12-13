const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({})
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove({})
// Todo.findByIdAndRemove

Todo.findByIdAndRemove('5a318afe3fd6b3c85f5603f6').then((todo) => {
    console.log(todo);
});

