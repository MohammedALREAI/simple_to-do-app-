const { Todo } = require("../models/Todo");
const { User } = require("../models/Todo");

export let todoController = {};
todoController.Addtodos = (req, res) => {
  let newTodo = new Todo({
    text: req.body.text,
  });

  newTodo.save(
    (doc) => {
      res.status(200).send(doc);
    },
    (e) => {
      res.status(400);
    }
  );
};

todoController.AllTodo = (req, res) => {
  Todo.find().then(
    (todos) => {
      res.send({ todos });
    },
    (e) => {
      res.status(400);
    }
  );
};
todoController.findTodo = (req, res) => {
  let id = req.params.id;
  Todo.findById(id, (err, todo) => {
    if (err) {
      res.status(404).send({ error: "Invalid Id" });
    }
    res.send({ todo });
  });
};
todoController.deleteTodo = (req, res) => {
  let id = req.params.id;
  Todo.findByIdAndRemove(id, (err, todo) => {
    if (err) {
      res.status(404).send({ error: "Invalid Id" });
    }
    res.send({ todo });
  });
};
todoController.findByIdAndUpdate = (req, res) => {
  let todo = {};
  let id = req.params.id;
  todo.text = req.body.text;
  todo.completed = req.body.completed;
  todo.completedAt = new Date().getTime();

  Todo.findByIdAndUpdate(id, todo, (err) => {
    if (err) {
      res.status(400).send({ error: "Could not update" });
    }
    res.send({ success: "Todo updated succesfully" });
  });
};
