//code module---
const path =  require('path');//ye module use kiya h humne html file ko lane ke liye 

//external module 
const express = require('express');

const userRouter = express.Router();


//local module 
// const rootDir = require("../utils/PathUtil");
//for ejs
const {registeredhomes} = require('./HostRouter');

// userRouter.get("/",(req ,res , next)=>
//     {
//     res.sendFile(path.join(__dirname,'../','views','Home.html'));
// });
//-------------------------OR-----
// userRouter.get("/",(req ,res , next)=>
//     {
//         console.log(registeredhomes);
//     res.sendFile(path.join(rootDir,'views','Home.html'));
// });
//-------------------------OR-----
userRouter.get("/",(req ,res , next)=>
    {
        console.log(registeredhomes);
    res.render('home' , {registeredhomes: registeredhomes , pagetitle: "Airbnb Home" , currentPage: "home"});
});


module.exports = userRouter;