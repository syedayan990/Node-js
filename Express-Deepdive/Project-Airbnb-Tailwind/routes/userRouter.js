//code module---
const path =  require('path');//ye module use kiya h humne html file ko lane ke liye 

//external module 
const express = require('express');

const userRouter = express.Router();


//local module 
const rootDir = require("../utils/PathUtil");

// userRouter.get("/",(req ,res , next)=>
//     {
//     res.sendFile(path.join(__dirname,'../','views','Home.html'));
// });
//-------------------------OR-----
userRouter.get("/",(req ,res , next)=>
    {
    res.sendFile(path.join(rootDir,'views','Home.html'));
});


module.exports = userRouter;