const express = require("express");
const TodoItemRouter = express.Router();
const TodoItemController = require("../controllers/TodoItemController");

TodoItemRouter.post("/", TodoItemController.createTodoItem);
TodoItemRouter.get("/", TodoItemController.getTodoItem);
TodoItemRouter.delete("/:id", TodoItemController.deleteTodoItem);
TodoItemRouter.put("/:id/complete", TodoItemController.markCompleted);

module.exports = TodoItemRouter;