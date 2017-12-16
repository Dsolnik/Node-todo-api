const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneID = new ObjectID(); 
const userTwoID = new ObjectID(); 
const users = [{
    _id: userOneID,
    email: 'dan@example.com',
    password: 'user1pass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({
            _id: userOneID.toHexString(), 
            access: 'auth'
        },process.env.JWT_SECRET).toString()
    }]
},
{
    _id: userTwoID,
    email: 'jen@example.com',
    password: 'user2pass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({
            _id: userTwoID.toHexString(), 
            access: 'auth'
        },process.env.JWT_SECRET).toString()
    }]
}];

const todos = [{
    _id: new ObjectID(),
    text: 'first test todo',
    _creator: userOneID
}, {
    _id: new ObjectID(),
    text: 'second test todo',
    completedAt: 333,
    completed: true,
    _creator: userTwoID
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var user1 = new User(users[0]).save();
        var user2 = new User(users[1]).save();
        return Promise.all([user1, user2]);
    }).then(() => done()).catch((e) => console.log(e));
};

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
};