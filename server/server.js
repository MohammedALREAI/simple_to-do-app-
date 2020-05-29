const express = require("express");
const bodyParser = require("body-parser");
let { mongoose } = require("./db/mongoose");
const { todoController } = require("./Controller/todos.controller");

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/todos", todoController.Addtodos);

app.get("/todos", todoController.Alltodos);

app.get("/todo/:id", todoController.findTodo);

app.delete("/todo/:id", todoController.deleteTodo);

app.patch("/todo/:id", todoController.findByIdAndUpdate);

app.listen(3000, () => {
  console.log("App started in port 3000💔🐱‍🏍🐱‍🏍");
});

module.exports = { app };
