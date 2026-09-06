const TodoItem = require("../Models/TodoItem");

exports.createTodoItem = async (req, res, next) => {
  const task = req.body.task;
  const date = req.body.date;
  const newTodoItem = new TodoItem({ task, date });
  await newTodoItem
    .save()
    .then((savedItem) => {
      console.log("Todo Item created");
      res.status(201).json(savedItem);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error creating Todo Item" });
    });
};


exports.getTodoItem = async (req, res, next) => {
  const todoItems = await TodoItem.find();   
  res.json(todoItems);                       
};

exports.deleteTodoItem = async (req, res, next) => {
  const { id } = req.params;
  await TodoItem.findByIdAndDelete(id);
  res.status(204).json({ _id: id });
};

// exports.markCompleted = async (req, res, next) => {
// const {id} = req.params;
// const TodoItem = await TodoItem.findById(id);
// TodoItem.completed = !TodoItem.completed;
// await TodoItem.save();
// res.json(TodoItem);
// };
// exports.markCompleted = async (req, res, next) => {
//      try{
//         const { id } = req.params;
//     const todoItem = await TodoItem.findById(id);

//     if (!todoItem) {
//         return res.status(404).json({
//             message: "Todo Item not found"
//         });
//     }

//     todoItem.completed = !todoItem.completed;
//     await todoItem.save();

//     res.json(todoItem);
// } catch(error){
//      console.error(error);
//       res.status(500).json({ message: "Error updating Todo Item" });
// }

// }

exports.markCompleted = async (req, res, next) => {
  const { id } = req.params;
  const todoItem = await TodoItem.findById(id);

  if (!todoItem) {
    return res.status(404).json({
      message: "Todo Item not found",
    });
  }

  todoItem.completed = !todoItem.completed;
  await todoItem.save();

  res.json(todoItem);
};
