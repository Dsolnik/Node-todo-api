const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'first test todo'
}, {
    _id: new ObjectID(),
    text: 'second test todo',
    completed: true,
    completedAt: 333
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err) => done(err));

            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((err) => done(err));
            });
    });

});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2)
            }).end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            }).end(done);
    });

    it('should return 404 if todo not found', (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non object IDs', (done) => {
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
   it('should remove a todo', (done) => {
       var hexID = todos[1]._id.toHexString();

       request(app)
        .delete(`/todos/${hexID}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(hexID);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.findById(hexID).then((todo) => {
                expect(todo).toNotExist();
                done();
            }).catch((e) => done(e));
        });
   });

   it('should return 404 if todo not found', (done) => {
       var id = new ObjectID();
       request(app)
        .delete(`/todos/${id}`)
        .expect(404)
        .end(done);
   });

   it('should return 404 if ObjectId is invalid', (done) =>{
       request(app)
        .delete('/todos/123')
        .expect(404)
        .end(done);
   });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        var id = todos[0]._id.toHexString();
        var text = 'cool';
        var completed = true;
        request(app)
          .patch(`/todos/${id}`)
          .send({text, completed})
          .expect(200)
          .expect((res) => {
              expect(res.body.todo.completed).toBe(true);
              expect(res.body.todo.completedAt).toExist().toBeA('number');
              expect(res.body.todo.text).toBe(text);
          }).end((err, res) => {
            if (err) return done(err);

            Todo.findById(id).then((todo) => {
                expect(todo.completedAt).toExist().toBeA('number');
                expect(todo.completed).toBe(true);
                expect(todo.text).toBe(text);
                done();
            }).catch((e) => done(e));
          });
    });

    it('should clear completedAt when todo is not completed', (done) => {
        var id = todos[1]._id.toHexString();
        var completed = false;
        request(app)
          .patch(`/todos/${id}`)
          .send({completed})
          .expect(200)
          .expect((res) => {
              expect(res.body.todo.completed).toBe(false);
              expect(res.body.todo.completedAt).toNotExist();
          }).end((err, res) => {
              if (err) return done(err);

              Todo.findById(id).then((todo) => {
                    expect(todo.completedAt).toNotExist();
                    expect(todo.completed).toBe(false);
                    done();
                }).catch((e) => done(e));

          })
    });
})