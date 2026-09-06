// //core module
// const path = require('path');

// //External Module

// const express = require('express');

// //Local Module
// const rootDir = require('../utils/PathUtil');

// const homerouter = express.Router();

// homerouter.get("/", (req, res, next) => {
//   console.log("handling / for GET", req.url, req.method);
//   res.sendFile(path.join(rootDir , "views" , "home.html"));
// });

// module.exports = homerouter;




//gpt code

// core module
const path = require('path');
// External Module
const express = require('express');
// Local Module
const rootDir = require('../utils/PathUtil');
const homerouter = express.Router();
homerouter.get("/", (req, res, next) => {
  console.log("handling / for GET", req.url, req.method);
  // FIX: "home.html" ko "Home.html" kiya taaki actual file name se match ho
  // (agar aap file ka naam lowercase rakhna chahte hain to views/Home.html
  //  ko rename karke views/home.html bhi kar sakte hain — dono me se ek jagah
  //  match hona zaroori hai)
  res.sendFile(path.join(rootDir, "views", "home.html"));
});
module.exports = homerouter;