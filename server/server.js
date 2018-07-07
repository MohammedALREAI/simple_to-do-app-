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

app.listen(3000, () => {
  console.log('App started in port 3000');
});

module.exports = {app};