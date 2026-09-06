//for common path
//core module---
const path = require("path"); //ye module use kiya h humne html file ko lane ke liye
require("dotenv").config();
//external module-------
const express = require("express");

const DB_PATH = process.env.MONGO_URI;
// imports local module-----
const userRouter = require("./routes/userRouter");

const { HostRouter } = require("./routes/HostRouter");
const rootDir = require("./utils/PathUtil");
const notFoundController = require("./controllers/Error");
const db = require("./utils/DabaBaseUtils");
const {mongoConnect} = require("./utils/DabaBaseUtils");

// db.execute("SELECT * FROM homes")
//   .then(([rows, field]) => {
//     console.log("Getting from DB : ", rows);
//   })
//   .catch((error) => {
//     console.log("Error while reading homes record :", error);
//   }); // isko models homes peer le ja rhe h

const App = express();

// appendFile.set('view engine' , 'ejs');---chnage
App.set("view engine", "ejs");
App.set("views", path.join(rootDir, "views"));

App.use(express.urlencoded());

App.use(userRouter); // is middle ware se hi pura page chalega---
App.use("/host", HostRouter); // is middleware ke bina host niii hoga

App.use(express.static(path.join(rootDir, "public")));

App.use("", notFoundController.notFound);

const PORT = process.env.PORT || 3000;
mongoConnect((client) => {
  console.log(client);

  App.listen(PORT, () => {
    console.log(`server running on address http://localhost:${PORT}`);
  });
});
