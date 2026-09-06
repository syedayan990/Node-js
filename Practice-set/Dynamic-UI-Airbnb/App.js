// //external module-------
// const express = require('express');

// // imports local module-----
// const userRouter = require('./routes/userRouter');
// const HostRouter = require('./routes/HostRouter');

// const App= express();

// // App.use((req ,res , next)=>// yaha humne (use) use kiya h to hum koi se bhi path pr iske response ko access kr sakte h hum (get ya post) kerte h jo only loacal url pr hi access kr sakte h

// App.use(express.urlencoded());

// App.use(userRouter);// is middle ware se hi pura page chalega---
// App.use(HostRouter);// is middleware ke bina host niii hoga

// //===========ye humne user routr mai use kiya h==========
// // App.get("/",(req ,res , next)=>
// //     {
// //     // console.log(req.url , req.method);
// //     res.send(`<h1> Welcome to airbnb </h1>
// //         <a href="/host/add-home">add home</a>`);
// // });
// //----------------------------------------------------

// //==================ye humne Host router mai use kiya h ======
// // App.get("/host/add-home",(req , res , next) =>{
// //     res.send(`<h1>register your id on airbnb</h1>
// //           <form action="/host/add-home" method="POST">
// //         <input type="text" name="houseName" placeholder="enter your house name"/>
// //         <input type="submit" />
// //         </form>`);
// // })

// // App.post("/host/add-home" , (req , res , next)=>{
// //     console.log(req.body);//here lock krdi post ko ab yyhi body ko parse krke value provide kraiga-----
// //     res.send(`<h1>House registered successfully</h1>
// //         <a href="/">Go to home</a>`);
// // })
// //----------------------------------------------

// //Adding 404 -----
// App.use((req , res , next)=>{
//     res.status(404).send('<h1> page is not found!</h1>');// yaha statusbh ki page ka status h page available nii h
// })

// const PORT = 3000;
// App.listen(PORT , () => {
//     console.log(`server running on address http://localhost:${PORT}`);
// });









//for common path
//core module---
const path = require("path"); //ye module use kiya h humne html file ko lane ke liye

//external module-------
const express = require("express");

// imports local module-----
const userRouter = require("./routes/userRouter");
const {HostRouter} = require("./routes/HostRouter");
const rootDir = require("./utils/PathUtil");

const App = express();

// appendFile.set('view engine' , 'ejs');---chnage
App.set("view engine", "ejs");
App.set("views", path.join(rootDir, "views"));

// App.use((req ,res , next)=>// yaha humne (use) use kiya h to hum koi se bhi path pr iske response ko access kr sakte h hum (get ya post) kerte h jo only loacal url pr hi access kr sakte h

App.use(express.urlencoded());

App.use(userRouter); // is middle ware se hi pura page chalega---
App.use("/host", HostRouter); // is middleware ke bina host niii hoga

App.use(express.static(path.join(rootDir, 'public')));

//===========ye humne user routr mai use kiya h==========
// App.get("/",(req ,res , next)=>
//     {
//     // console.log(req.url , req.method);
//     res.send(`<h1> Welcome to airbnb </h1>
//         <a href="/host/add-home">add home</a>`);
// });
//----------------------------------------------------

//==================ye humne Host router mai use kiya h ======
// App.get("/host/add-home",(req , res , next) =>{
//     res.send(`<h1>register your id on airbnb</h1>
//           <form action="/host/add-home" method="POST">
//         <input type="text" name="houseName" placeholder="enter your house name"/>
//         <input type="submit" />
//         </form>`);
// })

// App.post("/host/add-home" , (req , res , next)=>{
//     console.log(req.body);//here lock krdi post ko ab yyhi body ko parse krke value provide kraiga-----
//     res.send(`<h1>House registered successfully</h1>
//         <a href="/">Go to home</a>`);
// })
//----------------------------------------------

//Adding 404 -----
// App.use((req, res, next) => {
//   res.status(404).sendFile(path.join(__dirname, "views", "404Page.html")); // yaha statusbh ki page ka status h page available nii h
// });
//----------------------OR-----------------
App.use("",(req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404Page.html")); // yaha statusbh ki page ka status h page available nii h
});

const PORT = 3000;
App.listen(PORT, () => {
  console.log(`server running on address http://localhost:${PORT}`);
});
