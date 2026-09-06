// const express = require('express');

// const HostRouter = express.Router();

// HostRouter.get("/host/add-home",(req , res , next) =>{
//     res.send(`<h1>register your id on airbnb</h1>
//           <form action="/host/add-home" method="POST">
//         <input type="text" name="houseName" placeholder="enter your house name"/>
//         <input type="submit" />
//         </form>`);
// })


// HostRouter.post("/host/add-home" , (req , res , next)=>{
//     console.log(req.body);//here lock krdi post ko ab yyhi body ko parse krke value provide kraiga-----
//     res.send(`<h1>House registered successfully</h1>
//         <a href="/">Go to home</a>`);
// })


// module.exports = HostRouter;












// For common path

//core module
const path =  require('path');//ye module use kiya h humne html file ko lane ke liye 

//external module
const express = require('express');

const HostRouter = express.Router();
// local module 
const rootDir = require("../utils/PathUtil");


// HostRouter.get("/add-home",(req , res , next) =>{
//    res.sendFile(path.join(__dirname,'../','views','addHome.html'));
// })
//---------------------------OR-------
HostRouter.get("/add-home",(req , res , next) =>{
   res.sendFile(path.join(rootDir,'views','addHome.html'));
})


// HostRouter.post("/add-home" , (req , res , next)=>{
//     console.log(req.body);//here lock krdi post ko ab yyhi body ko parse krke value provide kraiga-----
//     res.sendFile(path.join(__dirname,'../','views','HomeAdded.html'));
// })
//------------------------------OR-----
HostRouter.post("/add-home" , (req , res , next)=>{
    console.log(req.body);//here lock krdi post ko ab yyhi body ko parse krke value provide kraiga-----
    res.sendFile(path.join(rootDir,'views','HomeAdded.html'));
})

module.exports = HostRouter;





