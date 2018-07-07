const expect = require('expect');
const request = require('supertest');

// let {app} = require('./../server');
let express = require('express');
let app =  express();
let {Todo} = require('./../models/Todo');

// beforeEach((done) => {
//   Todo.remove({}).then(() => done());
// });

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    let text = 'test new text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done();
        }

        Todo.find({}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        })
      });
  });
  it('should not create a todo with invalid body parameters', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done();
        }
        Todo.find({}).then((todos) => {
          expect(todos.length).toBe(0);
        })
      });
  })
})