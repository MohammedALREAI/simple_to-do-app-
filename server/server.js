const express = require('express');
const bodyParser = require('body-parser');
let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/Todo');
let {User} = require('./models/User');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/todos', (req, res) => {
  let newTodo = new Todo({
    text: req.body.text
  });

  newTodo.save((doc) => {
    res.status(200).send(doc);
  }, (e) => {
    res.status(400);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400);
  });
});

app.get('/todo/:id', (req, res) => {
  let id = req.params.id;
  Todo.findById(id, (err, todo) => {
    if(err) {
      res.status(404).send({error: 'Invalid Id'});
    }
    res.send({todo});
  });
});

app.delete('/todo/:id', (req, res) => {
  let id = req.params.id;
  Todo.findByIdAndRemove(id, (err, todo) => {
    if(err) {
      res.status(404).send({error: 'Invalid Id'});
    }
    res.send({todo});
  });
});

app.patch('/todo/:id', (req, res) => {
  let todo = {};
  let id = req.params.id;
  todo.text = req.body.text;
  todo.completed = req.body.completed;
  todo.completedAt = new Date().getTime();

  Todo.findByIdAndUpdate(id, todo, (err) => {
    if(err) {
      res.status(400).send({error: 'Could not update'});
    }
    res.send({success: 'Todo updated succesfully'});
  } )
})

app.listen(3000, () => {
  console.log('App started in port 3000');
});

module.exports = {app};