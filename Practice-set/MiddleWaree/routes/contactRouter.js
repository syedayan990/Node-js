// //core module
// const path = require('path');

// //External Module

// const express = require('express');

// //Local Module
// const rootDir = require('../utils/PathUtil');

// const contactrouter = express.Router();

// contactrouter.get("/contect-us", (req, res, next) => {
//    res.sendFile(path.join(rootDir , "views" , "contact-us.html"));
// });

  
// contactrouter.post("/contect-us", (req, res, next) => {
//     console.log(req.body);
//    res.sendFile(path.join(rootDir , "views" , "contact-success.html"));
// });

// module.exports = contactrouter;





// core module
const path = require('path');
// External Module
const express = require('express');
// Local Module
const rootDir = require('../utils/PathUtil');
const contactrouter = express.Router();
// FIX: spelling "contect-us" ko "contact-us" kiya
contactrouter.get("/contact-us", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "contact-us.html"));
});
contactrouter.post("/contact-us", (req, res, next) => {
  console.log(req.body);
  res.sendFile(path.join(rootDir, "views", "contact-success.html"));
});
module.exports = contactrouter;