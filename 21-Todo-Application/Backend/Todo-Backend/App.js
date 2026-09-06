require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");

const DB_PATH = process.env.DB_PATH;

const TodoItemRouter = require("./routes/TodoItemRouter");
const ErrorController = require("./controllers/Error");

const App = express();

App.use(express.urlencoded());
App.use(express.json());
App.use(cors());

App.use("/api/Todo", TodoItemRouter);
App.use("", ErrorController.notFound);

const PORT = 3000;

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("connected to Mongo");
    App.listen(PORT, () => {
      console.log(`server running on address http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error while connecting to Mongo: ", error);
  });