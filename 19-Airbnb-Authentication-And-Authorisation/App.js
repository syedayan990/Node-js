//for common path
//core module---
const path = require("path"); //ye module use kiya h humne html file ko lane ke liye
require("dotenv").config();

//external module-------
const express = require("express");
const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);
const { MongoStore } = require('connect-mongo');
const DB_PATH = process.env.MONGO_URI;

// imports local module-----
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");

const { HostRouter } = require("./routes/HostRouter");
const rootDir = require("./utils/PathUtil");
const notFoundController = require("./controllers/Error");
// const db = require("./utils/DabaBaseUtils");
// const {mongoConnect} = require("./utils/DabaBaseUtils");
const { default: mongoose } = require("mongoose");
const { error } = require("console");

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

// const store = new MongoDBStore({
//   uri:DB_PATH,
//   collection:'sessions'
// });
const store = MongoStore.create({
  mongoUrl: DB_PATH,
  collectionName: 'sessions_v2',   
});

App.use(express.urlencoded());
App.use(session({
  secret: process.env.SESSION_SECRET,
  
  resave: false,
  saveUninitialized: true,
  store: store
}));

// App.use((req, res, next) => {
//   const cookie = req.get("Cookie");

//   if (cookie) {
//     req.isLoggedIn = cookie
//       .split(";")
//       .some((item) => item.trim() === "isLoggedIn=true");
//   } else {
//     req.isLoggedIn = false;
//   }

//   console.log("isLoggedIn:", req.isLoggedIn);
//   next();
// });
//         OR
App.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

App.use(authRouter);

App.use(userRouter); // is middle ware se hi pura page chalega---
App.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/Login");
  }
});
App.use("/host", HostRouter); // is middleware ke bina host niii hoga

App.use(express.static(path.join(rootDir, "public")));

App.use("", notFoundController.notFound);

const PORT = process.env.PORT || 3000;
// mongoConnect((client) => {
// console.log(client);

// });



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
